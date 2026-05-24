# Le Bambou Gorilla Lodge

Next.js website for Rwanda's premier eco-lodge near Volcanoes National Park.
Combines luxury accommodation booking with gorilla trekking experiences.

## Key Features

- Immersive gorilla trekking adventure showcases
- Responsive room displays with detailed amenities
- Sustainable tourism education portal
- Direct contact and inquiry system
- Cultural experience highlights
- Virtual lodge tour and gallery

## Tech Stack

Based on [Create T3 App](https://create.t3.gg/)

- [Next.js](https://nextjs.org) 14 (App Router)
- [Tailwind CSS](https://tailwindcss.com) with custom eco-themed palette
- [Drizzle ORM](https://orm.drizzle.team) for PostgreSQL integration
- [tRPC](https://trpc.io) for end-to-end type safety
- [Framer Motion](https://www.framer.com/motion/) for animations
- [PostHog](https://posthog.com) for product analytics, funnels, session replay, UX signals, and light error tracking
- [Google Analytics](https://analytics.google.com) for continuity with existing visitor tracking
- [Cloudflare](https://www.cloudflare.com) for DNS, CDN, aggregate traffic analytics, and R2-backed gallery assets
- Cloudflare Worker first-party proxy for PostHog ingestion at `https://e.lebambougorillalodge.com`

## Development

```bash
pnpm install
pnpm dev
```

## Deployment

The production migration target is Fly.io for the Next.js app, Neon for
Postgres, Resend for transactional email, and Cloudflare R2 for gallery assets.

Required Fly secrets:

```bash
fly secrets set \
  DATABASE_URL="postgres://..." \
  RESEND_API_KEY="re_..." \
  EMAIL_FROM="Le Bambou Gorilla Lodge <noreply@lebambougorillalodge.com>" \
  EMAIL_TO="info@lebambougorillalodge.com"
```

Gallery assets are uploaded to R2 with:

```bash
GALLERY_SOURCE_BASE_URL="https://current-gallery-source.example.com" \
R2_ACCOUNT_ID="..." \
R2_ACCESS_KEY_ID="..." \
R2_SECRET_ACCESS_KEY="..." \
R2_BUCKET="le-bambou-gallery" \
pnpm gallery:variants
```

If Wrangler is already logged in locally, the same migration can run without
R2 S3 keys:

```bash
GALLERY_SOURCE_BASE_URL="https://current-gallery-source.example.com" \
R2_UPLOAD_MODE="wrangler" \
R2_BUCKET="le-bambou-gallery" \
pnpm gallery:variants
```

Deploy with:

```bash
fly deploy
```

---

> "Preserving nature while creating unforgettable experiences" 🌍
