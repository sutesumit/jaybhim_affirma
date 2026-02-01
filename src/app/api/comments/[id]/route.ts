import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { 
  UpdateCommentRequest, 
  PostCommentResponse, 
  DeleteCommentResponse 
} from "@/types/comments";
import { MAX_COMMENT_LENGTH } from "@/lib/comments/constants";


interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/comments/[id] - Update own comment
 */
export async function PATCH(
  request: Request,
  { params }: RouteParams
): Promise<NextResponse<PostCommentResponse>> {
  try {
    const { id } = await params;

    // Check authentication
    const user = await AuthManager.getAuthenticatedUser();
    if (!user || !user.accessToken) {
      console.warn("[PATCH /api/comments/[id]] Incomplete session for user", user?.id);
      return NextResponse.json(
        { success: false, error: "Your session is incomplete or expired. Please log out and back in." },
        { status: 401 }
      );
    }

    // Validate comment ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Parse request body
    const body: UpdateCommentRequest = await request.json();
    const { commentText, isAnonymous } = body;

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

    if (trimmedText.length > MAX_COMMENT_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Comment exceeds maximum length of ${MAX_COMMENT_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Fetch existing comment to verify ownership and check if soft-deleted
    const supabase = await getServerSupabase();
    const { data: existingComment, error: fetchError } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error("[PATCH /api/comments/[id]] Fetch error:", fetchError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch comment" },
        { status: 500 }
      );
    }

    if (!existingComment || existingComment.deleted_at) {
      return NextResponse.json(
        { success: false, error: "Comment not found or already deleted" },
        { status: 404 }
      );
    }

    // Verify ownership (RLS should handle this, but double-check)
    if (existingComment.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only edit your own comments" },
        { status: 403 }
      );
    }

    // Get current version number
    const { data: versions, error: versionFetchError } = await supabase
      .from("comment_versions")
      .select("version_number")
      .eq("comment_id", id)
      .order("version_number", { ascending: false })
      .limit(1);

    const currentVersion = versions?.[0]?.version_number || 0;
    const newVersionNumber = currentVersion + 1;

    // Archive current text to comment_versions
    const { error: versionError } = await supabase
      .from("comment_versions")
      .insert({
        comment_id: id,
        comment_text: existingComment.comment_text,
        version_number: newVersionNumber,
      });

    if (versionError) {
      console.error("[PATCH /api/comments/[id]] Version insert error:", versionError);
      // Continue with update even if version insert fails
    }

    // Update the comment
    const updatePayload: any = {
      comment_text: trimmedText,
      updated_at: new Date().toISOString(),
    };

    if (typeof isAnonymous === "boolean") {
      updatePayload.is_anonymous = isAnonymous;
    }

    const { data: updatedComment, error: updateError } = await supabase
      .from("comments")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (updateError || !updatedComment) {
      console.error("[PATCH /api/comments/[id]] Update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update comment (it may have been deleted)" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      comment: {
        ...updatedComment,
        user: { phone: user.phone, email: user.email, display_name: user.display_name },
      },
    });
  } catch (error: unknown) {
    console.error("[PATCH /api/comments/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments/[id] - Soft delete own comment
 * 
 * Implements soft delete by setting the 'deleted_at' timestamp.
 * Relies on RLS policies to enforce ownership and visibility.
 */
export async function DELETE(
  request: Request,
  { params }: RouteParams
): Promise<NextResponse<DeleteCommentResponse>> {
  try {
    const { id } = await params;

    // Check authentication
    const user = await AuthManager.getAuthenticatedUser();
    if (!user || !user.accessToken) {
      console.warn("[DELETE /api/comments/[id]] Incomplete session for user", user?.id);
      return NextResponse.json(
        { success: false, error: "Your session is incomplete or expired. Please log out and back in." },
        { status: 401 }
      );
    }

    // Validate comment ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Use standard authenticated supabase client
    const supabase = await getServerSupabase();

    // Fetch existing comment to verify ownership and ensure it's not already deleted
    const { data: existingComment, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle();

    if (fetchError) {
      console.error("[DELETE /api/comments/[id]] Fetch error:", fetchError);
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      );
    }

    if (!existingComment) {
      return NextResponse.json(
        { success: false, error: "Comment not found, access denied, or already deleted" },
        { status: 404 }
      );
    }

    // Verify ownership in application logic
    if (existingComment.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Soft delete: set deleted_at timestamp
    // This requires an RLS policy that allows UPDATE where auth.uid() = user_id
    const { error: deleteError } = await supabase
      .from("comments")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (deleteError) {
      console.error("[DELETE /api/comments/[id]] Delete error:", deleteError);
      return NextResponse.json(
        { success: false, error: "Failed to delete comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[DELETE /api/comments/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}


