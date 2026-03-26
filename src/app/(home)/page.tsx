import CtaAction from "@/src/components/shared/cta-action"
import FeatureSection from "@/src/components/shared/feature-section"
import HeroSection from "@/src/components/shared/hero-section"
import HowItWorks from "@/src/components/shared/how-it-works"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <CtaAction />
    </div>
  )
}
