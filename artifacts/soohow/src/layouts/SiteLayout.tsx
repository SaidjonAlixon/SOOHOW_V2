import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "wouter";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ProductModal } from "@/components/ProductModal";
import { QuoteModal } from "@/components/QuoteModal";
import { Product } from "@/lib/products";
import { useLocalizedProducts } from "@/lib/i18n/useLocalizedProducts";

interface SiteActions {
  openQuoteModal: (product?: Product) => void;
  openProductModal: (product: Product) => void;
}

const SiteActionsContext = createContext<SiteActions | null>(null);

export function useSiteActions(): SiteActions {
  const ctx = useContext(SiteActionsContext);
  if (!ctx) {
    throw new Error("useSiteActions must be used within SiteLayout");
  }
  return ctx;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const localizedProducts = useLocalizedProducts();
  const [searchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const openQuoteModal = (product?: Product) => {
    setSelectedProduct(product ?? null);
    setQuoteOpen(true);
  };

  const openProductModal = (product: Product) => setModalProduct(product);
  const closeProductModal = () => setModalProduct(null);

  useEffect(() => {
    const rawId = searchParams.get("product");
    if (!rawId) return;
    const id = Number(rawId);
    if (!Number.isFinite(id)) return;
    const product = localizedProducts.find((p) => p.id === id);
    if (product) setModalProduct(product);
  }, [searchParams, localizedProducts]);

  const getRelatedProducts = (current: Product) =>
    localizedProducts
      .filter((p) => p.id !== current.id && p.categoryKey === current.categoryKey)
      .slice(0, 4);

  return (
    <SiteActionsContext.Provider value={{ openQuoteModal, openProductModal }}>
      <div className="site-shell min-h-screen font-sans selection:bg-[#00A8E8] selection:text-white">
        <CustomCursor />
        <Navbar
          onSearchClick={() => setSearchOpen(true)}
          onQuoteClick={() => openQuoteModal()}
        />
        <main>{children}</main>
        <Footer />

        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            onProductSelect={openProductModal}
          />
        )}
        {modalProduct && (
          <ProductModal
            product={modalProduct}
            onClose={closeProductModal}
            onQuote={openQuoteModal}
            relatedProducts={getRelatedProducts(modalProduct)}
            onProductSelect={openProductModal}
          />
        )}
        {quoteOpen && (
          <QuoteModal
            product={selectedProduct}
            onClose={() => setQuoteOpen(false)}
          />
        )}
      </div>
    </SiteActionsContext.Provider>
  );
}
