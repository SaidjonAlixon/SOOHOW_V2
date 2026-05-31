import { useMemo } from "react";
import { products, type Product } from "@/lib/products";
import { PRODUCT_CATEGORY_I18N_KEY } from "@/lib/productCategories";
import { useLocale } from "./LocaleContext";
import { localizeBadge, productLocaleMap } from "./productLocales";

function localizedCategoryLabel(
  categoryKey: Product["categoryKey"],
  t: (key: string) => string,
): string {
  return t(`productsPage.${PRODUCT_CATEGORY_I18N_KEY[categoryKey]}`);
}

export function useLocalizedProducts(): Product[] {
  const { locale, t } = useLocale();

  return useMemo(
    () =>
      products.map((product) => {
        const category = localizedCategoryLabel(product.categoryKey, t);
        const loc = productLocaleMap[locale][product.id];
        if (!loc) return { ...product, category };
        return {
          ...product,
          name: loc.name,
          spec: loc.spec,
          desc: loc.desc,
          category,
          badges: loc.badges.map((b) => localizeBadge(b, t)),
          specs: loc.specs,
        };
      }),
    [locale, t],
  );
}
