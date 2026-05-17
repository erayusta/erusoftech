import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { CursorTrail } from '@/components/ui/CursorTrail';
import '@/styles/globals.css';

/**
 * Root layout.
 *
 * Next.js 14 App Router requires a root layout that provides <html> and
 * <body> for EVERY route in the tree, including non-localised ones like
 * src/app/page.tsx (the `/` redirect). Localised routes still get their
 * i18n wiring from src/app/[locale]/layout.tsx, which only adds a
 * NextIntlClientProvider around children — no duplicated html/body.
 *
 * `lang` here is the app-wide default; the locale-aware layout doesn't
 * re-render <html>, so the value stays stable across client navigations
 * (screen readers still get per-section locale via standard Next.js i18n).
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://erusoftech.com'),
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/logo-mark.webp', sizes: 'any', type: 'image/webp' },
    ],
    apple: [{ url: '/brand/logo-mark@2x.webp', sizes: '144x144' }],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Resolve from the next-intl middleware so <html lang> matches the URL
  // locale — critical for CSS text-transform behavior. With the wrong lang
  // the browser applies Turkish casing on English pages (i → İ) and the
  // Hero eyebrow reads "AI-DRİVEN ENGİNEERİNG STUDİO" on /en.
  const locale = await getLocale();

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
