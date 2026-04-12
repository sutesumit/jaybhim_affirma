# Telegram Notification System — Blueprint for New Projects

> **Purpose**: Self-contained reference guide for deploying a Telegram bot notification system for any new project.
> **Scope**: Same bot, new project — reuses existing `TELEGRAM_BOT_TOKEN`, webhook, and `initBot()` singleton.
> **Independence**: This document includes complete code and logic flows. No external file references required.

---

## 1. System Overview

### 1.1 Architecture

The system uses a single Telegram bot to serve multiple projects via the same `TELEGRAM_BOT_TOKEN`:

```
Client → API Route → Notifier → Bot Singleton → Telegram API
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
            Owner DM                             Channel
        (TELEGRAM_ALLOWED_USER_IDS)       (TELEGRAM_CHANNEL_ID)
```

### 1.2 Notification Channels

| Channel | Env Var | Use Case |
|---------|---------|----------|
| Owner DM | `TELEGRAM_ALLOWED_USER_IDS` | Visitor alerts, view/clap action alerts |
| Channel broadcast | `TELEGRAM_CHANNEL_ID` | Content publication announcements |

### 1.3 Notification Types

| Type | Direction | Payload | Format |
|------|-----------|---------|--------|
| Visitor | Owner DM | IP, location, device, referrer, visit count | `"👤 returning (N) 📍 City, Country 💻 Device 🌐 IP 🔗 referrer"` |
| View increment | Owner DM | IP, content type, ID, title, total | `"ip X viewed | bloq | my-post | Title | total 42"` |
| Clap increment | Owner DM | IP, content type, ID, title, total | `"ip X clapped | blip | term | meaning | total 10"` |
| Byte created | Channel | Serial, content | `"🤖: content here"` |
| Blip created | Channel | Serial, term: meaning | `"🤖: term: meaning here"` |
| Bloq published | Channel | Title, slug, tags | `"📝 Title\nRead more | Tag1, Tag2"` |

---

## 2. File Structure

Create this structure for the notifications library:

```
src/
├── lib/
│   ├── notifications/
│   │   ├── types.ts           # Interfaces and payload types
│   │   ├── telegram-notifier.ts # Implementation
│   │   ├── formatters.ts      # Message formatting
│   │   └── content-summary.ts # Content resolution
│   └── telegram/
│       ├── bot.ts             # Bot singleton
│       └── middleware/
│           └── auth.ts         # User authorization
├── app/api/
│   ├── visit/route.ts         # Visit tracking
│   ├── views/route.ts         # View counter
│   ├── claps/[type]/[id]/route.ts # Clap counter
│   └── telegram/
│       ├── webhook/route.ts   # Webhook handler
│       └── broadcast/route.ts  # Content broadcast
└── hooks/
    └── useAnalytics.ts        # Client-side collection
```

---

## 3. Types and Interfaces

### 3.1 Notification Types (`src/lib/notifications/types.ts`)

```typescript
import type { Blip } from "@/types/blip";
import type { Byte } from "@/types/byte";

export type VisitorNotificationPayload = {
  city?: string;
  country?: string;
  region?: string;
  ip?: string;
  deviceType?: string;
  isReturning?: boolean;
  visitCount?: number;
  timestamp?: string;
};

export type BloqNotificationPayload = {
  title: string;
  slug: string;
  tags?: string[];
};

export type CounterNotificationContentType = "bloq" | "blip" | "byte" | "project";

export type CounterNotificationPayload = {
  contentType: CounterNotificationContentType;
  contentId: string;
  displayId?: string | null;
  title: string | null;
  total: number;
  ip?: string | null;
};

export interface TelegramNotifier {
  notifyByteCreated(byte: Byte): Promise<void>;
  notifyBlipCreated(blip: Blip): Promise<void>;
  notifyVisitor(visitor: VisitorNotificationPayload, referrer?: string): Promise<void>;
  notifyBloqPublished(bloq: BloqNotificationPayload): Promise<void>;
  notifyViewIncrement(counter: CounterNotificationPayload): Promise<void>;
  notifyClapIncrement(counter: CounterNotificationPayload): Promise<void>;
}

export const noopTelegramNotifier: TelegramNotifier = {
  async notifyByteCreated(): Promise<void> {},
  async notifyBlipCreated(): Promise<void> {},
  async notifyVisitor(): Promise<void> {},
  async notifyBloqPublished(): Promise<void> {},
  async notifyViewIncrement(): Promise<void> {},
  async notifyClapIncrement(): Promise<void> {},
};
```

