# VOID THREADS - Project Rules

## Package Manager & Runtime
- **ALWAYS use Bun** — never npm, pnpm, or yarn
- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env files — don't use dotenv

## Documentation
- `docs/PRD.md` — Product requirements, sales features, pages, performance targets
- `docs/TRD.md` — Tech stack, architecture, directory structure, animation strategy
- `docs/DESIGN.md` — Colors, typography, components, animations, page topology, 21st.dev and Spline design decisions

## Tech Stack
- **Runtime:** Bun
- **Framework:** TanStack Start v1 (vite.config.ts + nitro)
- **UI:** React 19
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4 (with `@theme` tokens in `src/styles/app.css`)
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Carousel:** Embla Carousel
- **Validation:** Zod

## Key Patterns
- `cn()` utility from `src/utils/cn.ts` — used in every component
- `ScrollReveal` wrapper — wraps sections for scroll animations
- `LazyImage` — all images route through this for lazy loading
- Cart context via `useCart()` hook — consumed across app
- URL search params with Zod validation for filter state
- `getRouter()` in `src/router.tsx` — TanStack Start entry point

## Design Aesthetic
- Dark luxury: bg `#0A0A0A`, text `#F5F5F5`, gold accents `#C9A84C`
- Sharp edges (no border-radius) except badges (2px)
- Space Grotesk for headings, Inter for body, JetBrains Mono for prices
- No rounded corners — reinforces edgy streetwear aesthetic
- Sales-psychology driven UX (scarcity, social proof, FOMO, trust signals)

## Hosting
- **Current:** Netlify free tier (using all free features available)
- **Future:** May migrate to VPS or premium hosting provider

## Dev Commands
```bash
bun install          # Install dependencies
bun run dev          # Start dev server at localhost:3000
bun run build        # Production build
bun run start        # Start production server
```
