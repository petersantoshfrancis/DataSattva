# DataSattva — website

**The clearer side of data.**
A production-oriented marketing and knowledge website for DataSattva, a data privacy and DPDP advisory practice in India.

- 28 pages, statically generated
- Fully responsive (mobile-first), accessible navigation, semantic HTML
- Functional 3-minute DPDP Readiness Assessment (scored client-side, downloadable summary)
- Functional contact form with server-side validation, rate limiting and honeypot
- Self-hosted fonts, no third-party scripts, no cookies, no analytics by default
- SEO: unique titles/descriptions, canonical URLs, Open Graph + Twitter cards, JSON-LD, sitemap, robots

---

## 1. Quick start

```bash
cd ds
npm install          # express, helmet, express-rate-limit, dotenv
npm run build        # generates ./dist
npm run serve        # builds + serves on http://localhost:8080
npm run dev          # serve + rebuild on change (development only)
```

Checks:

```bash
npm run check:links  # broken internal links, headings, meta, sitemap coverage
```

`node build.mjs` is the only build step. There is no bundler, no framework and no database — the site is plain functions producing HTML, plus two small vanilla-JS files.

---

## 2. Project structure

```
ds/
├─ build.mjs               # static site generator (routes, assets, sitemap, robots, 404)
├─ server.mjs              # Express server (self-hosting): static files + POST /api/enquiries
├─ api/enquiries.js        # Vercel serverless function: POST /api/enquiries
├─ vercel.json             # Vercel build settings, security headers, redirects
├─ docs/
│  └─ deployment-and-editing-guide.html   # operator runbook
├─ tools/
│  ├─ check-links.mjs      # link/structure audit
│  ├─ check-a11y.mjs       # axe-core WCAG audit
│  └─ vercel-build.mjs     # guarded production build
├─ src/
│  ├─ data/
│  │  ├─ site.js           # brand, nav, footer, contact details, CTA copy
│  │  ├─ regulatory.js     # DPDP Act/Rules content model + commencement, roles, requirements, sources
│  │  ├─ services.js       # the 10 service pages (content for index + detail pages)
│  │  ├─ assessment.js     # question bank + scoring model (single source of truth)
│  │  └─ insights.js       # article content, categories
│  ├─ lib/
│  │  ├─ layout.js         # <head>, header, footer, page hero, CTA bands
│  │  ├─ components.js     # hero SVG, framework grid, journey, service cards, roadmap, accordion
│  │  └─ icons.js          # inline SVG icon set + brand mark
│  ├─ pages/               # one module per page (returns full HTML string)
│  ├─ scripts/
│  │  ├─ main.js           # header, mobile nav, reveal, scroll-spy
│  │  ├─ assessment.js     # assessment runtime, scoring, results, download
│  │  ├─ contact.js        # contact form validation + submission
│  │  └─ (shared) src/lib/enquiry.js — validation used by BOTH the Express route and the Vercel function
│  ├─ styles/main.css      # design system (tokens → base → components)
│  └─ fonts/               # self-hosted Inter + Montserrat (woff2, latin subset)
├─ tools/check-links.mjs   # QA script
├─ dist/                   # build output — deploy this
└─ data/                   # runtime: enquiries.ndjson (created on first submission)
```

### Routes generated

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/about/` | About DataSattva |
| `/dpdp-act-and-rules/` | Knowledge page (framework, commencement, applicability, roles, 14 requirements, roadmap, challenges, glossary, sources) |
| `/services/` | Services index |
| `/services/<10 slugs>/` | Dedicated service pages |
| `/readiness-assessment/` | Assessment |
| `/insights/` | Insights index |
| `/insights/<8 slugs>/` | Article pages |
| `/contact/` | Contact |
| `/privacy/`, `/terms/` | Legal (noindex) |
| `/assessment-embed.html` | Single-file standalone assessment (no server, no external assets) for iframe embedding or emailing |
| `/404.html`, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest` | Supporting |

---

## 3. How to update content

Everything is data-driven. Edit a file in `src/data/`, run `npm run build`, redeploy `dist/`.

### Add an article

Append an object to `insights` in `src/data/insights.js`:

```js
{
  slug: 'my-new-article',            // becomes /insights/my-new-article/
  title: '…',
  category: 'privacy-governance',    // must exist in insightCategories
  draft: false,                      // false removes the "Draft content" badge
  author: 'Name or null',
  date: '2026-11-20',                // ISO date string, or null
  readingTime: '6 min read',
  excerpt: '…',                      // used in cards and meta description
  lede: '…',                         // intro line on the article page
  blocks: [
    { type: 'p', text: '…' },
    { type: 'h2', text: '…' },
    { type: 'ul', items: ['…', '…'] },
    { type: 'callout', title: '…', text: '…' },
    { type: 'quote', text: '…' },
  ],
}
```

