import { pageHead, layout, pageHero, ctaCloser } from '../lib/layout.js';
import { serviceCards, tickList, numList } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { org, ctas } from '../data/site.js';
import { services, getService } from '../data/services.js';

export function servicesIndex() {
  const head = pageHead({
    title: 'DPDP Advisory Services — Governance, Data Mapping, Consent, Third-Party Risk | DataSattva',
    description:
      'Ten DPDP advisory services: applicability and readiness, privacy governance, data mapping and records of processing, consent and notices, Data Principal rights, third-party risk, retention, breach management, policies and controls, and enablement.',
    path: '/services/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'DPDP Advisory Services',
        url: `${org.url}/services/`,
        description: 'Advisory, assessment and implementation support across the DPDP Act, 2023 and DPDP Rules, 2025.',
        hasPart: services.map((s) => ({
          '@type': 'Service',
          name: s.title,
          description: s.short,
          url: `${org.url}/services/${s.slug}/`,
          provider: { '@type': 'Organization', name: 'DataSattva' },
          areaServed: 'India',
        })),
      },
    ],
  });

  const content = `
${pageHero({
  eyebrow: 'Advisory services',
  title: 'Advisory that ends in an operating process, not a document.',
  lede: 'Ten service areas covering the full path from applicability through to assurance. Each can stand alone or be combined into a programme sequenced against the staged commencement of the Act and Rules.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Advisory Services' }],
})}

<section class="section">
  <div class="container">
    <div class="section-head section-head--wide">
      <p class="eyebrow">The catalogue</p>
      <h2>Where organisations typically need support</h2>
      <p class="lede">Most engagements begin with one of the first three areas. Everything after that depends on them, which is why the sequence in practice is rarely alphabetical.</p>
    </div>
    ${serviceCards()}
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="grid grid--2" style="gap:clamp(2rem,1rem + 3vw,3.5rem);align-items:start">
      <div>
        <p class="eyebrow">How the services fit together</p>
        <h2>Four layers, one programme.</h2>
        <p class="muted">Services are listed individually because organisations buy them individually. In practice they form a stack, and the sequence below is the one that generally produces the least rework.</p>
        ${numList([
          '<strong>Layer 1 — Establish the position</strong>Applicability and readiness assessment. Defines the perimeter and the gap list everything else is prioritised against.',
          '<strong>Layer 2 — Build the foundations</strong>Governance and framework, data mapping and records of processing. These are the dependencies for notice, rights and retention.',
          '<strong>Layer 3 — Operationalise the obligations</strong>Consent and notices, Data Principal rights, third-party risk, retention and erasure, breach management, policies and controls.',
          '<strong>Layer 4 — Sustain and assure</strong>Awareness and enablement, plus periodic review and control testing so the programme survives staff changes and regulatory movement.',
        ])}
      </div>
      <div>
        <div class="card card--pad-lg">
          <p class="card__kicker">What every engagement includes</p>
          <ul class="tick-list" style="margin-top:0.85rem">
            <li>${icon('check')}<span>A written scope note defining what is and is not covered, agreed before work starts.</span></li>
            <li>${icon('check')}<span>Named owners for every recommendation, with effort estimates and anticipated outputs.</span></li>
            <li>${icon('check')}<span>Findings labelled as statutory requirement, conditional requirement, good practice or advisory recommendation.</span></li>
            <li>${icon('check')}<span>Handover documentation sufficient for someone else to run what we build.</span></li>
            <li>${icon('check')}<span>A management-ready readout, with the decisions required from the organisation stated plainly.</span></li>
          </ul>
          <hr class="divider" style="margin:1.5rem 0">
          <p class="xsmall muted mb-0"><strong style="color:var(--navy)">What we do not do.</strong> We do not certify compliance, provide legal opinions, act as a regulator or statutory authority, or guarantee an outcome in any inquiry. Where a question requires legal advice, we work alongside your counsel.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Choosing a starting point</p>
      <h2>Three common situations, three sensible first steps</h2>
    </div>
    <div class="grid grid--3">
      <div class="card">
        <span class="tag tag--saffron">Just starting</span>
        <h3 class="mt-5" style="font-size:1rem">"We know the Act exists, but not what it means for us."</h3>
        <p class="small muted">Begin with an applicability and readiness assessment. It produces the perimeter, the gap list and a sequenced plan, and it prevents spend on the wrong workstream.</p>
        <a class="link-arrow" href="/services/dpdp-applicability-and-readiness/">Applicability &amp; readiness ${icon('arrow')}</a>
      </div>
      <div class="card">
        <span class="tag">Mid-programme</span>
        <h3 class="mt-5" style="font-size:1rem">"We have policies, but they do not reflect how we work."</h3>
        <p class="small muted">Usually a data mapping and governance problem, not a drafting problem. Fix the inventory and the accountability model, then rebuild the documents against them.</p>
        <a class="link-arrow" href="/services/data-mapping-and-records-of-processing/">Data mapping &amp; RoPA ${icon('arrow')}</a>
      </div>
      <div class="card">
        <span class="tag tag--ok">Under assurance pressure</span>
        <h3 class="mt-5" style="font-size:1rem">"We need to evidence that our controls work."</h3>
        <p class="small muted">Control mapping, evidence packs and rehearsal. This is where vendor oversight, breach playbooks and security safeguard evidence usually need the most attention.</p>
        <a class="link-arrow" href="/services/privacy-policies-procedures-and-controls/">Policies &amp; controls ${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>

${ctaCloser({
  title: 'Not sure which service you need?',
  body: 'Start with the three-minute indicative assessment, or describe your situation and we will tell you which first step makes sense — including when the answer is that you need less work than you expected.',
  primary: ctas.assessment,
  secondary: ctas.contact,
})}
`;

  return layout({ path: '/services/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
}

/* ------------------------------------------------------------ service page */

export function servicePage(slug) {
  const sv = getService(slug);
  if (!sv) return null;

  const head = pageHead({
    title: `${sv.title} — DPDP Advisory | DataSattva`,
    description: `${sv.short} Business outcome: ${sv.outcome} DataSattva provides DPDP advisory and implementation support across India.`,
    path: `/services/${sv.slug}/`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: sv.title,
        serviceType: sv.title,
        description: sv.short,
        url: `${org.url}/services/${sv.slug}/`,
        provider: { '@type': 'Organization', name: 'DataSattva', url: org.url },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Data Fiduciaries and Data Processors subject to the DPDP Act, 2023',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${org.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Advisory Services', item: `${org.url}/services/` },
          { '@type': 'ListItem', position: 3, name: sv.title, item: `${org.url}/services/${sv.slug}/` },
        ],
      },
    ],
  });

  const others = services.filter((s) => s.slug !== sv.slug).slice(0, 3);

  const faqLd = sv.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: sv.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const content = `
${pageHero({
  eyebrow: `Service ${sv.letter}`,
  title: sv.title,
  lede: sv.short,
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Advisory Services', href: '/services/' },
    { label: sv.title },
  ],
  meta: `<span style="display:inline-flex;gap:0.5rem;align-items:center;color:var(--saffron)">${icon(sv.icon, 16)}<span>${sv.outcome}</span></span>`,
})}

<section class="section">
  <div class="container">
    <div class="grid grid--sidebar">
      <div>
        <div class="prose" style="max-width:70ch">
          <h2 style="margin-top:0">The business problem</h2>
          <p>${sv.problem}</p>

          <h2>Why this matters under the DPDP framework</h2>
          <p>${sv.why}</p>

          <h2>Typical organisational challenges</h2>
        </div>
        <div class="mt-5">
          ${tickList(sv.challenges.map((c) => c))}
        </div>

        <div class="prose mt-7" style="max-width:70ch">
          <h2 style="margin-top:0">DataSattva's approach</h2>
        </div>
        <div class="mt-5">${numList(sv.approach.map((a) => a))}</div>

        <div class="grid grid--2 mt-7" style="align-items:start">
          <div class="card card--pad-lg">
            <p class="card__kicker">Illustrative deliverables</p>
            <ul class="tick-list" style="margin-top:0.85rem">
              ${sv.deliverables.map((d) => `<li>${icon('check')}<span>${d}</span></li>`).join('')}
            </ul>
          </div>
          <div class="card card--pad-lg" style="background:var(--paper)">
            <p class="card__kicker">Expected business outcomes</p>
            <ul class="tick-list" style="margin-top:0.85rem">
              ${sv.outcomes.map((d) => `<li>${icon('check')}<span>${d}</span></li>`).join('')}
            </ul>
            <p class="xsmall muted mt-5 mb-0">Outcomes describe the intended result of the engagement. They are not a certification of compliance or a guarantee of regulatory outcome.</p>
          </div>
        </div>

        ${
          sv.faq?.length
            ? `<div class="mt-7">
          <h2 style="font-size:1.4rem">Common questions</h2>
          <div class="mt-5">
            ${sv.faq
              .map((f) => `<details class="acc"><summary>${f.q}</summary><div class="acc__body"><p>${f.a}</p></div></details>`)
              .join('')}
          </div>
        </div>`
            : ''
        }

        <div class="card card--pad-lg mt-7" style="border-color:var(--blue-100);background:var(--blue-050)">
          <h2 style="font-size:1.25rem">Discuss this service</h2>
          <p class="small" style="color:var(--navy-700)">Tell us how your organisation currently handles this area and what prompted the question. We will tell you whether an engagement is warranted, and what the smallest useful scope would be.</p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary" href="/contact/?interest=${encodeURIComponent(sv.title)}">Reach out about this service ${icon('arrow')}</a>
            <a class="btn btn--ghost" href="${ctas.assessment.href}">Start with the assessment</a>
          </div>
        </div>

        <p class="xsmall muted mt-6">DataSattva provides data privacy advisory and implementation support. This page describes our services and does not constitute legal advice, a legal opinion, or a statement that any organisation is or is not compliant with the DPDP Act, 2023 or the DPDP Rules, 2025.</p>
      </div>

      <aside>
        <div class="card aside-card">
          <p class="card__kicker">Service at a glance</p>
          <div style="display:flex;gap:0.75rem;align-items:center;margin:0.9rem 0 1rem">
            <span class="service-card__icon" style="width:44px;height:44px">${icon(sv.icon, 22)}</span>
            <div>
              <p class="xsmall muted mb-0" style="letter-spacing:0.08em;text-transform:uppercase;font-weight:600">Area ${sv.letter} of J</p>
              <strong style="font-size:0.9rem;color:var(--navy)">Advisory &amp; implementation</strong>
            </div>
          </div>
          <ul style="list-style:none;padding:0;margin:0;display:grid;gap:0.6rem;font-size:0.83rem;color:var(--ink-70)">
            <li style="display:flex;gap:0.5rem">${icon('check')}<span>Scoped in writing before work begins</span></li>
            <li style="display:flex;gap:0.5rem">${icon('check')}<span>Findings labelled by obligation type</span></li>
            <li style="display:flex;gap:0.5rem">${icon('check')}<span>Owners and effort attached to every recommendation</span></li>
            <li style="display:flex;gap:0.5rem">${icon('check')}<span>Handover-ready documentation</span></li>
          </ul>
          <hr class="divider" style="margin:1.25rem 0">
          <p class="card__kicker">Other services</p>
          <ul style="list-style:none;padding:0;margin:0.75rem 0 0;display:grid;gap:0.6rem;font-size:0.85rem">
            ${others.map((o) => `<li><a href="/services/${o.slug}/">${o.title}</a></li>`).join('')}
            <li><a href="/services/"><strong>All advisory services</strong></a></li>
          </ul>
          <hr class="divider" style="margin:1.25rem 0">
          <p class="xsmall muted">Regulatory content on this website reflects the Act and Rules as at 4 November 2026. Confirm the current position before relying on it.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

${ctaCloser({
  title: 'Start with a clear view of where you stand.',
  body: 'The free assessment takes about three minutes and gives an indicative read across twelve obligation areas. A structured review replaces the indicative view with an evidenced one.',
  primary: ctas.assessment,
  secondary: ctas.contact,
})}
${faqLd ? `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>` : ''}
`;

  return layout({ path: `/services/${sv.slug}/`, head, content, scripts: '<script src="/assets/main.js" defer></script>' });
}
