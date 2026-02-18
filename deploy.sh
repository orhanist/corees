#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/corees"

cd "$APP_DIR"

echo "[deploy] Pulling latest code"
if [ -n "$(git status --porcelain)" ]; then
  echo "[deploy] Working tree is dirty. Commit/stash before deploying."
  exit 1
fi
git fetch --all
git pull --ff-only origin main

echo "[deploy] Installing dependencies"
npm ci

echo "[deploy] Running Prisma migrations"
npx prisma migrate deploy

echo "[deploy] Building application"
npm run build

echo "[deploy] Restarting process"
pm2 startOrReload ecosystem.config.js --env production

echo "[deploy] Done"
