'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type NavItem = {
  key: 'about' | 'services' | 'technology' | 'process' | 'work' | 'contact';
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '#services' },
  { key: 'technology', href: '#technology' },
  { key: 'process', href: '#process' },
  { key: 'work', href: '#work' },
  { key: 'contact', href: '#contact' },
];

const NAV_ITEM_CLASS =
  'rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white';

function isInternalRoute(href: string) {
  return href.startsWith('/');
}

function NavLink({
  href,
  className = NAV_ITEM_CLASS,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

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
              <NavLink key={item.key} href={item.href}>
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher variant="desktop" />
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
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {t(item.key)}
                  </NavLink>
                </li>
              ))}
              <li className="my-2 border-t border-white/5 pt-2">
                <LanguageSwitcher variant="mobile" />
              </li>
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
