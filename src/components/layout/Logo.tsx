import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  href?: string;
  /** Show the ERUSOFT wordmark next to the 3D mark. Default true. */
  withWordmark?: boolean;
};

export function Logo({ className, href = '/', withWordmark = true }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 text-white outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded-lg',
        className,
      )}
      aria-label="Erusoft — anasayfa"
    >
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
        <Image
          src="/brand/logo-mark.webp"
          alt=""
          aria-hidden
          width={144}
          height={144}
          sizes="36px"
          priority
          className="h-full w-full object-contain drop-shadow-[0_0_14px_rgba(46,107,255,0.45)] transition-transform duration-300 group-hover:scale-[1.06]"
        />
      </span>
      {withWordmark && (
        <span className="text-base font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:text-white">
          Erusoft
        </span>
      )}
    </Link>
  );
}
