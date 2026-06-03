export function sectionIdFromHref(href: string): string {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return href.replace(/^\//, "");
  return href.slice(hashIndex + 1);
}

/** Fixed header height — keep in sync with Navbar / scroll-mt on anchored sections */
const NAV_OFFSET_PX = 80;

export function scrollToSection(sectionId: string, attempt = 0): void {
  const el = document.getElementById(sectionId);
  if (!el) {
    if (attempt < 8) {
      window.setTimeout(() => scrollToSection(sectionId, attempt + 1), 80);
    }
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.replaceState(null, "", `#${sectionId}`);
}
