---
name: Tuscan Modernist · Ivory (RESTO)
version: 2026-10-25
notes: >
  Reconciled version of the Stitch export. The colour tokens now follow the
  written intent (warm ivory "Burro" canvas, Bosco green, terracotta, stone)
  instead of the generated cool green-white tokens. Contrast ratios checked
  against WCAG 2.1.
colors:
  background: '#F6F2E9'          # Burro · warm ivory canvas
  surface: '#F6F2E9'
  surface-bright: '#F6F2E9'
  surface-dim: '#E2DCCF'
  surface-container-lowest: '#FFFFFF'   # Pura Cera · cards, sheets
  surface-container-low: '#F1ECE1'
  surface-container: '#EFEADF'
  surface-container-high: '#E8E3D8'
  surface-container-highest: '#E2DCCF'
  on-background: '#232723'       # 13.6:1 on ivory
  on-surface: '#232723'
  on-surface-variant: '#55574F'  # 6.6:1 on ivory
  outline: '#8C867A'             # placeholders, icons only (3.2:1)
  outline-variant: '#D8D1C3'     # Pietra Serena · hairlines, inactive chips
  primary: '#172C2A'             # Bosco
  on-primary: '#FFFFFF'          # 14.7:1
  primary-container: '#203A38'   # hover / pressed
  on-primary-container: '#A9BDB9'
  secondary: '#904C2D'           # terracotta ink: text, links, labels (5.8:1 on ivory)
  on-secondary: '#FFFFFF'
  secondary-fixed: '#BD704E'     # terracotta fill: dots, badges, large/bold text only (white 3.8:1)
  secondary-container: '#F3DED3'
  on-secondary-container: '#5E2A12'
  tertiary: '#D8D1C3'            # stone
  on-tertiary: '#232723'
  error: '#B3261E'
  on-error: '#FFFFFF'
  error-container: '#F6DCD9'
  on-error-container: '#8C1D18'
  success: '#2F6B4F'
  warning: '#9A6A12'
  inverse-surface: '#2D312D'
  inverse-on-surface: '#EFF2EB'
  kds-background: '#0F1A19'      # kitchen display, dark
  kds-card: '#1A2B28'
  kds-text: '#E4ECEA'
typography:
  display: { fontFamily: Newsreader, fontSize: 2.1rem, fontWeight: '400', lineHeight: 1.15, letterSpacing: -0.015em }
  headline: { fontFamily: Newsreader, fontSize: 1.65rem, fontWeight: '500', lineHeight: 1.2, letterSpacing: -0.01em }
  title-serif: { fontFamily: Newsreader, fontSize: 1.3rem, fontWeight: '500', lineHeight: 1.25 }
  screen-title: { fontFamily: Newsreader, fontStyle: italic, fontSize: 1.25rem }
  title-lg: { fontFamily: Plus Jakarta Sans, fontSize: 1.05rem, fontWeight: '600' }
  title-sm: { fontFamily: Plus Jakarta Sans, fontSize: 0.875rem, fontWeight: '600' }
  body: { fontFamily: Plus Jakarta Sans, fontSize: 0.94rem, fontWeight: '400', lineHeight: 1.45 }
  body-sm: { fontFamily: Plus Jakarta Sans, fontSize: 0.875rem, fontWeight: '400' }
  label: { fontFamily: Plus Jakarta Sans, fontSize: 0.72rem, fontWeight: '600', letterSpacing: 0.06em, textTransform: uppercase }
rounded: { tag: 2px, control: 4px, card: 8px, sheet: 12px }
spacing: { xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 40px, mobile-gutter: 16px, desktop-margin: 32px }
elevation:
  tier1: 'none — 1px #D8D1C3 border on #FFFFFF'
  tier2: '0 8px 24px -4px rgba(23,44,42,0.10)'
  tier3: '0 12px 32px -6px rgba(23,44,42,0.16)'
---

# Tuscan Modernist · Ivory

## What changed from the Stitch export
1. **Canvas is warm ivory `#F6F2E9`**, not the generated cool `#f7faf4`.
2. **Primary is Bosco `#172C2A`**, not `#021716`.
3. **Terracotta has two roles.** `#904C2D` for text and links; `#BD704E` for fills, dots and large or bold text only (white on it is 3.8:1, below AA for small text).
4. **No off-token colours.** Remove `#E8E5DD`, `#5A6258`, `#E5EAE3`.
5. **Tags are rectangular, 2px radius, uppercase.** No pill chips for status.
6. **One price format everywhere: `€ 18,50`.** Euro sign, space, comma decimals, tabular figures.

## Screen header (one template for every guest screen)
- Logo tile (36px, Bosco) · "Palatino · Torino" (title-sm) · screen title (screen-title, one line, truncate).
- Language switch IT · EN · TR, account button.
- Session pill (`MASA D4 · DEHORS`) **only** while a table session is active; never on booking screens.

## Bottom navigation (guest)
Menü · Masa (badge = items not yet sent, hidden when 0) · Servis · Rezervasyon. The active tab must match the screen's section: booking screens → Rezervasyon.

## Components
- **Buttons:** primary Bosco fill; secondary ivory fill + stone border; accent terracotta fill for urgent floor actions only; 44px min height; 4px radius.
- **Status tags:** received (stone), preparing (Bosco tint), ready (terracotta tint + bell icon), served (green tint), on hold (stone + pause icon).
- **Cards:** white, 1px stone border, 8px radius, 16px padding. No zebra rows.
- **Bill folio:** receipt paper `#FFFDF8`, dashed totals divider, "pre-bill · not a receipt", split modes (one bill · even split · each pays theirs).
- **Kitchen display:** dark theme; ticket header turns amber after 10 min and red after 15 min; allergen notes in a highlighted strip; held courses greyed with a pause tag.

## Stitch prompt (paste into the project to apply)
> Update the design system of this project: use a warm ivory background #F6F2E9 instead of #f7faf4 on every screen; primary #172C2A; terracotta #BD704E only for fills and dots, #904C2D for terracotta text; stone #D8D1C3 for borders; body text #232723, secondary text #55574F. Status tags must be rectangular with 2px corners, uppercase, no pills. Show all prices as "€ 18,50". Use one header on every guest screen: "Palatino · Torino" with the screen title in italic Newsreader on a single line. Only show the table-session pill on table screens, never on reservation screens. In the bottom bar, highlight "Prenota" on reservation screens. Do not change layouts or content otherwise.
