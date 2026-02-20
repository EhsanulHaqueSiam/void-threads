# VOID THREADS - Design System & Visual Topology

## Design Philosophy
Dark luxury meets underground streetwear. Every pixel serves conversion. The aesthetic should feel like walking into an exclusive underground boutique — dark, moody, premium, with strategic pops of gold for luxury signaling. Inspired by Fear of God Essentials, Rick Owens, and Nike's premium digital experiences.

## 3D & Interactive Elements (Spline)
- **Hero Section:** Embedded Spline 3D rotating geometric void/abstract sculpture as background element
- **About Page:** Spline 3D thread/fabric animation as hero visual
- These add premium feel and differentiate from generic e-commerce templates

## Component Library (21st.dev Inspired)
Drawing from 21st.dev's curated component patterns:
- **Magnetic buttons** that subtly follow cursor
- **Spotlight card effects** with gradient glow on hover
- **Text shimmer animations** on key headlines
- **Animated gradient borders** on featured products
- **Glass morphism** overlays on modals and drawers
- **Smooth page transitions** with shared layout animations

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-void` | `#0A0A0A` | Primary background |
| `--color-void-light` | `#111111` | Card/elevated surfaces |
| `--color-void-lighter` | `#1A1A1A` | Subtle borders, dividers |
| `--color-smoke` | `#F5F5F5` | Primary text |
| `--color-smoke-muted` | `#A3A3A3` | Secondary text |
| `--color-smoke-faint` | `#525252` | Disabled/placeholder |
| `--color-accent` | `#E8E8E8` | Buttons, interactive elements |
| `--color-gold` | `#C9A84C` | Luxury accents, badges, CTAs |
| `--color-gold-light` | `#D4B96A` | Gold hover state |
| `--color-danger` | `#DC2626` | Sale prices, urgency, low stock |
| `--color-success` | `#16A34A` | In stock, success states |

### Gradient Tokens
- **Hero gradient:** `linear-gradient(180deg, transparent 0%, #0A0A0A 100%)`
- **Gold shimmer:** `linear-gradient(90deg, #C9A84C, #D4B96A, #C9A84C)`
- **Card spotlight:** `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(201, 168, 76, 0.06), transparent 40%)`

---

## Typography

### Font Stack
- **Headings:** `Space Grotesk` (weight: 500, 700) — geometric, modern, sharp
- **Body:** `Inter` (weight: 400, 500, 600) — clean, highly readable
- **Mono/Accent:** `JetBrains Mono` — for prices, countdown timers

### Scale
| Level | Size | Weight | Tracking | Font |
|-------|------|--------|----------|------|
| Display | 72px / 4.5rem | 700 | -0.03em | Space Grotesk |
| H1 | 48px / 3rem | 700 | -0.02em | Space Grotesk |
| H2 | 36px / 2.25rem | 700 | -0.02em | Space Grotesk |
| H3 | 24px / 1.5rem | 600 | -0.01em | Space Grotesk |
| H4 | 20px / 1.25rem | 600 | -0.01em | Space Grotesk |
| Body Large | 18px / 1.125rem | 400 | 0 | Inter |
| Body | 16px / 1rem | 400 | 0 | Inter |
| Body Small | 14px / 0.875rem | 400 | 0.01em | Inter |
| Caption | 12px / 0.75rem | 500 | 0.05em | Inter |
| Price | 24px / 1.5rem | 600 | 0 | JetBrains Mono |

---

## Component Design Principles

### Sharp Edges
- **No border-radius** on cards, buttons, inputs (0px)
- Reinforces the edgy, streetwear aesthetic
- Exception: avatar images (full circle), pills/badges (2px)

### Hover States
- Product cards: image swap + subtle scale (1.02) + spotlight gradient
- Buttons: invert colors (white bg → black bg, black text → white text)
- Links: underline slide-in from left
- Cards: subtle border glow (gold)

### Interaction Feedback
- Buttons: scale down on press (0.98)
- Add to cart: brief checkmark animation
- Cart count: bounce animation on update
- Toast notifications: slide in from right

---

## Animation Specifications

### Hero Section
- **Headline:** Letter-by-letter reveal (stagger: 0.03s per char)
- **Subtext:** Fade up after headline completes (delay: 0.5s)
- **CTA Button:** Scale from 0.9 → 1 + fade in (delay: 0.8s)
- **Background:** Spline 3D subtle rotation / Gradient shift

### Scroll Reveals (ScrollReveal component)
- **Default:** Fade up from 30px below, 0.6s duration, ease-out
- **Stagger children:** 0.1s delay between items
- **Threshold:** Triggers at 20% visibility
- **Once:** Animates once, doesn't re-trigger

### Page Transitions
- **Exit:** Fade out + slight scale down (0.2s)
- **Enter:** Fade in + slight scale up (0.3s)
- **Shared:** AnimatePresence with mode="wait"

### Navbar
- **Scroll transition:** transparent → solid black (at 50px scroll)
- **Backdrop blur:** 12px when solid
- **Duration:** 0.3s ease

