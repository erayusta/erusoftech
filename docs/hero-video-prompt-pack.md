# Hero background video — AI prompt pack (Google Veo 3 / Flow)

A 30-second hero background for the Erusoftech landing page.

Veo 3 / Flow generates **~8 s per clip**, so the 30 s target is produced as
**4 × 8 s clips** then joined with short crossfades. The prompts below share
a common *style header* so all four clips feel like they came from the same
camera and color grader.

---

## 1. Global style anchor (prepend to every scene)

Paste this block at the top of each scene prompt. It locks the look so the
four clips feel like one continuous piece.

```
Style: cinematic, photoreal, enterprise tech aesthetic, subtle volumetric fog,
soft anamorphic lens bokeh, ultra-high detail, 35mm sensor look, shallow depth
of field, 24fps motion, gentle film grain, faint chromatic aberration,
slow deliberate camera motion — never shaky, never whip-pans.

Color palette: near-black background (#05060A / deep navy),
electric cobalt accents (#2E6BFF), violet/indigo glows (#8B5CF6),
clean cyan highlights (#22D3EE). Absolutely no warm tones.
High contrast, deep blacks, specular highlights feel liquid.

Mood: calm, powerful, intelligent, premium, confident. Like a Stripe promo
film directed by Denis Villeneuve. No rush. No chaos.

Technical:
- 16:9 aspect, 1920×1080, 24 fps
- Low to mid brightness overall (frames must work under large white text)
- Keep the center ~40% of the frame visually quieter (text overlays live there)
- Avoid any human faces, logos, brand marks, readable UI text
- Avoid overt "data visualization cliché" (spinning globes, ticker tape, binary rain)
```

### Negative prompt (attach to every scene)

```
people, faces, hands, text, letters, readable words, logos, brand names,
UI that says things, neon signs with text, stock footage look, lens flares,
cheesy holograms, cartoonish, oversaturated, yellow/orange/red tones,
warm lighting, earth tones, daylight, outdoor sunlight, sky, clouds,
shaky camera, dutch angle, whip pan, fast cuts, quick zoom,
vignette overload, heavy film grain, noise, compression artifacts
```

### Seed / consistency

- Generate the **first scene first**, pick the best take, then use that
  clip as an **"image-to-video" style reference / seed** for the next three
  prompts (Flow → "Use as style reference" or Veo 3 → supply last frame as
  input image). This is the #1 trick for coherent multi-clip hero films.
- Keep the **same seed number** across all four generations if the tool
  exposes it.

---

## Scene 1 — "Ignition" (0:00 → 0:08)

> The piece begins in near-darkness, then a single light source ignites and
> fans out into a structured network. Sets the tone: from nothing, we build
> intelligence.

```
[STYLE HEADER ABOVE]

Scene: Extreme close-up on a single point of deep cobalt light suspended in
a dark volumetric void, surrounded by slowly drifting particulate dust in
shallow focus. At 0:02 the point pulses and spawns a fine web of crisp
electric-blue filaments that fan outward in three dimensions, tracing
delicate geometric pathways — like the first neurons of a network
awakening. Filaments have a liquid-metal specular quality, bending light
as they extend. Background remains almost black, with faint violet rim
illumination in the far depth.

Camera: locked at first, then a very slow dolly-in at 0:03 — less than
10cm of travel across the full clip — coupled with an imperceptible focus
pull from the drifting dust onto the pulsing core. No pan, no tilt.

Lighting: single key from the core light itself, soft violet rim from
screen-left, no ambient fill. High dynamic range — the core sits at
near-white, background sits at true 0% black.

Detail: at the scale of the filaments, tiny nodes briefly flash cyan as
the network grows. The growth pattern feels intentional, algorithmic,
never random.

End frame (last 0.5s): filaments have reached ~60% of frame; the piece
freezes for a beat, ready to hand off to scene 2.

Duration: 8 seconds, 24 fps.
```

---

## Scene 2 — "Lattice" (0:08 → 0:16)

> The network from scene 1 now exists at architectural scale. The camera
> moves *through* it. This is the "our infrastructure is your infrastructure"
> beat.

