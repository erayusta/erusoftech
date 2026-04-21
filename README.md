# Erusoftech

> Intelligent systems that power modern businesses — AI-driven CRM, CMS, SaaS platforms and scalable DevOps infrastructure.

A premium, enterprise-grade marketing website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Designed to convert B2B visitors into clients through clear technical storytelling and tight, tasteful motion.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom design tokens
- **Motion**: Framer Motion
- **i18n**: next-intl (Turkish primary, English-ready)
- **Icons**: lucide-react

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start the development server        |
| `npm run build`    | Production build                    |
| `npm run start`    | Start the production server         |
| `npm run lint`     | Lint the codebase                   |
| `npm run type-check` | TypeScript type check (no emit)   |

## Project structure

```
src/
├── app/                 # Next.js App Router (locale-aware)
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Services, Tech, Process, ...
│   └── ui/              # Button, Container, Section, GlowCard, ...
├── content/             # Section copy as typed constants (TR first)
├── i18n/                # next-intl config, message loaders
├── lib/                 # Utilities (cn, motion presets)
└── styles/              # globals.css
messages/                # Translation JSON files (tr.json, en.json)
public/                  # Static assets (placeholders for logos/videos)
```

## Design system

- **Theme**: Dark-first with subtle gradient surfaces (ink-950 → ink-900)
- **Accents**: Brand blue (`#2E6BFF`) → violet (`#8B5CF6`) → cyan (`#22D3EE`) gradient
- **Type**: System display + sans stack (swap in Geist/Inter locally if desired)
- **Surfaces**: Glassmorphism (`backdrop-blur` + translucent bg), subtle grid overlays
- **Motion**: Short, purposeful — entrance fades, hover glows, infinite marquee

## Branching

`main` is the production branch. All work lands through feature branches named `feat/*`, `chore/*`, or `fix/*`, merged with `--no-ff` to preserve history.

## Assets

All logos, videos, and imagery in this scaffold are **placeholders**. Replace them under `public/placeholders/` before launch.
