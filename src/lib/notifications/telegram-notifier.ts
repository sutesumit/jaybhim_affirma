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

async function sendToOwner(formatMessage: () => string): Promise<void> {
  const ownerChatId = getOwnerChatId();
  if (!ownerChatId) return;

  const message = formatMessage();

  if (process.env.NODE_ENV === "development") {
    console.log("[Dev] Telegram notification skipped:", message.slice(0, 100) + "...");
    return;
  }
  const { initBot } = await import("@/lib/telegram/bot");
  const bot = await initBot();
  await bot.api.sendMessage(ownerChatId, message, { parse_mode: "HTML" });
}

export class TelegramBotNotifier implements TelegramNotifier {
  async notifyVisitor(visitor: VisitorNotificationPayload, referrer?: string): Promise<void> {
    await sendToOwner(() => formatVisitorNotification(visitor, referrer));
  }

  async notifyLike(like: LikeNotificationPayload): Promise<void> {
    await sendToOwner(() => formatLikeNotification(like));
  }

  async notifyComment(comment: CommentNotificationPayload): Promise<void> {
    await sendToOwner(() => formatCommentNotification(comment));
  }

  async notifyCommentEdit(comment: CommentEditNotificationPayload): Promise<void> {
    await sendToOwner(() => formatCommentEditNotification(comment));
  }

  async notifyCommentDelete(comment: CommentDeleteNotificationPayload): Promise<void> {
    await sendToOwner(() => formatCommentDeleteNotification(comment));
  }

  async notifyStory(story: StoryNotificationPayload): Promise<void> {
    await sendToOwner(() => formatStoryNotification(story));
  }

  async notifyStoryEdit(story: StoryEditNotificationPayload): Promise<void> {
    await sendToOwner(() => formatStoryEditNotification(story));
  }

  async notifyStoryDelete(story: StoryDeleteNotificationPayload): Promise<void> {
    await sendToOwner(() => formatStoryDeleteNotification(story));
  }

  async notifyOtpVerified(auth: AuthOtpVerifiedPayload): Promise<void> {
    await sendToOwner(() => formatOtpVerifiedNotification(auth));
  }

  async notifyLogout(auth: AuthLogoutPayload): Promise<void> {
    await sendToOwner(() => formatLogoutNotification(auth));
  }
}

export const telegramNotifier = new TelegramBotNotifier();
