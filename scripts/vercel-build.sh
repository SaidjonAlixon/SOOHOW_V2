#!/usr/bin/env sh
set -eu

echo "[vercel] Building frontend (VERCEL_OUT_DIR=${VERCEL_OUT_DIR:-root})..."
pnpm --filter @workspace/soohow run build

if [ "${VERCEL_OUT_DIR:-root}" = "root" ]; then
  OUT="dist"
else
  OUT="artifacts/soohow/dist"
fi

if [ ! -f "$OUT/index.html" ]; then
  echo "[vercel] ERROR: missing $OUT/index.html"
  ls -la . 2>/dev/null || true
  ls -la dist 2>/dev/null || true
  ls -la artifacts/soohow/dist 2>/dev/null || true
  exit 1
fi

echo "[vercel] OK: $OUT/index.html"
ls -la "$OUT"
