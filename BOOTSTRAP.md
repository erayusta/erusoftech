# Bootstrap — GitHub'a push etme

Bu klasörü (senin diskinde) temiz bir git geçmişi ile GitHub'a göndermek için aşağıdaki adımları **senin kendi terminalinde** çalıştır. Sandbox'tan GitHub/npm'e erişim bloklu olduğu için push işlemini sen yapacaksın; ben tüm commit geçmişini `erusoftech.bundle` dosyasına paketledim (11 profesyonel commit).

## Hızlı yol — tek script ile

```bash
cd "$(dirname "$(realpath BOOTSTRAP.md)")"   # proje kökünde olduğundan emin ol
bash ./scripts/bootstrap.sh
```

Script tamamen otomatik çalışır ve push'a kadar gider.

## Elle yapmak istersen

```bash
# 1. Proje köküne gir
cd /path/to/erusoftech

# 2. Bozuk .git'i temizle (önceki clone denemesi kalmış)
rm -rf .git

# 3. Bundle'ı geçici yere taşı, temiz bir klon yap ve .git'i içeri al
mv erusoftech.bundle /tmp/
git clone /tmp/erusoftech.bundle -b main /tmp/erusoftech-clone
mv /tmp/erusoftech-clone/.git ./.git
git reset --hard main                # dosyalar zaten yerinde, sadece metadata sync

# 4. Remote ekle, push at
git remote add origin git@github.com:erayusta/erusoftech.git
git push -u origin main

# 5. Temizlik
rm -rf /tmp/erusoftech-clone /tmp/erusoftech.bundle erusoftech.bundle
```

Tamamlandığında `git log --oneline` çıktısı:

```
ff98bb5 fix: tighten types and fix React keys pass
11e3386 feat(cta,page): final CTA section and full landing composition
1c4e9d9 feat(trust): animated-counter metrics band with locale-aware formatting
5aeb58b feat(cases): case studies with live dashboard UI previews
5ee790c feat(process): 6-step delivery process with ghost numbers and progress bars
38ccd64 feat(tech-stack): interactive 12-tile grid with hover-revealed descriptions
7892e4f feat(services): 5-card services section with gradient borders and bullets
4931c6c feat(partners): infinite-scroll logo banner with grayscale + hover glow
887bb22 feat(hero): add fullscreen hero with video bg, gradient overlay, CTAs
ff9956a feat(ui): add layout shell and reusable UI primitives
ba13b40 chore: scaffold Next.js 14 App Router project
```

## Push sonrası: projeyi ayağa kaldırma

```bash
npm install          # bağımlılıkları kur
npm run dev          # http://localhost:3000
```

## SSH key sorunu yaşarsan

`git@github.com:...` URL'i SSH anahtarı kullanır. Eğer push adımında *Permission denied (publickey)* alırsan:

```bash
# Opsiyon A: SSH key kur (önerilir)
ssh-keygen -t ed25519 -C "furkycl@gmail.com"
cat ~/.ssh/id_ed25519.pub
# Çıktıyı https://github.com/settings/keys altına ekle

# Opsiyon B: HTTPS remote'a çevir
git remote set-url origin https://github.com/erayusta/erusoftech.git
git push -u origin main
# GitHub username + Personal Access Token isteyecek
```
