import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { 
  PostStoryRequest, 
  PostStoryResponse, 
  GetStoriesResponse 
} from "@/types/stories";

const MAX_STORY_LENGTH = 5000; // Increased limit for stories

/**
 * POST /api/stories - Create a new father-son story
 */
export async function POST(request: Request): Promise<NextResponse<PostStoryResponse>> {
  try {
    // Check authentication
    const user = await AuthManager.getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!user.accessToken) {
        console.warn("[POST /api/stories] Missing access token for user", user.id);
        return NextResponse.json(
            { 
              success: false, 
              error: "Your session is incomplete (missing JWT). Please log out and log in again." 
            },
            { status: 401 }
        );
    }

    // Parse request body
    const body: PostStoryRequest = await request.json();
    const { storyText, signature, backgroundUrl } = body;

    // Validate input
    if (!storyText || typeof storyText !== "string") {
      return NextResponse.json(
        { success: false, error: "storyText is required" },
        { status: 400 }
      );
    }

    const trimmedText = storyText.trim();
    if (trimmedText.length === 0) {
      return NextResponse.json(
        { success: false, error: "Story cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmedText.length > MAX_STORY_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Story exceeds maximum length of ${MAX_STORY_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Get context-aware supabase client
    const supabase = await getServerSupabase();

    // Insertion with explicit user context
    const { data: story, error: insertError } = await supabase
      .from("father_son_stories")
      .insert({
        user_id: user.id,
        story_text: trimmedText,
        signature: signature || null,
        background_url: backgroundUrl || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("[POST /api/stories] Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to create story" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      story: {
        ...story,
        user: { 
          phone: user.phone, 
          email: user.email,
          display_name: user.display_name 
        },
      },
    });
  } catch (error: unknown) {
    console.error("[POST /api/stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stories - Fetch stories (optionally filter by user)
 */
export async function GET(request: Request): Promise<NextResponse<GetStoriesResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const supabase = await getServerSupabase();

    let query = supabase
      .from("father_son_stories")
      .select("*, user:profiles(display_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data: stories, error } = await query;

    if (error) {
      console.error("[GET /api/stories] Fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch stories" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stories: stories || [],
    });
  } catch (error: unknown) {
    console.error("[GET /api/stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