### 3.2 Visit Types (`src/lib/visit/types.ts`)

```typescript
export type VisitRequestPayload = {
  ip: string;
  referrer?: string;
};

export type VisitSummary = {
  lastVisitorLocation: string | null;
  lastVisitTime: string | null;
  visitorCount: number;
};

export interface VisitRepository {
  upsertVisitorState(payload: VisitRequestPayload): Promise<{
    ip: string;
    city: string | null;
    country: string | null;
    region: string | null;
    visitCount: number;
    lastVisitTime: string;
  }>;
  getMostRecentVisitor(ip: string): Promise<{
    city: string | null;
    country: string | null;
    lastVisitTime: string;
  } | null>;
  countUniqueVisitors(): Promise<number>;
}
```

---

## 4. Message Formatting

### 4.1 Formatters (`src/lib/notifications/formatters.ts`)

```typescript
import type { Blip } from "@/types/blip";
import type { Byte } from "@/types/byte";
import type {
  BloqNotificationPayload,
  CounterNotificationPayload,
  VisitorNotificationPayload,
} from "./types";

const SITE_URL = "https://www.sumitsute.com";
const PROJECT_HEADER = "🌐 sumitsute.com | Dev Diary";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatByteChannelMessage(byte: Byte): string {
  return `🤖: <a href="${SITE_URL}/byte/${encodeURIComponent(byte.byte_serial)}">${escapeHtml(byte.content)}</a>`;
}

export function formatBlipChannelMessage(blip: Blip): string {
  const content = `${blip.term}: ${blip.meaning}`;
  return `🤖: <a href="${SITE_URL}/blip/${encodeURIComponent(blip.blip_serial)}">${escapeHtml(content)}</a>`;
}

export function formatBloqChannelMessage(bloq: BloqNotificationPayload): string {
  const safeTags = bloq.tags && bloq.tags.length > 0
    ? `\nTags: ${bloq.tags.map((tag) => escapeHtml(tag)).join(", ")}`
    : "";

  return `📝 <b>${escapeHtml(bloq.title)}</b>\n<a href="${SITE_URL}/bloq/${encodeURIComponent(bloq.slug)}">Read more</a>${safeTags}`;
}

export function formatVisitorNotification(
  visitor: VisitorNotificationPayload,
  referrer?: string
): string {
  const locationParts = [visitor.city, visitor.region, visitor.country].filter(Boolean);
  const location = locationParts.length > 0
    ? locationParts.map((part) => escapeHtml(part!)).join(", ")
    : "Unknown location";
  const source = referrer ? escapeHtml(referrer) : "direct";
  const returning = visitor.isReturning ? "👋 returning" : "✨ new";
  const count = visitor.visitCount ? ` (${visitor.visitCount})` : "";
  const device = escapeHtml(visitor.deviceType || "Unknown");
  const ip = escapeHtml(visitor.ip || "Unknown IP");

  return `${PROJECT_HEADER}\n👤 <b>${returning}${count}</b>\n📍 ${location}\n💻 ${device}\n🌐 <code>${ip}</code>\n🔗 ${source}`;
}

function formatCounterNotificationLine(
  eventType: "view" | "clap",
  counter: CounterNotificationPayload
): string {
  const parts = [
    counter.ip
      ? `ip ${escapeHtml(counter.ip)} ${eventType === "view" ? "viewed" : "clapped"}`
      : `a visitor ${eventType === "view" ? "viewed" : "clapped"}`,
    escapeHtml(counter.contentType),
  ];

  const displayId = counter.displayId?.trim();
  if (displayId) {
    parts.push(escapeHtml(displayId));
  }

  if (counter.title) {
    parts.push(escapeHtml(counter.title));
  }

  parts.push(`total ${escapeHtml(counter.total.toString())}`);
  return parts.join(" | ");
}

export function formatViewIncrementNotification(counter: CounterNotificationPayload): string {
  return `${PROJECT_HEADER}\n${formatCounterNotificationLine("view", counter)}`;
}

export function formatClapIncrementNotification(counter: CounterNotificationPayload): string {
  return `${PROJECT_HEADER}\n${formatCounterNotificationLine("clap", counter)}`;
}
```

