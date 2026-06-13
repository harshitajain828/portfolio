# Harshita Jain — Portfolio

Personal portfolio for Harshita Jain, an AI-native product & UI/UX designer.

Designed and built with an AI-native workflow. Live case studies, an interactive
deck-of-cards playground, and an editorial index — all hand-coded.

## Stack

- **Next.js 16** (App Router)
- **TypeScript** + **Tailwind CSS v4**
- **GSAP + ScrollTrigger** and **Lenis** for scroll-driven motion
- Type: Bricolage Grotesque · Inter Tight · Instrument Serif · Roboto Mono (`next/font`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Deploy

Zero-config on [Vercel](https://vercel.com) — framework preset is pinned to Next.js
via `vercel.json`. Set `NEXT_PUBLIC_SITE_URL` to the production domain so Open Graph
and sitemap URLs resolve correctly.

## Structure

```
src/
  app/            routes — home, work, work/[slug], about, contact, directory, playground
  components/     Hud, Loader, PageTransition, SmoothScroll, home/, case/
  lib/            projects.ts — case-study content
public/projects/  case-study imagery
```
