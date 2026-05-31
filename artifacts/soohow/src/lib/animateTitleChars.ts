/** Per-char animation; each word stays on one piece (no break inside «НАС», etc.). */
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
    wordWrap.setAttribute("data-word", "");

    for (const char of word) {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = charClass;
      wordWrap.appendChild(span);
      charSpans.push(span);
    }

    titleEl.appendChild(wordWrap);

    if (wordIndex < words.length - 1) {
      titleEl.appendChild(document.createTextNode(" "));
    }
  });

  return charSpans;
}
