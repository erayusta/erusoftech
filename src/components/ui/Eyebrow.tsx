import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Eyebrow({ className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur',
        className,
      )}
      {...rest}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(46,107,255,0.7)]" />
      {children}
    </div>
  );
}
