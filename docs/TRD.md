# VOID THREADS - Technical Requirements Document

## Runtime & Tooling
| Tool | Version | Purpose |
|------|---------|---------|
| Bun | Latest | Runtime, package manager, test runner |
| TypeScript | 5.7+ | Type safety |
| React | 19 | UI library |
| TanStack Start | v1 | Full-stack React framework (SSR/RSC) |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | v4 | Utility-first styling |
| Framer Motion | 11 | Animations & transitions |
| Lucide React | Latest | Icon library |
| Embla Carousel | Latest | Product carousels |
| Zod | Latest | Schema validation |
| clsx | Latest | Conditional classes |
| tailwind-merge | Latest | Merge Tailwind classes |
| @splinetool/react-spline | Latest | 3D elements via Spline |

## Architecture

### Directory Structure
```
src/
├── routes/           # TanStack Router file-based routes
│   ├── __root.tsx    # HTML shell, providers, layout
│   ├── index.tsx     # Home page
│   ├── about.tsx     # About page
│   ├── contact.tsx   # Contact page
│   ├── cart.tsx      # Cart page
│   ├── collections.tsx        # Collections layout
│   ├── collections.index.tsx  # All collections
│   └── collections.$slug.tsx  # Category page
│   └── products.$slug.tsx     # Product detail page
├── components/
│   ├── ui/           # Primitive UI components
│   ├── shared/       # Reusable composed components
│   ├── layout/       # Navbar, Footer, etc.
│   ├── sections/     # Home page sections
│   ├── product/      # Product-related components
│   ├── filters/      # Filter components
│   ├── cart/         # Cart components
│   ├── forms/        # Form components
│   └── popups/       # Popup/modal components
├── context/          # React context providers
├── hooks/            # Custom hooks
├── data/             # Mock data
├── types/            # TypeScript types
├── utils/            # Utility functions
└── styles/           # Global styles
```

### Routing
- TanStack Router with file-based routing
- `createFileRoute` for each route
- `validateSearch` with Zod for URL search params (filters, sort)
- Route loaders for data fetching
- `defaultPreload: 'intent'` for link preloading

### State Management
- **Cart:** useReducer + Context + localStorage persistence
- **UI State:** Context for drawer/modal/popup state
- **Filters:** URL search params (TanStack Router)
- **Recently Viewed:** localStorage

### Styling Approach
- Tailwind CSS v4 with `@theme` for design tokens
- `cn()` utility (clsx + tailwind-merge) for all components
- CSS custom properties for dynamic theming
- No CSS-in-JS beyond Tailwind

### Animation Strategy
- Framer Motion for:
  - Page transitions (AnimatePresence)
  - Scroll-triggered reveals (whileInView)
  - Hover/tap interactions
  - Layout animations
  - Staggered children
- `prefers-reduced-motion` media query respected
- Intersection Observer for scroll triggers

### Performance Strategy
- Image lazy loading via custom LazyImage component
- Font preloading in document head
- Code splitting via route-based chunks
- Optimized re-renders via React.memo where needed
- Debounced filter inputs

### Hosting & Deployment

**Current: Netlify Free Tier**
- Automatic deploys from git (push-to-deploy)
- Free SSL/TLS certificates (auto-renewed)
- Free global CDN distribution (edge network)
- Serverless functions (125K requests/month free)
- Netlify Forms (100 submissions/month free)
- Netlify Identity (1,000 active users free) — for future auth needs
- Netlify Analytics (if enabled, limited on free tier)
- Split testing / A/B testing (branch-based, free)
- Deploy previews on pull requests (free)
- Instant rollbacks to any previous deploy
- Custom domain + automatic HTTPS
- `netlify.toml` configures build command and publish directory
- Build command: `bun run build`
- Output directory: `.output/public`
- 100GB bandwidth/month on free tier
- 300 build minutes/month on free tier

**Future Migration Path**
- May migrate to a VPS (e.g., Hetzner, DigitalOcean, Linode) for more control, custom server-side logic, and cost efficiency at scale
- Or premium hosting (Vercel Pro, Railway, Fly.io) for managed infrastructure with better performance tiers
- Architecture is framework-agnostic for deployment — TanStack Start with Nitro outputs a standard Node.js server, so it can run anywhere (Docker, PM2, systemd, or any serverless platform)
- When migrating: update build/deploy scripts, configure reverse proxy (nginx/Caddy) if on VPS, set up CI/CD pipeline (GitHub Actions)
