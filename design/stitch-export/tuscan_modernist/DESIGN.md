---
name: Tuscan Modernist
colors:
  surface: '#f7faf4'
  surface-dim: '#d8dbd5'
  surface-bright: '#f7faf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f5ee'
  surface-container: '#ecefe8'
  surface-container-high: '#e6e9e3'
  surface-container-highest: '#e0e3dd'
  on-surface: '#191d19'
  on-surface-variant: '#424847'
  inverse-surface: '#2d312d'
  inverse-on-surface: '#eff2eb'
  outline: '#727877'
  outline-variant: '#c2c8c6'
  surface-tint: '#4d6360'
  primary: '#021716'
  on-primary: '#ffffff'
  primary-container: '#172c2a'
  on-primary-container: '#7d9491'
  inverse-primary: '#b4cbc8'
  secondary: '#904c2d'
  on-secondary: '#ffffff'
  secondary-container: '#fea680'
  on-secondary-container: '#78391c'
  tertiary: '#16140b'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b281f'
  on-tertiary-container: '#948f82'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e7e4'
  primary-fixed-dim: '#b4cbc8'
  on-primary-fixed: '#091f1d'
  on-primary-fixed-variant: '#364b48'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb597'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#733518'
  tertiary-fixed: '#e9e2d3'
  tertiary-fixed-dim: '#cdc6b8'
  on-tertiary-fixed: '#1e1b13'
  on-tertiary-fixed-variant: '#4a463c'
  background: '#f7faf4'
  on-background: '#191d19'
  surface-variant: '#e0e3dd'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '400'
    lineHeight: 4rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
    letterSpacing: -0.005em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system synthesizes the quiet rigor of high-end Italian hospitality with the purposeful ergonomics of modern enterprise software. The aesthetic balances heritage editorial craft (reminiscent of bespoke enoteca menus and physical leather-bound guest folios) with precision table management, real-time floor mapping, and multi-location tenant governance.

### Core Tenets
- **Editorial Calm over Software Clutter:** Avoid dense, neon-accented dashboard tropes. Replace them with warm tactile surfaces, hairline dividers, generous white space, and literary typographic scale.
- **Architectural Utility:** Interfaces serve fast-paced front-of-house operations alongside high-level hospitality analytics. Workflows favor instantaneous visual parsing under ambient, dim restaurant lighting or bright natural daylight.
- **Authentic Materiality:** No amorphous colored blobs, heavy drop-shadows, or gratuitous 3D skeuomorphism. Depth is achieved via tonal contrast between bleached stone, warm butter paper (`Burro`), and deep alpine cypress green (`Bosco`).

### Operational Context
- Target users include front-of-house maîtres d', floor captains, head sommeliers, and multi-unit hospitality operators.
- V1 strictly excludes e-commerce or digital checkout flows. All financial closures honor classic table-service conventions: printed physical folios, tableside POS terminals, or cashier consolidation.

## Colors

The color palette draws directly from the natural materials and tones of classic northern Italian trattorie and Tuscan estates: aged lime wash, rich clay terracotta, burnished cypress timber, and natural linen.

### Palette Architecture
- **Primary (`#172C2A` — Bosco Deep Green):** Used for primary executive navigation, system-critical controls, table occupied status, and dominant branding anchors. Conveys stability, exclusivity, and tradition.
- **Secondary (`#BD704E` — Terracotta / Rame):** Employs the warmth of fired Tuscan clay. Used exclusively for attention vectors: seated order status, VIP arrival flags, urgent floor alerts, and key editorial action highlights.
- **Tertiary (`#D8D1C3` — Pietra Serena / Stone):** Structural spine. Serves as editorial hairline borders, table layout grid coordinates, inactive chips, and subtle dividers. Never used for critical text.
- **Neutral Primary (`#232723` — Charcoal Black):** Dense carbon pigment reserved for high-fidelity alphanumeric data, primary body narrative, guest names, and inventory tables.
- **Surface Canvas (`#F6F2E9` — Burro / Warm Ivory):** The foundational application canvas, replacing clinical SaaS white with the warmth of hand-pressed stationery.
- **Surface Raised (`#FFFFFF` — Pura Cera):** High-clarity card surfaces and floating flyout sheets to separate actionable operational groups from the canvas.

## Typography

The typography unites two disciplines: high-culture European editorial storytelling and hyper-legible industrial interface execution.

### Dual-Family Architecture
- **Display & Section Titles (`Newsreader`):** An optical serif designed for extended reading and expressive display. Applied to tenant branding (e.g., *Locanda San Frediano*), room designations (*Sala Camino*, *Veranda Giardino*), total service covers, and guest notes. Set with negative letter-spacing for refined poise.
- **System Interface & Data Tables (`Plus Jakarta Sans`):** Clean, geometric grotesque with wide apertures. Provides instant legibility on kitchen tickets, service timers, cellar inventory manifests, and reservation matrices.

### Rules & Formatting
- All tabular figures, floor counts, and timestamps must use tabular font feature settings (`tnum`).
- Uppercase tracking (`label-sm` and `label-md`) is applied to status tags, table numbers, and station badges with `0.04em` to `0.06em` letter spacing for crisp definition.

## Layout & Spacing

