import HeroSection from "@/components/hero-section";
import FirstImpressions from "@/components/first-impressions";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";
import CostingSection from "@/components/costing-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FirstImpressions />
      <ServicesSection />
      <IndustriesSection />
      <CostingSection />
    </main>
  );
}
