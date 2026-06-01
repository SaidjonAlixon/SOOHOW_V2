import { useCallback } from "react";
import { useLocation, useSearchParams } from "wouter";
import { pathnameFromLocation, routes } from "@/lib/routes";
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
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = filterKeyFromSearchParams(searchParams);

  const navigateToCategory = useCallback(
    (categoryKey: ProductCategoryKey) => {
      const onProducts = pathnameFromLocation(location) === routes.products;
      setSearchParams({ [PRODUCT_CATEGORY_QUERY_KEY]: categoryKey });
      if (!onProducts) {
        setLocation(routes.products);
        setTimeout(scrollToProductsSection, 50);
      } else {
        scrollToProductsSection();
      }
    },
    [location, setLocation, setSearchParams],
  );

  const navigateToFilter = useCallback(
    (key: ProductFilterKey) => {
      const onProducts = pathnameFromLocation(location) === routes.products;
      if (key === "all") {
        setSearchParams({});
      } else {
        setSearchParams({ [PRODUCT_CATEGORY_QUERY_KEY]: key });
      }
      if (!onProducts) {
        setLocation(routes.products);
      }
    },
    [location, setLocation, setSearchParams],
  );

  return { filter, navigateToCategory, navigateToFilter, productsPathForCategory };
}
