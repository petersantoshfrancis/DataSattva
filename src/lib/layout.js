import { brand, nav, headerCta, footer, contact, org, ctas, legalEntityPlaceholder } from '../data/site.js';
import { icon, brandMark } from './icons.js';

export const esc = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Absolute URL helper. */
export const absUrl = (path = '/') => `${org.url.replace(/\/$/, '')}${path === '/' ? '/' : path}`;

/** Shared head: meta, OG, JSON-LD, design-system stylesheet. */
export function pageHead({ title, description, path = '/', jsonLd = [], noindex = false }) {
  const full = path === '/' ? absUrl('/') : absUrl(path);
  const ld = [...jsonLd];
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${full}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#0B1F3A">
<meta name="author" content="${esc(brand.name)}">
<meta property="og:site_name" content="${esc(brand.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${full}">
<meta property="og:image" content="${absUrl('/assets/og-image.svg')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${absUrl('/assets/og-image.svg')}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/favicon.svg">
<link rel="stylesheet" href="/assets/main.css">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>`;
}

const currentOf = (path) => {
  if (path === '/') return '/';
  const hit = nav
    .filter((n) => n.href !== '/')
    .find((n) => path === n.href || path.startsWith(n.href));
  if (hit) return hit.href;
  if (path.startsWith('/services')) return '/services/';
  if (path.startsWith('/insights')) return '/insights/';
  return '';
};

export function header(path) {
  const current = currentOf(path);
  const items = nav
    .map(
      (n) =>
        `<li><a class="nav__link" href="${n.href}"${current === n.href ? ' aria-current="page"' : ''}><span class="lbl-long">${esc(
          n.label
        )}</span><span class="lbl-short">${esc(n.short || n.label)}</span></a></li>`
    )
    .join('');
  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${esc(brand.name)} home">
      ${brandMark()}
      <span class="brand__text">
        <span class="brand__name">${esc(brand.name)}</span>
        <span class="brand__tag">${esc(brand.tagline)}</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
      <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
      <span>Menu</span>
    </button>
    <nav class="nav" id="primary-nav" aria-label="Primary" data-nav>
      <ul class="nav__list">
        ${items}
      </ul>
      <div class="nav__cta">
        <a class="btn btn--primary btn--block" href="${headerCta.href}">${esc(headerCta.label)}</a>
      </div>
    </nav>
    <div class="header-cta">
      <a class="btn btn--primary btn--sm" href="${headerCta.href}">
        <span class="cta-long">${esc(headerCta.label)}</span>
        <span class="cta-short">3-Minute Assessment</span>
        ${icon('arrow')}
      </a>
    </div>
  </div>
</header>`;
}

export function footerBlock() {
  const cols = footer.columns
    .map(
      (c) => `<div class="footer-col">
        <h3>${esc(c.title)}</h3>
        <ul>${c.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
      </div>`
    )
    .join('');
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="${esc(brand.name)} home">
          ${brandMark()}
          <span class="brand__text">
            <span class="brand__name">${esc(brand.name)}</span>
            <span class="brand__tag">${esc(brand.tagline)}</span>
          </span>
        </a>
        <p>${esc(footer.blurb)}</p>
      </div>
      ${cols}
    </div>
    <div class="footer-bottom">
      <p class="footer-disclaimer">${esc(footer.disclaimer)}</p>
      <div class="footer-legal">
        <span>© ${year} ${esc(brand.name)}. All rights reserved.</span>
        <a href="/privacy/">Website privacy notice</a>
        <a href="/terms/">Terms &amp; disclaimers</a>
        <a href="/contact/">Contact</a>
        <span class="visually-hidden">${esc(legalEntityPlaceholder)}</span>
      </div>
    </div>
  </div>
</footer>`;
}

/** Standard page shell. */
export function layout({ path, head, bodyClass = '', content, scripts = '' }) {
  return `${head}
<body class="${bodyClass}">
${header(path)}
<main id="main">
${content}
</main>
${footerBlock()}
${scripts}
</body>
</html>`;
}

/** Inner-page hero with breadcrumb. */
export function pageHero({ eyebrow, title, lede = '', crumbs = [], meta = '', aside = '' }) {
  const bc = crumbs.length
    ? `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${crumbs
        .map((c) =>
          c.href
            ? `<li><a href="${c.href}">${esc(c.label)}</a></li>`
            : `<li aria-current="page">${esc(c.label)}</li>`
        )
        .join('')}</ol></nav>`
    : '';
  return `<section class="page-hero${aside ? ' page-hero--split' : ''}">
  <div class="container">
    ${bc}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
    ${meta ? `<div class="page-hero__meta">${meta}</div>` : ''}
    ${aside}
  </div>
</section>`;
}

/** Reusable closing CTA band. */
export function ctaCloser({
  title = 'Every Data Privacy Journey Begins with Clarity.',
  body = 'Understand where you stand, identify the areas that need attention, and explore the next steps towards strengthening your organisation’s data privacy practices.',
  primary = ctas.assessment,
  secondary = ctas.contact,
} = {}) {
  return `<section class="section closer">
  <div class="container">
    <p class="eyebrow" style="justify-content:center;">Next step</p>
    <h2>${esc(title)}</h2>
    <p>${esc(body)}</p>
    <div class="btn-row">
      <a class="btn btn--accent" href="${primary.href}">${esc(primary.label)} ${icon('arrow')}</a>
      <a class="btn btn--outline-light" href="${secondary.href}">${esc(secondary.label)}</a>
    </div>
  </div>
</section>`;
}

/** Compact assessment prompt used at the foot of service and insight pages. */
export function miniAssessBand() {
  return `<section class="section section--tight section--paper">
  <div class="container">
    <div class="card card--pad-lg" style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1.5rem;align-items:center;">
      <div>
        <p class="eyebrow" style="margin-bottom:0.5rem;">Not sure where to start?</p>
        <h2 style="font-size:clamp(1.25rem,1.1rem + 0.7vw,1.6rem);margin-bottom:0.4rem;">Get an indicative view of your DPDP readiness in about three minutes.</h2>
        <p class="small muted mb-0">Free, no sign-up, scored in your browser. ${esc('Indicative only — not an exhaustive compliance evaluation.')}</p>
      </div>
      <div class="btn-row">
        <a class="btn btn--primary" href="${ctas.assessmentShort.href}">${esc(ctas.assessmentShort.label)} ${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>`;
}

export const contactLine = () => contact.email;
