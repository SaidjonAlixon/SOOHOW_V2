/**
 * Telegram sozlamalarini tekshirish:
 * TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=-100... node scripts/verify-telegram.mjs
 */

const token = (process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || "")
  .trim()
  .replace(/^["']|["']$/g, "");
const chatId = (process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || "")
  .trim()
  .replace(/^["']|["']$/g, "");

if (!token || !chatId) {
  console.error("TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID kerak");
  process.exit(1);
}

async function api(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

const me = await api("getMe");
console.log("Bot:", me.ok ? `@${me.result.username}` : me.description);

const chat = await api(`getChat?chat_id=${encodeURIComponent(chatId)}`);
console.log("Chat:", chat.ok ? chat.result.title || chat.result.username : chat.description);

if (chat.ok) {
  const test = await api("sendMessage", {
    chat_id: chatId,
    text: "✅ SOOHOW test — Telegram ishlayapti",
  });
  console.log("Test xabar:", test.ok ? "yuborildi" : test.description);
}
