import { getOwnerChatId } from "@/lib/telegram/middleware/auth";
import {
  formatCommentDeleteNotification,
  formatCommentEditNotification,
  formatCommentNotification,
  formatLikeNotification,
  formatLogoutNotification,
  formatOtpVerifiedNotification,
  formatStoryDeleteNotification,
  formatStoryEditNotification,
  formatStoryNotification,
  formatVisitorNotification,
} from "./formatters";
import type {
  AuthLogoutPayload,
  AuthOtpVerifiedPayload,
  CommentDeleteNotificationPayload,
  CommentEditNotificationPayload,
  CommentNotificationPayload,
  LikeNotificationPayload,
  StoryDeleteNotificationPayload,
  StoryEditNotificationPayload,
  StoryNotificationPayload,
  TelegramNotifier,
  VisitorNotificationPayload,
} from "./types";

async function sendMessage(chatId: string, message: string): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.log("[Dev] Telegram notification skipped:", message.slice(0, 100) + "...");
    return;
  }
  const { initBot } = await import("@/lib/telegram/bot");
  const bot = await initBot();
  await bot.api.sendMessage(chatId, message, { parse_mode: "HTML" });
}

export class TelegramBotNotifier implements TelegramNotifier {
  async notifyVisitor(
    visitor: VisitorNotificationPayload,
    referrer?: string
  ): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatVisitorNotification(visitor, referrer));
  }

  async notifyLike(like: LikeNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatLikeNotification(like));
  }

  async notifyComment(comment: CommentNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatCommentNotification(comment));
  }

  async notifyStory(story: StoryNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatStoryNotification(story));
  }

  async notifyCommentEdit(comment: CommentEditNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatCommentEditNotification(comment));
  }

  async notifyCommentDelete(comment: CommentDeleteNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatCommentDeleteNotification(comment));
  }

  async notifyStoryEdit(story: StoryEditNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatStoryEditNotification(story));
  }

  async notifyStoryDelete(story: StoryDeleteNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatStoryDeleteNotification(story));
  }

  async notifyOtpVerified(auth: AuthOtpVerifiedPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatOtpVerifiedNotification(auth));
  }

  async notifyLogout(auth: AuthLogoutPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatLogoutNotification(auth));
  }
}

export const telegramNotifier = new TelegramBotNotifier();