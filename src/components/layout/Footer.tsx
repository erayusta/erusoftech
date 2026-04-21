import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';

const GROUPS = [
  {
    key: 'company',
    links: [
      { key: 'about', href: '#about' },
      { key: 'careers', href: '#careers' },
      { key: 'privacy', href: '#privacy' },
      { key: 'terms', href: '#terms' },
    ],
  },
  {
    key: 'solutions',
    links: [
      { key: 'caseStudies', href: '#work' },
    ],
    // Solutions list is built from static hash links to in-page section ids
    staticLinks: [
      { label: 'AI Solutions', href: '#services' },
      { label: 'CRM Development', href: '#services' },
      { label: 'CMS Platforms', href: '#services' },
      { label: 'SaaS Development', href: '#services' },
      { label: 'DevOps & CI/CD', href: '#services' },
    ],
  },
  {
    key: 'resources',
    links: [
      { key: 'blog', href: '#blog' },
      { key: 'docs', href: '#docs' },
      { key: 'caseStudies', href: '#work' },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink-950 pb-10 pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px divider-fade"
      />
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/55">{t('tagline')}</p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="mailto:hello@erusoftech.com"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                aria-label="X/Twitter"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {GROUPS.map((group) => (
              <div key={group.key}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {t(`nav.${group.key}` as 'nav.company')}
                </h4>
                <ul className="space-y-2.5">
                  {group.links?.map((link) => (
                    <li key={`${group.key}-${link.key}`}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {t(`links.${link.key}` as 'links.about')}
                      </a>
                    </li>
                  ))}
                  {'staticLinks' in group &&
                    group.staticLinks?.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/45">
            © {year} Erusoftech. {t('rights')}
          </p>
          <p className="text-xs text-white/40">
            Made with precision. Istanbul · Berlin · Remote.
          </p>
        </div>
      </Container>
    </footer>
  );
}
