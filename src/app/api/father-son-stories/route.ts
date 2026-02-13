import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { 
  PostStoryRequest, 
  PostStoryResponse, 
  GetStoriesResponse 
} from "@/types/stories";
import { MAX_FATHER_SON_STORY_LENGTH } from "@/lib/constants";




/**
 * POST /api/father-son-stories - Create a new father-son story
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
        console.warn("[POST /api/father-son-stories] Missing access token for user", user.id);
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

    if (trimmedText.length > MAX_FATHER_SON_STORY_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Story exceeds maximum length of ${MAX_FATHER_SON_STORY_LENGTH} characters` },
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
      console.error("[POST /api/father-son-stories] Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to create story" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      story: {
        id: story.id,
        is_own: true,
        story_text: story.story_text,
        signature: story.signature,
        background_url: story.background_url,
        created_at: story.created_at,
        updated_at: story.updated_at,
        deleted_at: story.deleted_at,
        user: { 
          phone: user.phone, 
          email: user.email,
          display_name: user.display_name 
        },
      },
    });
  } catch (error: unknown) {
    console.error("[POST /api/father-son-stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/father-son-stories - Fetch stories (optionally filter by user)
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
      console.error("[GET /api/father-son-stories] Fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch stories" },
        { status: 500 }
      );
    }

    // Check for authenticated user (non-blocking)
    const user = await AuthManager.getAuthenticatedUser();

    // Transform and sort stories
    const mappedStories = (stories || []).map((story: any) => {
      const { user_id, ...rest } = story;
      return {
        ...rest,
        is_own: user?.id === user_id,
      };
    });

    // Sort by is_own first, then by created_at (which is already done by the DB query)
    // Stability of sort is important.
    mappedStories.sort((a, b) => {
      if (a.is_own === b.is_own) return 0;
      return a.is_own ? -1 : 1;
    });

    return NextResponse.json({
      success: true,
      stories: mappedStories,
    });
  } catch (error: unknown) {
    console.error("[GET /api/father-son-stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
