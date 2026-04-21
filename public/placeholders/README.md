# Placeholder assets

Replace these before launch. The site loads them by path, so keep filenames identical unless you update the source.

## Hero

- `hero-bg.mp4` — looping video background (muted). Keep ≤ 4 MB, ~10–15 s loop, AI / data / dashboard aesthetic. Dark tones preferred.
- `hero-poster.svg` — static fallback for the video (used before video loads and when `prefers-reduced-motion` is on).

## Logos (Partners banner)

- `logos/logo-1.svg` … `logos/logo-8.svg` — partner / product logos. Monochrome (white) on transparent. The banner renders them grayscale by default and colorizes on hover; if you want a specific brand color on hover, export a separate `logo-N-color.svg` pair.

## Case studies

- `cases/case-1.png`, `cases/case-2.png`, `cases/case-3.png` — dashboard UI previews. 1600×1000 recommended.

## Tech stack icons

- `tech/*.svg` — simple 64×64 icons for Next.js, Node.js, Docker, Kubernetes, AWS, PostgreSQL, etc.
