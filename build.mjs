#!/usr/bin/env node
/**
 * DataSattva static site generator.
 *
 *   node build.mjs            → build into ./dist
 *   node build.mjs --serve    → build, then serve ./dist + /api on PORT (default 8080)
 *   node build.mjs --watch    → rebuild on change (dev only)
 *
 * Every page is a pure function of the content modules in src/data, so new
 * articles and services are added by appending to those files and rebuilding.
 */
import { mkdir, writeFile, cp, rm, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import { org, contact, brand, nav } from './src/data/site.js';
import { services } from './src/data/services.js';

import home from './src/pages/home.js';
import about from './src/pages/about.js';
import dpdp from './src/pages/dpdp.js';
import { servicesIndex, servicePage } from './src/pages/services.js';
import assessment from './src/pages/assessment.js';
import contactPage from './src/pages/contact.js';
import { assessmentEmbed } from './src/pages/assessment-embed.js';
import privacy from './src/pages/privacy.js';
import terms from './src/pages/terms.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

const write = async (rel, content) => {
  const file = path.join(DIST, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
  return rel;
};

export async function build() {
  const t0 = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const pages = [];

  /* ---------------------------------------------------------------- routes */
  const routes = [
    ['index.html', home, '/'],
    ['about/index.html', about, '/about/'],
    ['dpdp-act-and-rules/index.html', dpdp, '/dpdp-act-and-rules/'],
    ['services/index.html', servicesIndex, '/services/'],
    ['readiness-assessment/index.html', assessment, '/readiness-assessment/'],
    ['contact/index.html', contactPage, '/contact/'],
    ['privacy/index.html', privacy, '/privacy/'],
    ['terms/index.html', terms, '/terms/'],
  ];

  for (const sv of services) {
    routes.push([`services/${sv.slug}/index.html`, () => servicePage(sv.slug), `/services/${sv.slug}/`]);
  }

  let warnings = [];
  for (const [file, fn, route] of routes) {
    const html = fn();
    if (!html) {
      warnings.push(`Page generator returned nothing for ${route}`);
      continue;
    }
    await write(file, html);
    pages.push({ route, file });
  }

  /* -------------------------------------------------- standalone assessment */
  const runtimeSource = await readFile(path.join(SRC, 'scripts', 'assessment.js'), 'utf8');
  const siteCss = await readFile(path.join(SRC, 'styles', 'main.css'), 'utf8');
  await write('assessment-embed.html', assessmentEmbed(runtimeSource, siteCss));

  /* ------------------------------------------------------------ static assets */
  await mkdir(path.join(DIST, 'assets', 'fonts'), { recursive: true });
  await cp(path.join(SRC, 'styles', 'main.css'), path.join(DIST, 'assets', 'main.css'));
  await cp(path.join(SRC, 'fonts', 'inter-latin.woff2'), path.join(DIST, 'assets', 'fonts', 'inter-latin.woff2'));
  await cp(path.join(SRC, 'fonts', 'montserrat-latin.woff2'), path.join(DIST, 'assets', 'fonts', 'montserrat-latin.woff2'));
  for (const js of ['main.js', 'assessment.js', 'contact.js']) {
    await cp(path.join(SRC, 'scripts', js), path.join(DIST, 'assets', js));
  }

  /* -------------------------------------------------------------- brand assets */
  /* Brand mark: the single source of truth is src/brand/logo.svg.
     The favicon is generated from it. To change the logo, edit that one file. */
  const logo = await readFile(path.join(SRC, 'brand', 'logo.svg'), 'utf8');
  await write('assets/favicon.svg', logo);

  await write(
    'assets/og-image.svg',
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0B1F3A"/><stop offset="100%" stop-color="#153560"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2F80FF" stop-opacity="0.05"/><stop offset="50%" stop-color="#2F80FF" stop-opacity="0.5"/><stop offset="100%" stop-color="#2F80FF" stop-opacity="0.05"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g stroke="#fff" stroke-opacity="0.05">${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 46}" x2="1200" y2="${i * 46}"/>`).join('')}${Array.from({ length: 26 }, (_, i) => `<line x1="${i * 46}" y1="0" x2="${i * 46}" y2="630"/>`).join('')}</g>
  <rect x="70" y="70" width="52" height="52" rx="13" fill="url(#accent)" stroke="#2F80FF" stroke-opacity="0.5"/>
  <path d="M86 106v-12M96 106V86M106 106V92" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <path d="M83 112h26" stroke="#FFB020" stroke-width="3" stroke-linecap="round"/>
  <text x="138" y="106" fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="30" font-weight="700">DataSattva</text>
  <text x="70" y="228" fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="60" font-weight="700">Navigate Data Privacy</text>
  <text x="70" y="300" fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="60" font-weight="700">with <tspan fill="#FFB020">Clarity</tspan> and Confidence.</text>
  <text x="70" y="372" fill="#B7C8E0" font-family="Inter, Arial, sans-serif" font-size="25">DPDP Act &amp; Rules advisory · readiness assessments · governance · implementation support</text>
  <line x1="70" y1="430" x2="1130" y2="430" stroke="#fff" stroke-opacity="0.14"/>
  <text x="70" y="486" fill="#FFB020" font-family="Montserrat, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3" >THE CLEARER SIDE OF DATA.</text>
  <text x="70" y="546" fill="#8AA0BB" font-family="Inter, Arial, sans-serif" font-size="21">Act No. 22 of 2023 · DPDP Rules, 2025 — G.S.R. 846(E), 13 November 2025</text>
  <circle cx="1075" cy="540" r="46" fill="none" stroke="#2F80FF" stroke-opacity="0.4"/>
  <circle cx="1075" cy="540" r="26" fill="none" stroke="#FFB020" stroke-opacity="0.6"/>
</svg>`
  );

  /* ---------------------------------------------------------------- robots/sitemap */
  const today = new Date().toISOString().split('T')[0];
  const sitemapable = pages.filter((p) => !p.route.startsWith('/privacy') && !p.route.startsWith('/terms'));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapable
  .map((p) => {
    const priority = p.route === '/' ? '1.0' : p.route.startsWith('/services/') || p.route === '/services/' ? '0.8' : p.route === '/readiness-assessment/' ? '0.9' : '0.7';
    return `  <url>
    <loc>${org.url}${p.route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;
  await write('sitemap.xml', sitemap);


  await write(
    'robots.txt',
    `# DataSattva — ${org.url}
User-agent: *
Allow: /
Disallow: /api/
Disallow: /privacy/
Disallow: /terms/

Sitemap: ${org.url}/sitemap.xml
`
  );

  /* --------------------------------------------------------------- 404 + manifest */
  await write(
    '404.html',
    `<!DOCTYPE html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found | ${brand.name}</title><meta name="description" content="The page you were looking for is not here. Continue to the DPDP Act and Rules explainer, advisory services or the free readiness assessment."><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/main.css"></head>
<body><main id="main" class="section"><div class="container container-narrow text-center">
<p class="eyebrow" style="justify-content:center">404</p>
<h1>That page is not here.</h1>
<p class="lede">The page you were looking for may have moved. These are the most useful places to continue.</p>
<div class="btn-row" style="justify-content:center;margin-top:2rem">
<a class="btn btn--primary" href="/">Home</a>
<a class="btn btn--ghost" href="/dpdp-act-and-rules/">DPDP Act &amp; Rules</a>
<a class="btn btn--ghost" href="/services/">Advisory services</a>
<a class="btn btn--ghost" href="/readiness-assessment/">Readiness assessment</a>
</div></div></main></body></html>`
  );

  await write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: 'DataSattva',
        short_name: 'DataSattva',
        description: brand.positioning,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0B1F3A',
        icons: [{ src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      null,
      2
    )
  );

  const ms = Date.now() - t0;
  const files = await countFiles(DIST);
  console.log(`✓ Built ${pages.length} pages + ${files} files in ${ms}ms → dist/`);
  if (warnings.length) warnings.forEach((w) => console.warn('  ! ' + w));

  return { pages, dist: DIST };
}

async function countFiles(dir) {
  let n = 0;
  const walk = async (d) => {
    for (const entry of await readdir(d, { withFileTypes: true })) {
      if (entry.isDirectory()) await walk(path.join(d, entry.name));
      else n++;
    }
  };
  await walk(dir);
  return n;
}

/* -------------------------------------------------------------------- runner */
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const wantServe = process.argv.includes('--serve') || process.argv.includes('--watch');
  const wantWatch = process.argv.includes('--watch');
  await build();

  if (wantServe) {
    const { startServer } = await import('./server.mjs');
    await startServer(process.env.PORT || 8080);

    if (wantWatch) {
      const chokidarless = async () => {
        const { watch } = await import('node:fs');
        let timer = null;
        watch(path.join(__dirname, 'src'), { recursive: true }, () => {
          clearTimeout(timer);
          timer = setTimeout(async () => {
            try {
              await build();
              console.log('↻ rebuilt');
            } catch (err) {
              console.error('Build error:', err.message);
            }
          }, 180);
        });
      };
      await chokidarless();
    }
  }
}
