#!/usr/bin/env bash
# Bootstrap: replace the broken .git (from an earlier partial clone) with the
# full commit history packaged inside erusoftech.bundle, then push to GitHub.
#
# Run from the project root:
#   bash ./scripts/bootstrap.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_URL="git@github.com:erayusta/erusoftech.git"
BUNDLE="${ROOT}/erusoftech.bundle"
TMP_BUNDLE="$(mktemp -u /tmp/erusoftech-bundle.XXXXXX)"
TMP_CLONE="$(mktemp -u -d /tmp/erusoftech-clone.XXXXXX)"

blue()  { printf '\033[1;34m%s\033[0m\n' "$*"; }
green() { printf '\033[1;32m%s\033[0m\n' "$*"; }
red()   { printf '\033[1;31m%s\033[0m\n' "$*"; }

if [ ! -f "$BUNDLE" ]; then
  red "erusoftech.bundle bulunamadı: $BUNDLE"
  red "Bundle dosyası proje kökünde olmalı."
  exit 1
fi

cd "$ROOT"

blue "→ Proje kökü: $ROOT"

if [ -d .git ]; then
  blue "→ Mevcut .git temizleniyor (bozuk/partial clone)"
  rm -rf .git
fi

blue "→ Bundle temp konuma taşınıyor: $TMP_BUNDLE"
mv "$BUNDLE" "$TMP_BUNDLE"

blue "→ Bundle klonlanıyor: $TMP_CLONE"
rm -rf "$TMP_CLONE"
git clone "$TMP_BUNDLE" -b main "$TMP_CLONE" >/dev/null

blue "→ .git iç içeri taşınıyor"
mv "$TMP_CLONE/.git" ./.git
rm -rf "$TMP_CLONE" "$TMP_BUNDLE"

blue "→ İndeks/work-tree main ile senkronlanıyor"
git reset --hard main >/dev/null

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

blue "→ Remote:"
git remote -v

green "→ Hazır. Aşağıdaki commit'ler push edilecek:"
git log --oneline

echo ""
blue "→ Pushing to $REMOTE_URL ..."
if git push -u origin main; then
  green "✔ Push başarılı. GitHub'da kontrol edebilirsin:"
  green "  https://github.com/erayusta/erusoftech"
else
  red "✘ Push başarısız. SSH key veya remote yetkisi kontrol et."
  red "   Detay için BOOTSTRAP.md'deki 'SSH key sorunu' bölümüne bak."
  exit 1
fi
