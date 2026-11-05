/**
 * Standalone, self-contained build of the DPDP Readiness Assessment.
 *
 * Output: dist/assessment-embed.html — one file, no external CSS/JS/fonts, no
 * server. Used for:
 *   - embedding on an existing site via an <iframe>
 *   - handing to a client who wants to email or host it separately
 *   - a fallback if the main site is temporarily unavailable
 *
 * It reuses the site's own stylesheet (inlined, with the web-font declarations
 * stripped) and the exact same question bank, scoring model and runtime, so the
 * embed cannot drift from the main site.
 */
import { profile, questions, categories, nextSteps, disclaimerShort } from '../data/assessment.js';
import { services } from '../data/services.js';
import { org } from '../data/site.js';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const embedConfig = {
  questions: questions.map((q) => ({ id: q.id, area: q.area, weight: q.weight, why: q.why, service: q.service })),
  categories,
  nextSteps,
  disclaimerShort,
  verifiedOn: '4 November 2026',
  // Absolute base so service links resolve when this file is hosted elsewhere
  linkBase: `${org.url.replace(/\/$/, '')}/services/`,
  contactHref: `${org.url.replace(/\/$/, '')}/contact/`,
  services: Object.fromEntries(services.map((s) => [s.slug, { title: s.title }])),
};

const profileFields = () =>
  profile
    .map((f) => {
      const req = f.id === 'orgType' || f.id === 'digitalData' ? ' data-required' : '';
      if (f.type === 'select') {
        return `<div class="field">
      <label for="${f.id}">${esc(f.label)}${f.id === 'orgType' ? ' <span style="color:var(--risk)">*</span>' : ''}</label>
      <select class="select" id="${f.id}" name="${f.id}"${req}>
        <option value="">Select an option</option>
        ${f.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}
      </select>
      <span class="error-text" data-error-for="${f.id}" role="alert"></span>
    </div>`;
      }
      return `<fieldset class="field" style="border:0;padding:0;margin-bottom:1.5rem">
      <legend class="field__label">${esc(f.label)}${f.id === 'digitalData' ? ' <span style="color:var(--risk)">*</span>' : ''}</legend>
      <div class="opt-group">
        ${f.options
          .map(
            (o, i) =>
              `<label class="opt"><input type="radio" name="${f.id}" value="${esc(o)}"${req ? ' data-required' : ''} id="${f.id}-${i}"><span>${esc(o)}</span></label>`
          )
          .join('')}
      </div>
      <span class="error-text" data-error-for="${f.id}" role="alert"></span>
    </fieldset>`;
    })
    .join('');

const questionBlocks = () =>
  questions
    .map(
      (q, i) => `<fieldset class="q-block" id="q-${q.id}">
      <div class="q-block__meta">
        <span class="q-block__area">${esc(q.area)}</span>
        <span class="tag">Weight ${q.weight} of 3</span>
      </div>
      <legend>${i + 1}. ${esc(q.question)} <span aria-hidden="true" style="color:var(--risk)">*</span></legend>
      <div class="opt-group">
        ${q.options
          .map(
            (o, j) =>
              `<label class="opt"><input type="radio" name="${q.id}" value="${o.score}" data-required id="${q.id}-${j}"><span>${esc(o.label)}</span></label>`
          )
          .join('')}
      </div>
      <p class="q-block__why">${esc(q.why)}</p>
      <span class="error-text" data-error-for="${q.id}" role="alert"></span>
    </fieldset>`
    )
    .join('');

/** Page-level rules on top of the site stylesheet. */
const extraCss = `
body { background: var(--paper); }
.embed-wrap { max-width: 940px; margin: 0 auto; padding: clamp(20px, 4vw, 44px) var(--sp-5) clamp(36px, 5vw, 64px); }
.embed-head { margin-bottom: var(--sp-5); }
.embed-foot { margin-top: var(--sp-6); padding-top: var(--sp-4); border-top: 1px solid var(--line); font-size: 0.78rem; color: var(--ink-50); line-height: 1.6; }
`;

/**
 * @param {string} runtimeSource  contents of src/scripts/assessment.js
 * @param {string} siteCss        contents of src/styles/main.css
 */
