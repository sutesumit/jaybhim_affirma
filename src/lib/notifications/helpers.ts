type AuthUser = {
  phone?: string | null;
  email?: string | null;
  display_name?: string | null;
} | null;

export function extractRequestContext(request: Request, user?: AuthUser) {
  const serverIp = request.headers.get("x-forwarded-for") ?? undefined;
  const parsedIp = serverIp?.split(",")[0]?.trim();
  const isLocalhost =
    parsedIp?.startsWith("127.") ||
    parsedIp === "::ffff:127.0.0.1" ||
    parsedIp === "::1";
  return {
    ip: isLocalhost ? null : (parsedIp ?? null),
    contact: user?.phone || user?.email || null,
    userName: user?.display_name ?? undefined,
  };
}