---

## 5. Content Summary Resolution

### 5.1 Content Summary (`src/lib/notifications/content-summary.ts`)

```typescript
import { projects } from "@/data";
import { getBlipByIdentifier } from "@/lib/blip";
import { getBloqPostBySlug } from "@/lib/bloq";
import { getByteByIdentifier } from "@/lib/byte";
import type { CounterNotificationContentType } from "@/lib/notifications/types";

const BYTE_TITLE_LIMIT = 48;

export type NotificationContentSummary = {
  contentType: CounterNotificationContentType;
  contentId: string;
  displayId: string;
  title: string | null;
};

function truncateTitle(value: string, limit: number): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length <= limit) {
    return normalized;
  }
  return `${normalized.slice(0, limit - 3).trimEnd()}...`;
}

export async function resolveNotificationContentSummary(
  contentType: CounterNotificationContentType,
  contentId: string
): Promise<NotificationContentSummary> {
  if (contentType === "bloq") {
    const post = getBloqPostBySlug(contentId);
    return {
      contentType,
      contentId,
      displayId: "",
      title: post?.title ?? null,
    };
  }

  if (contentType === "blip") {
    const blip = await getBlipByIdentifier(contentId);
    return {
      contentType,
      contentId,
      displayId: blip?.blip_serial ?? contentId,
      title: blip?.term ?? null,
    };
  }

  if (contentType === "byte") {
    const byte = await getByteByIdentifier(contentId);
    return {
      contentType,
      contentId,
      displayId: byte?.byte_serial ?? contentId,
      title: byte ? truncateTitle(byte.content, BYTE_TITLE_LIMIT) : null,
    };
  }

  const project = projects.find((entry) => entry.slug === contentId);
  return {
    contentType,
    contentId,
    displayId: "",
    title: project?.title ?? null,
  };
}
```

---

## 6. Bot Singleton

### 6.1 Bot Initialization (`src/lib/telegram/bot.ts`)

```typescript
import { Bot, Context } from "grammy";
import { handleStart, handleByte, handleBlip, handleList, handleGet, handleEdit, handleDel, handleMessage } from './commands/handlers';

type MyContext = Context;

let botInstance: Bot<MyContext> | null = null;

const BOT_COMMANDS = [
  { command: "start", description: "Show help" },
  { command: "byte", description: "Create a byte (short thought)" },
  { command: "blip", description: "Create a blip (term:meaning)" },
  { command: "list", description: "List bytes or blips" },
  { command: "get", description: "Get a byte or blip" },
  { command: "edit", description: "Edit a byte or blip" },
  { command: "del", description: "Delete a byte or blip" },
] as const;

export { BOT_COMMANDS };

export async function initBot(): Promise<Bot<MyContext>> {
  if (botInstance) {
    return botInstance;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN not configured");
  }

  botInstance = new Bot<MyContext>(token);
  await botInstance.init();

  botInstance.command("start", handleStart);
  botInstance.command("byte", (ctx) => handleByte(ctx, botInstance!));
  botInstance.command("blip", (ctx) => handleBlip(ctx, botInstance!));
  botInstance.command("list", handleList);
  botInstance.command("get", handleGet);
  botInstance.command("edit", handleEdit);
  botInstance.command("del", handleDel);
  botInstance.on("message", (ctx) => handleMessage(ctx, botInstance!));

  return botInstance;
}
```

**Key**: `await botInstance.init()` must be called before using the bot. The singleton pattern prevents duplicate handlers on hot reload.

### 6.2 Authorization Middleware (`src/lib/telegram/middleware/auth.ts`)

```typescript
export function getAllowedUserIds(): number[] {
  const ids = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (!ids) return [];
  return ids.split(",").map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
}

export function isAllowed(userId: number): boolean {
  return getAllowedUserIds().includes(userId);
}
```

---

## 7. Notifier Implementation

### 7.1 Telegram Notifier (`src/lib/notifications/telegram-notifier.ts`)

