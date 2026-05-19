import { Router, type IRouter } from "express";

const router: IRouter = Router();

type FormType = "quote" | "contact";

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
    lines.push(`📋 Subject: ${data.subject ? String(data.subject) : data.product ? String(data.product) : "N/A"}`);
  } else {
    lines.push(`🔬 Product: ${data.product ? String(data.product) : "General Inquiry"}`);
    lines.push(`📦 Quantity: ${data.quantity ? String(data.quantity) : "N/A"}`);
  }

  lines.push(`💬 Message: ${data.message ? String(data.message) : "N/A"}`);
  lines.push("🌐 Source: soohowasia.uz");

  return lines.join("\n");
}

router.post("/telegram", async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(503).json({ error: "Telegram bot is not configured on the server" });
    return;
  }

  const { name, phone } = req.body ?? {};
  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required" });
    return;
  }

  const type: FormType = req.body?.type === "contact" ? "contact" : "quote";
  const text = formatMessage(req.body as Record<string, unknown>, type);

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const payload = (await tgRes.json()) as { ok?: boolean; description?: string };

    if (!tgRes.ok || !payload.ok) {
      res.status(502).json({
        error: payload.description ?? "Telegram API rejected the message",
      });
      return;
    }

    res.json({ ok: true });
  } catch {
    res.status(502).json({ error: "Failed to reach Telegram API" });
  }
});

export default router;
