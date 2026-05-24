import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { ScientificCapabilitySection } from "@/components/ScientificCapabilitySection";
import { IndustrialCapacitySection } from "@/components/IndustrialCapacitySection";
import { PartnersSection } from "@/components/PartnersSection";
import { NewsSection } from "@/components/NewsSection";
import { useSiteActions } from "@/layouts/SiteLayout";

export default function HomePage() {
  const { openQuoteModal } = useSiteActions();

  return (
    <main className="site-home">
      <HeroSection onQuoteClick={() => openQuoteModal()} />
      <StatsStrip />
      <HomeIntroSection />
      <WhyChooseUsSection />
      <CertificatesSection />
      <ScientificCapabilitySection />
      <IndustrialCapacitySection />
      <PartnersSection />
      <NewsSection />
    </main>
  );
}