### Add or edit a service

Edit an entry in `src/data/services.js`. The object drives both the services grid and the dedicated page (`/services/<slug>/`). Required keys are visible on any existing entry: `slug, letter, title, short, outcome, icon, problem, why, challenges[], approach[], deliverables[], outcomes[], faq[]`.

Available icons: `compass, governance, map, consent, rights, network, retention, shield, document, people` (see `src/lib/icons.js`).

### Change the assessment

`src/data/assessment.js` is the single source of truth for the questions, weights, gap-severity rules, readiness bands and next steps. The browser runtime reads the question bank from a JSON blob generated at build time, so editing that file is enough — no second copy to keep in sync.

Adding a question automatically updates weights and the maximum score.

### Change brand, contact details, navigation

`src/data/site.js`. Contact values can also come from environment variables (next section).

---

## 4. Configuration required from you

These items are **placeholders** in the build. Search for them in `src/data/site.js`, `src/pages/privacy.js` and `src/pages/terms.js`.

| Item | Current state | Where |
|---|---|---|
| Contact email | `contact@datasattva.example` (reserved example domain) | `site.js` → `contact.email`, or env `DS_CONTACT_EMAIL` |
| Telephone | Not published; the contact page explains that none has been supplied | `site.js` → `contact.phone`, or env `DS_CONTACT_PHONE` |
| Office address | Only "Bengaluru, India" (city-level) | `site.js` → `contact.office`, or env `DS_OFFICE` |
| LinkedIn / social | Empty | `site.js` → `contact.linkedin`, or env `DS_LINKEDIN` |
| Legal entity name, registered address | Marked `[Legal entity name to be confirmed]` | `site.js` → `legalEntityPlaceholder`; `privacy.js` §1 |
| Data Protection Officer / grievance contact | Not stated | `privacy.js` §1, §8 |
| Hosting region / cross-border position | `[to be confirmed before launch]` | `privacy.js` §5 |
| Governing-law jurisdiction | `[jurisdiction to be confirmed]` | `terms.js` §11 |
| Authors and publication dates for Insights | `null` → renders "Publication date pending" / "Author to be confirmed", articles badged as draft | `insights.js` |
| Client names, testimonials, certifications, awards, years of experience, headcount | Deliberately absent — nothing invented | n/a |
| Analytics / CRM / chat tooling | None installed. If added, the privacy notice must be updated | `privacy.js` §3 |

Nothing on the site claims certification, regulatory approval, government endorsement, guaranteed compliance or a specific outcome.

---

## 5. Environment variables

Create `ds/.env` (never committed):

```ini
# Public site config (baked into HTML at build time)
SITE_URL=https://www.datasattva.com
DS_CONTACT_EMAIL=hello@datasattva.com
DS_CONTACT_PHONE=+91 80 0000 0000
DS_OFFICE=Bengaluru, India
DS_LINKEDIN=https://www.linkedin.com/company/datasattva

# Server
PORT=8080
NODE_ENV=production

# Enquiry handling
DS_DATA_DIR=./data                 # where enquiries.ndjson is written
DS_WEBHOOK_URL=                    # optional: POST each enquiry as JSON (Slack/CRM/automation)
DS_WEBHOOK_TOKEN=                  # optional bearer token for the webhook
```

Security notes:
- No secrets are read by client-side code. The browser only knows the endpoint path `/api/enquiries`.
- Enquiries are written with mode `0600` to an append-only NDJSON file. Each record includes a reference, timestamp, IP and user agent for abuse handling — state this in the privacy notice if you keep it.
- `helmet` sets CSP, HSTS (production), no-sniff, frame rules. CSP allows only same-origin scripts, styles, fonts and images.
- Rate limit: 8 submissions per IP per 15 minutes.
- The form has a hidden honeypot field; bots are silently acknowledged and discarded.
- Server-side validation is authoritative; client validation is a convenience layer.

### Where enquiries go

