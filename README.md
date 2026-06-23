# Loby Property Management

Marketing site for **Loby Property Management** — a (fictional, demo) full-service
multifamily property manager operating 2,000 apartment homes across Los Angeles.

Static site (HTML/CSS/vanilla JS), no build step.

## Pages
- `index.html` — home
- `properties.html` — 42-community portfolio with neighborhood filtering
- `property.html?id=<slug>` — individual community detail (gallery, floor plans, amenities, map, tour request)
- `residents.html` — resident services, maintenance, FAQ
- `owners.html` — owner/investor services + proposal request
- `privacy.html`, `terms.html`, `accessibility.html` — legal

## Architecture
- `data.js` — single source of truth for all 12 featured communities + card/detail renderers
- `site.js` — injects the shared utility bar / header / footer and wires up nav, scroll reveals, counters, filters, and demo forms
- `styles.css` — all styling

Hosted via GitHub Pages.
