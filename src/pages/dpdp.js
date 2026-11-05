import { pageHead, layout, pageHero, ctaCloser } from '../lib/layout.js';
import { roadmap, tickList, tagFor, accordion } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { org, regulatoryStatus, ctas } from '../data/site.js';
import { commencement, timelineCaveat, roles, requirements, challenges, glossary, sources } from '../data/regulatory.js';

const head = pageHead({
  title: 'DPDP Act & Rules explained — India’s Digital Personal Data Protection Framework | DataSattva',
  description:
    'A structured explainer on India’s DPDP Act, 2023 and DPDP Rules, 2025: applicability, roles, core obligations, the staged commencement timeline, an implementation framework and the practical challenges organisations face.',
  path: '/dpdp-act-and-rules/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'India’s DPDP Act, 2023 and DPDP Rules, 2025: a structured explainer',
      description:
        'Applicability, roles, core compliance requirements, implementation framework and practical challenges under India’s Digital Personal Data Protection framework.',
      publisher: { '@type': 'Organization', name: 'DataSattva', url: org.url },
      about: ['Digital Personal Data Protection Act, 2023', 'Digital Personal Data Protection Rules, 2025'],
      isAccessibleForFree: true,
      inLanguage: 'en-IN',
      url: `${org.url}/dpdp-act-and-rules/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'When do the DPDP Act and DPDP Rules come into force?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Commencement is staged. Rules 1, 2 and 17 to 21 came into force on 13 November 2025 together with the Act’s definitions and the provisions establishing the Data Protection Board of India. Rule 4, on Consent Manager registration, takes effect one year later. Rules 3, 5 to 16 and 22 to 23, together with the remaining substantive sections of the Act, take effect eighteen months after publication.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the DPDP Act apply to organisations outside India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Act covers processing of digital personal data within India, and also processing outside India where it relates to offering goods or services to Data Principals in India. Organisations incorporated outside India that serve individuals in India therefore need their own applicability analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the maximum penalty under the DPDP Act?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Schedule to the Act sets monetary ceilings, the highest being ₹250 crore for failure to take reasonable security safeguards. Other entries cover failure to notify a breach, children’s data obligations, Significant Data Fiduciary obligations and other contraventions. These are ceilings, and the Board considers factors including nature, gravity, mitigation and promptness of reporting when determining a penalty.',
          },
        },
      ],
    },
  ],
});

const subnavItems = [
  ['introduction', 'Framework'],
  ['commencement', 'Commencement'],
  ['applicability', 'Applicability'],
  ['roles', 'Key roles'],
  ['requirements', 'Core requirements'],
  ['implementation-framework', 'Implementation'],
  ['challenges', 'Challenges'],
  ['glossary', 'Glossary'],
  ['sources', 'Sources'],
];

const content = `
${pageHero({
  eyebrow: 'Knowledge',
  title: 'India’s DPDP framework, explained properly.',
  lede: 'A working explanation of the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 — what they require, when each part applies, and what it takes to operate them.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'DPDP Act & Rules' }],
  meta: `
    <span>Act No. 22 of 2023</span><span aria-hidden="true">·</span>
    <span>Rules: G.S.R. 846(E), 13 Nov 2025</span><span aria-hidden="true">·</span>
    <span>Verified ${regulatoryStatus.verifiedOn}</span>`,
})}

<nav class="subnav" aria-label="On this page">
  <div class="container subnav__inner" data-spy>
    ${subnavItems.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
  </div>
</nav>

<section class="section" id="introduction">
  <div class="container">
    <div class="grid grid--sidebar">
      <div class="prose">
        <p class="eyebrow">Part A</p>
        <h2 style="margin-top:0">Introduction to the DPDP framework</h2>
        <p>The Digital Personal Data Protection Act, 2023 received Presidential assent on 11 August 2023. It is a single, cross-sector law governing the processing of digital personal data in India, built around a small number of concepts: notice before consent, consent that is free, specific and revocable, a defined set of legitimate uses that do not depend on consent, enforceable rights for the individual, obligations on the entity that decides how data is used, and a regulator with the power to inquire and penalise.</p>

        <h3>The Act and the Rules do different jobs</h3>
        <p>The Act sets the architecture: who it applies to, what rights individuals have, what obligations attach to Data Fiduciaries and Data Processors, when a fiduciary becomes significant, how cross-border transfer may be restricted, how the Data Protection Board of India functions, and the penalty ceilings in its Schedule. It is deliberately incomplete in places, because several of its obligations are expressed as requirements to be met <em>in the prescribed manner</em>.</p>
        <p>The Rules fill in those prescriptions: the content and presentation of notices, the conditions for engaging processors, the minimum security safeguards, the mechanics of breach intimation, retention obligations by class, how verifiable parental consent works, procedures for Data Principal rights, the mechanism for restricting transfers, and the procedural working of the Board. Reading the Act without the Rules gives you the shape of the obligation but not its substance, and reading the Rules without the Act loses the statutory source of authority.</p>

        <div class="callout">
          <p class="callout__title">A note on status</p>
          <p>The Act and the Rules commence in stages rather than all at once. Parts of the framework are in force now, parts come into force at one year from publication, and the substantive core comes into force at eighteen months. Any statement that “the DPDP Act now applies in full” should be treated carefully. This page sets out the position stage by stage.</p>
        </div>

        <h3>What the framework is trying to achieve</h3>
        <p>Four purposes run through the text. First, protection of the individual: digital personal data has become the raw material of commerce, employment and public service, and individuals are largely unable to negotiate its use. Second, certainty for organisations: a single framework replaces a patchwork of sectoral rules and the older SPDI Rules of 2011, which continue in force until the DPDP substantive obligations commence. Third, accountability: obligations attach to the entity that decides purpose and means, and follow the data into the hands of processors. Fourth, proportionality: the penalty structure is graduated, and the Board is directed to weigh mitigating behaviour, including prompt reporting.</p>
        <p>For a business leader, the practical framing is simpler. The Act converts data protection from a matter of security practice and contractual preference into a defined set of operating obligations, each of which needs an owner, a process and evidence.</p>

        <h3>What it does not do</h3>
        <p>It is worth being clear about the boundaries, because misunderstanding them leads to wasted effort. The Act does not introduce a general “legitimate interest” ground comparable to the GDPR; section 7 lists specific legitimate uses instead. It does not create a separate category of sensitive personal data with additional obligations as the earlier regime did — proportionality in safeguards is expected, but the statutory structure differs. It does not provide rights of data portability or a right to object to processing in the GDPR sense. It maintains the transfer model by negative list rather than adequacy. And it does not remove the obligations that already exist under sectoral regulators, employment law or the Information Technology Act.</p>
      </div>

      <aside>
        <div class="card aside-card">
          <p class="card__kicker">At a glance</p>
          <dl style="margin:0">
            ${[
              ['Instrument', 'Act No. 22 of 2023'],
              ['Assent', '11 August 2023'],
              ['Nature', '44 sections, 10 chapters, one Schedule'],
              ['Subordinate legislation', 'DPDP Rules, 2025 — G.S.R. 846(E)'],
              ['Regulator', 'Data Protection Board of India'],
              ['Appeal route', 'TDSAT'],
              ['Scope', 'Digital personal data, and non-digital data once digitised'],
              ['Highest penalty ceiling', '₹250 crore (Schedule)'],
            ]
              .map(
                ([k, v]) =>
                  `<div style="display:flex;gap:1rem;padding:0.5rem 0;border-bottom:1px solid var(--line-soft);font-size:0.82rem"><dt style="color:var(--ink-50);flex:0 0 46%">${k}</dt><dd style="margin:0;color:var(--navy);font-weight:500;flex:1">${v}</dd></div>`
              )
              .join('')}
          </dl>
          <a class="btn btn--ghost btn--sm btn--block mt-5" href="#sources">See primary sources ${icon('arrow')}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper" id="commencement">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Part B</p>
      <h2>Commencement: three stages, not one date</h2>
      <p class="lede">Rule 1 of the DPDP Rules, 2025 and the commencement notification G.S.R. 843(E) bring the framework into force in three tranches. The staged approach is the single most useful planning fact in the whole framework.</p>
    </div>

    <div class="phase-grid">
      ${commencement
        .map(
          (p) => `<div class="phase ${p.status === 'in-force' ? 'phase--live' : ''}">
        <p class="phase__date">${p.date}</p>
        <h3>${p.title}</h3>
        <p class="phase__rules">${p.rules}</p>
        <p>${p.what}</p>
        <p class="phase__practical"><strong style="color:var(--navy);display:block;margin-bottom:0.2rem">${p.status === 'in-force' ? 'In force' : 'Planning implication'}</strong>${p.practical}</p>
      </div>`
        )
        .join('')}
    </div>

    <div class="notice-strip mt-6" style="margin-bottom:0">
      <span aria-hidden="true">${icon('alert', 16)}</span>
      <span><strong>A live planning risk:</strong> ${timelineCaveat}</span>
    </div>
  </div>
</section>

<section class="section" id="applicability">
  <div class="container">
    <div class="prose" style="max-width:78ch">
      <p class="eyebrow">Part C</p>
      <h2 style="margin-top:0">Applicability: what the Act reaches, and what it does not</h2>
      <p>Section 3 sets the territorial and material reach of the Act. It is short, and it is read too quickly. The following decomposition is the one we use with clients to establish a documented position.</p>
    </div>

    <div class="grid grid--2 mt-6" style="align-items:start">
      <div class="card card--pad-lg">
        <p class="card__kicker">Within scope</p>
        <ul class="tick-list" style="margin-top:0.75rem">
          <li>${icon('check')}<span><strong>Digital personal data processed within India</strong>, whether the organisation is Indian or foreign, and whether the processing is online or offline once the data is in digital form.</span></li>
          <li>${icon('check')}<span><strong>Personal data collected in non-digital form and subsequently digitised.</strong> A paper record is drawn into the Act at the moment it is converted.</span></li>
          <li>${icon('check')}<span><strong>Processing outside India</strong> where it relates to offering goods or services to Data Principals in India. This limb is about conduct, not incorporation.</span></li>
        </ul>
      </div>
      <div class="card card--pad-lg">
        <p class="card__kicker">Outside scope, or subject to exemptions</p>
        <ul class="tick-list" style="margin-top:0.75rem">
          <li>${icon('check')}<span><strong>Personal data that is not in digital form</strong> and has not been digitised. The Act does not apply to purely offline records.</span></li>
          <li>${icon('check')}<span><strong>Personal data made publicly available by the Data Principal themselves</strong> is excluded from the definition of personal data, subject to the conditions in the Act.</span></li>
          <li>${icon('check')}<span><strong>Section 17 exemptions</strong> cover defined purposes — including certain State functions, legal proceedings, research and statistics subject to prescribed standards — and are purpose-specific rather than blanket.</span></li>
        </ul>
      </div>
    </div>

    <div class="prose mt-7" style="max-width:78ch">
      <h3>General applicability versus specific obligations</h3>
      <p>The Act applies broadly, but not every obligation applies to every organisation in the same way. Three distinctions matter:</p>
      <ul>
        <li><strong>Role-based obligations.</strong> A Data Processor's obligations differ from a Data Fiduciary's. Many organisations are both, for different data sets.</li>
        <li><strong>Conditional obligations.</strong> Additional duties attach only to Data Fiduciaries notified as Significant, only where children's data is processed, and only where the State processes data for defined functions.</li>
        <li><strong>Timing.</strong> As set out above, applicability of the obligation is staged. An organisation can be in scope today and subject to the substantive obligations only from the eighteen-month date.</li>
      </ul>
      <p>A defensible applicability note therefore states the data sets in scope, the individuals concerned, the role taken for each activity, the obligations that attach, the commencement date for each, and the open questions with an owner. The <a href="/services/dpdp-applicability-and-readiness/">applicability and readiness service</a> exists because that note is harder to produce than it sounds.</p>
    </div>
  </div>
</section>

<section class="section section--paper" id="roles">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Part D</p>
      <h2>The roles the Act creates — and what they mean in practice</h2>
      <p class="lede">The framework is easier to apply once you can name who is who. The statutory definitions are narrow; the practical implications are broader.</p>
    </div>
    <div class="grid grid--3">
      ${roles
        .map(
          (r) => `<div class="role-card">
        <div style="display:flex;justify-content:space-between;gap:0.5rem;align-items:flex-start;margin-bottom:0.5rem">
          <h3>${r.name}</h3>
          ${tagFor(r.tag)}
        </div>
        <p class="role-card__stat">${r.statutory}</p>
        <p>${r.practical}</p>
      </div>`
        )
        .join('')}
    </div>
    <div class="notice-strip notice-strip--info mt-6" style="margin-bottom:0">
      <span aria-hidden="true">${icon('info', 16)}</span>
      <span>Whether a counterparty is a processor or an independent fiduciary turns on who determines purpose and means. That determination drives the contract, the oversight and the risk allocation, and should be recorded relationship by relationship rather than assumed.</span>
    </div>
  </div>
</section>

<section class="section" id="requirements">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Part E</p>
      <h2>The core requirements, in plain terms</h2>
      <p class="lede">Fourteen obligation clusters, each with the statutory reference, what it requires, and what it means operationally. Tags distinguish statutory requirements from conditional obligations and from our own implementation guidance.</p>
    </div>

    <div class="notice-strip">
      <span aria-hidden="true">${icon('info', 16)}</span>
      <span><strong>How to read this section.</strong> The body text describes the requirement. The shaded panel labelled “Operational translation” is DataSattva’s practical guidance — it is not statutory text, and it is not the only reasonable way to implement the obligation. Reference numbers point to the Act and Rules for verification.</span>
    </div>

    ${requirements
      .map(
        (r, i) => `<article class="req" id="req-${r.id}">
      <div class="req__head">
        <span class="tag" style="background:var(--navy);color:#fff">${String(i + 1).padStart(2, '0')}</span>
        <h3>${r.title}</h3>
        ${tagFor(r.tag)}
        <span class="req__ref">${r.ref}</span>
      </div>
      <p>${r.body}</p>
      <div class="req__impl">
        <p><strong>Operational translation</strong>${r.impl}</p>
      </div>
    </article>`
      )
      .join('')}

    <div class="card mt-7">
      <h3>Penalties: ceilings, not tariffs</h3>
      <p class="small muted">The Schedule to the Act sets maximum monetary penalties for specified contraventions. They are ceilings that the Board may impose after an inquiry, having regard to factors including the nature, gravity and duration of the breach, whether it was negligent or wilful, whether it resulted in gain or loss avoided, whether mitigating action was taken, and whether the breach was reported promptly. The Board may also accept voluntary undertakings, and appeals lie to the TDSAT.</p>
      <div class="table-wrap mt-5">
        <table>
          <caption>Summary of the Schedule to the DPDP Act, 2023. Read with section 33. Figures are statutory ceilings, not indicative penalties.</caption>
          <thead><tr><th scope="col">Contravention</th><th scope="col">Maximum penalty</th></tr></thead>
          <tbody>
            <tr><td>Failure to take reasonable security safeguards to prevent a personal data breach</td><td><strong>₹250 crore</strong></td></tr>
            <tr><td>Failure to notify the Board or affected Data Principals of a personal data breach</td><td><strong>₹200 crore</strong></td></tr>
            <tr><td>Breach of additional obligations in relation to children</td><td><strong>₹200 crore</strong></td></tr>
            <tr><td>Breach of additional obligations of a Significant Data Fiduciary</td><td><strong>₹150 crore</strong></td></tr>
            <tr><td>Breach of any other provision of the Act or the Rules</td><td><strong>₹50 crore</strong></td></tr>
            <tr><td>Breach of duties by a Data Principal</td><td><strong>₹10,000</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p class="xsmall muted mt-5 mb-0">Penalties are credited to the Consolidated Fund of India. They are not compensation to the Data Principal, whose remedies lie elsewhere. Confirm the current text of the Schedule before relying on these figures for planning.</p>
    </div>
  </div>
</section>

<section class="section section--paper" id="implementation-framework">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Part F</p>
      <h2>Turning the Act and Rules into working processes</h2>
      <p class="lede">A practical implementation framework in eleven workstreams. The order matters: discovery before design, design before tooling, and evidence running alongside everything.</p>
    </div>

    <div class="notice-strip notice-strip--info">
      <span aria-hidden="true">${icon('info', 16)}</span>
      <span>This framework is our implementation approach, not a statutory sequence. The Act and Rules do not prescribe how an organisation should organise its programme — only what the outcome must be. Adapt the sequence to your change calendar.</span>
    </div>

    ${roadmap()}

    <div class="grid grid--3 mt-7">
      ${[
        ['Discovery is the long pole', 'Most programmes underestimate mapping. It is the dependency for notice, rights, retention and breach scoping, and it cannot be compressed at the end.'],
        ['Sequence by dependency, not by effort', 'Consent notices cannot be written without purposes. Rights fulfilment cannot be tested without an erasure position. Plan the chain.'],
        ['Evidence is a design requirement', 'A control that produces no artefact will not survive assurance. Build the record at the same time as the process.'],
      ]
        .map(
          ([t, b]) => `<div class="card"><h3 style="font-size:0.98rem">${t}</h3><p class="small muted mb-0">${b}</p></div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" id="challenges">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">Part G</p>
      <h2>Where implementation actually gets difficult</h2>
      <p class="lede">Ten challenges we encounter repeatedly. Each is a risk, not an excuse — and each has a practical response.</p>
    </div>
    <div style="display:grid;gap:0.75rem">
      ${challenges
        .map(
          (c, i) => `<div class="card" style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:1.1rem;align-items:start">
        <span style="font-family:var(--font-head);font-weight:700;font-size:0.78rem;color:var(--blue-700);padding-top:0.15rem">${String(i + 1).padStart(2, '0')}</span>
        <div>
          <h3 style="font-size:1.01rem;margin-bottom:0.3rem">${c.title}</h3>
          <p class="small muted" style="margin-bottom:0.5rem">${c.body}</p>
          <p class="xsmall mb-0" style="color:var(--warn);display:flex;gap:0.45rem;align-items:flex-start"><span aria-hidden="true" style="flex-shrink:0">${icon('alert', 14)}</span><span><strong>Risk:</strong> ${c.risk}</span></p>
        </div>
      </div>`
        )
        .join('')}
    </div>
    <div class="mt-6">
      <a class="link-arrow" href="/services/">See how our advisory services address these ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--paper" id="glossary">
  <div class="container">
    <div class="grid grid--sidebar">
      <div>
        <p class="eyebrow">Reference</p>
        <h2>Glossary</h2>
        <p class="muted" style="max-width:60ch">Short working definitions. These are summaries for orientation, not substitutes for the definitions in section 2 of the Act and rule 2 of the Rules.</p>
        <div class="acc-group mt-6">
          ${glossary
            .map(([term, def], i) => accordion({ summary: term, body: `<p>${def}</p>`, open: i === 0 }))
            .join('')}
        </div>
      </div>
      <aside>
        <div class="card aside-card">
          <p class="card__kicker">Related reading</p>
          <ul style="list-style:none;padding:0;margin:0.75rem 0 0;display:grid;gap:0.7rem;font-size:0.87rem">
            <li><a href="/insights/dpdp-applicability-questions-for-indian-organisations/">Applicability: the questions to answer first</a></li>
            <li><a href="/insights/dpdp-rules-2025-staged-commencement-what-it-means/">What the staged commencement means for planning</a></li>
            <li><a href="/insights/building-a-processing-inventory-that-survives-contact/">Building a processing inventory that lasts</a></li>
            <li><a href="/insights/third-party-privacy-risk-beyond-the-vendor-list/">Third-party risk as an oversight capability</a></li>
          </ul>
          <hr class="divider" style="margin:1.25rem 0">
          <p class="card__kicker">Test your position</p>
          <p class="small muted">The free readiness assessment gives an indicative view across twelve obligation areas in about three minutes.</p>
          <a class="btn btn--primary btn--sm btn--block mt-5" href="${ctas.assessment.href}">${ctas.assessmentShort.label}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section" id="sources">
  <div class="container">
    <div class="grid grid--sidebar">
      <div>
        <p class="eyebrow">Sources &amp; verification</p>
        <h2>Primary material relied on</h2>
        <p class="muted" style="max-width:62ch">Regulatory content on this page was checked against the following primary and official sources. Where a position is unsettled or subject to a proposal that has not been notified, we say so rather than presenting it as settled law.</p>
        <ul class="sources mt-6">
          ${sources
            .map(
              (s) =>
                `<li><a href="${s.href}" rel="noopener nofollow" target="_blank">${s.label}</a><span class="note">${s.note}</span></li>`
            )
            .join('')}
        </ul>
        <div class="card mt-6" style="background:var(--paper)">
          <h3 style="font-size:1rem">Verification status</h3>
          <p class="small muted mb-0">${regulatoryStatus.note} Page verified on ${regulatoryStatus.verifiedOn}. Two items are deliberately flagged rather than asserted: (i) any reported proposal to compress the eighteen-month commencement stage, which has not been notified; and (ii) the working seventy-two-hour expectation for Board breach reporting, which is practitioner practice derived from Rule 7 rather than a figure we can quote as a stated statutory deadline. Both should be confirmed against the Gazette and any Board guidance before being relied on operationally.</p>
        </div>
      </div>
      <aside>
        <div class="card aside-card">
          <p class="card__kicker">Practical note</p>
          <h3 style="font-size:0.98rem">This page is not legal advice</h3>
          <p class="small muted">It is an advisory explanation prepared for business leaders and privacy professionals. Every organisation's position depends on facts we have not seen. Where a decision turns on the interpretation of a provision, take legal advice and confirm the current text.</p>
          <hr class="divider" style="margin:1.25rem 0">
          <h3 style="font-size:0.98rem">Would a structured review help?</h3>
          <p class="small muted">An evidence-based readiness review takes the framework on this page and applies it to your systems, contracts and processes.</p>
          <a class="btn btn--ghost btn--sm btn--block mt-5" href="/services/dpdp-applicability-and-readiness/">Readiness review ${icon('arrow')}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${ctaCloser({
  title: 'Read the framework. Then test your position against it.',
  body: 'An indicative score in three minutes, or a structured review with evidence. Either way, the next step is the same: establish where you stand before committing budget.',
})}
`;

export default () => layout({ path: '/dpdp-act-and-rules/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
