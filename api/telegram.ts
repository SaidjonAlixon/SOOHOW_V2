type FormType = "quote" | "contact";

interface VercelRequest {
  method?: string;
  body?: Record<string, unknown>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  end: () => void;
}

function formatMessage(data: Record<string, unknown>, type: FormType): string {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(503).json({ error: "Telegram bot is not configured on the server" });
    return;
  }

  const body = req.body ?? {};
  const { name, phone } = body;
  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required" });
    return;
  }

  const type: FormType = body.type === "contact" ? "contact" : "quote";
  const text = formatMessage(body, type);

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });

    const payload = (await tgRes.json()) as { ok?: boolean; description?: string };

    if (!tgRes.ok || !payload.ok) {
      res.status(502).json({
        error: payload.description ?? "Telegram API rejected the message",
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "Failed to reach Telegram API" });
  }
}
