'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

/**
 * Dark glass card with a pointer-aware gradient highlight.
 * Tracks mouse position to render a soft spotlight on the card surface.
 */
export function GlowCard({
  className,
  children,
  interactive = true,
  ...rest
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--mx', `${x}%`);
      ref.current.style.setProperty('--my', `${y}%`);
    },
    [interactive],
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-card transition-colors duration-300',
        interactive && 'hover:border-white/15',
        className,
      )}
      style={
        {
          '--mx': '50%',
          '--my': '50%',
        } as React.CSSProperties
      }
      {...rest}
    >
      {interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mx) var(--my), rgba(46,107,255,0.18), transparent 60%)',
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
