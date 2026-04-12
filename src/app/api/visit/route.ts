import { NextResponse } from "next/server";
import { createVisitService } from "@/lib/visit/service";
import { createSupabaseVisitRepository } from "@/lib/visit/repository";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";
import { AuthManager } from "@/lib/auth/auth-manager";

const visitService = createVisitService({
  repository: createSupabaseVisitRepository(),
  notifier: telegramNotifier,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userAgent = request.headers.get("user-agent");
    const serverIp = request.headers.get("x-forwarded-for") ?? undefined;
    const clientIp = body.ip as string | undefined;
    const clientCity = body.city as string | undefined;
    const clientRegion = body.region as string | undefined;
    const clientCountry = body.country as string | undefined;
    const clientReferrer = body.referrer as string | undefined;

    const parsedServerIp = serverIp?.split(",")[0]?.trim();
    const isLocalhost = parsedServerIp?.startsWith("127.") || parsedServerIp === "::ffff:127.0.0.1" || parsedServerIp === "::1";
    const ip = !isLocalhost && parsedServerIp ? parsedServerIp : clientIp;

    const authUser = await AuthManager.getAuthenticatedUser();
    const userName = authUser?.display_name ?? undefined;
    const contact = authUser?.phone || authUser?.email || undefined;

    const result = await visitService.trackVisit(
      { ip: ip ?? "", city: clientCity, region: clientRegion, country: clientCountry },
      userAgent,
      clientReferrer,
      { userName, contact }
    );

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Visit tracking error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
