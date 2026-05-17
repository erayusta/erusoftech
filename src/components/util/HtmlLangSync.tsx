'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';

/**
 * Keep <html lang="…"> in sync with the active next-intl locale on
 * client-side navigations.
 *
 * The root layout (src/app/layout.tsx) does set lang from getLocale() on
 * the initial server render, but it never re-renders when the user
 * switches language via the LanguageSwitcher — that's a client-side
 * router.replace() call, and Next.js does not re-render layouts above
 * the segment that changed. The html element therefore keeps the
 * old lang attribute, and CSS `text-transform: uppercase` keeps applying
 * the wrong casing rules (Turkish `i → İ` on the English site).
 *
 * Mounted inside [locale]/layout.tsx so it runs whenever the locale
 * segment re-renders.
 */
export function HtmlLangSync() {
  const locale = useLocale();

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
