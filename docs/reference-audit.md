# Site Audit: Vignan Mahotsav Hero & Header Redesign

## 1. Executive Summary
- **Target Site to Redesign**: `https://m2777.vercel.app/?gate=1` (20th Edition — "The Arc of Becoming", 11–13 Feb 2027)
- **Layout Reference**: `https://mine-tnze.onrender.com/` (19th Edition — Clean, uncluttered layout structure)
- **Visual Art Reference**: `reference-poster.jpg` (Golden sunset gradient, glowing sun, mountain layers, drifting clouds, cliff with samurai & climber silhouettes)

This audit documents every UI component, button, navigation element, and structural pattern across both sites, establishing a precise blueprint to eliminate hero clutter while preserving 100% of event information through an accessible slide-in drawer.

---

## 2. Reference Site Audit (`https://mine-tnze.onrender.com/`)

### 2.1 Header / Top Navigation Structure
| Position | Component / Element | Behavior & Content |
| :--- | :--- | :--- |
| **Top-Left** | Hamburger Menu Button | Interactive 3-bar icon that smoothly transitions to an 'X' on open. Triggers full-height slide-in drawer. |
| **Top-Left (Below/Beside Menu)** | Emblem Logo | Floating Garuda / Fest crest mark (`h-20 sm:h-24 w-auto object-contain`). |
| **Top-Right** | University Logo Lockup | Full institutional lockup: Vignan's Foundation for Science, Technology & Research (Deemed to be University) with ABET, NAAC A+, NIRF 70 accreditation badges (`w-auto max-h-14 object-contain`). |

### 2.2 Hero Center & Call to Actions
| Component | Visual & Text Content | Behavior |
| :--- | :--- | :--- |
| **Top Line** | Edition & Fest Label | Small caps / subtitle: *"A National Level Youth Fest"* |
| **Wordmark** | Main Display Brand | Big bold display wordmark with custom thematic lettering |
| **Tagline** | Sub-Tagline & Dates | Fest theme + shooting star motif + festival dates (*11–13 Feb 2027*) |
| **Primary CTA** | Register Button | Prominent centered button with warm orange/gold gradient, arrow icon, hover elevation & glow |
| **Lower Left Stat** | Talent / Events Metric | Medal icon + *"Exhibit your Talent in 80+ events"* with animated count-up |
| **Lower Right Stat** | Prize Pool Metric | Trophy icon + *"Cash Prizes worth ₹15,00,000"* with animated count-up |

### 2.3 Reference Menu Drawer Inventory
| Drawer Section | Sub-items / Content | Action |
| :--- | :--- | :--- |
| **Header** | Logo & Close Button (X) | Focus trapped, closes on ESC or backdrop click |
| **Navigation Links** | Home, Theme, Events, Schedule, Hospitality, Team, Sponsors, Campus Map, Contact | Smooth-scrolls to anchor or switches view |
| **Events Dropdown** | Expandable Accordion: Culturals, Sports, Techno Races, Para Sports | Expands inline sub-lists |
| **Registration Quicklink** | Direct CTA to event category pricing | Opens modal or routes to registration |

---

## 3. Target Site Audit (`https://m2777.vercel.app/`)

### 3.1 Current Cluttered Hero Elements (To Be Relocated / Cleaned)
| Current Element in Target | Issue / Why It Clutters Hero | New Relocated Destination |
| :--- | :--- | :--- |
| **Fixed Top Bar (`Navbar.tsx`)** | Dense desktop bar with 5 navigation links, Replay button, Register CTA, and branding | Replaced with clean Top-Left Hamburger + Logo and Top-Right University lockup. Links moved to Drawer Menu. |
| **Left Fee Panel (`InfoPanelLeft.tsx`)** | Bulky translucent glass box listing Culturals (₹250), Sports Men (₹350), Sports Women (₹250), URL, and email | Moved into Drawer Menu accordion under "Registration" + retained in Section 4 (Pricing CTA). |
| **Right Category Panel (`InfoPanelRight.tsx`)** | Dense text listing Culturals (5 categories) and Sports (3 categories) obscuring the right artwork | Moved into Drawer Menu accordion under "Events (80+)" + retained in Section 2 (Event Categories Grid). |
| **Side Vertical Labels** | Vertical rotated texts "REGISTRATION", "CULTURALS", "SPORTS" pinned to viewport edges | Removed from hero to create clean letterbox boundaries. |
| **Floating 20th Badge (`Badge20th.png`)** | Floating gold badge over hero sky | Replaced by single top-left emblem placement and subtitle text *"20th Edition"*. |
| **University Floating Pill** | Translucent badge with university title floating in top-left sky | Replaced by crisp, single-image top-right Institutional Lockup with ABET / NAAC A+ / NIRF badges. |

