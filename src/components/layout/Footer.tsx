import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';

type GroupKey = 'company' | 'solutions' | 'resources';

type LinkRow = { label: string; href: string };

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const groups: { key: GroupKey; rows: LinkRow[] }[] = [
    {
      key: 'company',
      rows: [
        { label: t('links.about'), href: '/about' },
        { label: t('links.careers'), href: '#careers' },
        { label: t('links.privacy'), href: '#privacy' },
        { label: t('links.terms'), href: '#terms' },
      ],
    },
    {
      key: 'solutions',
      rows: [
        { label: 'AI Solutions', href: '#services' },
        { label: 'CRM Development', href: '#services' },
        { label: 'CMS Platforms', href: '#services' },
        { label: 'SaaS Development', href: '#services' },
        { label: 'DevOps & CI/CD', href: '#services' },
      ],
    },
    {
      key: 'resources',
      rows: [
        { label: t('links.blog'), href: '#blog' },
        { label: t('links.docs'), href: '#docs' },
        { label: t('links.caseStudies'), href: '#work' },
      ],
    },
  ];

  const groupLabel: Record<GroupKey, string> = {
    company: t('nav.company'),
    solutions: t('nav.solutions'),
    resources: t('nav.resources'),
  };

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
              {[
                { href: 'mailto:hello@erusoftech.com', label: 'Email', Icon: Mail },
                { href: 'https://github.com', label: 'GitHub', Icon: Github },
                { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
                { href: 'https://x.com', label: 'X/Twitter', Icon: Twitter },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.key}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {groupLabel[group.key]}
                </h4>
                <ul className="space-y-2.5">
                  {group.rows.map((row) => {
                    const isInternalRoute = row.href.startsWith('/');
                    const className =
                      'text-sm text-white/70 transition-colors hover:text-white';
                    return (
                      <li key={`${group.key}-${row.label}`}>
                        {isInternalRoute ? (
                          <Link href={row.href} className={className}>
                            {row.label}
                          </Link>
                        ) : (
                          <a href={row.href} className={className}>
                            {row.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/45">
            © {year} Erusoft. {t('rights')}
          </p>
          <p className="text-xs text-white/40">
            Made with precision. Istanbul · Berlin · Remote.
          </p>
        </div>
      </Container>
    </footer>
  );
}
