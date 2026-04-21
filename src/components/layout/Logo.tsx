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
      className={cn('group inline-flex items-center gap-2.5 text-white', className)}
      aria-label="Erusoftech"
    >
      <span
        aria-hidden
        className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand shadow-glow-sm"
      >
        <span className="absolute inset-[2px] rounded-[6px] bg-ink-950/60" />
        <span className="relative text-sm font-black tracking-tight text-white">E</span>
      </span>
      <span className="text-base font-semibold tracking-tight">
        erus<span className="text-brand-300">oft</span>ech
      </span>
    </Link>
  );
}
