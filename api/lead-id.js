const fs = require("node:fs");
const path = require("node:path");

const COUNTER_FILE = path.join(__dirname, "..", "data", "lead-counter.json");

function currentYearSuffix() {
  return String(new Date().getFullYear()).slice(-2);
}

/** @param {number} seq */
function formatLeadId(seq) {
  const year = currentYearSuffix();
  const digits = seq >= 1000 ? 4 : 3;
  return `SO${year}${String(seq).padStart(digits, "0")}`;
}

function readFileState() {
  try {
    const raw = fs.readFileSync(COUNTER_FILE, "utf8");
    const data = JSON.parse(raw);
    const year = currentYearSuffix();
    if (data.year !== year) return { year, next: 1 };
    const next = typeof data.next === "number" && data.next > 0 ? data.next : 1;
    return { year, next };
  } catch {
    return { year: currentYearSuffix(), next: 1 };
  }
}

/** @param {{ year: string, next: number }} state */
function writeFileState(state) {
  fs.mkdirSync(path.dirname(COUNTER_FILE), { recursive: true });
  fs.writeFileSync(COUNTER_FILE, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function allocateFromFile() {
  const state = readFileState();
  const id = formatLeadId(state.next);
  writeFileState({ year: state.year, next: state.next + 1 });
  return id;
}

function allocateFallbackId() {
  const year = currentYearSuffix();
  const secondsPart = Math.floor(Date.now() / 1000) % 100000;
  return `SO${year}${String(secondsPart).padStart(5, "0")}`;
}

/** @returns {Promise<string>} */
async function allocateLeadId() {
  try {
    return allocateFromFile();
  } catch (err) {
    console.error("[lead-id] file counter failed, using fallback id", err);
    return allocateFallbackId();
  }
}

module.exports = {
  allocateLeadId,
  formatLeadId,
};
