import Link from 'next/link';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = '/' }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded-lg',
        className,
      )}
      aria-label="Erusoft — anasayfa"
    >
      <span className="wordmark-3d text-lg uppercase md:text-xl">Erusoft</span>
    </Link>
  );
}
