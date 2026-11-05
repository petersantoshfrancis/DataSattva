/**
 * Accessibility audit of every built page with axe-core (WCAG 2.0/2.1 A + AA).
 * Requires a running server (npm run serve) and devDependency @axe-core/playwright.
 *   BASE_URL=http://localhost:8080 node tools/check-a11y.mjs
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { readdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL || 'http://localhost:8080';
const walk = async (dir, out = []) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) await walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
};

const files = await walk('dist');
const routes = [...new Set(files.map((f) => f.replace('dist', '').replace('/index.html', '/') || '/'))].sort();

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
let failing = 0;

for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  if (res.violations.length) {
    failing++;
    console.log(`✗ ${route}`);
    for (const v of res.violations) {
      console.log(`   ${v.id} (${v.impact}) × ${v.nodes.length} — ${v.help}`);
      v.nodes.slice(0, 3).forEach((n) => console.log(`      ${n.html.slice(0, 110)}`));
    }
  }
}

await browser.close();
console.log(`\n${routes.length} pages audited · ${routes.length - failing} clean · ${failing} with violations`);
process.exit(failing ? 1 : 0);
