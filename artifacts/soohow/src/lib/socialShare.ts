import { routes } from "@/lib/routes";

const TELEGRAM_USERNAME =
  (import.meta.env.VITE_TELEGRAM_USERNAME as string | undefined)?.replace(/^@/, "") || "soohowasia";

export type ShareableProduct = {
  id: number;
  name: string;
  model: string;
  brand: string;
};

export function productSharePath(productId: number): string {
  return `${routes.products}?product=${productId}`;
}

export function absoluteSiteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.origin}${base}${pathname}`;
}

export function buildProductSharePayload(product: Pick<ShareableProduct, "id" | "name" | "model">) {
  const url = absoluteSiteUrl(productSharePath(product.id));
  const title = `${product.name} (${product.model})`;
  return { url, title, text: title };
}

export function getProductLink(productId: number): string {
  return absoluteSiteUrl(productSharePath(productId));
}

export async function copyProductLink(productId: number): Promise<void> {
  const url = getProductLink(productId);
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }
  window.prompt(url, url);
}

export function telegramProductUrl(product: ShareableProduct): string {
  const { url, text } = buildProductSharePayload(product);
  const message = `${product.brand} — ${text}\n${url}`;
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
}
