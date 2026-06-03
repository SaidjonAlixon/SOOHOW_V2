/** Paths relative to Wouter `base` (import.meta.env.BASE_URL without trailing slash). */
export const routes = {
  home: "/",
  about: "/about",
  products: "/products",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const navItems = [
  { key: "nav.home", path: routes.home },
  { key: "nav.about", path: routes.about },
  { key: "nav.products", path: routes.products },
  { key: "nav.contact", path: routes.contact },
] as const;

/** Path only — strips `?query` and `#hash` from Wouter location. */
export function pathnameFromLocation(location: string): string {
  const pathOnly = location.split("?")[0].split("#")[0];
  return pathOnly.replace(/\/$/, "") || "/";
}

export function isNavActive(currentLocation: string, itemPath: string): boolean {
  const currentPath = pathnameFromLocation(currentLocation);
  if (itemPath === routes.home) {
    return currentPath === routes.home || currentPath === "";
  }
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}
