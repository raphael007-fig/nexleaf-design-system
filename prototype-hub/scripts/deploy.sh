#!/bin/bash
# One-command deploy for the Prototype Hub → design.nexleaf.org/prototype-hub/
# Usage:  cd prototype-hub && npm run deploy
set -euo pipefail

GCLOUD="${GCLOUD:-$(command -v gcloud || echo /opt/homebrew/share/google-cloud-sdk/bin/gcloud)}"
BUCKET="gs://nexleaf-design-content/prototype-hub"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$HERE"

echo "→ Building (base=/prototype-hub/)…"
npx vite build --base=/prototype-hub/

echo "→ Uploading to $BUCKET …"
"$GCLOUD" storage cp --recursive dist/* "$BUCKET/"

HASH=$(grep -o 'assets/index-[^"]*\.js' dist/index.html | head -1)
echo "✓ Deployed. Live bundle should be: $HASH"
echo "  https://design.nexleaf.org/prototype-hub/"

# Verify what the CDN is actually serving (catches cache / wrong-bucket issues)
sleep 2
LIVE=$(curl -s "https://design.nexleaf.org/prototype-hub/index.html" | grep -o 'assets/index-[^"]*\.js' | head -1 || true)
if [ "$LIVE" = "$HASH" ]; then
  echo "✓ Verified live: $LIVE"
else
  echo "⚠ Live is serving: ${LIVE:-<none>} (expected $HASH) — may be CDN cache, retry in a minute."
fi
