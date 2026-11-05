import { pageHead, layout, pageHero } from '../lib/layout.js';
import { icon } from '../lib/icons.js';
import { org, ctas } from '../data/site.js';
import { profile, questions, disclaimerShort, nextSteps, categories } from '../data/assessment.js';
import { services } from '../data/services.js';

const head = pageHead({
  title: 'Free DPDP Readiness Assessment — 3-Minute Indicative Check | DataSattva',
  description:
    'Take a free three-minute DPDP readiness assessment for your organisation. Get an indicative readiness score, potential Critical, High and Moderate gaps, priority areas and suggested next steps under India’s DPDP Act and Rules.',
  path: '/readiness-assessment/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DPDP Readiness Assessment',
      url: `${org.url}/readiness-assessment/`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any modern browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      description:
        'A free, indicative twelve-question assessment of organisational readiness for India’s DPDP Act, 2023 and DPDP Rules, 2025. Scored in the browser; no account required.',
      isAccessibleForFree: true,
    },
  ],
});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------------------------------------------- server-rendered form */

function profileFields() {
  return profile
    .map((f) => {
      const required = f.id === 'orgType' || f.id === 'digitalData' ? ' data-required' : '';
      if (f.type === 'select') {
        return `<div class="field">
        <label for="${f.id}">${esc(f.label)}${f.id === 'orgType' ? ' <span aria-hidden="true" style="color:var(--risk)">*</span>' : ''}</label>
        <select class="select" id="${f.id}" name="${f.id}"${required}>
          <option value="">Select an option</option>
          ${f.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}
        </select>
        <span class="error-text" data-error-for="${f.id}" role="alert"></span>
      </div>`;
      }
      return `<fieldset class="field" style="border:0;padding:0;margin-bottom:1.5rem">
        <legend class="field__label">${esc(f.label)}${f.id === 'digitalData' ? ' <span aria-hidden="true" style="color:var(--risk)">*</span>' : ''}</legend>
        <div class="opt-group">
          ${f.options
            .map(
              (o, i) =>
                `<label class="opt"><input type="radio" name="${f.id}" value="${esc(o)}"${required ? ' data-required' : ''} id="${f.id}-${i}"><span>${esc(o)}</span></label>`
            )
            .join('')}
        </div>
        <span class="error-text" data-error-for="${f.id}" role="alert"></span>
      </fieldset>`;
    })
    .join('');
}

function questionBlocks() {
  return questions
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
}

const stepHeading = (n, kicker, title, sub) => `<div class="assess-step-head">
  <span class="assess-step-head__num">Step ${n} of 3 · ${esc(kicker)}</span>
</div>
<h2 data-step-heading style="font-size:clamp(1.25rem,1.1rem + 0.8vw,1.6rem);margin-bottom:0.4rem">${esc(title)}</h2>
<p class="small muted" style="margin-bottom:1.75rem">${sub}</p>`;

