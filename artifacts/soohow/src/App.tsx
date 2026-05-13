import React, { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { AboutSection } from "@/components/AboutSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ProductModal } from "@/components/ProductModal";
import { QuoteModal } from "@/components/QuoteModal";

import { Product, products } from "@/lib/products";

const queryClient = new QueryClient();

function Home() {
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const openQuoteModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setQuoteOpen(true);
  };

  const openProductModal = (product: Product) => {
    setModalProduct(product);
  };

  const closeProductModal = () => {
    setModalProduct(null);
  };

  const getRelatedProducts = (current: Product) => {
    return products
      .filter(p => p.id !== current.id && p.category === current.category)
      .slice(0, 4);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="bg-[#061A2E] text-white min-h-screen font-sans selection:bg-[#00A8E8] selection:text-white">
          <CustomCursor />
          
          <Navbar 
            onSearchClick={() => setSearchOpen(true)} 
            onQuoteClick={() => openQuoteModal()} 
          />
          
          <main>
            <HeroSection onQuoteClick={() => openQuoteModal()} />
            <StatsStrip />
            <AboutSection />
            <ProductsSection 
              onProductClick={openProductModal} 
              onQuoteClick={openQuoteModal} 
            />
            <ContactSection />
          </main>
          
          <Footer />

          {/* Overlays and Modals */}
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
      )}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Ensure dark mode is active immediately
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