export function assessmentEmbed(runtimeSource, siteCss) {
  // Strip web-font declarations: the standalone file has no /assets/fonts.
  const css = String(siteCss).replace(/@font-face\s*{[^}]*}/g, '') + extraCss;

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DPDP Readiness Assessment | DataSattva</title>
<meta name="description" content="A free three-minute indicative assessment of DPDP readiness across twelve obligation areas. Scored in your browser; no account, no data transmitted.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0B1F3A">
<link rel="canonical" href="${org.url.replace(/\/$/, '')}/assessment-embed.html">
<style>${css}</style>
</head>
<body>
<main id="main">
<div class="embed-wrap">

  <header class="embed-head">
    <p class="eyebrow">Free assessment · DataSattva</p>
    <h1>Where does your organisation stand on DPDP readiness?</h1>
    <p class="lede">Twelve questions, about three minutes, and an indicative view of your current practices, potential gaps and the areas that may need further attention. No sign-up, and your answers are scored in this page — nothing is transmitted.</p>
  </header>

  <div class="assess-progress" style="margin-bottom:1.25rem">
    <span class="assess-progress__label" data-progress-text>Step 1 of 3 · Organisation profile</span>
    <div class="assess-progress__bar" role="progressbar" aria-label="Assessment progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="assess-progress__fill" data-progress-fill></div>
    </div>
  </div>
  <p class="visually-hidden" id="assess-live" role="status" aria-live="polite"></p>

  <div id="assess-form-wrap">
    <form id="assess-form" class="assess-card-main" novalidate>
      <div data-step="0">
        <div class="assess-step-head"><span class="assess-step-head__num">Step 1 of 3 · Organisation profile</span></div>
        <h2 data-step-heading tabindex="-1" style="font-size:clamp(1.25rem,1.1rem + 0.8vw,1.6rem);margin-bottom:0.4rem">Tell us about your organisation</h2>
        <p class="small muted" style="margin-bottom:1.75rem">This shapes how the result is read. Nothing here identifies you, and no contact details are requested.</p>
        ${profileFields()}
        <div class="assess-nav">
          <button type="button" class="btn btn--primary" data-next>Continue to questions →</button>
          <span class="assess-nav__spacer"></span>
          <span class="xsmall muted">About 30 seconds</span>
        </div>
      </div>

      <div data-step="1" hidden>
        <div class="assess-step-head"><span class="assess-step-head__num">Step 2 of 3 · Readiness questions</span></div>
        <h2 data-step-heading tabindex="-1" style="font-size:clamp(1.25rem,1.1rem + 0.8vw,1.6rem);margin-bottom:0.4rem">Twelve areas of practice</h2>
        <p class="small muted" style="margin-bottom:1.75rem">Answer for the organisation as a whole rather than for your most mature team. <span data-answered style="font-weight:600;color:var(--navy)">0 of 12 answered</span></p>
        ${questionBlocks()}
        <div class="assess-nav">
          <button type="button" class="btn btn--ghost" data-prev>← Back</button>
          <span class="assess-nav__spacer"></span>
          <button type="submit" class="btn btn--primary">See my indicative result →</button>
        </div>
      </div>

      <div data-step="2" hidden>
        <div class="assess-step-head"><span class="assess-step-head__num">Step 3 of 3 · Review</span></div>
        <h2 data-step-heading tabindex="-1" style="font-size:clamp(1.25rem,1.1rem + 0.8vw,1.6rem);margin-bottom:0.4rem">Ready to see the result</h2>
        <div class="notice-strip notice-strip--info" style="margin-bottom:1.25rem">
          <span aria-hidden="true">i</span>
          <span>Your answers are scored in this page. Nothing is uploaded and no record is kept by DataSattva.</span>
        </div>
        <div class="assess-nav" style="border-top:0;padding-top:0;margin-top:0">
          <button type="button" class="btn btn--ghost" data-prev>← Back to questions</button>
          <span class="assess-nav__spacer"></span>
          <button type="submit" class="btn btn--primary">Show my results →</button>
        </div>
      </div>
    </form>
    <noscript>
      <div class="notice-strip" style="margin-top:1.5rem">
        <span aria-hidden="true">!</span>
        <span>JavaScript is disabled, so the assessment cannot be scored. Please enable JavaScript, or contact DataSattva to run through the questions with you.</span>
      </div>
    </noscript>
  </div>

  <div id="assess-results" hidden></div>

  <p class="xsmall muted mt-6">${esc(disclaimerShort)} Results are based on self-reported answers at a point in time and are not a legal determination of compliance.</p>
  <p class="embed-foot">DataSattva provides data privacy advisory and implementation support. Regulatory context reflected in these questions is as at ${esc(embedConfig.verifiedOn)}. This tool is not legal advice.</p>

</div>
</main>

<script>window.__DS_ASSESSMENT__=${JSON.stringify(embedConfig).replace(/</g, '\\u003c')};</script>
<script>${String(runtimeSource).replace(/<\/script>/g, '<\\/script>')}</script>
</body>
</html>`;
}