```typescript
import type { Blip } from "@/types/blip";
import type { Byte } from "@/types/byte";
import {
  formatClapIncrementNotification,
  formatBlipChannelMessage,
  formatBloqChannelMessage,
  formatByteChannelMessage,
  formatViewIncrementNotification,
  formatVisitorNotification,
} from "./formatters";
import type {
  BloqNotificationPayload,
  CounterNotificationPayload,
  TelegramNotifier,
  VisitorNotificationPayload,
} from "./types";

async function sendMessage(chatId: string, message: string): Promise<void> {
  const { initBot } = await import("@/lib/telegram/bot");
  const bot = await initBot();
  await bot.api.sendMessage(chatId, message, { parse_mode: "HTML" });
}

function getOwnerChatId(): string | null {
  const allowedUserIds = process.env.TELEGRAM_ALLOWED_USER_IDS;
  if (!allowedUserIds) return null;
  return allowedUserIds.split(",")[0]?.trim() || null;
}

function getChannelId(): string | null {
  return process.env.TELEGRAM_CHANNEL_ID || null;
}

export class TelegramBotNotifier implements TelegramNotifier {
  async notifyByteCreated(byte: Byte): Promise<void> {
    const channelId = getChannelId();
    if (!channelId) return;
    await sendMessage(channelId, formatByteChannelMessage(byte));
  }

  async notifyBlipCreated(blip: Blip): Promise<void> {
    const channelId = getChannelId();
    if (!channelId) return;
    await sendMessage(channelId, formatBlipChannelMessage(blip));
  }

  async notifyVisitor(visitor: VisitorNotificationPayload, referrer?: string): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatVisitorNotification(visitor, referrer));
  }

  async notifyBloqPublished(bloq: BloqNotificationPayload): Promise<void> {
    const channelId = getChannelId();
    if (!channelId) return;
    await sendMessage(channelId, formatBloqChannelMessage(bloq));
  }

  async notifyViewIncrement(counter: CounterNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatViewIncrementNotification(counter));
  }

  async notifyClapIncrement(counter: CounterNotificationPayload): Promise<void> {
    const ownerChatId = getOwnerChatId();
    if (!ownerChatId) return;
    await sendMessage(ownerChatId, formatClapIncrementNotification(counter));
  }
}

export const telegramNotifier = new TelegramBotNotifier();
```

**Critical**: The lazy `await import("@/lib/telegram/bot")` inside `sendMessage()` breaks the circular dependency between the notifier and the bot.

---

## 8. Visit Service with DI

### 8.1 Visit Service (`src/lib/visit/service.ts`)

```typescript
import type { TelegramNotifier } from "@/lib/notifications/types";
import { noopTelegramNotifier } from "@/lib/notifications/types";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";
import { createSupabaseVisitRepository } from "./repository";
import type { VisitRepository, VisitRequestPayload, VisitSummary } from "./types";

export function parseDeviceType(userAgent: string | null): string {
  if (!userAgent) return "Unknown";

  const ua = userAgent.toLowerCase();

  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("macintosh") || ua.includes("mac os x")) return "Mac";

  if (ua.includes("android")) {
    if (ua.includes("tablet") || ua.includes("tab")) return "Android Tablet";
    return "Android";
  }

  if (ua.includes("windows")) return "Windows";
  if (ua.includes("linux")) return "Linux";
  if (ua.includes("cros") || ua.includes("chromebook")) return "Chromebook";
  if (ua.includes("mobile")) return "Mobile";

  return "Desktop";
}

function formatVisitorLocation(city: string | null, country: string | null): string | null {
  const parts = [city, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

export function createVisitService(deps?: {
  repository?: VisitRepository;
  notifier?: TelegramNotifier;
  now?: () => Date;
}) {
  const repository = deps?.repository ?? createSupabaseVisitRepository();
  const notifier = deps?.notifier ?? noopTelegramNotifier;
  const now = deps?.now ?? (() => new Date());

  return {
    async trackVisit(body: VisitRequestPayload, userAgent: string | null): Promise<VisitSummary> {
      const deviceType = parseDeviceType(userAgent);

      if (body.ip) {
        const visitorState = await repository.upsertVisitorState(body);
        const timestamp = now().toISOString();

        // Fire-and-forget notification
        void notifier.notifyVisitor(
          {
            city: visitorState.city ?? undefined,
            country: visitorState.country ?? undefined,
            region: visitorState.region ?? undefined,
            ip: visitorState.ip,
            deviceType,
            isReturning: visitorState.visitCount > 1,
            visitCount: visitorState.visitCount,
            timestamp,
          },
          body.referrer
        ).catch((error: unknown) => {
          console.error("Visitor notification error:", error);
        });
      }

      const [lastVisitor, uniqueCount] = await Promise.all([
        repository.getMostRecentVisitor(body.ip),
        repository.countUniqueVisitors(),
      ]);

      return {
        lastVisitorLocation: lastVisitor
          ? formatVisitorLocation(lastVisitor.city, lastVisitor.country)
          : null,
        lastVisitTime: lastVisitor?.lastVisitTime ?? null,
        visitorCount: uniqueCount,
      };
    },
  };
}

export const visitService = createVisitService({
  repository: createSupabaseVisitRepository(),
  notifier: telegramNotifier,
});
```