```
[STYLE HEADER ABOVE]

Scene: Camera glides through an immense three-dimensional lattice of
softly glowing cobalt and violet nodes connected by fine luminous edges —
read as an abstract, stylized representation of a distributed system at
planetary scale. The lattice is not a cube or sphere; it flows organically,
denser near the center, thinner at the edges, like a living graph.
Some edges pulse gently as if data is travelling along them — NOT flashy
packets, just soft brightness waves that move end-to-end over ~1 second.

Camera: slow continuous dolly forward through the lattice on a curved path,
passing close to several nodes, parallaxing rear nodes behind front ones.
Subtle roll — less than 2 degrees total — to give the motion life without
disorienting. Never cut; one continuous shot.

Lighting: self-illuminated nodes are the primary light source. Faint cyan
volumetric fog reveals depth. Absolutely no external lights.

Detail: depth-of-field is significant — the foremost nodes are sharp, the
middle layer is in focus, and the far layer falls into a soft bokeh of
blue and violet. Occasionally a bright cyan pulse travels along a far
edge and briefly reveals structure behind it.

End frame: camera approaches a denser cluster of nodes; the cluster will
become the "brain" in scene 3.

Duration: 8 seconds, 24 fps.
```

---

## Scene 3 — "Cognition" (0:16 → 0:24)

> Close to the densest cluster: the network is *thinking*. Micro-detail,
> warm-adjacent (but still cool) activations, the feel of computation.

```
[STYLE HEADER ABOVE]

Scene: Macro perspective on a dense cluster of the lattice nodes. Inside
each node, soft activation pulses ripple — faint concentric rings of
cobalt and cyan expanding and dissolving, suggesting inference in
progress. The cluster is slightly less organized than the outer lattice;
it feels like the "brain" of the system. Edges between nodes light up in
short, rhythmic bursts that suggest data exchange — reminiscent of a
Kenshi Yonezu / LP-style abstract reactive visualizer, but far more
restrained and premium.

Camera: tight, slow orbital arc around the cluster — ~15 degrees total
travel. Keep a consistent focal plane on the brightest node; other nodes
drift through focus as the camera moves.

Lighting: purely from the activations. Rim of the cluster is
warm-violet (never warm-orange). Background is almost fully black.

Detail: at 0:21 a single crisp cyan pulse shoots from the cluster outward
into the dark, trailing a thin specular line — this is the "moment of
insight" beat. Just one. Subtle. Don't turn it into fireworks.

End frame: the cyan pulse is about to leave the frame; scene 4 picks it
up as it travels.

Duration: 8 seconds, 24 fps.
```

---

## Scene 4 — "Scale" (0:24 → 0:30)

> Pull-back reveal: the cluster was tiny compared to the network, and the
> network itself is vast. Ends on a calm, balanced composition that a
> headline can sit on.

```
[STYLE HEADER ABOVE]

Scene: The cyan pulse from scene 3 streaks across negative space for
half a second, then the camera executes a slow, smooth pull-back — the
cluster recedes into the middle of frame and the entire lattice from
scene 2 is revealed at an even grander scale around it, now clearly
read as a stylized nervous system or constellation of interconnected
systems. The motion slows to a near-stop around 0:28.

Camera: continuous dolly-back on a straight line, easing into a gentle
stop by 0:29.5. No rotation, no tilt. The framing at rest must leave the
center 40% of the frame quiet, with most of the lattice density in the
bottom third and the upper third nearly empty — this is where the
headline sits.

Lighting: as the camera pulls back, more nodes come into view; overall
frame brightness rises slightly but stays well below 40% average
luminance. Cyan highlights punctuate the mid-ground.

Detail: at 0:29 the motion is nearly still, a few soft pulses continue
inside the lattice — the system is alive and breathing, waiting. The
final 0.5 s holds a near-static frame that can loop or cut cleanly.

End frame: wide, deep, balanced, ready for a looping crossfade back to
scene 1 OR a clean hold.

Duration: 6 seconds (or 8 s if you want padding), 24 fps.
```

---

## How to run this in Veo 3 / Google Flow

1. Open **Google Flow** (labs.google/flow) or **Vertex AI → Veo 3**.
2. For each scene, paste: *Style header + Scene body + Negative prompt*.
3. Set **aspect ratio 16:9**, **duration 8s**, **fps 24**, **resolution 1080p**.
4. Generate **3–4 takes** per scene. Pick the best one.
5. **Before Scene 2**, download Scene 1's best take, extract its **last frame**
   (any tool, or ffmpeg one-liner below), and upload that as the
   **"start frame" / reference image** for Scene 2. Repeat for 3 → 4.
   This is what keeps the color, grain and materials continuous.
6. Keep the **seed number** constant if Flow exposes it (it does in the
   advanced panel).

### Extracting last frame for continuity

```bash
# Mac/Linux — grab the last frame of a clip as PNG
ffmpeg -sseof -0.1 -i scene1.mp4 -vframes 1 -q:v 2 scene1-lastframe.png
```

---

## Merging 4 clips into one seamless 30s hero video

After you download `scene1.mp4` … `scene4.mp4`, stitch them with a tiny
crossfade between each pair so the cuts don't pop:

