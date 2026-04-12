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
const TELEGRAM_MAX_LENGTH = 4000;

function truncateWithCount(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 3)}... (${text.length} chars)`;
}

function clampMessage(message: string): string {
  if (message.length <= TELEGRAM_MAX_LENGTH) return message;
  return message.slice(0, TELEGRAM_MAX_LENGTH - 3) + "...";
}

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

function formatUserWithContact(userName?: string, contact?: string | null): string {
  const name = userName || "Anonymous";
  const masked = maskContact(contact);
  return masked ? `${escapeHtml(name)} (${masked})` : escapeHtml(name);
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

  // Only show auth badge if userName is truthy (authenticated user)
  const userPart = visitor.userName
    ? ` 🔐 ${formatUserWithContact(visitor.userName, visitor.contact)}`
    : "";

  return `${PROJECT_HEADER}\n👤 <b>${returning}${count}</b>${userPart}\n📍 ${location}\n💻 ${device}\n🌐 <code>${ip}</code>\n🔗 ${source}`;
}

export function formatLikeNotification(like: LikeNotificationPayload): string {
  const userWithContact = formatUserWithContact(like.userName, like.contact);
  const ipInfo = like.ip ? ` from <code>${escapeHtml(like.ip)}</code>` : "";
  const verb = like.isLiked ? "liked" : "unliked";
  return `${PROJECT_HEADER}\n❤️ ${userWithContact}${ipInfo} ${verb}\n<a href="${SITE_URL}${escapeHtml(like.pagePath)}">${escapeHtml(like.pagePath)}</a>\ntotal ${like.likeCount}`;
}

function formatAnonymousBadge(isAnonymous?: boolean): string {
  return isAnonymous ? " [anonymous]" : "";
}

function formatAnonymousTransition(wasAnonymous?: boolean, isAnonymous?: boolean): string {
  if (wasAnonymous && !isAnonymous) return " [anonymous → public]";
  if (!wasAnonymous && isAnonymous) return " [public → anonymous]";
  if (isAnonymous) return " [anonymous]";
  return "";
}

export function formatCommentNotification(
  comment: CommentNotificationPayload
): string {
  const truncated = truncateWithCount(comment.commentText, 200);
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  const anonBadge = formatAnonymousBadge(comment.isAnonymous);
  return clampMessage(`${PROJECT_HEADER}\n💬 ${userWithContact}${anonBadge}${ipInfo} commented\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(truncated)}"`);
}

export function formatStoryNotification(
  story: StoryNotificationPayload
): string {
  const truncated = truncateWithCount(story.storyText, 200);
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  const signature = story.signature ? ` — ${escapeHtml(story.signature)}` : "";
  return clampMessage(`${PROJECT_HEADER}\n📖 ${userWithContact}${ipInfo} submitted story\n"${escapeHtml(truncated)}"${signature}`);
}

export function formatCommentEditNotification(
  comment: CommentEditNotificationPayload
): string {
  const oldTruncated = truncateWithCount(comment.oldText, 120);
  const newTruncated = truncateWithCount(comment.newText, 120);
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  const anonBadge = formatAnonymousTransition(comment.wasAnonymous, comment.isAnonymous);
  return clampMessage(`${PROJECT_HEADER}\n💬 ${userWithContact}${anonBadge}${ipInfo} edited comment\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(oldTruncated)}" → "${escapeHtml(newTruncated)}"`);
}

export function formatCommentDeleteNotification(
  comment: CommentDeleteNotificationPayload
): string {
  const truncated = truncateWithCount(comment.commentText, 120);
  const userWithContact = formatUserWithContact(comment.userName, comment.contact);
  const ipInfo = comment.ip ? ` from <code>${escapeHtml(comment.ip)}</code>` : "";
  return clampMessage(`${PROJECT_HEADER}\n🗑️ ${userWithContact}${ipInfo} deleted comment\non <a href="${SITE_URL}${escapeHtml(comment.pagePath)}">${escapeHtml(comment.pagePath)}</a>\n"${escapeHtml(truncated)}"`);
}

export function formatStoryEditNotification(
  story: StoryEditNotificationPayload
): string {
  const oldTruncated = truncateWithCount(story.oldText, 120);
  const newTruncated = truncateWithCount(story.newText, 120);
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  return clampMessage(`${PROJECT_HEADER}\n📖 ${userWithContact}${ipInfo} edited story\n"${escapeHtml(oldTruncated)}" → "${escapeHtml(newTruncated)}"`);
}

export function formatStoryDeleteNotification(
  story: StoryDeleteNotificationPayload
): string {
  const truncated = truncateWithCount(story.storyText, 120);
  const userWithContact = formatUserWithContact(story.userName, story.contact);
  const ipInfo = story.ip ? ` from <code>${escapeHtml(story.ip)}</code>` : "";
  return clampMessage(`${PROJECT_HEADER}\n🗑️ ${userWithContact}${ipInfo} deleted story\n"${escapeHtml(truncated)}"`);
}

export function formatOtpVerifiedNotification(
  auth: AuthOtpVerifiedPayload
): string {
  const userName = auth.userName || "User";
  const userWithContact = formatUserWithContact(userName, auth.contact);
  const newUserBadge = auth.isNewUser ? " 🆕" : "";
  const ipInfo = auth.ip ? ` from <code>${escapeHtml(auth.ip)}</code>` : "";
  return clampMessage(`${PROJECT_HEADER}\n✅ ${userWithContact}${newUserBadge} logged in${ipInfo}`);
}

export function formatLogoutNotification(auth: AuthLogoutPayload): string {
  const userWithContact = formatUserWithContact(auth.userName, auth.contact);
  const ipInfo = auth.ip ? ` from <code>${escapeHtml(auth.ip)}</code>` : "";
  return `${PROJECT_HEADER}\n🚪 ${userWithContact}${ipInfo} logged out`;
}