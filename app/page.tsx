import HeroSection from "@/components/hero-section"
import FirstImpressions from "@/components/first-impressions"
import ServicesSection from "@/components/services-section"
import IndustriesSection from "@/components/industries-section"
import CostingSection from "@/components/costing-section"
import PortfolioSection from "@/components/portfolio-section"
// import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FirstImpressions />
      <ServicesSection />
      <IndustriesSection />
      <CostingSection />
      <PortfolioSection />
      {/* <Footer /> */}
    </main>
  )
}
