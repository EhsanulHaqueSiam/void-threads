import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '~/components/sections/hero-section'
import { FeaturedCollections } from '~/components/sections/featured-collections'
import { TrendingNow } from '~/components/sections/trending-now'
import { SocialProof } from '~/components/sections/social-proof'
import { CustomerPhotos } from '~/components/sections/customer-photos'
import { NewsletterSection } from '~/components/sections/newsletter-section'
import { BrandStoryTeaser } from '~/components/sections/brand-story-teaser'
import { TrustBadges } from '~/components/sections/trust-badges'

export const Route = createFileRoute('/')({
  head() {
    return {
      meta: [
        { title: 'VOID THREADS — Premium Streetwear | Wear the Void' },
        { name: 'description', content: 'Premium streetwear for the bold. Shop heavyweight hoodies, technical pants, and essential tees crafted for those who dare to stand out.' },
        { property: 'og:title', content: 'VOID THREADS — Premium Streetwear' },
        { property: 'og:description', content: 'Premium streetwear for the bold. Hoodies, pants, and tees crafted for those who dare to stand out.' },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <TrendingNow />
      <SocialProof />
      <CustomerPhotos />
      <NewsletterSection />
      <BrandStoryTeaser />
      <TrustBadges />
    </>
  )
}
