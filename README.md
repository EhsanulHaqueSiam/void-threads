# VOID THREADS

Premium streetwear e-commerce website built with modern web technologies. Dark luxury aesthetic with sales psychology-driven UX designed to maximize conversions.

![VOID THREADS](https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80)

## Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Language:** TypeScript
- **UI:** React 19
- **Framework:** [TanStack Start](https://tanstack.com/start) v1
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Carousel:** Embla Carousel
- **Validation:** Zod

## Features

### Pages
- **Home** — Full-viewport hero with cinematic animations, featured collections, trending carousel, social proof, UGC gallery, newsletter, brand story, trust badges
- **Collections** — Filter by size/color/price, sort options, Quick View modal, product grid
- **Product Detail** — Image gallery with zoom, color/size selectors, reviews, "You Might Also Like", "Complete the Look" with bundle CTA, recently viewed
- **Cart** — Full cart with order summary, promo codes, "Complete Your Set" recommendations, free shipping progress bar
- **About** — Parallax hero, brand story, animated stats, values grid
- **Contact** — Contact form with Zod validation, FAQ accordion

### Sales Psychology
- Countdown timers (drop urgency)
- Low stock indicators ("Only 3 left")
- Live viewer count ("15 people viewing")
- Live purchase notifications ("Sarah from LA just bought...")
- Free shipping progress bar
- Social proof counters (10K+ customers, 4.8★ rating)
- Exit-intent popup (15% off)
- Newsletter popup (10% off, timed + scroll triggers)
- Cross-sell "Complete the Look" with bundle add-to-cart
- "Complete Your Set" in cart (fills missing outfit categories)
- Trending "sold today" indicators
- Wishlist with heart toggle

### UX Polish
- Full-screen search overlay with trending suggestions
- Quick View modal on product cards
- Sticky mobile add-to-cart bar on product pages
- Back to top button
- Cursor-following spotlight effects on cards
- Magnetic CTA button on hero
- Ken Burns background animation
- Letter-by-letter headline reveal
- Parallax scrolling sections
- Scroll-triggered reveal animations
- Image hover swap on product cards
- Announcement bar with rotating messages + shimmer
- Responsive from 320px to 1920px
- Reduced motion support
- Keyboard navigation + ARIA labels

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (v1.0+)

### Install & Run

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
bun run build
```

## Project Structure

```
src/
├── components/
│   ├── cart/           # Cart drawer, items, shipping bar
│   ├── filters/        # Filter sidebar, sort dropdown
│   ├── forms/          # Contact form, newsletter form
│   ├── layout/         # Navbar, footer, announcement bar
│   ├── popups/         # Newsletter + exit-intent popups
│   ├── product/        # Product card, gallery, info, cross-sell
│   ├── sections/       # Home page sections
│   ├── shared/         # Reusable: scroll reveal, search, back-to-top
│   └── ui/             # Button, badge, modal, drawer, accordion, etc.
├── context/            # Cart + UI state (React Context)
├── data/               # Mock products, reviews, collections
├── hooks/              # Custom hooks (scroll, countdown, wishlist, etc.)
├── routes/             # TanStack Router file-based routes
├── styles/             # Tailwind CSS with @theme tokens
├── types/              # TypeScript interfaces
└── utils/              # Utilities (cn, format, constants, seo)
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `void` | `#0A0A0A` | Background |
| `smoke` | `#F5F5F5` | Primary text |
| `gold` | `#C9A84C` | Accent / CTA |
| `danger` | `#DC2626` | Urgency / sale |
| Font heading | Space Grotesk | Headings |
| Font body | Inter | Body text |
| Font mono | JetBrains Mono | Prices / timers |

No border-radius anywhere — sharp edges for streetwear aesthetic.

## Deployment

Currently configured for **Netlify** (see `netlify.toml`). The build outputs a standard Node.js server via Nitro, so it can be deployed anywhere.

## License

All rights reserved.
