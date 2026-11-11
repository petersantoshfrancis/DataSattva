import { pageHead, layout } from '../lib/layout.js';
import { heroVisual, challengeFramework, journey, serviceCards } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { brand, ctas, org } from '../data/site.js';
import { services } from '../data/services.js';

const head = pageHead({
  title: 'DataSattva — DPDP Act & Rules Advisory, Readiness and Implementation Support',
  description:
    'DataSattva helps organisations understand, assess and address the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 through readiness assessments, privacy governance frameworks and practical implementation support. The clearer side of data.',
  path: '/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: brand.name,
      slogan: brand.tagline,
      description: brand.positioning,
      url: org.url,
      areaServed: { '@type': 'Country', name: 'India' },
      knowsAbout: [
        'Digital Personal Data Protection Act, 2023',
        'Digital Personal Data Protection Rules, 2025',
        'Data privacy governance',
        'Data protection compliance',
        'Third-party data privacy risk',
      ],
    },
  ],
});

const content = `
<section class="hero">
  <div class="container">

    <div class="hero-visual hero-visual--band">
      ${heroVisual()}
    </div>

    <div class="hero__copy">
      <div>
        <p class="eyebrow">DPDP Act &amp; Rules · India</p>
        <h1>Navigate Data Privacy with <em>Clarity</em> and Confidence.</h1>
        <p class="hero__lede">India’s DPDP Act and Rules are reshaping how organisations collect, process, protect and manage personal data. DataSattva helps businesses understand their obligations, identify gaps, and take practical steps towards building a stronger data privacy framework.</p>
        <div class="btn-row hero__actions">
          <a class="btn btn--accent" href="${ctas.assessment.href}">${ctas.assessment.label} ${icon('arrow')}</a>
          <a class="btn btn--outline-light" href="${ctas.services.href}">${ctas.services.label}</a>
        </div>
        <p class="hero__tagline">${brand.tagline}</p>
        <p class="hero__note">${icon('info')}<span>DataSattva provides advisory, assessment and implementation support. We are not a law firm or a regulator, and our work does not replace independent legal advice.</span></p>
      </div>
    </div>

    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat__ref">13 Nov 2025</span>
        <span class="hero-stat__body"><strong>Framework and regulator in force</strong>Definitions and the Data Protection Board of India commenced on publication of the Rules.</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__ref">13 Nov 2026</span>
        <span class="hero-stat__body"><strong>Consent Manager registration opens</strong>Rule 4 and the First Schedule take effect one year after publication.</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat__ref">13 May 2027</span>
        <span class="hero-stat__body"><strong>Substantive obligations commence</strong>Notice, consent, rights, security, breach and retention duties under the Act and Rules.</span>
      </div>
    </div>
  </div>
</section>

<section class="section" id="challenge">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">The challenge</p>
      <h2>Privacy is not a policy. It is how the organisation operates.</h2>
    </div>
    ${challengeFramework()}
  </div>
</section>

<section class="section section--paper" id="journey">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Understanding your journey</p>
      <h2>Organisations are not at the same starting point — and that is expected.</h2>
      <p class="lede">A privacy programme is built in stages. Some organisations are establishing applicability for the first time; others have governance in place and need to close specific gaps. Starting with clarity about where you are is more useful than starting with urgency.</p>
    </div>
    ${journey()}
    <div class="card mt-7" style="display:flex;gap:var(--sp-4);align-items:flex-start;flex-wrap:wrap;">
      <span style="color:var(--blue-700);flex-shrink:0">${icon('route', 22)}</span>
      <div style="flex:1 1 320px">
        <p class="small mb-0" style="color:var(--ink-70)"><strong style="color:var(--navy)">Wherever you are, the next step is the same:</strong> establish an evidence-based view of your position before committing budget to tools, policies or headcount. The <a href="/readiness-assessment/">readiness assessment</a> gives an indicative view in about three minutes; a structured review replaces that with a defensible one.</p>
      </div>
      <a class="btn btn--ghost btn--sm" href="/readiness-assessment/">Take the assessment ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--paper" id="services">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Advisory services</p>
      <h2>Ten areas of advisory, scoped to where you are.</h2>
      <p class="lede">Each engagement ends in processes, owners and evidence — not a binder of documents.</p>
    </div>
    ${serviceCards(services.slice(0, 6))}
    <div class="mt-6" style="display:flex;align-items:center;gap:var(--sp-4);flex-wrap:wrap;">
      <a class="btn btn--ghost btn--sm" href="/services/">View all ten advisory services ${icon('arrow')}</a>
      <p class="small muted mb-0">Retention, breach management, policies, and enablement are covered in the full list.</p>
    </div>
  </div>
</section>

<section class="section section--navy" id="why">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Why DataSattva</p>
      <h2>Regulatory knowledge is the starting point. Operational judgement is the work.</h2>
    </div>
    <div class="grid grid--3 why-grid--compact">
      <div class="why-item">
        <div class="why-item__icon">${icon('scale', 22)}</div>
        <h3>We say which is which</h3>
        <p>What the Act requires, what it requires only in some circumstances, and what is good practice — stated plainly, never blurred.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('target', 22)}</div>
        <h3>Effort follows exposure</h3>
        <p>Obligations are ranked by risk and dependency, so investment lands where it changes the risk profile.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('check', 22)}</div>
        <h3>Recommendations with owners</h3>
        <p>Every recommendation carries an owner and an anticipated output. If nobody can implement it, it is not yet a recommendation.</p>
      </div>
    </div>
  </div>
</section>

<section class="section assess-band assess-band--cta" id="assessment">
  <div class="container assess-cta">
    <p class="eyebrow" style="justify-content:center;">Free readiness assessment</p>
    <h2>How ready is your organisation, really?</h2>
    <p class="assess-cta__sub">Twelve questions, about three minutes, and an indicative score out of 100 with the gaps that matter most. No sign-up, nothing leaves your browser.</p>
    <div class="btn-row assess-cta__actions">
      <a class="btn btn--accent btn--lg" href="${ctas.assessmentShort.href}">${ctas.assessmentShort.label} ${icon('arrow')}</a>
      <a class="btn btn--outline-light" href="${ctas.contact.href}">${ctas.contact.label}</a>
    </div>
    <ul class="assess-cta__facts">
      <li>${icon('check')}<span><strong>~3 min</strong>12 questions</span></li>
      <li>${icon('check')}<span><strong>No sign-up</strong>Scored in your browser</span></li>
      <li>${icon('check')}<span><strong>Free</strong>No obligation</span></li>
    </ul>
    <p class="disclaim">Indicative only — not an exhaustive compliance evaluation, legal opinion or certification of compliance.</p>
  </div>
</section>
`;

export default () =>
  layout({
    path: '/',
    head,
    content,
    scripts: '<script src="/assets/main.js" defer></script>',
  });
