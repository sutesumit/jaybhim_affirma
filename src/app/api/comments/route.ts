import { AuthManager } from "@/lib/auth/auth-manager";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import type { 
  PostCommentRequest, 
  PostCommentResponse, 
  GetCommentsResponse 
} from "@/types/comments";

/**
 * POST /api/comments - Create a new comment
 */
export async function POST(request: Request): Promise<NextResponse<PostCommentResponse>> {
  try {
    // Check authentication
    const user = await AuthManager.getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body: PostCommentRequest = await request.json();
    const { pagePath, commentText } = body;

    // Validate input
    if (!pagePath || typeof pagePath !== "string") {
      return NextResponse.json(
        { success: false, error: "pagePath is required" },
        { status: 400 }
      );
    }

    if (!commentText || typeof commentText !== "string") {
      return NextResponse.json(
        { success: false, error: "commentText is required" },
        { status: 400 }
      );
    }

    const trimmedText = commentText.trim();
    if (trimmedText.length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmedText.length > 2000) {
      return NextResponse.json(
        { success: false, error: "Comment exceeds maximum length of 2000 characters" },
        { status: 400 }
      );
    }

    // Insert comment into database
    const { data: comment, error: insertError } = await supabase
      .from("comments")
      .insert({
        page_path: pagePath,
        user_id: user.id,
        comment_text: trimmedText,
      })
      .select()
      .single();

    if (insertError) {
      console.error("[POST /api/comments] Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to create comment" },
        { status: 500 }
      );
    }

    // Insert initial version into comment_versions
    const { error: versionError } = await supabase
      .from("comment_versions")
      .insert({
        comment_id: comment.id,
        comment_text: trimmedText,
        version_number: 1,
      });

    if (versionError) {
      console.error("[POST /api/comments] Version insert error:", versionError);
      // Comment was created, version insert failed - log but don't fail the request
    }

    return NextResponse.json({
      success: true,
      comment: {
        ...comment,
        user: { phone: user.phone, email: user.email },
      },
    });
  } catch (error: unknown) {
    console.error("[POST /api/comments] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/comments?pagePath=<path> - Fetch comments for a page
 */
export async function GET(request: Request): Promise<NextResponse<GetCommentsResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get("pagePath");

    if (!pagePath) {
      return NextResponse.json(
        { success: false, error: "pagePath query parameter is required" },
        { status: 400 }
      );
    }

    // Fetch comments (RLS automatically filters deleted_at IS NULL)
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("page_path", pagePath)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[GET /api/comments] Fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      comments: comments || [],
    });
  } catch (error: unknown) {
    console.error("[GET /api/comments] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
