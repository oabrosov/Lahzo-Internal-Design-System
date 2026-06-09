#!/usr/bin/env python3
"""
Lahzo Internal Design System — compliance validator.

Run this on generated HTML *before* presenting it to the user. It mechanically
catches the rule violations a model is most likely to slip in: banned classes,
raw hex, off-scale spacing, ALL CAPS, arbitrary type, stray underlines, a missing
theme attribute, inline styles, and emoji-as-icon.

Usage:
    python3 scripts/validate.py <file.html> [more.html ...]
    python3 scripts/validate.py path/to/project/   # recurses for *.html

Exit code is non-zero if any ERROR is found. WARNINGS don't fail the build but
should be looked at. The point is simple: if it flags something, fix it, then
re-run until it's clean. A green run is the floor, not the ceiling — it proves
the hard constraints hold; it doesn't judge layout or hierarchy.
"""
import re, sys, os, html

# ── allow-lists ─────────────────────────────────────────────────────────────
# Tailwind spacing steps that land on the Lahzo scale (px): 4 8 12 16 20 24 32 40 48 64 80 96
ALLOWED_SPACE_STEPS = {"0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24", "px"}
ALLOWED_ARB_SPACE_PX = {0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96}
SPACE_PREFIXES = ("p", "pt", "pr", "pb", "pl", "px", "py",
                  "m", "mt", "mr", "mb", "ml", "mx", "my",
                  "gap", "gap-x", "gap-y", "space-x", "space-y")
# initialisms / short codes that are allowed to stay upper-case
CAPS_OK = {"ID", "URL", "API", "UI", "UX", "OK", "CRM", "PDF", "CSV", "JSON",
           "HTML", "CSS", "GA", "US", "FAQ", "SKU", "VIN", "SSO", "AI",
           "S0", "S1", "S2", "S3", "S4"}

BANNED_CLASSES = [
    "btn-soft", "btn-dash", "btn-accent", "btn-info", "btn-warning",
    "dropdown-hover", "dropdown-open", "dropdown-left", "dropdown-right",
    "dropdown-start", "dropdown-center", "dropdown-end",
    "tabs-lift", "tabs-bottom", "tabs-xs", "tabs-sm", "tabs-lg", "tabs-xl",
    "chat-image", "chat-bubble-secondary", "chat-bubble-accent",
    "chat-bubble-info", "chat-bubble-success", "chat-bubble-warning",
    "chat-bubble-error",
]
# outline is opt-in but only neutral/success/error; these combos are banned
BANNED_OUTLINE_WITH = {"btn-primary", "btn-secondary", "btn-warning", "btn-info", "btn-accent"}

EMOJI = re.compile(
    "[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF\u2190-\u21FF\u2300-\u23FF]"
)

class Finding:
    def __init__(self, level, line, msg):
        self.level, self.line, self.msg = level, line, msg

def classes_of(attr):
    return attr.split()

