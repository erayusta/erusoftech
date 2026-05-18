import type { Metadata } from 'next';
import { CursorTrail } from '@/components/ui/CursorTrail';
import { defaultLocale } from '@/i18n/config';
import '@/styles/globals.css';

/**
 * Root layout.
 *
 * IMPORTANT: this layout wraps EVERY route in the app, including the
 * non-localised `/` redirect (src/app/page.tsx) and Next.js's auto-
 * generated `/_not-found`. Because of that we deliberately keep it free of
 * any next-intl Server APIs — `getLocale()`, `getTranslations()`, etc. all
 * read request headers under the hood, which marks the route as dynamic
 * and breaks static prerendering for `/` and `/_not-found` during the
 * production build on Vercel.
 *
 * For the URL-locale-aware <html lang>, see `src/app/[locale]/layout.tsx`,
 * where `<HtmlLangSync />` keeps `document.documentElement.lang` aligned
 * with the active locale. The static `defaultLocale` here is just the
 * initial value; it stays correct for the `/` redirect (which targets the
 * default locale anyway) and for the 404 page (which has no real locale
 * context).
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} className="dark">
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