```bash
# 0.3 s crossfade between clips, output 1080p h264 ~4-5 MB
ffmpeg \
  -i scene1.mp4 -i scene2.mp4 -i scene3.mp4 -i scene4.mp4 \
  -filter_complex "\
  [0:v][1:v]xfade=transition=fade:duration=0.3:offset=7.7[v01]; \
  [v01][2:v]xfade=transition=fade:duration=0.3:offset=15.4[v012]; \
  [v012][3:v]xfade=transition=fade:duration=0.3:offset=23.1[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart -an hero-bg.mp4
```

### Optimizing for web

```bash
# Target ~3-4 MB for a 30s 1080p clip, lossy but fine at 0.35 opacity
ffmpeg -i hero-bg.mp4 -c:v libx264 -crf 28 -preset veryslow \
  -pix_fmt yuv420p -movflags +faststart -vf "scale=1920:1080" \
  -an hero-bg-web.mp4

# Also generate a WebM for broader codec support
ffmpeg -i hero-bg.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -an hero-bg.webm
```

Drop both files at:

```
public/placeholders/hero-bg.mp4
public/placeholders/hero-bg.webm
```

`Hero.tsx` already loads `/placeholders/hero-bg.mp4` — you can extend the
`<source>` list to include `hero-bg.webm` for smaller payloads on Firefox
and modern Chrome.

---

## Loop trick (optional, recommended)

If you want an **infinite loop without a visible cut**, after assembling
the 30 s master, add a 0.8 s crossfade from the end back to the start:

```bash
ffmpeg -stream_loop 1 -i hero-bg.mp4 \
  -filter_complex "[0:v]trim=0:29.5,setpts=PTS-STARTPTS[a]; \
                   [0:v]trim=29.5:30,setpts=PTS-STARTPTS[b]; \
                   [a][b]xfade=duration=0.5:offset=29" \
  -c:v libx264 -crf 23 -pix_fmt yuv420p hero-bg-loop.mp4
```

This turns the hero into a visually seamless loop.

---

## Cost expectation (Veo 3 on Google Flow, May 2026 pricing)

- Veo 3 on Flow: roughly **$0.75–$1.50 per 8 s clip** on the paid tier,
  depending on resolution and whether you're using Ultra.
- Budget **3–4 takes per scene** to pick the best → ~$12–$24 total.
- Cheaper alternative to prototype the composition: generate scenes at
  720p first (~half the cost) to lock your picks, then re-render winners
  at 1080p.

## Quality checklist before shipping

- [ ] Duration is 28–32 seconds exactly (most hero video loops land here)
- [ ] Center 40% of frame at most moments is quiet enough for headline text
- [ ] Overall average luminance ≤ 40% (avoid fighting your white text)
- [ ] No readable text, logos, faces anywhere
- [ ] Palette reads cobalt / violet / cyan on near-black — no warm tones
- [ ] File ≤ 5 MB (lazy-loaded; shouldn't block the page)
- [ ] Camera motion is slow and deliberate — pause the video at any second
      and the frame still looks like a designed wallpaper
- [ ] Loops seamlessly if you used the loop trick

---

## If Veo 3 returns something off

Most common fixes:

- **Too busy / too flashy**: add to the negative prompt: `particles, sparks,
  fireworks, confetti, electric arcs, plasma, explosion`
- **Wrong palette**: strengthen the color lines — e.g. add `strictly
  cobalt blue and violet; no white highlights except node cores; no warm
  tints whatsoever; desaturate everything except the accent blues`
- **UI-looking**: add `no interface, no buttons, no dashboards, no
  screens, no HUD, no grid of cards, no code editor, no charts`
- **Shaky / fast**: add `locked-off camera on a rigid dolly; motion
  must be imperceptible in any 2-second window`

---

## Alternate one-prompt version (if you just want one 8s clip)

If 4 scenes is more work than you want, this single prompt produces a
looping 8-second take that works on its own. You'll repeat it twice with
a reverse-playback in the middle to get ~30 s.

```
[STYLE HEADER ABOVE]

A slow, continuous camera drift through a vast 3D lattice of softly
glowing cobalt and violet nodes connected by fine luminous filaments,
set against a near-black volumetric void. Gentle pulses of light travel
along the filaments, suggesting computation in motion. The composition
leaves the center of the frame quiet enough for large white type.
Locked-off dolly forward, shallow depth of field, faint film grain,
deliberate and calm. 8 seconds, 24 fps, 16:9 1080p.

[NEGATIVE PROMPT ABOVE]
```

Run this twice, reverse one copy, crossfade the three segments — you get
~24 s of a hypnotic, seamless loop, perfectly on-brand.
