/**
 * Link and asset integrity check over ./dist:
 *  - every internal href/src resolves to a file in dist (or an external URL)
 *  - every page has one <h1>, unique <title>, a meta description and canonical
 *  - every <img> has alt text, every svg has a role/label or aria-hidden
 *  - reports pages with more than one <main> or a missing lang attribute
 * Exit code 1 on error.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const errors = [];
const warnings = [];
const titles = new Map();

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');

const exists = async (p) => {
  try { await stat(path.join(DIST, p)); return true; } catch { return false; }
};

for (const file of htmlFiles) {
  const raw = await readFile(file, 'utf8');
  const route = rel(file);
  // Ignore inline <script> bodies when scanning for URLs/anchors — string
  // fragments inside JS are not links.
  const html = raw.replace(/<script[\s\S]*?<\/script>/g, '');

  // title uniqueness
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) errors.push(`${route}: missing <title>`);
  else if (titles.has(title)) errors.push(`${route}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, route);

  const is404 = route === '/404.html' || route === '/404';
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) errors.push(`${route}: missing/short meta description`);
  if (!is404 && !/<link rel="canonical"/.test(html)) errors.push(`${route}: missing canonical`);
  if (!/<html lang="en-IN">/.test(html)) errors.push(`${route}: missing lang attribute`);
  if (!/<main[ >]/.test(html)) errors.push(`${route}: missing <main>`);
  if ((html.match(/<main/g) || []).length > 1) errors.push(`${route}: multiple <main> elements`);
  const h1s = html.match(/<h1[ >]/g) || [];
  if (h1s.length !== 1) errors.push(`${route}: expected exactly one <h1>, found ${h1s.length}`);

  // internal links & assets
  const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const url of urls) {
    if (/^(mailto:|tel:|https?:|data:|#|\/\/)/.test(url)) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!clean.startsWith('/')) { warnings.push(`${route}: relative URL ${url}`); continue; }
    let target = clean.slice(1);
    if (target === '' || target.endsWith('/')) target += 'index.html';
    if (!(await exists(target))) {
      // allow extension-less pretty paths that resolve to dir/index.html
      if (!(await exists(target + '/index.html'))) errors.push(`${route}: broken internal link → ${url}`);
    }
    // in-page anchor check (only when the link targets this same page)
    const hash = url.split('#')[1];
    const isSamePage = clean === route || clean === route + '/' || (route.endsWith('/') && clean === route.slice(0, -1));
    if (hash && isSamePage && !new RegExp(`id="${hash}"`).test(html)) {
      errors.push(`${route}: anchor #${hash} does not exist on this page`);
    }
  }

  // images alt
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/alt=/.test(m[0])) errors.push(`${route}: <img> without alt — ${m[0].slice(0, 60)}`);
  }
  // svg a11y: each inline svg should be aria-hidden or have role/title
  const svgs = html.match(/<svg\b[^>]*>/g) || [];
  for (const s of svgs) {
    if (!/aria-hidden|role="img"|aria-labelledby/.test(s)) warnings.push(`${route}: svg without aria-hidden or role — ${s.slice(0, 70)}`);
  }
}

// sitemap coverage
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const indexRoutes = htmlFiles
  .map(rel)
  .filter((r) => r !== '/404.html' && r !== '/assessment-embed.html' && !r.startsWith('/privacy') && !r.startsWith('/terms'));
for (const r of indexRoutes) if (!locs.some((l) => l.endsWith(r))) errors.push(`sitemap.xml missing ${r}`);
for (const l of locs) if (!indexRoutes.some((r) => l.endsWith(r))) warnings.push(`sitemap lists ${l} with no built page`);

console.log(`Checked ${htmlFiles.length} pages, ${files.length} files.`);
console.log(`Titles unique: ${titles.size}/${htmlFiles.length}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  [...new Set(warnings)].slice(0, 40).forEach((w) => console.log('  ~ ' + w));
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  [...new Set(errors)].forEach((e) => console.error('  ✗ ' + e));
  process.exit(1);
}
console.log('\n✓ No broken links or structural errors.');
