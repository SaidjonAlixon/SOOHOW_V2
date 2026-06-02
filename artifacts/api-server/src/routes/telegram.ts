import { Router, type IRouter } from "express";
import fs from "node:fs";
import path from "node:path";

const router: IRouter = Router();

type FormType = "quote" | "contact";
const COUNTER_FILE = process.env.VERCEL
  ? "/tmp/soohow-lead-counter.json"
  : path.resolve(process.cwd(), "data", "lead-counter.json");

function currentYearSuffix() {
  return String(new Date().getFullYear()).slice(-2);
}

function allocateLeadId() {
  const year = currentYearSuffix();
  let next = 1;
  try {
    const raw = fs.readFileSync(COUNTER_FILE, "utf8");
    const parsed = JSON.parse(raw) as { year?: string; next?: number };
    if (parsed.year === year && typeof parsed.next === "number" && parsed.next > 0) {
      next = parsed.next;
    }
  } catch {
    next = 1;
  }
  fs.mkdirSync(path.dirname(COUNTER_FILE), { recursive: true });
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ year, next: next + 1 }, null, 2) + "\n", "utf8");
  const digits = next >= 1000 ? 4 : 3;
  return `SO${year}${String(next).padStart(digits, "0")}`;
}

function allocateFromMemory() {
  const year = currentYearSuffix();
  const store = (globalThis as Record<string, unknown>).__soohowLeadCounter as
    | Record<string, number>
    | undefined;
  const counterStore = store ?? ((globalThis as Record<string, unknown>).__soohowLeadCounter = {}) as Record<string, number>;
  const next = typeof counterStore[year] === "number" && counterStore[year] > 0 ? counterStore[year] : 1;
  counterStore[year] = next + 1;
  const digits = next >= 1000 ? 4 : 3;
  return `SO${year}${String(next).padStart(digits, "0")}`;
}

function formatMessage(data: Record<string, unknown>, type: FormType, leadId: string): string {
  const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
  const header =
    type === "contact"
      ? "📬 NEW CONTACT MESSAGE — SOOHOW CENTRAL ASIA"
      : "🏭 NEW QUOTE REQUEST — SOOHOW CENTRAL ASIA";

  const lines = [
    `🆔 ${leadId}`,
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
  lines.push("🌐 Source: soohowcentralasia.com");

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
  let leadId: string;
  try {
    leadId = allocateLeadId();
  } catch {
    leadId = allocateFromMemory();
  }
  const text = formatMessage(req.body as Record<string, unknown>, type, leadId);

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

    res.json({ ok: true, leadId });
  } catch {
    res.status(502).json({ error: "Failed to reach Telegram API" });
  }
});

export default router;
