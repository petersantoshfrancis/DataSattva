import { pageHead, layout } from '../lib/layout.js';
import { heroVisual, challengeTiles, journey, serviceTiles } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { brand, ctas, org } from '../data/site.js';

/*
 * Homepage. Sections, in order:
 *   hero · #challenge · #journey · #services · #why · #assessment
 *
 * Where the wording lives:
 *   - headings, intros, "Why DataSattva" and the assessment panel ... this file
 *   - the ten challenge tiles and the six journey steps .............. src/lib/components.js
 *   - the ten service tiles (short heading + one line each) .......... src/lib/components.js
 *   - button labels and their links .................................. src/data/site.js (ctas)
 *
 * Blocks marked `reveal` fade in as they scroll into view. The class is switched
 * on by the small script in the page head (revealSwitch, below) and driven by
 * src/scripts/main.js; without JavaScript everything is simply visible.
 */

/* Scroll reveal is opt-in per page. The switch goes in the <head> so that nothing
   is hidden unless scripting is known to work. */
const revealSwitch = `<script>
/* Scroll reveal is switched on only when scripting works. If /assets/main.js has not started
   shortly after load, the switch is removed again so no content can stay hidden. */
(function (d, w) {
  if (!('IntersectionObserver' in w)) return;
  var root = d.documentElement;
  root.classList.add('reveal-on');
  w.addEventListener('load', function () {
    w.setTimeout(function () {
      var h = d.getElementById('site-header');
      if (!h || !h.hasAttribute('data-scrolled')) root.classList.remove('reveal-on');
    }, 1500);
  });
})(document, window);
</script>`;

