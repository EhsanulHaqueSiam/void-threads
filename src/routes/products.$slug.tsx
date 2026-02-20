import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { getProductBySlug } from '~/data/products'
import { ProductImageGallery } from '~/components/product/product-image-gallery'
import { ProductInfo } from '~/components/product/product-info'
import { SizeGuideModal } from '~/components/product/size-guide-modal'
import { CrossSellSection } from '~/components/product/cross-sell-section'
import { YouMightLike } from '~/components/product/you-might-like'
import { ReviewsSection } from '~/components/product/reviews-section'
import { RecentlyViewed, addToRecentlyViewed } from '~/components/product/recently-viewed'
import { StickyAddToCart } from '~/components/product/sticky-add-to-cart'
import { Accordion } from '~/components/ui/accordion'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { getProductJsonLd } from '~/utils/seo'

export const Route = createFileRoute('/products/$slug')({
  head({ params }) {
    const product = getProductBySlug(params.slug)
    if (!product) return {}
    return {
      meta: [
        { title: `${product.name} | VOID THREADS` },
        { name: 'description', content: product.description },
        { property: 'og:title', content: `${product.name} | VOID THREADS` },
        { property: 'og:description', content: product.description },
        { property: 'og:image', content: product.images[0] },
        { property: 'og:type', content: 'product' },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            getProductJsonLd({
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.images[0],
              slug: product.slug,
              rating: product.rating,
              reviewCount: product.reviewCount,
              inStock: product.stock > 0,
            })
          ),
        },
      ],
    }
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { slug } = Route.useParams()
  const product = getProductBySlug(slug)

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id)
    }
  }, [product])

  if (!product) {
    return (
      <div className="pt-24 pb-20 text-center">
        <h1 className="font-heading text-4xl font-bold text-smoke mb-4">Product Not Found</h1>
        <p className="text-smoke-muted">This product doesn't exist or has been removed.</p>
      </div>
    )
  }

  const accordionItems = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'sizing',
      title: 'Sizing & Fit',
      content: 'Our pieces are designed with a relaxed, oversized fit. We recommend staying true to size for the intended silhouette, or sizing down for a more fitted look. See our size guide for detailed measurements.',
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free shipping on orders over $150. Standard shipping takes 3-7 business days. Express shipping available at checkout. 30-day hassle-free returns — no questions asked.',
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: 'Machine wash cold with like colors. Tumble dry low or hang dry. Do not bleach. Iron on low if needed. Garment-dyed pieces may have slight color variations — this is intentional.',
    },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-smoke-faint mb-8">
          <Link to="/" className="hover:text-smoke transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-smoke transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link
            to="/collections/$slug"
            params={{ slug: product.category }}
            className="hover:text-smoke transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-smoke-muted">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ScrollReveal direction="left">
            <ProductImageGallery images={product.images} name={product.name} />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-28">
              <ProductInfo product={product} />
            </div>
          </ScrollReveal>
        </div>

        {/* Product accordion */}
        <div className="max-w-2xl mx-auto mt-20">
          <ScrollReveal>
            <Accordion items={accordionItems} />
          </ScrollReveal>
        </div>

        {/* You might also like (same category) */}
        <YouMightLike currentProduct={product} />

        {/* Complete the look (cross-category outfit) */}
        <CrossSellSection currentProduct={product} />

        {/* Reviews */}
        <ReviewsSection
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Recently viewed */}
        <RecentlyViewed currentProductId={product.id} />
      </div>

      <SizeGuideModal />
      <StickyAddToCart product={product} />
    </div>
  )
}