---

## 9. API Route Wiring

### 9.1 Visit Tracking Route (`src/app/api/visit/route.ts`)

```typescript
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServerClient";
import { createVisitService } from "@/lib/visit/service";
import { createSupabaseVisitRepository } from "@/lib/visit/repository";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";

const supabase = getSupabaseServerClient();
const visitService = createVisitService({
  repository: createSupabaseVisitRepository(supabase),
  notifier: telegramNotifier,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userAgent = request.headers.get("user-agent");

    const result = await visitService.trackVisit(body, userAgent);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Visit tracking error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### 9.2 View Counter Route (`src/app/api/views/route.ts`)

```typescript
import { NextResponse } from "next/server";
import { resolveNotificationContentSummary } from "@/lib/notifications/content-summary";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";
import { getSupabaseServerClient } from "@/lib/supabaseServerClient";

const VALID_CONTENT_TYPES = ['bloq', 'blip', 'byte', 'project'] as const;
type ContentType = typeof VALID_CONTENT_TYPES[number];

const noStoreHeaders = { 'Cache-Control': 'no-store' };

function isValidContentType(type: string): type is ContentType {
  return VALID_CONTENT_TYPES.includes(type as ContentType);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (!type || !id || !isValidContentType(type)) {
    return NextResponse.json({ error: 'Invalid type or missing id' }, { status: 400, headers: noStoreHeaders });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.rpc('get_content_view', {
      p_content_type: type,
      p_identifier: id
    });

    if (error) throw error;
    return NextResponse.json({ views: data ?? 0 }, { status: 200, headers: noStoreHeaders });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: noStoreHeaders }
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (!type || !id || !isValidContentType(type)) {
    return NextResponse.json({ error: 'Invalid type or missing id' }, { status: 400, headers: noStoreHeaders });
  }

  try {
    const body = await request.json().catch(() => null);
    const ip = typeof body?.ip === 'string' ? body.ip : null;
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.rpc('increment_content_view', {
      p_content_type: type,
      p_identifier: id
    });

    if (error) throw error;
    const views = typeof data === 'number' ? data : 0;

    // Fire-and-forget notification
    void resolveNotificationContentSummary(type, id)
      .then((summary) => telegramNotifier.notifyViewIncrement({
        ...summary,
        ip,
        total: views,
      }))
      .catch((error: unknown) => {
        console.error('View notification error:', error);
      });

    return NextResponse.json({ views }, { status: 200, headers: noStoreHeaders });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: noStoreHeaders }
    );
  }
}
```

### 9.3 Clap Counter Route (`src/app/api/claps/[type]/[id]/route.ts`)

```typescript
import { getSupabaseServerClient } from "@/lib/supabaseServerClient";
import { getBloqPostBySlug } from "@/lib/bloq";
import { resolveNotificationContentSummary } from "@/lib/notifications/content-summary";
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";

interface RouteParams {
  params: Promise<{ type: string; id: string }>
}

const VALID_POST_TYPES = ['bloq', 'blip', 'byte', 'project'] as const;
type PostType = typeof VALID_POST_TYPES[number];

