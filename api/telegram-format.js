/** @param {Record<string, unknown>} data @param {"quote"|"contact"} type @param {string} leadId */
function formatTelegramMessage(data, type, leadId) {
  const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
  const header =
    type === "contact"
      ? "📬 NEW CONTACT MESSAGE — SOOHOW CENTRAL ASIA"
      : "🏭 NEW QUOTE REQUEST — SOOHOW CENTRAL ASIA";

  const lines = [`🆔 ${leadId}`, header, "", `📅 Date: ${date}`, `👤 Name: ${String(data.name ?? "")}`, `📞 Phone: ${String(data.phone ?? "")}`, `🏢 Company: ${data.company ? String(data.company) : "N/A"}`, `📧 Email: ${data.email ? String(data.email) : "N/A"}`];

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

module.exports = { formatTelegramMessage };
