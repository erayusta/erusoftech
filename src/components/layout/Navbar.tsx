'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { key: 'services', href: '#services' },
  { key: 'technology', href: '#technology' },
  { key: 'process', href: '#process' },
  { key: 'work', href: '#work' },
  { key: 'contact', href: '#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 transition-all duration-300 md:px-6',
            scrolled
              ? 'glass-strong border border-white/10 py-2.5 shadow-card'
              : 'border border-transparent py-3',
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact" size="md" icon>
              {t('cta')}
            </Button>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mt-2 overflow-hidden rounded-2xl border border-white/10 p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button href="#contact" size="md" icon className="w-full">
                  {t('cta')}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
