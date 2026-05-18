'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

/**
 * Keeps <html lang> in sync with the active next-intl locale on the client.
 *
 * The root layout (src/app/layout.tsx) intentionally renders <html> with
 * the static `defaultLocale` so it can be statically prerendered for
 * `/` and `/_not-found` — see the comment block in that file for the full
 * reasoning. This component lives inside `[locale]/layout.tsx`, so it
 * only runs on URL-routed pages where a real locale is available, and
 * updates the attribute after hydration.
 *
 * Why it matters: CSS `text-transform: uppercase` is locale-aware in
 * browsers. With the wrong `lang` value the Turkish casing rule kicks in
 * on English pages and the Hero eyebrow reads
 * "AI-DRİVEN ENGİNEERİNG STUDİO" on /en. Syncing here brings the visible
 * casing back in line with the URL.
 */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