const head = pageHead({
  title: 'DataSattva — DPDP Act & Rules Advisory, Readiness and Implementation Support',
  description:
    'DataSattva helps organisations understand, assess and address the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 through readiness assessments, privacy governance frameworks and practical implementation support. The clearer side of data.',
  path: '/',
  headExtra: revealSwitch,
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

/* "Why DataSattva": [icon name from src/lib/icons.js, heading, one line]. */
const whyItems = [
  ['scale', 'Practical interpretation', 'Regulatory text translated into decisions, not restated as commentary.'],
  ['target', 'Risk-based and business-oriented', 'Effort goes where it changes your risk profile.'],
  ['layers', 'Governance and controls', 'An operating model with owners and evidence, not aspirational statements.'],
  ['eye', 'Structured gap identification', 'Evidence-based findings that are comparable, prioritised and defensible.'],
  ['check', 'Actionable recommendations', 'Every recommendation carries an owner, an effort estimate and an output.'],
  ['route', 'Support at every stage', 'From a first applicability conversation to assurance over a mature programme.'],
];

/* The arrow in the large assessment button, drawn slightly heavier to suit the bigger label. */
const bigArrow = icon('arrow', 20).replace('stroke-width="1.7"', 'stroke-width="2"');

/* Assessment panel: the "What you get" list. */
const assessmentGets = [
  'An indicative readiness score out of 100',
  'An overall readiness category, capped where critical gaps exist',
  'Potential Critical, High and Moderate gaps by area',
  'Priority areas identified for further review',
  'A downloadable summary of the result',
  'A quick starting point for a structured readiness review',
];

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

<section class="section section--fade-out section--under-hero" id="challenge">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">The challenge</p>
      <h2>Data privacy is more than a policy. It is an organisation-wide responsibility.</h2>
      <p class="lede">Privacy obligations do not sit in a single document or a single team. They run through how data is collected, who can see it, which vendors touch it, how long it is kept and what happens when something goes wrong.</p>
    </div>
    ${challengeTiles()}
    <p class="section-bridge reveal">${icon('info')}<span>The regulatory text is the shortest part of the work. The longer part is translating each of these areas into ownership, process and evidence inside an organisation that already has other priorities.</span></p>
  </div>
</section>

<section class="section" id="journey">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">Understanding your journey</p>
      <h2>Organisations are not at the same starting point — and that is expected.</h2>
      <p class="lede">A privacy programme is built in stages. Some organisations are establishing applicability for the first time; others have governance in place and need to close specific gaps. Starting with clarity about where you are is more useful than starting with urgency.</p>
    </div>
    ${journey(' reveal')}
    <div class="card journey-next reveal">
      <span class="journey-next__icon">${icon('route', 24)}</span>
      <p><strong>Wherever you are, the next step is the same:</strong> establish an evidence-based view of your position before committing budget to tools, policies or headcount. The <a href="/readiness-assessment/">readiness assessment</a> gives an indicative view in about three minutes; a structured review replaces that with a defensible one.</p>
      <a class="btn btn--ghost btn--sm" href="/readiness-assessment/">Take the assessment ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--fade-in section--before-sheet" id="services">
  <div class="container">
    <div class="section-head section-head--wide reveal">
      <p class="eyebrow">Advisory services</p>
      <h2>Ten areas of advisory, from applicability through to enablement.</h2>
      <p class="lede">Each engagement is scoped to where you are, and leaves you with processes, owners and evidence that hold up under scrutiny.</p>
    </div>
    ${serviceTiles()}
    <p class="section-bridge reveal">
      <a class="link-arrow" href="/services/">See how the services fit together ${icon('arrow')}</a>
    </p>
  </div>
</section>

<section class="section section--navy section--sheet why" id="why">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Why DataSattva</p>
      <h2>Regulatory knowledge is the starting point. <em>Operational judgement is the work.</em></h2>
      <p class="lede">We read the Act and the Rules closely, then answer the harder question: what does this mean for the way your organisation actually operates?</p>
    </div>
    <div class="expertise reveal">
      <p class="expertise__label" id="expertise-label">Deep expertise in</p>
      <ul class="expertise__list" aria-labelledby="expertise-label">
        <li>DPDP Act, 2023 &amp; DPDP Rules, 2025</li>
        <li>Privacy governance &amp; accountability</li>
        <li>Enterprise &amp; third-party risk</li>
        <li>Internal controls &amp; evidence</li>
      </ul>
    </div>
    <div class="why-grid reveal reveal--stagger">
${whyItems
  .map(
    ([iconName, title, body]) => `      <div class="why-item">
        <div class="why-item__icon">${icon(iconName, 24)}</div>
        <div>
          <h3>${title}</h3>
          <p>${body}</p>
        </div>
      </div>`
  )
  .join('\n')}
    </div>
  </div>
</section>

<section class="section" id="assessment">
  <div class="container">
    <div class="cta-panel reveal">
      <div class="cta-panel__main">
        <p class="eyebrow">Free readiness assessment</p>
        <h2><span>Not sure where to start?</span> See where your organisation stands on DPDP readiness.</h2>
        <p class="lede">Every data privacy journey begins with clarity. Our free 3-minute assessment gives you an indicative view of your current practices, potential gaps and the areas that need attention.</p>
        <div class="btn-row cta-panel__actions">
          <a class="btn btn--accent btn--xl" href="${ctas.assessmentShort.href}"><span class="lbl-wide">${ctas.assessmentShort.label}</span><span class="lbl-narrow">Start Free Assessment</span> ${bigArrow}</a>
          <a class="btn btn--outline-light" href="${ctas.contact.href}">${ctas.contact.label}</a>
        </div>
        <ul class="cta-facts" role="list">
          <li><strong>~3 min</strong>12 questions</li>
          <li><strong>No sign-up</strong>Scored in your browser</li>
          <li><strong>Free</strong>No obligation</li>
        </ul>
      </div>
      <div class="cta-get">
        <p class="cta-get__title">What you get</p>
        <ul role="list">
${assessmentGets.map((item) => `          <li>${icon('check')}<span>${item}</span></li>`).join('\n')}
        </ul>
      </div>
      <p class="cta-panel__note">The assessment provides an indicative overview and is not an exhaustive compliance evaluation, legal opinion or certification of compliance. <a href="/readiness-assessment/#how-it-works">How the scoring works</a></p>
    </div>
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
