#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -x node_modules/.bin/biome ]]; then
  echo "[post-start] Missing node_modules/.bin/biome. Running pnpm install to self-heal setup..."
  pnpm install --frozen-lockfile
else
  echo "[post-start] Dependencies look good."
fi
