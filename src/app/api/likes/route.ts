import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { 
  ToggleLikeRequest, 
  ToggleLikeResponse, 
  GetLikesResponse 
} from "@/types/likes";

/**
 * POST /api/likes - Toggle like status
 */
export async function POST(request: Request): Promise<NextResponse<ToggleLikeResponse>> {
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
      console.warn("[POST /api/likes] Missing access token for user", user.id);
      return NextResponse.json(
        { 
          success: false, 
          error: "Your session is incomplete (missing JWT). Please log out and log in again." 
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body: ToggleLikeRequest = await request.json();
    const { pagePath } = body;

    // Validate input
    if (!pagePath || typeof pagePath !== "string") {
      return NextResponse.json(
        { success: false, error: "pagePath is required" },
        { status: 400 }
      );
    }

    // Get context-aware supabase client
    const supabase = await getServerSupabase();

    // Check if user already has a like for this page
    const { data: existingLike, error: checkError } = await supabase
      .from("likes")
      .select("id")
      .eq("page_path", pagePath)
      .eq("user_id", user.id)
      .single();

    if (checkError && checkError.code !== "PGRST116") { // PGRST116 = no rows returned
      console.error("[POST /api/likes] Check error:", checkError);
      return NextResponse.json(
        { success: false, error: "Failed to check like status" },
        { status: 500 }
      );
    }

    let isLiked: boolean;
    let likeCount: number;
    let resultCode: string | undefined;

    const { intent } = body;

    if (intent === 'like') {
      if (existingLike) {
        // Already liked
        isLiked = true;
        resultCode = 'ALREADY_LIKED';
      } else {
        // Not liked, insert
        const { error: insertError } = await supabase
        .from("likes")
        .insert({
          page_path: pagePath,
          user_id: user.id,
        });

        if (insertError) {
          console.error("[POST /api/likes] Insert error:", insertError);
          return NextResponse.json(
            { success: false, error: "Failed to add like" },
            { status: 500 }
          );
        }
        isLiked = true;
      }
    } else if (intent === 'unlike') {
      if (existingLike) {
        // Liked, delete
        const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("id", existingLike.id);

        if (deleteError) {
          console.error("[POST /api/likes] Delete error:", deleteError);
          return NextResponse.json(
            { success: false, error: "Failed to remove like" },
            { status: 500 }
          );
        }
        isLiked = false;
      } else {
        // Already unliked
        isLiked = false;
      }
    } else {
      // Default toggle behavior
      if (existingLike) {
        // User has liked this page - delete the like
        const { error: deleteError } = await supabase
          .from("likes")
          .delete()
          .eq("id", existingLike.id);
  
        if (deleteError) {
          console.error("[POST /api/likes] Delete error:", deleteError);
          return NextResponse.json(
            { success: false, error: "Failed to remove like" },
            { status: 500 }
          );
        }
  
        isLiked = false;
      } else {
        // User hasn't liked this page - insert new like
        const { error: insertError } = await supabase
          .from("likes")
          .insert({
            page_path: pagePath,
            user_id: user.id,
          });
  
        if (insertError) {
          console.error("[POST /api/likes] Insert error:", insertError);
          return NextResponse.json(
            { success: false, error: "Failed to add like" },
            { status: 500 }
          );
        }
  
        isLiked = true;
      }
    }

    // Get updated like count
    const { count, error: countError } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("page_path", pagePath);

    if (countError) {
      console.error("[POST /api/likes] Count error:", countError);
      // Don't fail the request if count fails, just return without count
      return NextResponse.json({
        success: true,
        isLiked,
      });
    }

    return NextResponse.json({
      success: true,
      likeCount: count ?? 0,
      isLiked,
      code: resultCode,
    });
  } catch (error: unknown) {
    console.error("[POST /api/likes] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/likes?pagePath=<path> - Get like count and user status
 */
export async function GET(request: Request): Promise<NextResponse<GetLikesResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get("pagePath");

    if (!pagePath) {
      return NextResponse.json(
        { success: false, error: "pagePath query parameter is required" },
        { status: 400 }
      );
    }

    const supabase = await getServerSupabase();

    // Count all likes for the page
    const { count, error: countError } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("page_path", pagePath);

    if (countError) {
      console.error("[GET /api/likes] Count error:", countError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch like count" },
        { status: 500 }
      );
    }

    // Check if current user has liked this page (if authenticated)
    const currentUser = await AuthManager.getAuthenticatedUser();
    let isLiked: boolean | undefined = undefined;

    if (currentUser) {
      const { data: userLike, error: checkError } = await supabase
        .from("likes")
        .select("id")
        .eq("page_path", pagePath)
        .eq("user_id", currentUser.id)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("[GET /api/likes] Check error:", checkError);
        // Don't fail the request if check fails, just return without isLiked
      } else {
        isLiked = !!userLike;
      }
    }

    return NextResponse.json({
      success: true,
      likeCount: count ?? 0,
      isLiked,
    });
  } catch (error: unknown) {
    console.error("[GET /api/likes] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