### 3.2 Lower Hero Stats (To Rebalance)
- Current: Static badges on bottom-left and bottom-right.
- Redesign: Refined typography and icons (Medal icon + 80+ events count-up on lower left, Trophy icon + ₹15,00,000 count-up on lower right) balanced symmetrically around the central samurai/climber focal point.

---

## 4. Background Art & Layer Separation Plan

The attached poster (`/public/assets/reference-poster.jpg`) will be separated into a multi-plane parallax depth stage:

| Depth Layer | Z-Index | Visual Element | Source / Implementation |
| :--- | :--- | :--- | :--- |
| **Layer 0 (Farthest)** | 0 | Sky Sunset Gradient | CSS gradient (`#F5A03A` to `#D9631E` to `#4A1210`) with soft cloud texture overlay |
| **Layer 1** | 1 | Glowing Sun Orb | Golden circular gradient sun with soft breathing radial pulse halo (`scale: 1.0 -> 1.06`) |
| **Layer 2** | 2 | Distant Mountain Silhouette | Deep burnt amber mountain ridges (`mountain_1.png` / `mountain_4.png`) |
| **Layer 3** | 3 | Drifting Cloud Planes | 2–3 transparent atmospheric clouds moving horizontally at distinct parallax speeds |
| **Layer 4** | 4 | Mid Mountain Range | Maroon-toned crags (`mountain_2.png` / `mountain_ridge.png`) |
| **Layer 5 (Focal Point)**| 5 | Cliff with Standing Samurai & Climber | High-contrast silhouette cliff from poster, centered unobstructed in lower frame |
| **Layer 6 (Foreground)** | 6 | Foreground Crags & Dark Maroon Vignette | Bottom vignette fading to `#1A0806` ensuring 100% WCAG AA text contrast |
| **Layer 7 (Atmosphere)** | 7 | Ambient Dust / Embers | Subtle floating golden embers floating upward at low opacity |

---

## 5. Sub-Part & Button Inventory Checklist

### Hero Components
- [ ] Top-Left Hamburger Button (Animated 3-bar to 'X', `aria-expanded`, `aria-label="Toggle navigation menu"`)
- [ ] Top-Left Mahotsav Eagle Emblem (`h-16 md:h-20 w-auto`)
- [ ] Top-Right Vignan University Institutional Lockup (Full ABET / NAAC A+ / NIRF 70 badge image, `max-h-12 md:max-h-14`)
- [ ] Hero Centered Eyebrow: *"A National Level Youth Fest – 20th Edition"*
- [ ] Hero Master Wordmark: *"MAHOTSAV"* (sharp-cut samurai display letterforms) + vertical *"VIGNAN"*
- [ ] Hero Tagline: *"The Arc of Becoming"* + shooting-star arc + *"11-13 Feb 2027"*
- [ ] Primary Action Button: **"Register Now"** with arrow icon, radiant sunset gradient, active elevation
- [ ] Lower-Left Stat: Medal Icon + animated counter to **80+ Events**
- [ ] Lower-Right Stat: Trophy Icon + animated counter to **₹15,00,000 Cash Prizes**

### Slide-in Drawer Menu Components
- [ ] Full-height slide panel with `backdrop-blur-xl bg-maroon-950/95 border-r border-gold-500/20`
- [ ] Close Button ('X') with smooth rotation on hover
- [ ] Focus trap inside drawer while open; closes on ESC key or backdrop click; locks body scroll
- [ ] **Nav Item: Theme** (Smooth-scrolls to `#about`)
- [ ] **Nav Item: Events (80+)** (Expandable accordion with Culturals sub-categories & Sports sub-categories)
- [ ] **Nav Item: Schedule** (Smooth-scrolls to `#schedule` Day 1/2/3 tabs)
- [ ] **Nav Item: Registration** (Expandable accordion showing fee tiers ₹250 / ₹350, URL, email)
- [ ] **Nav Item: Contact** (Smooth-scrolls to `#contact`)
- [ ] **Utility Item: Replay Intro** (Re-triggers entrance choreography)
- [ ] **Drawer CTA: Register for Mahotsav** (Prominent highlighted button launching Registration Modal)

---

## 6. Verification Breakpoints
- **Mobile Small (360px)**: Compact typography, stats stacked below Register CTA, samurai cliff visible without overlap.
- **Mobile Large / Tablet (768px)**: Balanced two-column stats, drawer sized to 340px width.
- **Laptop (1024px)**: Full widescreen layout, parallax active on mouse move.
- **Desktop (1440px)**: Golden ratio spacing, generous visual breathing room around samurai.
- **Ultra-wide (1920px)**: Centered 16:9 poster backdrop, crisp non-distorted assets.