Layout geometry follows a strict 8px structural matrix. Layouts are constructed to minimize horizontal cognitive drift for staff operating between static terminal bars, iPad cradles, and mobile handhelds.

### Grid & Form Factors
- **Desktop Floor & Office Viewports (1280px+):** 12-column layout with 24px gutters (`gutter`) and 32px margins (`margin`). Left-hand global navigation is fixed at 280px width to accommodate location toggles, tenant brand seals, and multi-room filters.
- **Tablet / Terminal Surface (768px – 1024px):** 8-column layout with 16px gutters and 24px margins. Floor plan maps switch to fluid canvas mode with lockable panning.
- **Mobile Floor Staff Viewports (390px):** 4-column layout with 16px margins. Interactive touch surfaces conform strictly to an absolute minimum 44px hit-box dimension to prevent mis-touches during high-velocity service.

### Vertical Rhythm & Density
- Micro-spacing (`space-xs`, `space-sm`) handles badge insets, table occupancy tags, and dietary icon margins.
- Macro-spacing (`space-lg`, `space-xl`) sets editorial breath between distinct service phases: Antipasti / Primi grouping, reservation shifts (Pranzo vs. Cena), and multi-tenant billing aggregations.

## Elevation & Depth

Visual hierarchy abandons synthetic drop-shadows and artificial blurs. Instead, elevation mirrors traditional drafting boards and architectural layered vellum.

### Hierarchy via Tonal Stacking
- **Base Ground (`#F6F2E9`):** Canvas backdrop for the entire operational window.
- **Tier 1 — Structural Modules (`#FFFFFF`):** Reservation panels, order status cards, and table inspection sheets sit directly on the ground, separated by a crisp 1px stroke of Stone (`#D8D1C3`).
- **Tier 2 — Contextual Sheets & Modals:** Active reservation drawers and floor configuration dialogs use a soft ambient contact shadow: `0 8px 24px -4px rgba(23, 44, 42, 0.08)`, bounded by a 1px border (`#D8D1C3`).
- **Tier 3 — Floating Floor Controls:** Interactive tools floating over table layout diagrams employ `0 12px 32px -6px rgba(23, 44, 42, 0.12)` with zero directional spread to evoke elevated, physical placards.

## Shapes

The shape system adopts a soft architectural profile (`roundedness: 1`). Radii are intentionally restrained: 4px default corner radius for utility components (`rounded`), 8px for containers and sheets (`rounded-lg`), and 12px for modal envelopes (`rounded-xl`).

### Surface Framing
- Surfaces favor rectangular clarity over playful pills or extreme bubbles. This preserves high spatial density for table listings and service sequences.
- Table graphical representations in the floor editor reflect physical furniture geometry: sharp squares (4px radius) for 2-top banquettes, exact circular geometry for round family banquet tables, and long softly rounded rectangles for communal degustation tables.

## Components

### Buttons
- **Primary:** Forest green (`#172C2A`) fill, pure white text, 4px border radius, 44px min-height. On hover, subtle tint shift to `#203A38`. Used for decisive floor actions (e.g., "Seat Party", "Print Folio").
- **Secondary:** Warm ivory (`#F6F2E9`) fill with a 1px border in `#D8D1C3`, text in `#232723`. Used for auxiliary states (e.g., "Add Course", "Split Notes").
- **Terracotta Accent:** Solid `#BD704E` fill with pure white text, reserved strictly for service urgencies (e.g., "Table Calling", "Course 8' Hold").

### Chips & Badges
- **Status Tags:** Compact elements (24px height, uppercase `label-sm`) with 2px corner radius.
  - *Occupied:* `#172C2A` text on `rgba(23, 44, 42, 0.08)` ground.
  - *Reserved / Approaching:* `#BD704E` text on `rgba(189, 112, 78, 0.12)` ground.
  - *Available / Ready:* `#232723` text on `#D8D1C3` ground.

### Lists & Tables
- Border-collapsed row structures defined by 1px bottom border in `#D8D1C3`.
- Cell height strictly formatted at 52px for desktop tables and 60px for mobile checklists to accommodate rapid finger scanning.
- Alternating zebra fills are strictly prohibited; hierarchy is established via typographic weight and subtle hover fills (`rgba(23, 44, 42, 0.02)`).

### Input Fields
- Inputs feature a crisp `#D8D1C3` 1px border over a `#FFFFFF` fill, transitioning to a 1.5px `#172C2A` border on focus. No blue halo rings.
- Placeholder text in `#8C867A` (mid-tone stone). Labels sit strictly above fields in `label-md` uppercase styling.

### Cards & Reservation Tiles
- Framed in `#FFFFFF` with a 1px `#D8D1C3` border.
- Cards maintain interior padding of `space-md` (16px) or `space-lg` (24px), displaying party size, guest dietary tags (e.g., *Celiaco*, *Astice no*), assigned sommelier, and seated duration counter.

### Hospitality-Specific Components
- **Bill Folio Voucher (No Online Checkout):** Clean modal replicating the tactile restaurant receipt slip. Contains subtotal, cover charges (*Coperto*), local VAT (*IVA*), and action button "Request Printed Conto" or "Tendered at Cassa / POS".
- **Floor Map Node:** Crisp geometric element denoting table identifier, cover limit, and real-time color badge reflecting service phase (Antipasto, Primo, Secondo, Dolce, Conto Richiesto).