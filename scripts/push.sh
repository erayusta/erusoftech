#!/usr/bin/env bash
# Sync incoming work from the Cowork sandbox into main, then push to GitHub.
#
# How this fits into the loop:
#   - The sandbox commits into `refs/heads/incoming` on this repo (it can't
#     push to a checked-out branch, so it publishes to `incoming` instead).
#   - The sandbox also writes those same files directly into the working
#     tree, so from local git's perspective the tree looks "dirty" — files
#     are modified/untracked even though their content already matches the
#     incoming branch. When that's the case, a plain `merge --ff-only`
#     would refuse to overwrite them; we detect it and reset --hard instead
#     (safe, because incoming is a strict descendant of main).
#   - Finally, push main to origin.
#
# Usage:
#   bash ./scripts/push.sh
#   bash ./scripts/push.sh --force      # always reset --hard to incoming

set -euo pipefail

FORCE_RESET=0
if [ "${1:-}" = "--force" ]; then
  FORCE_RESET=1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

blue()   { printf '\033[1;34m%s\033[0m\n' "$*"; }
green()  { printf '\033[1;32m%s\033[0m\n' "$*"; }
red()    { printf '\033[1;31m%s\033[0m\n' "$*"; }
yellow() { printf '\033[1;33m%s\033[0m\n' "$*"; }

blue "→ Project root: $ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  red "Not a git repository. Run ./scripts/bootstrap.sh first."
  exit 1
fi

# Make sure we're on main (but don't blow up if the checkout itself fails
# because of dirty files — we handle that below).
current="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo HEAD)"
if [ "$current" != "main" ]; then
  blue "→ Switching to main (was on $current)"
  git checkout main || true
fi

sync_with_incoming() {
  if ! git show-ref --verify --quiet refs/heads/incoming; then
    blue "→ No incoming branch — nothing to sync"
    return 0
  fi

  # incoming must be a descendant of main for a safe hard-reset
  if ! git merge-base --is-ancestor main incoming; then
    red "main and incoming have truly diverged (not just a dirty tree)"
    red "inspect with: git log --oneline --graph main incoming"
    return 1
  fi

  if [ "$FORCE_RESET" -eq 1 ]; then
    yellow "→ --force flag: reset --hard incoming"
    git reset --hard incoming
  elif git merge --ff-only incoming 2>/dev/null; then
    green "  fast-forwarded cleanly"
  else
    yellow "→ Working tree looks dirty but incoming is ahead of main;"
    yellow "  recovering with reset --hard incoming (safe — incoming"
    yellow "  already contains every commit main has, plus more)"
    git reset --hard incoming
  fi

  blue "→ Removing the incoming helper branch"
  git branch -d incoming >/dev/null 2>&1 || git branch -D incoming >/dev/null 2>&1
}

sync_with_incoming

# Ensure remote exists and points at the right place
REMOTE_URL="git@github.com:erayusta/erusoftech.git"
if git remote get-url origin >/dev/null 2>&1; then
  actual="$(git remote get-url origin)"
  if [ "$actual" != "$REMOTE_URL" ]; then
    blue "→ Updating origin URL to $REMOTE_URL (was $actual)"
    git remote set-url origin "$REMOTE_URL"
  fi
else
  blue "→ Adding origin $REMOTE_URL"
  git remote add origin "$REMOTE_URL"
fi

# Show what's about to be pushed, if we know the remote tip
blue "→ Commits to push:"
if git rev-parse --verify origin/main >/dev/null 2>&1; then
  count="$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)"
  if [ "$count" = "0" ]; then
    green "  already up to date with origin/main"
  else
    git log --oneline origin/main..HEAD | head -30
  fi
else
  yellow "  (first push — origin/main not yet known)"
  git log --oneline | head -15
fi

echo ""
blue "→ Pushing to origin main..."
if git push -u origin main; then
  green "✔ Pushed. https://github.com/erayusta/erusoftech"
else
  red "✘ Push failed."
  red "  If this is an auth error, see BOOTSTRAP.md → 'SSH key sorunu yaşarsan'"
  exit 1
fi
