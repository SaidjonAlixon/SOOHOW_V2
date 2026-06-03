import { ProductsSection } from "@/components/ProductsSection";
import { useSiteActions } from "@/layouts/SiteLayout";

export default function ProductsPage() {
  const { openQuoteModal, openProductModal } = useSiteActions();

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-20">
      <ProductsSection
        onProductClick={openProductModal}
        onQuoteClick={openQuoteModal}
      />
    </div>
  );
}
