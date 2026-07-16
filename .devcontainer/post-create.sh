#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "[post-create] pnpm not found. Enabling corepack..."
  if ! corepack enable 2>/tmp/corepack-enable.log; then
    echo "[post-create] corepack enable failed (likely a permissions issue). Retrying with sudo..."
    sudo corepack enable
  fi
fi

echo "[post-create] Installing project dependencies..."
pnpm install --frozen-lockfile

echo "[post-create] Installing Playwright browser (Chromium)..."
if ! pnpm exec playwright install --with-deps chromium; then
  echo "[post-create] Warning: install --with-deps failed. Falling back to browser-only install."
  pnpm exec playwright install chromium || echo "[post-create] Warning: Playwright browser install failed. You can retry manually with: pnpm exec playwright install chromium"
fi

echo "[post-create] Setup complete."
