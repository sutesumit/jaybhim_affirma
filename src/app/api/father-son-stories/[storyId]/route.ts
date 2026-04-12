// src/app/api/father-son-stories/[storyId]/route.ts
// Handles individual story operations: update and soft-delete

import { AuthManager } from "@/lib/auth/auth-manager";
import { getServerSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { MAX_FATHER_SON_STORY_LENGTH } from "@/lib/utils/constants";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";


interface RouteContext {
  params: Promise<{ storyId: string }>;
}

/**
 * PATCH /api/father-son-stories/[storyId] - Update a story
 * Only the original author can update their story
 */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { storyId } = await context.params;
    const user = await AuthManager.getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { storyText, signature } = body;



    if (!storyText || typeof storyText !== "string" || storyText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "storyText is required" },
        { status: 400 }
      );
    }

    if (storyText.trim().length > MAX_FATHER_SON_STORY_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Story exceeds maximum length of ${MAX_FATHER_SON_STORY_LENGTH} characters` },
        { status: 400 }
      );
    }

    const supabase = await getServerSupabase();

    // First, verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from("father_son_stories")
      .select("user_id, story_text")
      .eq("id", storyId)
      .is("deleted_at", null)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only edit your own stories" },
        { status: 403 }
      );
    }

    // Update the story
    const { data: story, error: updateError } = await supabase
      .from("father_son_stories")
      .update({
        story_text: storyText.trim(),
        signature: signature || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", storyId)
      .select("*, user:profiles(display_name)")
      .single();

    if (updateError) {
      console.error("[PATCH /api/father-son-stories] Update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update story" },
        { status: 500 }
      );
    }

    // Fire-and-forget Telegram notification for story edit
    const contact = user.phone || user.email || null;
    const serverIp = request.headers.get("x-forwarded-for") ?? undefined;
    const parsedIp = serverIp?.split(",")[0]?.trim();
    const isLocalhost = parsedIp?.startsWith("127.") || parsedIp === "::ffff:127.0.0.1" || parsedIp === "::1";
    const ip = isLocalhost ? null : (parsedIp ?? null);
    
    void telegramNotifier
      .notifyStoryEdit({
        storyId,
        oldText: existing!.story_text,
        newText: storyText.trim(),
        userName: user.display_name ?? "Anonymous",
        contact,
        ip,
      })
      .catch((err: unknown) => {
        console.error("Story edit notification error:", err);
      });

    const { user_id, ...safeStory } = story;
    return NextResponse.json({ success: true, story: { ...safeStory, is_own: true } });
  } catch (error) {
    console.error("[PATCH /api/father-son-stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/father-son-stories/[storyId] - Soft delete a story
 * Only the original author can delete their story
 */
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { storyId } = await context.params;
    const user = await AuthManager.getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = await getServerSupabase();

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from("father_son_stories")
      .select("user_id, story_text")
      .eq("id", storyId)
      .is("deleted_at", null)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only delete your own stories" },
        { status: 403 }
      );
    }

    // Soft delete by setting deleted_at
    const { error: deleteError } = await supabase
      .from("father_son_stories")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", storyId);

    if (deleteError) {
      console.error("[DELETE /api/father-son-stories] Delete error:", deleteError);
      return NextResponse.json(
        { success: false, error: "Failed to delete story" },
        { status: 500 }
      );
    }

    // Fire-and-forget Telegram notification for story delete
    const contact = user.phone || user.email || null;
    const serverIp = request.headers.get("x-forwarded-for") ?? undefined;
    const parsedIp = serverIp?.split(",")[0]?.trim();
    const isLocalhost = parsedIp?.startsWith("127.") || parsedIp === "::ffff:127.0.0.1" || parsedIp === "::1";
    const ip = isLocalhost ? null : (parsedIp ?? null);
    
    void telegramNotifier
      .notifyStoryDelete({
        storyId,
        storyText: existing!.story_text,
        userName: user.display_name ?? "Anonymous",
        contact,
        ip,
      })
      .catch((err: unknown) => {
        console.error("Story delete notification error:", err);
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/father-son-stories] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
