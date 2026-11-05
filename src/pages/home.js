import { pageHead, layout, ctaCloser, miniAssessBand } from '../lib/layout.js';
import { heroVisual, challengeFramework, journey, serviceCards, tickList, insightCard } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { brand, ctas, org } from '../data/site.js';
import { services } from '../data/services.js';
import { insights, categoryLabel } from '../data/insights.js';

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
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: brand.name,
      url: org.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${org.url}/insights/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
});

const featured = insights.slice(0, 3);

const content = `
<section class="hero">
  <div class="container">
    <div class="hero__inner">
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
      <div class="hero-visual">
        ${heroVisual()}
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
    <div class="section-head section-head--wide">
      <p class="eyebrow">The challenge</p>
      <h2>Data privacy is more than a policy. It is an organisation-wide responsibility.</h2>
      <p class="lede">Privacy obligations do not sit in a single document or a single team. They run through how data is collected, who can see it, which vendors touch it, how long it is kept and what happens when something goes wrong.</p>
    </div>

    ${challengeFramework()}

    <div class="grid grid--2 mt-7" style="align-items:start;gap:clamp(2rem,1rem + 3vw,3.5rem)">
      <div>
        <h3>The obligation is wider than the legislation suggests</h3>
        <p class="small muted">A privacy programme has to answer questions that a policy document cannot: which systems hold personal data, which purpose each collection serves, whether consent for that purpose actually exists, what a vendor is permitted to do with it, and how a deletion request reaches a back-up written eighteen months ago. Answering them requires cooperation across legal, technology, operations, marketing, HR and procurement.</p>
        <p class="small muted">This is where most programmes stall. Not on understanding the Act — but on translating regulatory requirements into operational processes, named ownership and controls that can be evidenced when someone asks.</p>
      </div>
      <div class="card card--pad-lg">
        <p class="card__kicker">What organisations are actually being asked to do</p>
        <ul class="tick-list" style="margin-top:1rem">
          <li>${icon('check')}<span>Know what personal data exists, where it lives and why it is held.</span></li>
          <li>${icon('check')}<span>State a specific purpose, and be able to show the ground for processing it.</span></li>
          <li>${icon('check')}<span>Give notice that a person can read, and consent that can be withdrawn as easily as given.</span></li>
          <li>${icon('check')}<span>Answer rights requests across systems, on time, with a record of what was done.</span></li>
          <li>${icon('check')}<span>Govern what vendors, processors and partners do with the data.</span></li>
          <li>${icon('check')}<span>Protect it, detect incidents, and notify in a form people can understand.</span></li>
          <li>${icon('check')}<span>Delete it when the purpose is served — and show that you did.</span></li>
        </ul>
      </div>
    </div>
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

<section class="section" id="services">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Advisory services</p>
      <h2>Ten areas of advisory, from applicability through to enablement.</h2>
      <p class="lede">Each engagement is scoped to where you are. The aim is never a binder of documents — it is a set of processes, owners and evidence that hold up under scrutiny and keep working after we leave.</p>
    </div>
    ${serviceCards()}
    <div class="mt-6">
      <a class="link-arrow" href="/services/">See how the services fit together ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--navy" id="why">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Why DataSattva</p>
      <h2>Regulatory knowledge is the starting point. Operational judgement is the work.</h2>
      <p class="lede">We read the Act and the Rules closely, and then spend our time on the harder question: what does this mean for the way this organisation actually operates?</p>
    </div>
    <div class="why-grid">
      <div class="why-item">
        <div class="why-item__icon">${icon('scale', 22)}</div>
        <h3>Practical interpretation</h3>
        <p>We distinguish what the Act and Rules require, what they require in specific circumstances, and what is good practice — and we say which is which. Regulatory text is translated into decisions, not restated as commentary.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('target', 22)}</div>
        <h3>Risk-based and business-oriented</h3>
        <p>Not every obligation deserves the same investment. We rank by exposure and by dependency, so effort goes where it changes the risk profile rather than where it is easiest to demonstrate.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('layers', 22)}</div>
        <h3>Governance and controls</h3>
        <p>We work at the intersection of privacy, enterprise risk, vendor governance and internal controls. The output is an operating model with owners and evidence, not a set of aspirational statements.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('eye', 22)}</div>
        <h3>Structured gap identification</h3>
        <p>Assessments are evidence-based and structured across the obligation areas, so findings are comparable, prioritised and defensible — including when the finding is uncomfortable.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('check', 22)}</div>
        <h3>Actionable recommendations</h3>
        <p>Every recommendation carries an owner, an effort estimate and an anticipated output. If a recommendation cannot be implemented by a named person, it is not yet a recommendation.</p>
      </div>
      <div class="why-item">
        <div class="why-item__icon">${icon('route', 22)}</div>
        <h3>Support at every stage</h3>
        <p>From a first conversation about applicability to assurance over a mature programme. We do not require an organisation to be ready for the largest engagement in order to start.</p>
      </div>
    </div>
  </div>
</section>

<section class="section assess-band" id="assessment">
  <div class="container assess-band__inner">
    <div>
      <p class="eyebrow">Free readiness assessment</p>
      <h2>Where does your organisation stand on DPDP readiness?</h2>
      <p class="lede">Take our free 3-minute DPDP Readiness Assessment to gain an indicative view of your organisation’s current practices, potential gaps, and areas that may require further attention.</p>
      <div class="btn-row mt-6">
        <a class="btn btn--accent" href="${ctas.assessmentShort.href}">${ctas.assessmentShort.label} ${icon('arrow')}</a>
        <a class="btn btn--outline-light" href="/readiness-assessment/#how-it-works">How the scoring works</a>
      </div>
      <p class="disclaim">The assessment provides an indicative overview and is not an exhaustive compliance evaluation, legal opinion or certification of compliance.</p>
    </div>
    <div class="assess-card">
      <p class="assess-card__title">What you get</p>
      <ul>
        <li>${icon('check')}<span>An indicative readiness score out of 100</span></li>
        <li>${icon('check')}<span>An overall readiness category, capped where critical gaps exist</span></li>
        <li>${icon('check')}<span>Potential Critical, High and Moderate gaps by area</span></li>
        <li>${icon('check')}<span>Priority areas identified for further review</span></li>
        <li>${icon('check')}<span>A downloadable summary of the result</span></li>
        <li>${icon('check')}<span>A quick starting point for a structured readiness review</span></li>
      </ul>
      <div class="assess-card__meta">
        <div><strong>~3 min</strong>12 questions</div>
        <div><strong>No sign-up</strong>Scored in your browser</div>
        <div><strong>Free</strong>No obligation</div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="insights">
  <div class="container">
    <div class="section-head" style="display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;max-width:none;">
      <div style="max-width:62ch">
        <p class="eyebrow">Insights &amp; knowledge</p>
        <h2>Explanatory writing on the framework and the work of implementing it.</h2>
      </div>
      <a class="link-arrow" href="/insights/">All insights ${icon('arrow')}</a>
    </div>
    <p class="notice-strip"><span aria-hidden="true">${icon('info', 16)}</span><span><strong>Editorial note:</strong> the articles below are draft content published to demonstrate the editorial layout and category structure. Publication dates and author details will be added on editorial sign-off. Regulatory statements have been checked against the notified Act and Rules.</span></p>
    <div class="grid grid--3">
      ${featured.map((a) => insightCard(a, { categoryLabel })).join('')}
    </div>
  </div>
</section>

${miniAssessBand()}

${ctaCloser()}
`;

export default () =>
  layout({
    path: '/',
    head,
    content,
    scripts: '<script src="/assets/main.js" defer></script>',
  });
