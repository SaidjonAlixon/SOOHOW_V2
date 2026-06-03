/** Split a section title into display lines (`\n` or array). */
export function splitTitleLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
