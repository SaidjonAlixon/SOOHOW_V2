/** Split title into per-char spans grouped by word so lines break only between words. */
export function mountAnimatedTitleChars(
  titleEl: HTMLElement,
  text: string,
  charClass = "inline-block opacity-0 translate-y-6",
): HTMLElement[] {
  titleEl.replaceChildren();
  const charSpans: HTMLElement[] = [];
  const words = text.trim().split(/\s+/);

  words.forEach((word, wordIndex) => {
    const wordWrap = document.createElement("span");
    wordWrap.className = "inline-block whitespace-nowrap align-top";

    for (const char of word) {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = charClass;
      wordWrap.appendChild(span);
      charSpans.push(span);
    }

    titleEl.appendChild(wordWrap);

    if (wordIndex < words.length - 1) {
      const space = document.createElement("span");
      space.className = "inline-block";
      space.textContent = "\u00A0";
      titleEl.appendChild(space);
    }
  });

  return charSpans;
}
