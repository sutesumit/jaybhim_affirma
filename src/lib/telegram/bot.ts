import { Bot } from "grammy";

let botInstance: Bot | null = null;

export async function initBot(): Promise<Bot> {
  if (botInstance) {
    return botInstance;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN not configured");
  }

  botInstance = new Bot(token);
  await botInstance.init();

  return botInstance;
}
