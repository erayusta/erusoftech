'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Space background — a dark-ambient layer rendered behind the site content.
 *
 * Two layers:
 *  - StarCanvas: ~120 drifting, twinkling dots in a single <canvas>, fully
 *    decorative (pointer-events: none).
 *  - MeteorField: 4–6 DOM meteors that drift slowly. Each has a small hit
 *    target so it can be grabbed and flung with the mouse; a velocity-based
 *    multi-shadow glow gives the impression of a comet trail.
 *
 * Exclusion behaviour:
 *  - Scroll-driven opacity hides the layer over the hero, so the hero's own
 *    video / atmosphere reads cleanly.
 *  - Honors prefers-reduced-motion (renders nothing).
 *  - Pauses the RAF loop while the tab is hidden.
 */
export function SpaceBackground() {
  const reducedMotion = useReducedMotion();
  const [opacity, setOpacity] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const start = window.innerHeight * 0.5;
        const end = window.innerHeight * 0.95;
        const t = Math.max(0, Math.min(1, (y - start) / (end - start)));
        setOpacity(t);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [mounted]);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ opacity, transition: 'opacity 200ms linear' }}
    >
      <StarCanvas />
      <MeteorField />
    </div>
  );
}

// ---------- Stars ----------

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

function StarCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      const target = Math.min(140, Math.floor((width * height) / 14000));
      stars = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        size: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.0018 + 0.0006,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = width + 2;
        else if (s.x > width + 2) s.x = -2;
        if (s.y < -2) s.y = height + 2;
        else if (s.y > height + 2) s.y = -2;

        const alpha =
          s.baseAlpha * (0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = '#dce4ff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    initStars();
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      initStars();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

// ---------- Meteors ----------

type MeteorMeta = {
  id: number;
  size: number;
  hue: number;
};

type MeteorPhysics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const HIT_RADIUS = 18; // half of 36px hit target

function MeteorField() {
  const [metas, setMetas] = React.useState<MeteorMeta[]>([]);
  const physicsRef = React.useRef<Map<number, MeteorPhysics>>(new Map());
  const elementsRef = React.useRef<Map<number, HTMLDivElement | null>>(new Map());
  const draggingIdRef = React.useRef<number | null>(null);
  const dragSamplesRef = React.useRef<{ x: number; y: number; t: number }[]>([]);

  React.useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = w < 768 ? 3 : 5;

    const initial: MeteorMeta[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 6, // 6–9px head
      hue: 210 + Math.random() * 50, // blue → violet range
    }));

    physicsRef.current = new Map(
      initial.map((m) => [
        m.id,
        {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
        },
      ]),
    );

    setMetas(initial);
  }, []);

  // Physics loop. Mutates DOM directly via element refs — no React re-renders
  // per frame, so this stays cheap.
  React.useEffect(() => {
    if (metas.length === 0) return;

    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      physicsRef.current.forEach((p, id) => {
        if (draggingIdRef.current !== id) {
          // gentle baseline drift floor — keep things alive
          const minDrift = 0.15;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed < minDrift) {
            const angle = Math.atan2(p.vy || 1e-3, p.vx || 1e-3);
            p.vx = Math.cos(angle) * minDrift;
            p.vy = Math.sin(angle) * minDrift;
          } else if (speed > minDrift * 1.5) {
            // friction once flung
            p.vx *= 0.992;
            p.vy *= 0.992;
          }

          p.x += p.vx;
          p.y += p.vy;

          // wrap with margin so respawn isn't visible
          const m = 60;
          if (p.x < -m) p.x = w + m;
          else if (p.x > w + m) p.x = -m;
          if (p.y < -m) p.y = h + m;
          else if (p.y > h + m) p.y = -m;
        }

        const el = elementsRef.current.get(id);
        if (!el) return;

        const speed = Math.hypot(p.vx, p.vy);
        // Soft layered glow opposite to velocity vector — reads as a trail.
        const head = el.firstElementChild as HTMLDivElement | null;
        if (head) {
          const layers: string[] = [];
          const trailScale = Math.min(speed * 6, 8);
          for (let i = 1; i <= 4; i++) {
            const a = (0.45 - i * 0.08) * Math.min(1, 0.4 + speed * 0.6);
            if (a <= 0) continue;
            const ox = -p.vx * i * trailScale;
            const oy = -p.vy * i * trailScale;
            const blur = 4 + i * 2;
            layers.push(`${ox.toFixed(2)}px ${oy.toFixed(2)}px ${blur}px rgba(160,180,255,${a.toFixed(3)})`);
          }
          // ambient ring stays even when stationary
          layers.push('0 0 14px rgba(140,170,255,0.35)');
          head.style.boxShadow = layers.join(', ');
        }

        el.style.transform = `translate3d(${p.x - HIT_RADIUS}px, ${p.y - HIT_RADIUS}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [metas.length]);

  const onMeteorPointerDown = (e: React.PointerEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';

    draggingIdRef.current = id;
    const p = physicsRef.current.get(id);
    if (p) {
      p.vx = 0;
      p.vy = 0;
    }
    dragSamplesRef.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
  };

  const onMeteorPointerMove = (e: React.PointerEvent<HTMLDivElement>, id: number) => {
    if (draggingIdRef.current !== id) return;
    const p = physicsRef.current.get(id);
    if (!p) return;
    p.x = e.clientX;
    p.y = e.clientY;

    const samples = dragSamplesRef.current;
    samples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (samples.length > 12) samples.shift();
  };

  const releaseMeteor = (e: React.PointerEvent<HTMLDivElement>, id: number) => {
    if (draggingIdRef.current !== id) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grab';

    const p = physicsRef.current.get(id);
    const samples = dragSamplesRef.current;
    if (p && samples.length >= 2) {
      const last = samples[samples.length - 1];
      const cutoff = last.t - 80;
      let prev = samples[0];
      for (let i = samples.length - 2; i >= 0; i--) {
        prev = samples[i];
        if (samples[i].t < cutoff) break;
      }
      const dt = Math.max(8, last.t - prev.t);
      // px per ms → px per frame (~16ms)
      const scale = 14;
      p.vx = ((last.x - prev.x) / dt) * scale;
      p.vy = ((last.y - prev.y) / dt) * scale;

      // cap maximum speed so a wild fling doesn't spike
      const max = 18;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > max) {
        p.vx = (p.vx / sp) * max;
        p.vy = (p.vy / sp) * max;
      }
    }

    draggingIdRef.current = null;
    dragSamplesRef.current = [];
  };

  return (
    <>
      {metas.map((m) => (
        <div
          key={m.id}
          ref={(el) => {
            elementsRef.current.set(m.id, el);
          }}
          onPointerDown={(e) => onMeteorPointerDown(e, m.id)}
          onPointerMove={(e) => onMeteorPointerMove(e, m.id)}
          onPointerUp={(e) => releaseMeteor(e, m.id)}
          onPointerCancel={(e) => releaseMeteor(e, m.id)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: HIT_RADIUS * 2,
            height: HIT_RADIUS * 2,
            cursor: 'grab',
            pointerEvents: 'auto',
            touchAction: 'none',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: m.size,
              height: m.size,
              marginTop: -m.size / 2,
              marginLeft: -m.size / 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,0.95) 0%, hsla(${m.hue},90%,82%,0.7) 45%, transparent 75%)`,
              boxShadow: '0 0 14px rgba(140,170,255,0.35)',
              pointerEvents: 'none',
            }}
          />
        </div>
      ))}
    </>
  );
}
