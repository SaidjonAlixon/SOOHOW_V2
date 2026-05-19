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

function getTelegramEnv() {
  const token = (process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN)?.trim();
  const chatId = (process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID)?.trim();
  return { token, chatId };
}

function humanizeTelegramError(description) {
  const d = String(description ?? "");
  if (d.includes("chat not found")) {
    return "Guruh topilmadi. Botni guruhga qo‘shing, guruhda xabar yozing, keyin to‘g‘ri TELEGRAM_CHAT_ID (-100...) qo‘ying. Shaxsiy chat ID ishlamaydi.";
  }
  if (d.includes("bot is not a member")) {
    return "Bot guruh a’zosi emas. Botni guruhga qo‘shing va admin qiling.";
  }
  if (d.includes("upgraded to a supergroup")) {
    return "Guruh supergroupga o‘tgan. Yangi chat_id oling (@RawDataBot yoki getUpdates).";
  }
  if (d.includes("Unauthorized")) {
    return "TELEGRAM_BOT_TOKEN noto‘g‘ri. BotFather dan yangi token oling.";
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
        "Telegram sozlanmagan. Vercelda TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID qo‘ying (VITE_ emas). Keyin Redeploy.",
    });
    return;
  }

  if (/^\d+$/.test(chatId)) {
    res.status(502).json({
      error:
        "TELEGRAM_CHAT_ID shaxsiy ID ko‘rinadi (faqat raqam). Guruh/superguruh ID kerak: -1001234567890 kabi. @RawDataBot ni guruhga qo‘shib ID oling.",
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
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const payload = await tgRes.json();

    if (!tgRes.ok || !payload.ok) {
      const message = humanizeTelegramError(payload.description);
      console.error("[telegram]", payload.description ?? payload);
      res.status(502).json({ error: message, detail: payload.description });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[telegram]", err);
    res.status(502).json({ error: "Failed to reach Telegram API" });
  }
};