const content = `
${pageHero({
  eyebrow: 'Free assessment',
  title: 'Where does your organisation stand on DPDP readiness?',
  lede: 'Twelve questions, about three minutes, and an indicative view of your current practices, potential gaps and the areas that may need further attention. No sign-up, and your answers are scored in your browser — nothing is transmitted.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'DPDP Readiness Assessment' }],
})}

<section class="section assess-shell" id="start">
  <div class="container assess-wide">
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
          ${stepHeading(1, 'Organisation profile', 'Tell us about your organisation', 'This shapes how the result is read. Nothing here identifies you, and no contact details are requested.')}
          ${profileFields()}
          <div class="assess-nav">
            <button type="button" class="btn btn--primary" data-next>Continue to questions ${icon('arrow')}</button>
            <span class="assess-nav__spacer"></span>
            <span class="xsmall muted">About 30 seconds</span>
          </div>
        </div>

        <div data-step="1" hidden>
          ${stepHeading(2, 'Readiness questions', 'Twelve areas of practice', 'Answer for the organisation as a whole rather than for your most mature team. <span data-answered style="font-weight:600;color:var(--navy)">0 of 12 answered</span>')}
          ${questionBlocks()}
          <div class="assess-nav">
            <button type="button" class="btn btn--ghost" data-prev>Back</button>
            <span class="assess-nav__spacer"></span>
            <button type="submit" class="btn btn--primary">See my indicative result ${icon('arrow')}</button>
          </div>
          <p class="xsmall muted mt-5 mb-0">By continuing you acknowledge that this is an indicative self-assessment and not a legal opinion or certification of compliance.</p>
        </div>

        <div data-step="2" hidden>
          ${stepHeading(3, 'Review', 'Ready to see the result', 'Your answers will be scored against the model described below. You can go back to change any answer.')}
          <div class="notice-strip notice-strip--info" style="margin-bottom:1.25rem">
            <span aria-hidden="true">${icon('info', 16)}</span>
            <span>The result is calculated in your browser from the answers you have given. Nothing is uploaded and no record is kept by DataSattva.</span>
          </div>
          <div class="assess-nav" style="border-top:0;padding-top:0;margin-top:0">
            <button type="button" class="btn btn--ghost" data-prev>Back to questions</button>
            <span class="assess-nav__spacer"></span>
            <button type="submit" class="btn btn--primary">Show my results ${icon('arrow')}</button>
          </div>
        </div>
      </form>
      <noscript>
        <div class="notice-strip mt-6" style="margin-bottom:0">
          <span aria-hidden="true">${icon('alert', 16)}</span>
          <span><strong>JavaScript is disabled in your browser.</strong> The assessment is scored locally and needs JavaScript to run. You can still read the <a href="#how-it-works">scoring model</a>, or <a href="/contact/">contact the DataSattva team</a> to run through the questions with you.</span>
        </div>
      </noscript>
    </div>

    <div id="assess-results" hidden></div>

    <p class="xsmall muted mt-6">${esc(disclaimerShort)} Results are based on self-reported answers at a point in time and are not a legal determination of compliance.</p>
  </div>
</section>

<section class="section section--paper" id="how-it-works">
  <div class="container">
    <div class="grid grid--sidebar">
      <div>
        <p class="eyebrow">Method</p>
        <h2>How the scoring works</h2>
        <p class="lede">We publish the model because an assessment you cannot interrogate is not much use in a board conversation.</p>

        <div class="card card--pad-lg mt-6">
          <h3 style="font-size:1.05rem">1. Scores and weights</h3>
          <p class="small muted">Each of the twelve questions is scored 0 to 3 against the option you select — from no practice in place, through informal or partial practice, to documented and evidenced practice. Each question also carries a weight of 1 to 3, reflecting how foundational that area is to a defensible position under the Act and Rules. Applicability, discovery, processing inventory, consent, rights, governance, third-party oversight, security and breach response carry the highest weight because most other obligations depend on them.</p>

          <hr class="divider" style="margin:1.5rem 0">
          <h3 style="font-size:1.05rem">2. The readiness score</h3>
          <p class="small muted">The score is the weighted total divided by the maximum possible weighted total, expressed as a percentage:</p>
          <div class="callout" style="margin-top:0.75rem">
            <p class="callout__title">Formula</p>
            <p style="font-family:var(--font-body)">readiness = Σ (score × weight) ÷ Σ (3 × weight) × 100</p>
          </div>

          <hr class="divider" style="margin:1.5rem 0">
          <h3 style="font-size:1.05rem">3. Gap severity</h3>
          <p class="small muted">Severity is derived from both the score and the weight, so a foundational area cannot be rescued by a strong average:</p>
          <div class="table-wrap mt-5">
            <table>
              <caption>Severity is assigned per question. Scores of 3 produce no gap.</caption>
              <thead><tr><th scope="col">Answer score</th><th scope="col">Weight 3 (foundational)</th><th scope="col">Weight 2</th><th scope="col">Weight 1</th></tr></thead>
              <tbody>
                <tr><td>0 — no practice</td><td><span class="tag tag--critical">Critical</span></td><td><span class="tag tag--high">High</span></td><td><span class="tag tag--high">High</span></td></tr>
                <tr><td>1 — informal or partial</td><td><span class="tag tag--critical">Critical</span></td><td><span class="tag tag--critical">Critical</span></td><td><span class="tag tag--high">High</span></td></tr>
                <tr><td>2 — documented, incomplete</td><td><span class="tag tag--high">High</span></td><td><span class="tag tag--moderate">Moderate</span></td><td><span class="tag tag--moderate">Moderate</span></td></tr>
              </tbody>
            </table>
          </div>

          <hr class="divider" style="margin:1.5rem 0">
          <h3 style="font-size:1.05rem">4. Overall category, and the cap</h3>
          <p class="small muted">The overall band is set by the score, then capped when critical gaps exist. An organisation with one or more critical gaps cannot be classified as Leading or Established, and three or more place it at the earliest stage regardless of the average. This is deliberate: the most common failure in self-assessment is a comfortable average that conceals a missing core obligation.</p>
          <div class="grid grid--2 mt-5" style="gap:0.75rem">
            ${categories
              .slice()
              .reverse()
              .map(
                (c) => `<div class="card" style="padding:0.9rem 1rem">
                <div style="display:flex;justify-content:space-between;align-items:baseline;gap:0.5rem">
                  <strong style="font-size:0.9rem">${c.label}</strong>
                  <span class="xsmall muted">${c.min}% and above</span>
                </div>
                <p class="xsmall muted mb-0" style="margin-top:0.3rem">${c.summary.split('. ')[0]}.</p>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div class="card mt-6" style="background:var(--saffron-050);border-color:#ffe4ac">
          <h3 style="font-size:1rem">What this model does not do</h3>
          <ul class="tick-list" style="margin-top:0.75rem;font-size:0.88rem">
            <li>${icon('info')}<span>It does not verify what you tell it. Self-reported maturity is usually higher than evidenced maturity.</span></li>
            <li>${icon('info')}<span>It does not assess exemption eligibility, Significant Data Fiduciary designation, or the treatment of children’s data in detail.</span></li>
            <li>${icon('info')}<span>It does not review contracts, systems, notices or incident records.</span></li>
            <li>${icon('info')}<span>It does not produce a legal determination, a compliance certificate or an audit opinion — and no score should be presented as one.</span></li>
          </ul>
        </div>

        <div class="mt-6">
          <h3 style="font-size:1.1rem">If the result raises questions</h3>
          <ol class="num-list mt-5">
            ${nextSteps.map((s) => `<li><strong>${esc(s.title)}</strong>${esc(s.body)}</li>`).join('')}
          </ol>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="/services/dpdp-applicability-and-readiness/">Readiness review service ${icon('arrow')}</a>
            <a class="btn btn--ghost" href="/contact/">Talk to the team</a>
          </div>
        </div>
      </div>

      <aside>
        <div class="card aside-card">
          <p class="card__kicker">The twelve areas</p>
          <ol style="list-style:none;counter-reset:none;padding:0;margin:0.75rem 0 0;display:grid;gap:0.55rem;font-size:0.84rem;color:var(--ink-70)">
            ${questions
              .map(
                (q) =>
                  `<li style="display:flex;gap:0.6rem;margin:0"><span style="color:var(--blue-700);font-family:var(--font-head);font-weight:700;font-size:0.72rem;flex-shrink:0">${q.id.toUpperCase()}</span><span>${esc(q.area)}</span></li>`
              )
              .join('')}
          </ol>
          <hr class="divider" style="margin:1.25rem 0">
          <p class="card__kicker">Related services</p>
          <ul style="list-style:none;padding:0;margin:0.75rem 0 0;display:grid;gap:0.6rem;font-size:0.84rem">
            ${[...new Set(questions.map((q) => q.service))]
              .slice(0, 5)
              .map((slug) => {
                const s = services.find((x) => x.slug === slug);
                return `<li><a href="/services/${slug}/">${s ? s.title : slug}</a></li>`;
              })
              .join('')}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container container-narrow">
    <div class="card card--pad-lg" style="border-color:var(--line)">
      <p class="card__kicker">Disclaimer</p>
      <p class="small muted">${esc(disclaimerShort)} It is based entirely on the answers you provide, it does not involve any review of your documentation, systems or contracts, and it does not constitute legal advice or a legal opinion. Results should be used to prioritise further review, not to confirm a compliance position. DataSattva provides advisory and implementation support and is not a regulator, statutory authority or certifying body.</p>
      <p class="xsmall muted mb-0">Regulatory context reflected in the questions is as at 4 November 2026. The Act and the Rules commence in stages; confirm the current position before relying on this material.</p>
    </div>
  </div>
</section>
`;

/* Embed the question bank for the client runtime. Values only — no PII. */
const embed = {
  questions: questions.map((q) => ({
    id: q.id,
    area: q.area,
    weight: q.weight,
    why: q.why,
    service: q.service,
  })),
  categories,
  nextSteps,
  disclaimerShort,
  verifiedOn: '4 November 2026',
  services: Object.fromEntries(services.map((s) => [s.slug, { title: s.title }])),
};

const scripts = `<script>window.__DS_ASSESSMENT__=${JSON.stringify(embed).replace(/</g, '\\u003c')};</script>
<script src="/assets/assessment.js" defer></script>
<script src="/assets/main.js" defer></script>`;

export default () => layout({ path: '/readiness-assessment/', head, content, scripts });
