#!/bin/bash
# Deploy the Prototype Hub. Two destinations, both on design.nexleaf.org:
#
#   npm run deploy:preview   → /prototype-hub-preview/   (auto-deployed, always current)
#   npm run deploy           → /prototype-hub/           (the team's URL — only on approval)
#
# The preview path exists so auto-deploy can stay on without unreviewed prototypes
# reaching the team. Review happens on localhost (npm run dev) or on the preview URL.
set -euo pipefail

TARGET="${1:-live}"
case "$TARGET" in
  live)    SUBPATH="prototype-hub" ;;
  preview) SUBPATH="prototype-hub-preview" ;;
  *) echo "Usage: deploy.sh [live|preview]"; exit 1 ;;
esac

GCLOUD="${GCLOUD:-$(command -v gcloud || echo /opt/homebrew/share/google-cloud-sdk/bin/gcloud)}"
BUCKET="gs://nexleaf-design-content/$SUBPATH"
URL="https://design.nexleaf.org/$SUBPATH/"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$HERE"

echo "→ Building ($TARGET, base=/$SUBPATH/)…"
npx vite build --base="/$SUBPATH/"

echo "→ Uploading to $BUCKET …"
"$GCLOUD" storage cp --recursive dist/* "$BUCKET/"

HASH=$(grep -o "assets/index-[^\"]*\.js" dist/index.html | head -1)
echo "✓ Deployed $TARGET — expected bundle: $HASH"
echo "  $URL"

# Verify what's actually being served (catches cache / wrong-bucket mistakes)
sleep 2
LIVE=$(curl -s "${URL}index.html" | grep -o "assets/index-[^\"]*\.js" | head -1 || true)
if [ "$LIVE" = "$HASH" ]; then
  echo "✓ Verified live: $LIVE"
else
  echo "⚠ Serving ${LIVE:-<none>} (expected $HASH) — likely CDN cache, retry shortly."
fi
