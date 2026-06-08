import HeroSection from "@/components/hero-section";
import FirstImpressions from "@/components/first-impressions";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FirstImpressions />
      <ServicesSection />
      <IndustriesSection />
    </main>
  );
}
