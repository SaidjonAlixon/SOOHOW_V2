import { useMemo } from "react";
import { products, type Product } from "@/lib/products";
import { useLocale } from "./LocaleContext";
import { localizeBadge, productLocaleMap } from "./productLocales";

export function useLocalizedProducts(): Product[] {
  const { locale, t } = useLocale();

  return useMemo(
    () =>
      products.map((product) => {
        const loc = productLocaleMap[locale][product.id];
        if (!loc) return product;
        return {
          ...product,
          name: loc.name,
          spec: loc.spec,
          desc: loc.desc,
          category: loc.category,
          badges: loc.badges.map((b) => localizeBadge(b, t)),
          specs: loc.specs,
        };
      }),
    [locale, t],
  );
}
