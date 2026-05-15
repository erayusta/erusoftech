import { ImageResponse } from 'next/og';

/**
 * Site-wide Open Graph card.
 *
 * Next.js auto-discovers this file convention and uses it as the og:image
 * (and, via twitter-image.tsx re-exporting from here, the twitter:image)
 * for every route in the app. Per-route generateMetadata calls don't need
 * to set images themselves unless they want to override.
 *
 * Runs on the Edge runtime so the image is rendered fast at request time
 * rather than at build time — keeps things fresh if the design changes.
 */

export const runtime = 'edge';
export const alt = 'Erusoft — Üretim hattı kalitesinde mühendislik';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05060a',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand-color radial glow above the wordmark */}
        <div
          style={{
            position: 'absolute',
            top: -240,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1200,
            height: 900,
            background:
              'radial-gradient(ellipse at center, rgba(46,107,255,0.45) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)',
            filter: 'blur(40px)',
            display: 'flex',
          }}
        />

        {/* Faint grid overlay (very subtle) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            display: 'flex',
            opacity: 0.6,
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 600,
            color: '#80a9ff',
            letterSpacing: 8,
            marginBottom: 28,
          }}
        >
          AI-DRIVEN ENGINEERING STUDIO
        </div>

        {/* Brand wordmark — gradient */}
        <div
          style={{
            display: 'flex',
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -6,
            backgroundImage:
              'linear-gradient(135deg, #ffffff 0%, #cfd9ff 45%, #80a9ff 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1,
          }}
        >
          ERUSOFT
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            color: 'rgba(255,255,255,0.72)',
            marginTop: 32,
            textAlign: 'center',
            maxWidth: 960,
            lineHeight: 1.3,
          }}
        >
          Üretim hattı kalitesinde mühendislik · 2015'ten bu yana
        </div>

        {/* Bottom URL bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <span
            style={{
              display: 'flex',
              fontSize: 22,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 6,
            }}
          >
            ERUSOFT.COM
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
