import HeroSection from '@/components/home/HeroSection'
import EnterpriseImpact from '@/components/home/EnterpriseImpact'
import GitHubStats from '@/components/home/GitHubStats'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import SkillsPreview from '@/components/home/SkillsPreview'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EnterpriseImpact />
      <GitHubStats />
      <FeaturedProjects />
      <SkillsPreview />
      <CTASection />
    </>
  )
}
