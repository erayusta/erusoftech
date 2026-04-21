'use client';

import * as React from 'react';

/**
 * Site-wide ribbon cursor trail.
 *
 * Paints a short glowing brand-gradient ribbon behind the pointer on a
 * fullscreen canvas. Older segments fade over ~700 ms so the ribbon
 * reads as "drawing while moving" rather than a permanent line.
 *
 * Behavior guardrails:
 *   - Skips entirely on coarse pointer devices (touch) where a cursor
 *     doesn't really exist
 *   - Respects prefers-reduced-motion
 *   - Uses `pointer-events: none` + fixed + high z-index so it never
 *     intercepts clicks, hovers, or text selection
 *   - Single canvas scaled to devicePixelRatio, hardware-accelerated
 *     strokes; CPU cost scales with sample count (capped at ~32)
 *
 * The trail runs on top of everything visually, with mix-blend: screen
 * so it adds light rather than covering content.
 */
type Sample = { x: number; y: number; t: number };

const LIFETIME = 700;      // ms — how long a sample stays visible
const MAX_SAMPLES = 34;    // keep the ribbon short and cheap
const MIN_DIST = 2.5;      // px — skip sub-pixel jitter
const BASE_WIDTH = 9;      // px — widest stroke at the head
const TAPER = 0.35;        // how aggressively the tail thins

export function CursorTrail() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const recompute = () => setEnabled(fine.matches && !reduce.matches);
    recompute();
    reduce.addEventListener?.('change', recompute);
    fine.addEventListener?.('change', recompute);
    return () => {
      reduce.removeEventListener?.('change', recompute);
      fine.removeEventListener?.('change', recompute);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const samples: Sample[] = [];

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const last = samples[samples.length - 1];
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;
      }
      samples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (samples.length > MAX_SAMPLES) samples.splice(0, samples.length - MAX_SAMPLES);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    const draw = () => {
      const now = performance.now();

      // Drop expired samples
      while (samples.length && now - samples[0].t > LIFETIME) samples.shift();

      ctx.clearRect(0, 0, w, h);

      if (samples.length >= 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // Draw from tail to head so the brightest head sits on top
        for (let i = 1; i < samples.length; i++) {
          const a = samples[i - 1];
          const b = samples[i];
          const ageA = (now - a.t) / LIFETIME;
          const ageB = (now - b.t) / LIFETIME;
          const lifeA = 1 - ageA;
          const lifeB = 1 - ageB;
          const life = Math.max(0, (lifeA + lifeB) / 2);
          if (life <= 0) continue;

          // Thickness tapers from head (newest) to tail (oldest)
          const headiness = i / samples.length; // 0..1 tail→head
          const width = BASE_WIDTH * (TAPER + (1 - TAPER) * headiness) * life;

          // Brand gradient along the segment
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          const alpha = Math.pow(life, 1.6) * 0.95;
          grad.addColorStop(0, `rgba(46,107,255,${alpha * 0.9})`);
          grad.addColorStop(0.5, `rgba(139,92,246,${alpha})`);
          grad.addColorStop(1, `rgba(34,211,238,${alpha * 0.85})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = width;
          ctx.shadowColor = `rgba(46,107,255,${0.55 * life})`;
          ctx.shadowBlur = 16 * life;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, w, h);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
