# VOID THREADS - Product Requirements Document

## Brand Identity
- **Name:** VOID THREADS
- **Tagline:** "Wear the Void"
- **Position:** Premium streetwear for the bold and fashion-forward
- **Aesthetic:** Dark luxury, sharp minimalism, underground culture meets high fashion

## Target Audience
- Age: 18-35
- Urban, fashion-forward, digitally native
- Mobile-first (70%+ mobile traffic expected)
- Values exclusivity, quality, self-expression
- Influenced by Fear of God Essentials, Nike Tech, Represent Clo

## Pages & Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home / Landing | Hero, collections, trending, social proof, newsletter |
| `/collections` | All Collections | Browse all categories |
| `/collections/:slug` | Category Page | Hoodies / Pants / Tees with filters |
| `/products/:slug` | Product Detail | Full PDP with gallery, variants, reviews |
| `/cart` | Cart | Full cart page with summary |
| `/about` | About / Brand Story | Brand narrative, values, team |
| `/contact` | Contact | Contact form + FAQ |

## Product Catalog
- **Hoodies** (6 products): Oversized fits, heavyweight cotton, unique washes
- **Pants** (6 products): Cargo, joggers, wide-leg, technical fabrics
- **T-Shirts** (6 products): Boxy fits, premium cotton, graphic and minimal
- Each product: name, slug, description, price, compareAtPrice, images[], colors[], sizes[], stock, category, tags, rating, reviewCount

## Sales Psychology Features
1. **Countdown Timer** - "Drop ends in..." on hero and product pages
2. **Low Stock Indicator** - "Only X left in stock" when stock < 10
3. **Live Viewer Count** - "X people are viewing this right now"
4. **Free Shipping Progress Bar** - "$X away from free shipping" in cart
5. **Social Proof Counters** - "10,000+ Happy Customers", "4.8★ Average Rating"
6. **"X sold today"** indicators on trending products
7. **Exit-Intent Popup** - 15% off for desktop users about to leave
8. **Newsletter Popup** - 10% off, triggers at 30s or 50% scroll
9. **Cross-Sell** - "Complete the Look" on PDP
10. **Recently Viewed** - localStorage-powered product history
11. **Trust Badges** - Free shipping, secure payment, 30-day returns, quality guarantee
12. **UGC Grid** - Customer photos section for social proof
13. **Promo Code Input** - In cart for perceived value
14. **Announcement Bar** - Rotating messages (free shipping, new drop, sale)

## Performance Targets
- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total bundle size: < 200KB gzipped

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Focus trapping in modals and drawers
- ARIA labels on all interactive elements
- Minimum 4.5:1 contrast ratio for text
- Reduced motion support via `prefers-reduced-motion`

## Hosting & Infrastructure
- **Current:** Netlify free tier — leveraging all available free features:
  - Push-to-deploy from git, deploy previews on PRs, instant rollbacks
  - Free SSL, global CDN, serverless functions (125K req/month), form handling (100 submissions/month)
  - Custom domain support with automatic HTTPS
  - 100GB bandwidth/month, 300 build minutes/month
- **Future:** May migrate to a VPS (Hetzner, DigitalOcean) or premium hosting (Vercel, Railway) when traffic or feature needs outgrow the free tier
- The site is built to be deployment-agnostic — Nitro outputs a standard Node.js server that runs anywhere

## SEO Requirements
- Unique meta title/description per page
- Open Graph tags for social sharing
- JSON-LD structured data for products
- Semantic HTML throughout
- Image alt text on all images
