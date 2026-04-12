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
  VisitorNotificationPayload,
} from "./types";

const SITE_URL = "https://art.sumitsute.com";
const PROJECT_HEADER = "🎨 art.sumitsute.com | Art Site";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function maskContact(contact: string | null | undefined): string {
  if (!contact) return "";
  if (contact.includes("@")) {
    const parts = contact.split("@");
    const name = parts[0];
    if (name.length <= 2) return "**@" + parts[1];
    return name.slice(0, 2) + "***@" + parts[1];
  }
  if (contact.length <= 5) return "***" + contact.slice(-2);
  return contact.slice(0, 3) + "****" + contact.slice(-2);
}

function formatUserWithContact(userName: string, contact?: string | null): string {
  const masked = maskContact(contact);
  return masked ? `${escapeHtml(userName)} (${masked})` : escapeHtml(userName);
}

export function formatVisitorNotification(
  visitor: VisitorNotificationPayload,
  referrer?: string
): string {
  const locationParts = [visitor.city, visitor.region, visitor.country].filter(
    Boolean
  );
  const location =
    locationParts.length > 0
      ? locationParts.map((part) => escapeHtml(part!)).join(", ")
      : "Unknown location";
  const source = referrer ? escapeHtml(referrer) : "direct";
  const returning = visitor.isReturning ? "👋 returning" : "✨ new";
  const count = visitor.visitCount ? ` (${visitor.visitCount})` : "";
  const device = escapeHtml(visitor.deviceType || "Unknown");
  const ip = escapeHtml(visitor.ip || "Unknown IP");

  return `${PROJECT_HEADER}\n👤 <b>${returning}${count}</b>\n📍 ${location}\n💻 ${device}\n🌐 <code>${ip}</code>\n🔗 ${source}`;
}

export function formatLikeNotification(like: LikeNotificationPayload): string {
  const userWithContact = formatUserWithContact(like.userName, like.contact);
  const ipInfo = like.ip ? ` from <code>${escapeHtml(like.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n❤️ ${userWithContact}${ipInfo} liked\n<a href="${SITE_URL}${escapeHtml(like.pagePath)}">${escapeHtml(like.pagePath)}</a>\ntotal ${like.likeCount}`;
}

export function formatCommentNotification(
  comment: CommentNotificationPayload
): string {
  const truncated =
    comment.commentText.length > 80
      ? `${comment.commentText.slice(0, 77)}...`
      : comment.commentText;
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n💬 ${userWithContact}${ipInfo} commented\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(truncated)}"`;
}

export function formatStoryNotification(
  story: StoryNotificationPayload
): string {
  const truncated =
    story.storyText.length > 80
      ? `${story.storyText.slice(0, 77)}...`
      : story.storyText;
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  const signature = story.signature ? ` — ${escapeHtml(story.signature)}` : "";
  return `${PROJECT_HEADER}\n📖 ${userWithContact}${ipInfo} submitted story\n"${escapeHtml(truncated)}"${signature}`;
}

export function formatCommentEditNotification(
  comment: CommentEditNotificationPayload
): string {
  const oldTruncated =
    comment.oldText.length > 40
      ? `${comment.oldText.slice(0, 37)}...`
      : comment.oldText;
  const newTruncated =
    comment.newText.length > 40
      ? `${comment.newText.slice(0, 37)}...`
      : comment.newText;
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n💬 ${userWithContact}${ipInfo} edited comment\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(oldTruncated)}" → "${escapeHtml(newTruncated)}"`;
}

export function formatCommentDeleteNotification(
  comment: CommentDeleteNotificationPayload
): string {
  const truncated =
    comment.commentText.length > 40
      ? `${comment.commentText.slice(0, 37)}...`
      : comment.commentText;
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n🗑️ ${userWithContact}${ipInfo} deleted comment\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(truncated)}"`;
}

export function formatStoryEditNotification(
  story: StoryEditNotificationPayload
): string {
  const oldTruncated =
    story.oldText.length > 40
      ? `${story.oldText.slice(0, 37)}...`
      : story.oldText;
  const newTruncated =
    story.newText.length > 40
      ? `${story.newText.slice(0, 37)}...`
      : story.newText;
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n📖 ${userWithContact}${ipInfo} edited story\n"${escapeHtml(oldTruncated)}" → "${escapeHtml(newTruncated)}"`;
}

export function formatStoryDeleteNotification(
  story: StoryDeleteNotificationPayload
): string {
  const truncated =
    story.storyText.length > 40
      ? `${story.storyText.slice(0, 37)}...`
      : story.storyText;
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n🗑️ ${userWithContact}${ipInfo} deleted story\n"${escapeHtml(truncated)}"`;
}

export function formatOtpVerifiedNotification(
  auth: AuthOtpVerifiedPayload
): string {
  const maskedPhone = maskContact(auth.phone);
  const newUserBadge = auth.isNewUser ? " 🆕" : "";
  const ipInfo = auth.ip ? ` from <code>${escapeHtml(auth.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n✅ ${escapeHtml(auth.userName || "User")}${newUserBadge} (<code>${maskedPhone}</code>) logged in${ipInfo}`;
}

export function formatLogoutNotification(auth: AuthLogoutPayload): string {
  const userWithContact = formatUserWithContact(auth.userName, auth.contact);
  const ipInfo = auth.ip ? ` from <code>${escapeHtml(auth.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n🚪 ${userWithContact}${ipInfo} logged out`;
}