export async function sendTelegramMessage(data: Record<string, any>) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("Telegram Demo Mode. Message would have been:", data);
    return Promise.resolve();
  }

  const text = `
🏭 NEW QUOTE REQUEST — SOOHOW CENTRAL ASIA

📅 Date: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" })}
👤 Name: ${data.name}
📞 Phone: ${data.phone}
🏢 Company: ${data.company || "N/A"}
📧 Email: ${data.email || "N/A"}
🔬 Product: ${data.product || "General Inquiry"}
📦 Quantity: ${data.quantity || "N/A"}
💬 Message: ${data.message || "N/A"}
🌐 Source: soohowasia.uz
  `.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Telegram API Error:", error);
    throw error;
  }
}