### Counter Animations
- **AnimatedCounter:** Count from 0 to target over 2s
- **Easing:** ease-out (fast start, slow end)
- **Trigger:** On scroll into view

### Parallax
- **Brand Story section:** Background image moves at 0.5x scroll speed
- **Hero:** Subtle 0.3x parallax on overlay elements

---

## Page Topology

### Home Page (`/`)
```
┌─────────────────────────────────────┐
│ AnnouncementBar (rotating messages) │
├─────────────────────────────────────┤
│ Navbar (transparent → solid)        │
├─────────────────────────────────────┤
│ HeroSection                         │
│ - Spline 3D bg / video bg          │
│ - "WEAR THE VOID" animated text     │
│ - Countdown timer                   │
│ - "SHOP THE DROP" CTA               │
├─────────────────────────────────────┤
│ FeaturedCollections                 │
│ - 3-column bento: Hoodies|Pants|Tees│
│ - Hover zoom + overlay              │
├─────────────────────────────────────┤
│ TrendingNow                         │
│ - Embla carousel                    │
│ - "Hot" / "Low Stock" badges        │
│ - "X sold today" indicator          │
├─────────────────────────────────────┤
│ SocialProof                         │
│ - 10K+ Customers | 4.8★ | Worldwide│
│ - Animated count-up                 │
├─────────────────────────────────────┤
│ CustomerPhotos                      │
│ - Masonry UGC grid                  │
│ - Hover overlay with name           │
├─────────────────────────────────────┤
│ NewsletterSection                   │
│ - Split layout with image           │
│ - "Get 10% Off" + email input       │
├─────────────────────────────────────┤
│ BrandStoryTeaser                    │
│ - Parallax cinematic image          │
│ - "Read Our Story" CTA              │
├─────────────────────────────────────┤
│ TrustBadges                         │
│ - 4 icons in row                    │
├─────────────────────────────────────┤
│ Footer                              │
│ - Links, social, newsletter, legal  │
└─────────────────────────────────────┘
```

### Collection Page (`/collections/:slug`)
```
┌─────────────────────────────────────┐
│ Collection Hero (category image+name)│
├────────────┬────────────────────────┤
│ FilterBar  │ ProductGrid            │
│ - Category │ - 2/3/4 col responsive │
│ - Size     │ - ProductCard w/ hover │
│ - Color    │   image swap           │
│ - Price    │ - Quick add button     │
│ - Sort     │ - "Hot"/"New" badges   │
└────────────┴────────────────────────┘
```

### Product Detail Page (`/products/:slug`)
```
┌──────────────────┬──────────────────┐
│ ImageGallery     │ ProductInfo      │
│ - Main image     │ - Name, price    │
│ - Thumbnails     │ - Color selector │
│ - Zoom on hover  │ - Size selector  │
│ - Swipe mobile   │ - Size guide CTA │
│                  │ - Stock indicator │
│                  │ - Viewer count   │
│                  │ - Add to Cart    │
│                  │ - Trust badges   │
├──────────────────┴──────────────────┤
│ ProductAccordion                    │
│ - Description | Sizing | Shipping   │
├─────────────────────────────────────┤
│ CrossSellSection ("Complete Look")  │
├─────────────────────────────────────┤
│ ReviewsSection                      │
├─────────────────────────────────────┤
│ RecentlyViewed                      │
└─────────────────────────────────────┘
```

### Cart Page (`/cart`)
```
┌─────────────────────┬───────────────┐
│ CartItems           │ OrderSummary  │
│ - Image + details   │ - Subtotal    │
│ - Qty selector      │ - Shipping    │
│ - Remove button     │ - Promo code  │
│ - Item total        │ - Total       │
│                     │ - Checkout CTA│
│                     │ - Trust badges│
├─────────────────────┴───────────────┤
│ FreeShippingBar (progress)          │
├─────────────────────────────────────┤
│ CartUpsell ("You May Also Like")    │
└─────────────────────────────────────┘
```

---

## Responsive Breakpoints
| Name | Width | Columns | Notes |
|------|-------|---------|-------|
| Mobile | 320-639px | 1-2 | Bottom sheet modals, hamburger nav |
| Tablet | 640-1023px | 2-3 | Side-by-side PDP layout |
| Desktop | 1024-1279px | 3-4 | Full layout |
| Wide | 1280px+ | 4 | Max-width container: 1280px |

## Spacing Scale
- Base unit: 4px
- Section padding: 80px (desktop), 48px (mobile)
- Container max-width: 1280px with 16px side padding
- Card gap: 16px (mobile), 24px (desktop)

## Sales-Driven Design Decisions
1. **Gold accents** on CTAs create luxury urgency
2. **Countdown timers** in monospace font (JetBrains Mono) feel technical/real
3. **Red danger color** only for urgency (low stock, sale prices)
4. **Dark background** makes product images pop
5. **No rounded corners** = edgy, streetwear-aligned, distinctive
6. **Announcement bar** creates FOMO with rotating messages
7. **Sticky mobile CTA** on PDP ensures add-to-cart is always visible
8. **Progress bar** for free shipping incentivizes higher cart values
