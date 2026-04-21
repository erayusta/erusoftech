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
        {/* Translucent color-grade tint on top of the video: adds the brand
            cobalt/violet wash without blacking out the footage underneath. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46,107,255,0.22), transparent 60%), ' +
              'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139,92,246,0.18), transparent 60%)',
          }}
        />
        {/* Top & bottom vignettes so the headline and CTAs read cleanly
            without hiding the middle of the frame. */}
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,6,10,0.75), rgba(5,6,10,0))',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{
            background:
              'linear-gradient(to top, rgba(5,6,10,0.85), rgba(5,6,10,0))',
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-60" />
        <div className="noise" />
        <div
          className="absolute -top-32 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(46,107,255,0.45), transparent 60%)',
          }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.4), transparent 60%)',
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
