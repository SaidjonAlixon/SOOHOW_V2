import { useCallback, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { routes } from "@/lib/routes";
import {
  isProductCategoryKey,
  productsPathForCategory,
  type ProductCategoryKey,
} from "@/lib/productCategories";

export const PRODUCT_CATEGORY_QUERY_KEY = "cat";

export type ProductFilterKey = "all" | ProductCategoryKey;

export function filterKeyFromSearchParams(searchParams: URLSearchParams): ProductFilterKey {
  const cat = searchParams.get(PRODUCT_CATEGORY_QUERY_KEY);
  return cat && isProductCategoryKey(cat) ? cat : "all";
}

export function scrollToProductsSection() {
  requestAnimationFrame(() => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

export function useProductCategoryNav() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = useMemo(() => new URLSearchParams(search || ""), [search]);
  const filter = filterKeyFromSearchParams(searchParams);

  const navigateToCategory = useCallback(
    (categoryKey: ProductCategoryKey) => {
      setLocation(productsPathForCategory(categoryKey));
      setTimeout(scrollToProductsSection, 80);
    },
    [setLocation],
  );

  const navigateToFilter = useCallback(
    (key: ProductFilterKey) => {
      if (key === "all") {
        setLocation(routes.products);
      } else {
        setLocation(productsPathForCategory(key));
      }
    },
    [setLocation],
  );

  return { filter, navigateToCategory, navigateToFilter, productsPathForCategory };
}
