#!/usr/bin/env bash
# Build the hero background video from 3 raw Veo / Gemini clips.
#
# Input (in the project root):
#   herobackground.mp4   (scene 1 — Ignition)
#   herobackground2.mp4  (scene 2 — Lattice)
#   herobackground3.mp4  (scene 3 — Cognition)
#
# Output:
#   public/placeholders/hero-bg.mp4   (23.1s, ~3.7 MB, seamless loop, no watermark)
#
# Usage:
#   bash ./scripts/build-hero-bg.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

for f in herobackground.mp4 herobackground2.mp4 herobackground3.mp4; do
  if [ ! -f "$f" ]; then
    echo "missing: $f (put raw Veo clips in project root, see docs/hero-video-prompt-pack.md)"
    exit 1
  fi
done

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found — install it first (brew install ffmpeg / apt install ffmpeg)"
  exit 1
fi

WORK="$(mktemp -d /tmp/hero-bg.XXXXXX)"
trap 'rm -rf "$WORK"' EXIT

# ---- 1. Strip the Veo watermark from each raw clip ----
# The Veo 3 watermark sits bottom-right, roughly (1150,645) -> (1250,700) on 1280x720.
# delogo inpaints the area using surrounding pixel information; at 35% hero opacity
# the result is effectively invisible.
DELOGO="delogo=x=1130:y=635:w=145:h=72"

echo "→ de-watermark scene 1"
ffmpeg -y -loglevel error -i herobackground.mp4  -vf "$DELOGO" -c:a copy "$WORK/s1.mp4"
echo "→ de-watermark scene 2"
ffmpeg -y -loglevel error -i herobackground2.mp4 -vf "$DELOGO" -c:a copy "$WORK/s2.mp4"
echo "→ de-watermark scene 3"
ffmpeg -y -loglevel error -i herobackground3.mp4 -vf "$DELOGO" -c:a copy "$WORK/s3.mp4"

# ---- 2. Crossfade the 3 clips into a single 23.4s master ----
echo "→ stitch with 0.3s xfade"
ffmpeg -y -loglevel error \
  -i "$WORK/s1.mp4" -i "$WORK/s2.mp4" -i "$WORK/s3.mp4" \
  -filter_complex "\
    [0:v][1:v]xfade=transition=fade:duration=0.3:offset=7.7[v01]; \
    [v01][2:v]xfade=transition=fade:duration=0.3:offset=15.4[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart -an "$WORK/master.mp4"

# ---- 3. Web-optimize (CRF 28 ~= 3-4 MB for 23s 720p) ----
echo "→ web optimize (CRF 28)"
ffmpeg -y -loglevel error -i "$WORK/master.mp4" \
  -c:v libx264 -crf 28 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart -an "$WORK/web.mp4"

# ---- 4. Seamless-loop (end fades into start over 0.3s) ----
echo "→ seamless loop crossfade"
mkdir -p public/placeholders
ffmpeg -y -loglevel error -i "$WORK/web.mp4" -filter_complex \
  "[0:v]split[a][b]; \
   [a]trim=0:23.1,setpts=PTS-STARTPTS[a1]; \
   [b]trim=23.1:23.4,setpts=PTS-STARTPTS[b1]; \
   [a1][b1]xfade=transition=fade:duration=0.3:offset=22.8" \
  -c:v libx264 -crf 28 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart -an public/placeholders/hero-bg.mp4

echo ""
echo "✔ Done"
echo "  → public/placeholders/hero-bg.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 \
  public/placeholders/hero-bg.mp4 \
  | awk -F= '{printf "    %-9s %s\n", $1, $2}'
du -h public/placeholders/hero-bg.mp4 | awk '{printf "    disk      %s\n", $1}'
