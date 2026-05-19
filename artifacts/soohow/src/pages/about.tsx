import { AboutSection } from "@/components/AboutSection";
import { AboutTeamSection } from "@/components/AboutTeamSection";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] pt-20">
      <AboutSection />
      <AboutTeamSection />
    </div>
  );
}
