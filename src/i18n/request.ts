import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

/**
 * next-intl request config.
 *
 * As of next-intl 3.22 the `locale` parameter passed into this callback is
 * deprecated in favour of `await requestLocale` — it returns the locale the
 * middleware (or `setRequestLocale`) attached to the current request. Using
 * `requestLocale` is required for static rendering to keep working: the
 * legacy `locale` arg implicitly reads request headers and forces every
 * route into dynamic mode, which breaks the prerender for `/` and
 * `/_not-found` during production builds.
 *
 * See: https://next-intl.dev/blog/next-intl-3-22#await-request-locale
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const resolved = (requested ?? defaultLocale) as Locale;
  if (!locales.includes(resolved)) notFound();

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
