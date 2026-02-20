import { Star, CheckCircle } from 'lucide-react'
import { getReviewsByProductId } from '~/data/reviews'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'

interface ReviewsSectionProps {
  productId: string
  rating: number
  reviewCount: number
}

export function ReviewsSection({ productId, rating, reviewCount }: ReviewsSectionProps) {
  const reviews = getReviewsByProductId(productId)

  return (
    <section className="py-16 border-t border-smoke/5">
      <ScrollReveal>
        <SectionHeading
          title="Customer Reviews"
          subtitle={`${rating} out of 5 based on ${reviewCount} reviews`}
        />
      </ScrollReveal>

      {/* Rating summary */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < Math.round(rating) ? 'text-gold fill-gold' : 'text-smoke-faint'}
            />
          ))}
        </div>
        <span className="text-lg font-mono font-bold text-smoke">{rating}</span>
      </div>

      {/* Reviews list */}
      <div className="space-y-8 max-w-2xl mx-auto">
        {reviews.map((review) => (
          <ScrollReveal key={review.id}>
            <div className="border-b border-smoke/5 pb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 flex items-center justify-center text-xs font-bold text-gold">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-smoke">{review.author}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[10px] text-success">
                          <CheckCircle size={10} />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-smoke-faint">{review.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < review.rating ? 'text-gold fill-gold' : 'text-smoke-faint'}
                    />
                  ))}
                </div>
              </div>

              <h4 className="text-sm font-semibold text-smoke mb-1">{review.title}</h4>
              <p className="text-sm text-smoke-muted leading-relaxed">{review.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
