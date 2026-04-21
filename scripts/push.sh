#!/usr/bin/env bash
# Sync incoming work from the Cowork sandbox into main, then push to GitHub.
#
# How this fits into the loop:
#   - The sandbox commits into `refs/heads/incoming` on this repo (it can't
#     push to a checked-out branch, so it publishes to `incoming` instead).
#   - This script fast-forwards main to incoming, deletes the helper branch
#     and pushes main to origin. Rerun after every round of work.
#
#   bash ./scripts/push.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

blue()  { printf '\033[1;34m%s\033[0m\n' "$*"; }
green() { printf '\033[1;32m%s\033[0m\n' "$*"; }
red()   { printf '\033[1;31m%s\033[0m\n' "$*"; }

blue "→ Project root: $ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  red "Not a git repository. Run ./scripts/bootstrap.sh first."
  exit 1
fi

# Make sure we're on main. If not, try to switch.
current="$(git rev-parse --abbrev-ref HEAD)"
if [ "$current" != "main" ]; then
  blue "→ Switching to main (was on $current)"
  git checkout main
fi

# If no incoming branch, nothing to fast-forward — just push whatever we have.
if git show-ref --verify --quiet refs/heads/incoming; then
  blue "→ Fast-forward main ← incoming"
  if git merge --ff-only incoming; then
    green "  merged"
  else
    red "  fast-forward failed — main and incoming have diverged"
    red "  inspect with: git log --oneline --graph main incoming"
    exit 1
  fi
  blue "→ Removing the incoming helper branch"
  git branch -d incoming
else
  blue "→ No incoming branch (skipping fast-forward)"
fi

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

blue "→ Recent commits that will be pushed:"
git log --oneline origin/main..HEAD 2>/dev/null | head -20 || git log --oneline | head -20

echo ""
blue "→ Pushing to origin main..."
if git push -u origin main; then
  green "✔ Pushed. https://github.com/erayusta/erusoftech"
else
  red "✘ Push failed."
  red "  If this is an auth error, see BOOTSTRAP.md → 'SSH key sorunu yaşarsan'"
  exit 1
fi