def check_html(text):
    findings = []

    # Blank out <script>/<style> contents (keep newlines so line numbers hold).
    # Their inner text is code/CSS, not UI copy — scanning it produces false positives
    # (e.g. base64 font blobs reading as ALL CAPS).
    def _blank(m):
        return m.group(0)[:0].ljust(0) + re.sub(r'[^\n]', ' ', m.group(0))
    scan = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', _blank, text,
                  flags=re.IGNORECASE | re.DOTALL)

    lines = scan.splitlines()

    # whole-doc check: theme attribute (Light is the default; Dark is also valid)
    if "<html" in text and not (
        'data-theme="Lahzo — Light Theme"' in text
        or 'data-theme="Lahzo — Dark Theme"' in text):
        findings.append(Finding("ERROR", 1,
            'Missing data-theme on <html> — set "Lahzo — Light Theme" (default) or "Lahzo — Dark Theme".'))

    for n, line in enumerate(lines, 1):
        # ---- class attributes ----
        for m in re.finditer(r'class\s*=\s*"([^"]*)"', line):
            attr = m.group(1)
            cls = classes_of(attr)
            cset = set(cls)

            for b in BANNED_CLASSES:
                if b in cset:
                    findings.append(Finding("ERROR", n, f'Banned class "{b}".'))

            if "btn-outline" in cset:
                for bad in BANNED_OUTLINE_WITH & cset:
                    findings.append(Finding("ERROR", n,
                        f'Unsupported outline combo "btn-outline {bad}" (only neutral/success/error outlines).'))

            if "uppercase" in cset:
                findings.append(Finding("ERROR", n,
                    'Class "uppercase" — the system is sentence-case only.'))

            if "underline" in cset and "btn-link" not in cset:
                findings.append(Finding("ERROR", n,
                    'Underline used outside btn-link (underline is reserved for links).'))

            for c in cls:
                # raw hex in arbitrary value e.g. bg-[#fff]
                if re.search(r'\[#?[0-9a-fA-F]{3,8}\]', c) and re.search(r'#', c):
                    findings.append(Finding("ERROR", n, f'Raw hex in utility "{c}" — use theme tokens.'))
                # arbitrary type values
                if re.match(r'(text|leading|tracking|font)-\[', c):
                    findings.append(Finding("ERROR", n, f'Arbitrary type value "{c}" — use a text-* utility.'))
                # arbitrary text size like text-[15px]
                if re.match(r'text-\[\d', c):
                    findings.append(Finding("ERROR", n, f'Arbitrary font-size "{c}" — use a text-* utility.'))
                # spacing utilities
                mm = re.match(r'-?(' + "|".join(sorted(SPACE_PREFIXES, key=len, reverse=True)) + r')-(.+)$', c)
                if mm:
                    val = mm.group(2)
                    arb = re.match(r'\[(\d+(?:\.\d+)?)(px|rem)?\]$', val)
                    if arb:
                        num = float(arb.group(1)); unit = arb.group(2) or "px"
                        px = num * 16 if unit == "rem" else num
                        if px not in ALLOWED_ARB_SPACE_PX:
                            findings.append(Finding("ERROR", n,
                                f'Off-scale spacing "{c}" ({int(px)}px) — allowed: 4/8/12/16/20/24/32/40/48/64/80/96.'))
                    elif val not in ALLOWED_SPACE_STEPS and not val.startswith("["):
                        # numeric step out of scale (p-7, gap-9, m-11, ...)
                        if re.match(r'\d+(\.\d+)?$', val):
                            findings.append(Finding("ERROR", n,
                                f'Off-scale spacing step "{c}" — use steps 1/2/3/4/5/6/8/10/12/16/20/24.'))

        # ---- inline styles ----
        for m in re.finditer(r'style\s*=\s*"([^"]*)"', line):
            st = m.group(1)
            if re.search(r'#[0-9a-fA-F]{3,8}', st):
                findings.append(Finding("ERROR", n, 'Raw hex in inline style — use theme tokens.'))
            if re.search(r'font-size|font-weight|line-height|letter-spacing', st):
                findings.append(Finding("ERROR", n, 'Raw font property in inline style — use a text-* utility.'))
            findings.append(Finding("WARN", n, 'Inline style="" — prefer theme classes / utilities.'))

        # ---- visible text: ALL CAPS + emoji ----
        # strip tags, look at the residual text on this line
        textbits = re.sub(r'<[^>]+>', ' ', line)
        textbits = html.unescape(textbits)
        if EMOJI.search(textbits):
            findings.append(Finding("WARN", n, 'Emoji in content — use a Phosphor icon instead.'))
        words = re.findall(r"[A-Za-z][A-Za-z']{2,}", textbits)
        caps = [w for w in words if w.isupper() and w not in CAPS_OK]
        if len(caps) >= 2:
            findings.append(Finding("ERROR", n,
                f'ALL CAPS text ({" ".join(caps[:4])}…) — use sentence-case.'))

    return findings

def collect(paths):
    files = []
    for p in paths:
        if os.path.isdir(p):
            for root, _, fs in os.walk(p):
                for f in fs:
                    if f.endswith(".html"):
                        files.append(os.path.join(root, f))
        else:
            files.append(p)
    return files

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    files = collect(sys.argv[1:])
    if not files:
        print("No .html files found."); sys.exit(2)
    total_err = total_warn = 0
    for f in files:
        try:
            findings = check_html(open(f, encoding="utf-8").read())
        except Exception as e:
            print(f"!! could not read {f}: {e}"); total_err += 1; continue
        errs = [x for x in findings if x.level == "ERROR"]
        warns = [x for x in findings if x.level == "WARN"]
        total_err += len(errs); total_warn += len(warns)
        status = "CLEAN" if not errs else f"{len(errs)} ERROR(S)"
        print(f"\n── {f} — {status}, {len(warns)} warning(s)")
        for x in sorted(findings, key=lambda y: (y.line, y.level)):
            print(f"   [{x.level:5}] line {x.line}: {x.msg}")
    print("\n" + "=" * 60)
    print(f"TOTAL: {total_err} error(s), {total_warn} warning(s) across {len(files)} file(s).")
    if total_err:
        print("FAILED — fix the errors above and re-run.")
        sys.exit(1)
    print("PASSED — hard constraints hold. Now eyeball layout, hierarchy, spacing rhythm.")
    sys.exit(0)

if __name__ == "__main__":
    main()
