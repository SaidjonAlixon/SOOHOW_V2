import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { WhyChoosePillarShowcaseSection } from "@/components/WhyChoosePillarShowcaseSection";
import { ScientificCapabilitySection } from "@/components/ScientificCapabilitySection";
import { IndustrialCapacitySection } from "@/components/IndustrialCapacitySection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { PartnersSection } from "@/components/PartnersSection";
import { NewsSection } from "@/components/NewsSection";
import { useSiteActions } from "@/layouts/SiteLayout";
import { scrollToSection } from "@/lib/scrollToSection";

export default function HomePage() {
  const { openQuoteModal } = useSiteActions();

  useEffect(() => {
    const scrollFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) scrollToSection(hash);
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, []);

  return (
    <main className="site-home">
      <HeroSection onQuoteClick={() => openQuoteModal()} />
      <StatsStrip />
      <HomeIntroSection />
      <WhyChooseUsSection />
      <WhyChoosePillarShowcaseSection pillarIndex={0} />
      <ScientificCapabilitySection />
      <IndustrialCapacitySection />
      <CertificatesSection />
      <PartnersSection />
      <NewsSection />
    </main>
  );
}
