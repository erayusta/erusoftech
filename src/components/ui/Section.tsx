import { cn } from '@/lib/cn';
import { Container } from './Container';

type Props = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  size?: 'default' | 'wide' | 'narrow';
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  size = 'default',
  className,
  children,
}: Props) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      <Container size={size}>
        {(eyebrow || title || subtitle) && (
          <div
            className={cn(
              'mb-12 md:mb-16',
              align === 'center' && 'mx-auto max-w-3xl text-center',
              align === 'left' && 'max-w-3xl',
            )}
          >
            {eyebrow && (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-300/90">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-display-3 font-semibold text-balance text-white">{title}</h2>
            )}
            {subtitle && <p className="mt-5 text-lg text-white/60 text-balance">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
