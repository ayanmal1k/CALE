import HeroSection from "@/components/hero-section"
import HeroNew from "@/components/hero-new"
import VisionReveal from "@/components/vision-reveal"
import FirstImpressions from "@/components/first-impressions"
import ServicesSection from "@/components/services-section"
import IndustriesSection from "@/components/industries-section"
import CostingSection from "@/components/costing-section"
import PricingSection from "@/components/pricing-section"
import PortfolioSection from "@/components/portfolio-section"
// import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      {/* <HeroSection /> */}
      <HeroNew />
      <VisionReveal />
      {/* <FirstImpressions /> */}
      <ServicesSection />
      <IndustriesSection />
      <CostingSection />
      <PortfolioSection />
      <PricingSection />
      {/* <Footer /> */}
    </main>
  )
}
