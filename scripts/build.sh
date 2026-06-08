#!/usr/bin/env bash
# Build the published stylesheet for the showcase (docs/styles.css).
#
#   npm run build        # or: scripts/build.sh
#
# Tailwind only emits the classes it can SEE, so this scopes the build to the
# markup in docs/*.html. Any class your JS toggles at runtime must therefore
# also appear statically in the HTML (drop it in the hidden safelist element in
# index.html) or it won't be generated.
#
# One-time toolchain install:  npm install
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# 1. keep the published site self-contained: refresh fonts + logos into docs/
mkdir -p docs/fonts/phosphor docs/assets
cp -f fonts/*.woff2 fonts/*.woff            docs/fonts/
cp -f fonts/phosphor/*.woff2 fonts/phosphor/*.woff docs/fonts/phosphor/
cp -f assets/*.svg                          docs/assets/

# 2. compile a stylesheet scoped to the showcase markup
TMP="$ROOT/.tmp-build"; rm -rf "$TMP"; mkdir -p "$TMP"
cp src/phosphor.css "$TMP/phosphor.css"
{ printf '@source "%s/docs/**/*.html";\n' "$ROOT"; cat src/styles.css; } > "$TMP/input.css"
npx @tailwindcss/cli -i "$TMP/input.css" -o docs/styles.css --minify

# 3. daisyUI emits a theme-controller :has() selector that the minifier collapses
#    to an invalid empty :has() when the theme name contains spaces — strip it.
python3 - docs/styles.css <<'PY'
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
s = s.replace(':where(:root),:root:has(),', '').replace(':root:has(),', '')
open(p, "w", encoding="utf-8").write(s)
PY

rm -rf "$TMP"
echo "built docs/styles.css ($(wc -c < docs/styles.css) bytes)"
