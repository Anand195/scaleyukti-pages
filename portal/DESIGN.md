---
name: ScaleYukti Portal
description: Public marketing site + gated internal document portal for ScaleYukti
colors:
  navy: "#1b2a38"
  navy-deep: "#0f1c27"
  navy-raised: "#223345"
  orange: "#f37021"
  orange-dim: "#c8591a"
  border: "#2d3f52"
  border-strong: "#3a4e63"
  ink: "#f8fafc"
  muted: "#9fb0c3"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif"
    fontWeight: 900
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.navy-deep}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  card:
    backgroundColor: "{colors.navy-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: ScaleYukti Portal

## Overview

This project inherits ScaleSync's design system verbatim — same tokens, same
UI primitives, same "Ops Terminal" language — because both are ScaleYukti
products and the whole point of this migration was to stop re-deriving the
brand per surface. See ScaleSync's `DESIGN.md` for the full rationale
(contrast checks, the One Accent Rule, the Flat Rule, etc.); this file only
records what's specific to the portal.

Two registers in one app: the marketing home page (Persuade — a visitor
decides to reach out) and the document portal (Operate — a logged-in team
member finds and reads a document fast). Same palette, different pacing: the
home page spends more space per idea; the portal is dense, bordered list
rows, get-to-the-document-fast.

## Colors

Identical token set to ScaleSync (`#1b2a38` / `#0f1c27` / `#223345` /
`#f37021` / `#2d3f52` / `#3a4e63` / `#f8fafc` / `#9fb0c3`), wired the same way
via a Tailwind v4 `@theme` block in `app/globals.css`. No new colors
introduced. Category badges on the document list borrow three additional
accent hues (orange for Client & Public-Facing, emerald for Internal &
Strategy, sky for Leads & Outreach) — chosen because all three clear 4.5:1
against the navy ground, verified with the same contrast-ratio formula used
on ScaleSync's button fix, not picked by eye.

## Typography

Same system-sans stack as ScaleSync. No second face.

## Layout

Marketing home: single column, `max-w-5xl`, generous section padding
(`py-24`/`py-20`). Portal (document list, document detail): `max-w-3xl`,
denser — this is a lookup tool, not a landing page.

## Components

Reused byte-for-byte from ScaleSync: `Button` (including the navy-deep-on-
orange WCAG fix), `Field`, `Badge`. New to this project: `CategoryBadge`
(wraps `Badge` with the three category colors) and `DocumentList` (search +
grouped bordered rows — the signature pattern here, replacing what used to
be a same-size card grid on the static GitHub Pages index).

## Document rendering

Each legacy document keeps its own original styling, rendered inside a
sandboxed `<iframe srcDoc>` on its detail page rather than re-skinned to
match the portal chrome. Re-styling 18 independently-authored documents to
match a new system would have been a much bigger, riskier change than the
brief asked for; the iframe boundary means the portal's Tailwind never
collides with a document's own embedded `<style>` block.

## Do's and Don'ts

### Do:
- **Do** reuse ScaleSync's exact tokens and primitives — this is one brand, not two systems that happen to look similar.
- **Do** keep the document list as bordered rows, not a card grid, for the same "same-shaped collection" reason ScaleSync's `DESIGN.md` already documents.

### Don't:
- **Don't** re-theme the legacy documents' internal HTML/CSS. They're historical artifacts rendered as-is; only the portal chrome around them follows this system.
- **Don't** use emoji as icons or logo marks — Lucide only, matching ScaleSync.
