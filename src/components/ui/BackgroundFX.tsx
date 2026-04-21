import { cn } from '@/lib/cn';

type Props = {
  variant?: 'hero' | 'subtle' | 'grid';
  className?: string;
};

/**
 * Decorative background layer. Placed behind section content with aria-hidden
 * to avoid polluting the accessibility tree.
 */
export function BackgroundFX({ variant = 'subtle', className }: Props) {
  if (variant === 'hero') {
    return (
      <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="noise" />
        <div
          className="absolute -top-32 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(46,107,255,0.5), transparent 60%)',
          }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.5), transparent 60%)',
          }}
        />
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
        <div className="absolute inset-0 grid-overlay opacity-60" />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
      <div
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(46,107,255,0.6), transparent 60%)',
        }}
      />
    </div>
  );
}
