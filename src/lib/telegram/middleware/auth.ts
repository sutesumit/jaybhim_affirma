export function getAllowedUserIds(): number[] {
  const ids = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (!ids) return [];
  return ids
    .split(",")
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));
}

export function isAllowed(userId: number): boolean {
  return getAllowedUserIds().includes(userId);
}

export function getOwnerChatId(): string | null {
  const allowedUserIds = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (!allowedUserIds) return null;
  return allowedUserIds.split(",")[0]?.trim() || null;
}
