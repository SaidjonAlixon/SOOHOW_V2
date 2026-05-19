/** @param {Record<string, unknown>} data @param {"quote"|"contact"} type */
function formatMessage(data, type) {
  const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
  const header =
    type === "contact"
      ? "📬 NEW CONTACT MESSAGE — SOOHOW CENTRAL ASIA"
      : "🏭 NEW QUOTE REQUEST — SOOHOW CENTRAL ASIA";

  const lines = [
    header,
    "",
    `📅 Date: ${date}`,
    `👤 Name: ${String(data.name ?? "")}`,
    `📞 Phone: ${String(data.phone ?? "")}`,
    `🏢 Company: ${data.company ? String(data.company) : "N/A"}`,
    `📧 Email: ${data.email ? String(data.email) : "N/A"}`,
  ];

  if (type === "contact") {
    lines.push(
      `📋 Subject: ${data.subject ? String(data.subject) : data.product ? String(data.product) : "N/A"}`,
    );
  } else {
    lines.push(`🔬 Product: ${data.product ? String(data.product) : "General Inquiry"}`);
    lines.push(`📦 Quantity: ${data.quantity ? String(data.quantity) : "N/A"}`);
  }

  lines.push(`💬 Message: ${data.message ? String(data.message) : "N/A"}`);
  lines.push("🌐 Source: soohowasia.uz");

  return lines.join("\n");
}

function parseBody(req) {
  let body = req.body ?? {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  return body;
}

function cleanEnv(value) {
  if (!value) return "";
  return value.trim().replace(/^["']|["']$/g, "");
}

function getTelegramEnv() {
  const token = cleanEnv(process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN);
  const chatId = cleanEnv(process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID);
  return { token, chatId };
}

async function callTelegram(token, method, body) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

function humanizeTelegramError(description, botUsername) {
  const d = String(description ?? "");
  const botHint = botUsername ? ` (@${botUsername})` : "";

  if (d.includes("chat not found")) {
    return `Guruh topilmadi${botHint}. 1) Shu botni guruhga qo'shing 2) Guruhda xabar yozing 3) getUpdates dan yangi "chat":{"id":-100...} oling 4) Vercel TELEGRAM_CHAT_ID ni yangilang va Redeploy`;
  }
  if (d.includes("bot is not a member")) {
    return `Bot${botHint} guruh a'zosi emas. Botni guruhga qo'shing.`;
  }
  if (d.includes("upgraded to a supergroup")) {
    return "Guruh supergroupga o'tgan. getUpdates dan YANGI chat id (-100...) oling.";
  }
  if (d.includes("Unauthorized")) {
    return "TELEGRAM_BOT_TOKEN noto'g'ri. BotFather dan tokenni qayta nusxalang.";
  }
  return d || "Telegram xabarni qabul qilmadi";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { token, chatId } = getTelegramEnv();

  if (!token || !chatId) {
    res.status(503).json({
      error:
        "Telegram sozlanmagan. Vercelda TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID qo'ying (VITE_ emas). Keyin Redeploy.",
    });
    return;
  }

  if (/^\d+$/.test(chatId)) {
    res.status(502).json({
      error:
        "TELEGRAM_CHAT_ID shaxsiy ID (faqat raqam). Guruh ID kerak: -1001234567890. @RawDataBot yordam beradi.",
    });
    return;
  }

  const body = parseBody(req);
  const { name, phone } = body;
  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required" });
    return;
  }

  const type = body.type === "contact" ? "contact" : "quote";
  const text = formatMessage(body, type);

  try {
    const me = await callTelegram(token, "getMe");
    const botUsername = me.ok ? me.result.username : null;

    const chat = await callTelegram(token, `getChat?chat_id=${encodeURIComponent(chatId)}`);
    if (!chat.ok) {
      console.error("[telegram] getChat failed", chat.description, { chatIdPrefix: chatId.slice(0, 12) });
      res.status(502).json({
        error: humanizeTelegramError(chat.description, botUsername),
        detail: chat.description,
        bot: botUsername ? `@${botUsername}` : undefined,
      });
      return;
    }

    const payload = await callTelegram(token, "sendMessage", {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });

    if (!payload.ok) {
      const message = humanizeTelegramError(payload.description, botUsername);
      console.error("[telegram] sendMessage failed", payload.description);
      res.status(502).json({ error: message, detail: payload.description });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[telegram]", err);
    res.status(502).json({ error: "Failed to reach Telegram API" });
  }
};
