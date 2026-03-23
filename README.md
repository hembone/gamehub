# Arcade Void

A free online game hub with 1,400+ browser-based games. No downloads required.

**Live site:** [arcadevoid.games](https://arcadevoid.games)

## Tech Stack

- **Framework:** TanStack Start + TanStack Router (file-based routing)
- **UI:** React 19, Tailwind CSS 4
- **Server:** Nitro, Neon serverless Postgres (play tracking)
- **Build:** Vite 7, TypeScript 5.7
- **Hosting:** Vercel

## Getting Started

```bash
pnpm install
pnpm dev        # starts dev server on port 3000
```

### Other Scripts

| Script | Description |
|---|---|
| `pnpm build` | Generate sitemap + production build |
| `pnpm serve` | Preview production build |
| `pnpm test` | Run tests (Vitest) |
| `pnpm sitemap` | Regenerate sitemap.xml |

### Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL=<your Neon Postgres connection string>
```

## Project Structure

```
src/
  routes/         # Pages — index, games.$slug, category.$cat
  components/     # UI — GameCard, GameGrid, GameModal, Header, CategoryPills, etc.
  data/           # Game catalog (JSON) and transformers
  hooks/          # useTheme, useFavorites, useRecentlyPlayed
  server/         # Server functions (play count tracking)
  utils/          # Shuffle, web vitals
  config.ts       # Site name, URL, description
  styles.css      # Global styles + Tailwind
```

## Features

- **1,400+ games** loaded from two sources (onlinegames + htmlgames), played via iframe
- **Dual themes** — synthwave (dark neon) and edu (education-friendly), persisted to localStorage
- **10 categories** — action, puzzle, match3, cards, mahjong, block, racing, shooter, strategy, sports
- **Game activity tracking** — play counts stored in Neon Postgres via TanStack Start server functions
- **Client-side activity** — recently played and favorites via localStorage
- **SEO** — JSON-LD structured data, auto-generated sitemap, per-page canonical URLs and meta tags
- **Monetization** — Google AdSense integration with theme-aware ad slots
- **Web Vitals** — LCP, CLS, INP, FCP, TTFB tracking
