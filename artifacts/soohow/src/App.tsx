import { useEffect, useState, useCallback } from "react";
import { useLocation, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { FullereneIntro } from "@/components/FullereneIntro";
import { SiteLayout } from "@/layouts/SiteLayout";
import { routes } from "@/lib/routes";
import { initTheme } from "@/lib/theme";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ProductsPage from "@/pages/products";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";

const queryClient = new QueryClient();

const sitePaths = new Set<string>([
  routes.home,
  routes.about,
  routes.products,
  routes.contact,
  routes.privacy,
  routes.terms,
]);

function normalizePath(location: string) {
  return location.replace(/\/$/, "") || "/";
}

function SiteApp() {
  const [location] = useLocation();
  const path = normalizePath(location);

  let page;
  switch (path) {
    case routes.about:
      page = <AboutPage />;
      break;
    case routes.products:
      page = <ProductsPage />;
      break;
    case routes.contact:
      page = <ContactPage />;
      break;
    case routes.privacy:
      page = <PrivacyPage />;
      break;
    case routes.terms:
      page = <TermsPage />;
      break;
    default:
      page = <HomePage />;
      break;
  }

  return <SiteLayout>{page}</SiteLayout>;
}

function Router() {
  const [location, setLocation] = useLocation();
  const path = normalizePath(location);
  const [introComplete, setIntroComplete] = useState(false);

  const finishIntro = useCallback(() => {
    setIntroComplete(true);
    setLocation(routes.home);
  }, [setLocation]);

  if (!introComplete) {
    return <FullereneIntro onComplete={finishIntro} />;
  }

  if (sitePaths.has(path)) return <SiteApp />;
  if (path === "/") return <FullereneIntro onComplete={finishIntro} />;
  return <NotFound />;
}

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}

export default App;
