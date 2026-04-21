// Root redirect handled by next-intl middleware (default locale = tr).
// This file exists so Next.js doesn't complain about a missing root route
// before the middleware takes effect at runtime.
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
