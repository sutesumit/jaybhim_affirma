export function getOwnerChatId(): string | null {
  const allowedUserIds = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (!allowedUserIds) return null;
  return allowedUserIds.split(",")[0]?.trim() || null;
}
