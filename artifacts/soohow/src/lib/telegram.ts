export type TelegramFormType = "quote" | "contact";

function currentYearSuffix() {
  return String(new Date().getFullYear()).slice(-2);
}

function allocateClientLeadId() {
  const year = currentYearSuffix();
  const key = `soohow-lead-counter-${year}`;
  const raw = localStorage.getItem(key);
  const next = Number(raw);
  const seq = Number.isFinite(next) && next > 0 ? next : 1;
  localStorage.setItem(key, String(seq + 1));
  const digits = seq >= 1000 ? 4 : 3;
  return `SO${year}${String(seq).padStart(digits, "0")}`;
}

function apiTelegramUrl(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/?$/, "/")}api/telegram`.replace(/\/+/g, "/");
}

function formatMessage(data: Record<string, unknown>, type: TelegramFormType, leadId: string): string {
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
    lines.push(
      `📋 Subject: ${data.subject ? String(data.subject) : data.product ? String(data.product) : "N/A"}`,
    );
  } else {
    lines.push(`🔬 Product: ${data.product ? String(data.product) : "General Inquiry"}`);
    lines.push(`📦 Quantity: ${data.quantity ? String(data.quantity) : "N/A"}`);
  }

  lines.push(`💬 Message: ${data.message ? String(data.message) : "N/A"}`);
  lines.push("🌐 Source: soohowcentralasia.com");

  return lines.join("\n");
}

async function sendViaTelegramApi(text: string, token: string, chatId: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  const payload = (await res.json()) as { ok?: boolean; description?: string };

  if (!res.ok || !payload.ok) {
    throw new Error(payload.description ?? "Failed to send message");
  }
}

type BackendSendResult =
  | { ok: true; leadId?: string }
  | { ok: false; fallback: true; error?: Error }
  | { ok: false; fallback: false; error: Error };

async function sendViaBackend(
  data: Record<string, unknown>,
  type: TelegramFormType,
): Promise<BackendSendResult> {
  let res: Response;
  try {
    res = await fetch(apiTelegramUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type }),
    });
  } catch (err) {
    return {
      ok: false,
      fallback: true,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }

  const body = (await res.json().catch(() => null)) as { error?: string } | null;

  if (res.ok) {
    return {
      ok: true,
      leadId: body && typeof (body as { leadId?: unknown }).leadId === "string" ? (body as { leadId: string }).leadId : undefined,
    };
  }

  if (res.status === 503) {
    return {
      ok: false,
      fallback: true,
      error: new Error(
        body?.error ??
          "Telegram serverda sozlanmagan. Vercel → Settings → Environment Variables da TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID qo‘ying.",
      ),
    };
  }

  return {
    ok: false,
    fallback: false,
    error: new Error(body?.error ?? "Failed to send message"),
  };
}

function getClientTelegramConfig() {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim();
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return null;
  return { token, chatId };
}

export async function sendTelegramMessage(
  data: Record<string, unknown>,
  type: TelegramFormType = "quote",
) {
  const backend = await sendViaBackend(data, type);
  if (backend.ok) return;

  const client = getClientTelegramConfig();
  if (client) {
    const text = formatMessage(data, type, allocateClientLeadId());
    await sendViaTelegramApi(text, client.token, client.chatId);
    return;
  }

  if (!backend.fallback) {
    throw backend.error;
  }

  throw (
    backend.error ??
    new Error(
      "Telegram sozlanmagan. Vercelda TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID qo‘ying yoki mahalliy dev uchun artifacts/soohow/.env da VITE_TELEGRAM_* ni to‘ldiring.",
    )
  );
}