function validatePostType(type: string): type is PostType {
  return VALID_POST_TYPES.includes(type as PostType);
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { type, id } = await params;

    if (!validatePostType(type)) {
      return Response.json({ error: "Invalid post type" }, { status: 400 });
    }

    if (type === 'bloq') {
      const post = getBloqPostBySlug(id);
      if (!post) return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const fingerprint = body.fingerprint;
    const ip = typeof body.ip === "string" ? body.ip : null;

    if (!fingerprint || typeof fingerprint !== 'string') {
      return Response.json({ error: "Fingerprint required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.rpc("upsert_clap", {
      p_post_type: type,
      p_post_id: id,
      p_fingerprint: fingerprint,
      p_increment: 1
    });

    if (error) throw error;

    // Fire-and-forget notification
    void resolveNotificationContentSummary(type, id)
      .then((summary) => telegramNotifier.notifyClapIncrement({
        ...summary,
        ip,
        total: data.total_claps,
      }))
      .catch((error: unknown) => {
        console.error("Clap notification error:", error);
      });

    return Response.json({
      userClaps: data.user_claps,
      totalClaps: data.total_claps,
      maxReached: data.max_reached
    });
  } catch (error: unknown) {
    console.error("Error incrementing clap count", error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: RouteParams) {
  // Implementation for getting clap count
}
```

---

## 10. Webhook & Broadcast Endpoints

### 10.1 Webhook Route (`src/app/api/telegram/webhook/route.ts`)

```typescript
import { NextResponse } from "next/server";
import { initBot } from "@/lib/telegram-bot";
import type { Update } from "grammy/types";
import crypto from "crypto";

const noStoreHeaders = { 'Cache-Control': 'no-store' };

function verifyWebhookSecret(authHeader: string | null): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("TELEGRAM_WEBHOOK_SECRET not configured");
    return false;
  }
  if (!authHeader) return false;

  const expected = crypto.createHash("sha256").update(secret).digest("hex");
  return authHeader === expected;
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("X-Telegram-Bot-Api-Secret-Token");

  if (!verifyWebhookSecret(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const bot = await initBot();
    const update: Update = await req.json();
    await bot.handleUpdate(update);

    return NextResponse.json({ ok: true }, { status: 200, headers: noStoreHeaders });
  } catch (error: unknown) {
    console.error("Error in telegram webhook:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500, headers: noStoreHeaders });
  }
}
```

### 10.2 Broadcast Route (`src/app/api/telegram/broadcast/route.ts`)

```typescript
import { NextResponse } from "next/server";
import { createBloqNotificationService } from "@/lib/bloq/service";
import { contentMutationEffects } from "@/lib/content-publish";

const noStoreHeaders = { "Cache-Control": "no-store" };
const bloqNotificationService = createBloqNotificationService(contentMutationEffects);

function validateBroadcastSecret(authHeader: string | null): boolean {
  const secret = process.env.TELEGRAM_BROADCAST_SECRET || process.env.TELEGRAM_BOT_TOKEN;
  if (!secret || !authHeader) return false;
  return authHeader === secret;
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("X-Broadcast-Secret");

  if (!validateBroadcastSecret(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = await req.json();
    const { type, title, slug, tags } = body;

    if (type !== "bloq") {
      return NextResponse.json({ error: "Unsupported broadcast type" }, { status: 400, headers: noStoreHeaders });
    }

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
        ? tags.split(",").map((tag: string) => tag.trim()).filter(Boolean)
        : [];

    await bloqNotificationService.notifyBloqPublished({
      title,
      slug,
      tags: parsedTags,
    });

    return NextResponse.json({ ok: true, broadcast: true }, { status: 200, headers: noStoreHeaders });
  } catch (error: unknown) {
    console.error("Broadcast error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: noStoreHeaders }
    );
  }
}
```

**Security Note**: The broadcast route falls back to `TELEGRAM_BOT_TOKEN` when `TELEGRAM_BROADCAST_SECRET` is absent. This should be flagged as a security concern — always set `TELEGRAM_BROADCAST_SECRET`.

---

## 11. Content Publish Effects (Optional)

### 11.1 Telegram Effect (`src/lib/content-publish/telegram-effect.ts`)

```typescript
import type { ContentMutationEffect, ContentMutationEvent } from "./types";
import type { TelegramNotifier } from "@/lib/notifications/types";

export function createTelegramMutationEffect(
  notifier: TelegramNotifier
): ContentMutationEffect {
  return {
    async onMutation(event: ContentMutationEvent): Promise<void> {
      if (event.action !== "published") {
        return;
      }

      if (event.type === "byte") {
        await notifier.notifyByteCreated(event.byte);
        return;
      }

      if (event.type === "blip") {
        await notifier.notifyBlipCreated(event.blip);
        return;
      }

      await notifier.notifyBloqPublished(event.bloq);
    },
  };
}
```

### 11.2 Effect Composition (`src/lib/content-publish/index.ts`)

```typescript
import { telegramNotifier } from "@/lib/notifications/telegram-notifier";
import { composeContentMutationEffects } from "./effects";
import { homepageMutationEffect } from "./homepage-effect";
import { createTelegramMutationEffect } from "./telegram-effect";

export type { ContentMutationEffect, ContentMutationEvent } from "./types";
export { noopContentMutationEffect } from "./types";
export { composeContentMutationEffects } from "./effects";
export { createTelegramMutationEffect } from "./telegram-effect";
export { homepageMutationEffect } from "./homepage-effect";

export const contentMutationEffects = composeContentMutationEffects([
  createTelegramMutationEffect(telegramNotifier),
  homepageMutationEffect,
]);
```

---

## 12. Client-Side Analytics Hook

### 12.1 UseAnalytics (`src/hooks/useAnalytics.ts`)

```typescript
import { useEffect, useRef } from "react";

export function useAnalytics() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    async function collectAndTrack() {
      try {
        const { ip, city, region, country } = await fetch("https://ipapi.co/json/")
          .then(res => res.json())
          .catch(() => ({ ip: null, city: null, region: null, country: null }));

        if (ip) {
          await fetch("/api/visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ip,
              referrer: document.referrer || undefined,
            }),
          });
        }
      } catch (error) {
        console.error("Analytics error:", error);
      }
    }

    collectAndTrack();
  }, []);
}
```

---

## 13. Environment Variables Reference

### 13.1 Required (Shared)

| Variable | Description | Example |
|----------|-------------|---------|
| `TELEGRAM_BOT_TOKEN` | Bot API token from @BotFather | `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` |
| `TELEGRAM_ALLOWED_USER_IDS` | Comma-separated user IDs for owner DMs | `123456789,987654321` |
| `TELEGRAM_WEBHOOK_SECRET` | Secret for webhook verification (generate with `openssl rand -hex 32`) | `a1b2c3d4...` |
| `TELEGRAM_PROD_WEBHOOK_URL` | Production webhook URL | `https://your-domain.com/api/telegram/webhook` |