By default, to `data/enquiries.ndjson`. To receive email or push into a CRM, set `DS_WEBHOOK_URL` to an endpoint you control (a serverless function, Zapier/Make hook, or your CRM's inbound API) and have it email or file the record. Do **not** put SMTP credentials in client code.

---

## 6. Deployment

Full step-by-step instructions, including replacing an existing live site, are in
**[docs/deployment-and-editing-guide.html](docs/deployment-and-editing-guide.html)**. Summary:

### Vercel (static output + one serverless function)

```bash
# repo root must be this ds/ folder
vc link          # or: import the repo at vercel.com → Add New → Project
vc --prod
```

Configured in `vercel.json`:

| Setting | Value |
|---|---|
| Build command | `npm run vercel-build` |
| Output directory | `dist` |
| Framework | none |
| Trailing slash | enforced (`trailingSlash: true`) |
| Headers | CSP, nosniff, referrer policy, permissions policy, asset cache rules |

`tools/vercel-build.mjs` **fails a Production build** if `SITE_URL` is unset or `DS_CONTACT_EMAIL` is still a `.example` address, so a placeholder can never reach the live site.

Environment variables to set in Vercel (Production + Preview):

```
SITE_URL=https://www.datasattva.com
DS_CONTACT_EMAIL=hello@datasattva.com
DS_CONTACT_PHONE=            # optional; leave empty to publish none
DS_OFFICE=Bengaluru, India
DS_LINKEDIN=                 # optional
# Email delivery — set ONE provider:
ZEPTOMAIL_SEND_TOKEN=       # Zoho ZeptoMail send token (recommended with Zoho Mail)
ZEPTOMAIL_API_HOST=api.zeptomail.in   # .in for India DC (default), .eu for EU, or api.zeptomail.com
ZEPTOMAIL_BOUNCE_ADDRESS=bounce@datasattva.com
# or: RESEND_API_KEY=re_xxx
# or: SMTP_HOST=smtp.zoho.in SMTP_PORT=465 SMTP_USER=website@datasattva.com SMTP_PASS=...
ENQUIRY_TO_EMAIL=hello@datasattva.com     # required; comma-separate for several recipients
ENQUIRY_FROM_EMAIL=DataSattva Website <website@datasattva.com>
ENQUIRY_WEBHOOK_URL=         # optional alternative/addition (CRM/Zapier/Slack)
ENQUIRY_WEBHOOK_TOKEN=
```

Env var changes take effect only on a **new deployment** — redeploy after editing them.

### Contact form and assessment results on Vercel

> **Plain-language guide for the live stack** (Vercel + Namecheap + Zoho Mail + ZeptoMail): `docs/zoho-mail-and-live-site-guide.html`. The technical runbook is `docs/deployment-and-editing-guide.html`.

Both the contact form and the optional "send my assessment result" form post to `api/enquiries.js`, which validates (shared logic in `src/lib/enquiry.js`), checks a honeypot, applies a best-effort throttle, then delivers via `src/lib/email.js`:

1. **Zoho ZeptoMail** HTTP API if `ZEPTOMAIL_SEND_TOKEN` is set (recommended for Zoho Mail users — the email lands in your Zoho mailbox with reply-to set to the enquirer), or
2. **Resend** if `RESEND_API_KEY` is set (only when no ZeptoMail token), or
3. **SMTP** if `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` are set (self-hosted only — see note below), and/or
4. POSTs the record as JSON to `ENQUIRY_WEBHOOK_URL` if set.

**Production builds fail** if no delivery channel and no `ENQUIRY_TO_EMAIL` are configured, and the endpoint returns HTTP 503 with an honest message if delivery fails at runtime (it also logs the full record, since Vercel keeps no files).

> **Why not Zoho Mail SMTP on Vercel:** Vercel blocks outbound port 25, and its functions pause background work once a response is returned, so an SMTP send can be silently dropped. ZeptoMail is Zoho's transactional HTTP API — same domain, same inbox, no SMTP. On a self-hosted server (VPS/Render/Railway) plain Zoho Mail SMTP on port 465 works fine.

Vercel has no persistent disk, so nothing is written to `data/` there. If you need an archive, use the webhook (sheet/CRM/database).

### Self-hosted Node (full server)

```bash
npm ci && npm run build
NODE_ENV=production PORT=8080 node server.mjs
```

Serves the site *and* `/api/enquiries`, appending records to `data/enquiries.ndjson` (mode 0600) and delivering notifications through the same `src/lib/email.js` layer (ZeptoMail / Resend / SMTP). Needs a host that keeps a process alive (VPS, Render, Railway, Fly.io) — not a static host. Health check: `GET /api/health`. Enable `helmet`'s frame guard in production if you do not need the site embeddable (`frameguard: false` is set only so the hosted preview pane can display it).

### Any other static host

Deploy `dist/`. Point the form at a serverless function you control, reusing `src/lib/enquiry.js`; or use a hosted form provider and remove the `fetch` block in `src/scripts/contact.js`.

### Server / proxy checklist

- Redirect `http → https`; serve HSTS.
- HTML no-cache; `/assets/*` long-lived (rename font files if you change them).
- Brotli/gzip for HTML/CSS/JS/SVG.
- `SITE_URL` must match the canonical host **before** building, or canonicals, OG URLs and `sitemap.xml` will be wrong.
- Submit `sitemap.xml` to Google Search Console and Bing.
- Swap `assets/og-image.svg` for a 1200×630 raster if a network requires it.

## 7. Testing performed

| Area | Method | Result |
|---|---|---|
| Build | `node build.mjs` | 28 pages + `assessment-embed.html` + assets, no warnings |
| Vercel build guard | `VERCEL_ENV=production node tools/vercel-build.mjs` | Exits 1 with a clear message when `SITE_URL` / real contact email are missing; passes when set |
| Standalone assessment | `dist/assessment-embed.html` in a browser | Same 12 questions, same score (39/100, Foundational), zero console errors, no external requests |
| Link/structure audit | `npm run check:links` | 0 broken internal links, 28/28 unique titles, one `<h1>` per page, canonical + description on every indexable page, sitemap covers all pages |
| Assessment flow | Headless Chromium: happy path | Step 1 → 2 → 3 → results; score 39/100, "Foundational" band with 7 critical gaps; 12 findings rendered |
| Assessment validation | Submit step 1 empty | Field-level error displayed, blocked until valid |
| Assessment download | Click "Download results summary" | `datasattva-dpdp-readiness-summary.txt` generated locally with profile, score, findings and disclaimer |
| Assessment restart | Click "Restart" | Returns to step 1, clears answers, hides results, updates live region |
| Contact form | Browser: empty submit, malformed email, valid submit | 6 field errors on empty submit; email format caught client-side; success panel with reference; form resets |
| Contact API | `POST /api/enquiries` valid + invalid | `201 {ok:true,reference}` / `422` with per-field errors; record written to NDJSON with mode 0600 |
| Server routing | `/`, `/services/<slug>/`, trailing-slash redirect, `/api/health` | All 200; unknown paths fall through to `404.html` |
| Responsive | 1560 / 1440 / 1280 / 1180 / 768 / 390 px viewports | No horizontal overflow at any width; header switches to short labels below 1520 px and to the mobile menu at ≤1180 px |
| Console | Every page load | No JavaScript errors |
| Accessibility | `npm run check:a11y` (axe-core, WCAG 2.0/2.1 A+AA) over all built pages, plus the assessment results view and the standalone embed | **29/29 pages clean, 0 violations**. Skip link, landmarks, labelled controls, `aria-live` status regions, visible focus rings, `prefers-reduced-motion`, `aria-expanded` menu state. |
| Print | Results page print CSS | Score panel prints on white, navigation and CTAs hidden |

Not verified here: real-device testing, screen-reader walkthrough (NVDA/JAWS/VoiceOver), and load testing. Recommend all three before launch.

---

## 8. Content integrity notes

- **Regulatory sources**: DPDP Act, 2023 (Act No. 22 of 2023); commencement notification G.S.R. 843(E), 13 November 2025; DPDP Rules, 2025, G.S.R. 846(E), 13 November 2025; PIB releases of 14 and 17 November 2025. Listed with notes in `src/data/regulatory.js` → `sources` and rendered in the Sources panel on `/dpdp-act-and-rules/`.
- **Staged commencement** is stated explicitly (13 Nov 2025 / 13 Nov 2026 / 13 May 2027), and future obligations are never described as already effective.
- **Unsettled items are flagged, not asserted**: the January 2026 consultation on compressing the eighteen-month stage to twelve months is presented as an unnotified proposal; the 72-hour breach-reporting expectation is labelled practitioner practice derived from Rule 7 rather than a quoted statutory deadline.
- **Every regulatory statement carries a category** — statutory requirement, conditional requirement, good practice or advisory recommendation — via tags on the knowledge page and in service copy.
- **Penalty figures** are presented as Schedule ceilings with the mitigating factors the Board weighs, not as tariffs.
- **Insights articles are labelled draft** in the interface. No author, date, client, statistic or quotation has been invented.
- **No claims** of certification, regulatory approval, endorsement, guaranteed compliance or legal advice anywhere in the copy.

If a regulatory position changes, update `src/data/regulatory.js` (and the relevant article in `insights.js`), bump `regulatoryStatus.verifiedOn` in `src/data/site.js`, and rebuild. The verification date is rendered on the knowledge page, article pages and service sidebars.

---

## 9. Design system

| Token | Value | Use |
|---|---|---|
| Navy | `#0B1F3A` | Authority surfaces, headings, footer |
| Electric blue | `#2F80FF` | Accents, diagrams, links (text links use `#0F57CC` for contrast) |
| White | `#FFFFFF` | Base canvas |
| Saffron | `#FFB020` | Highlights, primary CTAs, diagrams |
| Neutrals | `--paper #F7F9FC`, `--mist #EEF2F8`, `--line #DDE5EF` | Backgrounds, dividers |

Type: **Montserrat** (600/700) for headings and brand elements, **Inter** (400–600) for body — self-hosted woff2, latin subset, `font-display: swap`.

Layout: 1180 px container, 4-point spacing scale, 76 px sticky header, single-column reading measure capped at ~72ch. All interactive components are CSS-only where possible (`<details>` for accordions, native form controls for the assessment) so the site works without JavaScript except for the two features that require it (assessment scoring, form submission).
