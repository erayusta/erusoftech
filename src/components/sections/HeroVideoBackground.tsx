'use client';

import * as React from 'react';

/**
 * Hero background, YouTube-backed.
 *
 * The embed uses every flag YouTube exposes to strip player chrome
 * (controls, title, related videos, keyboard shortcuts, fullscreen button,
 * end-screen). The iframe is then oversized and centered so any residual
 * chrome falls off-screen, and pointer-events are disabled so nothing
 * opens the YouTube overlay. The nocookie host keeps tracking out of the
 * page until playback starts.
 *
 * We also keep a static poster (public/placeholders/hero-poster.svg)
 * behind the iframe so there's no flash during the iframe load or if the
 * user has an adblocker / restrictive privacy extension.
 */
const YT_ID = 'g0sQeATLd4o';

const params = new URLSearchParams({
  autoplay: '1',
  mute: '1',
  loop: '1',
  playlist: YT_ID, // loop=1 only works when playlist is set
  controls: '0',
  showinfo: '0',
  rel: '0',
  modestbranding: '1',
  iv_load_policy: '3',
  disablekb: '1',
  fs: '0',
  playsinline: '1',
  cc_load_policy: '0',
});

const SRC = `https://www.youtube-nocookie.com/embed/${YT_ID}?${params.toString()}`;

export function HeroVideoBackground() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-ink-950">
      {/* Poster: shown until the iframe signals load, and as a fallback if
          the iframe never loads (adblocker / privacy extension / offline). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/placeholders/hero-poster.svg"
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/*
        Oversized, centered iframe so YouTube's top/bottom chrome (progress
        bar, brief title, watermark) lives off the visible area.
        - width: 177.78vh / height: 56.25vw  = classic 16:9 viewport-cover
        - scale(1.25) hides the ~5% of player chrome near edges
        - opacity 0.55 matches the previous local <video> balance
      */}
      <iframe
        src={SRC}
        title=""
        aria-hidden
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setLoaded(true)}
        className="absolute left-1/2 top-1/2 border-0"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: '177.78vh',
          height: '56.25vw',
          transform: 'translate(-50%, -50%) scale(1.25)',
          opacity: 0.55,
        }}
      />
    </div>
  );
}
