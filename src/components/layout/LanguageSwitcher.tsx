'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter, locales } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

const LOCALE_LABELS: Record<Locale, { code: string; name: string }> = {
  tr: { code: 'TR', name: 'Türkçe' },
  en: { code: 'EN', name: 'English' },
};

type Props = {
  variant?: 'desktop' | 'mobile';
};

export function LanguageSwitcher({ variant = 'desktop' }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  if (variant === 'mobile') {
    return (
      <div className="px-1 py-2">
        <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Language
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {locales.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors',
                  active
                    ? 'border-brand-400/40 bg-brand-500/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06]',
                )}
                aria-current={active ? 'true' : undefined}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{LOCALE_LABELS[l].code}</span>
                  <span className="text-xs text-white/55">{LOCALE_LABELS[l].name}</span>
                </span>
                {active && <Check className="h-3.5 w-3.5 text-brand-300" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80 transition-all hover:border-white/20 hover:text-white',
          open && 'border-white/20 bg-white/[0.08] text-white',
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="tabular-nums">{LOCALE_LABELS[locale].code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            className="glass-strong absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 p-1 shadow-card"
          >
            {locales.map((l) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => switchTo(l)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                      active
                        ? 'bg-brand-500/15 text-white'
                        : 'text-white/75 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-7 text-xs font-semibold tabular-nums text-white/90">
                        {LOCALE_LABELS[l].code}
                      </span>
                      <span className="text-xs text-white/60">{LOCALE_LABELS[l].name}</span>
                    </span>
                    {active && <Check className="h-3.5 w-3.5 text-brand-300" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