### 13.2 Optional (Project-Specific)

| Variable | Description | Example |
|----------|-------------|---------|
| `TELEGRAM_CHANNEL_ID` | Channel ID for broadcasts | `-1001234567890` |
| `TELEGRAM_BROADCAST_SECRET` | Secret for broadcast endpoint (required for production) | `broadcast-secret...` |

### 13.3 Never Commit

- `.env.local` — contains live secrets
- Any file with `TELEGRAM_BOT_TOKEN` or `TELEGRAM_ALLOWED_USER_IDS`

---

## 14. Replication Checklist

Complete these steps to add a new project to the same bot:

### Step 1: Define Project Constants

Edit `src/lib/notifications/formatters.ts`:

```typescript
const SITE_URL = "https://your-new-project.com";
const PROJECT_HEADER = "🌐 Your Project Name";
```

### Step 2: Extend Types (if needed)

Add new notification types in `src/lib/notifications/types.ts`:

```typescript
export interface TelegramNotifier {
  // existing methods...
  notifyNewFeatureCreated(feature: Feature): Promise<void>;
}
```

### Step 3: Implement Methods

Add implementations in `src/lib/notifications/telegram-notifier.ts`:

```typescript
async notifyNewFeatureCreated(feature: Feature): Promise<void> {
  const channelId = getChannelId();
  if (!channelId) return;
  await sendMessage(channelId, formatFeatureChannelMessage(feature));
}
```

### Step 4: Add Formatter

In `src/lib/notifications/formatters.ts`:

```typescript
export function formatFeatureChannelMessage(feature: Feature): string {
  return `✨ <b>${escapeHtml(feature.title)}</b>\n<a href="${SITE_URL}/feature/${feature.id}">View</a>`;
}
```

### Step 5: Wire API Route

In your new route, use fire-and-forget pattern:

```typescript
void notifier.notifyNewFeatureCreated(feature)
  .catch((error: unknown) => console.error("Notification error:", error));
```

### Step 6: (Optional) Set up Visit Tracking

Use the visit service DI pattern in `src/lib/visit/service.ts` or create a new service.

---

## 15. Key Gotchas Reference

| Issue | Solution |
|-------|---------|
| Circular dependency between notifier and bot | Use lazy `await import("@/lib/telegram/bot")` inside `sendMessage()` |
| Unhandled promise warnings | Use `void` keyword for fire-and-forget: `void notifier.method().catch()` |
| Notifications blocking API response | Never await — always use fire-and-forget pattern |
| Telegram HTML parse errors | Always escape user-generated content: `escapeHtml(value)` |
| Duplicate handlers on hot reload | Use singleton `initBot()` — never create multiple Bot instances |
| Grammy initialization errors | Call `await bot.init()` before `handleUpdate()` or `sendMessage()` |
| Secrets in logs | Never log `TELEGRAM_ALLOWED_USER_IDS`, chat IDs, or visitor payloads |
| Broadcast auth fallback | Never leave `TELEGRAM_BROADCAST_SECRET` unset in production |

---

## 16. Database Schema (Supabase)

### 16.1 Visitor Tracking Table

```sql
CREATE TABLE visitors (
  id BIGSERIAL PRIMARY KEY,
  ip inet NOT NULL,
  city text,
  region text,
  country text,
  visit_count integer DEFAULT 1,
  last_visit_time timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_visitors_ip ON visitors(ip);

-- RPC for upsert with increment
CREATE OR REPLACE FUNCTION upsert_visit_state(p_ip inet)
RETURNS TABLE(
  ip inet,
  city text,
  region text,
  country text,
  visit_count integer,
  last_visit_time timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO visitors (ip, visit_count)
  VALUES (p_ip, 1)
  ON CONFLICT (ip) DO UPDATE SET
    visit_count = visitors.visit_count + 1,
    last_visit_time = now()
  RETURNING ip, city, region, country, visit_count, last_visit_time;
END;
$$;
```

### 16.2 Views and Claps Tables

```sql
-- Views table
CREATE TABLE content_views (
  id BIGSERIAL PRIMARY KEY,
  content_type text NOT NULL,
  identifier text NOT NULL,
  view_count bigint DEFAULT 0,
  UNIQUE(content_type, identifier)
);

-- Claps table
CREATE TABLE content_claps (
  id BIGSERIAL PRIMARY KEY,
  post_type text NOT NULL,
  post_id text NOT NULL,
  fingerprint text NOT NULL,
  clap_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_type, post_id, fingerprint)
);

-- RPCs for incrementing
CREATE OR REPLACE FUNCTION increment_content_view(
  p_content_type text,
  p_identifier text
)
RETURNS bigint
LANGUAGE plpgsql
AS $$
DECLARE
  new_count bigint;
BEGIN
  INSERT INTO content_views (content_type, identifier, view_count)
  VALUES (p_content_type, p_identifier, 1)
  ON CONFLICT (content_type, identifier) DO UPDATE SET
    view_count = content_views.view_count + 1
  RETURNING view_count INTO new_count;
  RETURN new_count;
END;
$$;
```

---

## Summary

This blueprint provides everything needed to replicate the notification system:

1. **Types** — Notification payload interfaces in Section 3
2. **Formatters** — Message formatting with `PROJECT_HEADER` and `escapeHtml()` in Section 4
3. **Notifier Implementation** — Complete `TelegramBotNotifier` class in Section 7
4. **Bot Singleton** — Lazy init with Grammy in Section 6
5. **API Routes** — Fire-and-forget wiring in Section 9
6. **Security** — Webhook SHA-256 auth in Section 10
7. **Environment Variables** — Complete list in Section 13

To deploy for a new project, copy the relevant sections, update `SITE_URL` and `PROJECT_HEADER`, and wire into your API routes.