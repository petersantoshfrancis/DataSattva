import { pageHead, layout, pageHero, ctaCloser } from '../lib/layout.js';
import { tickList, numList } from '../lib/components.js';
import { icon } from '../lib/icons.js';
import { brand, org, ctas } from '../data/site.js';

const head = pageHead({
  title: 'About DataSattva — Practical DPDP Advisory for Indian Organisations',
  description:
    'DataSattva is a data privacy and DPDP advisory practice helping organisations understand, assess and address the core elements of India’s Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025. The clearer side of data.',
  path: '/about/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About DataSattva',
      url: `${org.url}/about/`,
      description: 'The purpose, focus and approach of DataSattva, a data privacy and DPDP advisory practice.',
    },
  ],
});

const content = `
${pageHero({
  eyebrow: 'About DataSattva',
  title: 'A privacy practice built around clarity, governance and implementation.',
  lede: 'DataSattva exists for a specific reason: the gap between what data protection law requires and what an organisation can actually operate. Our work sits in that gap.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'About DataSattva' }],
})}

<section class="section">
  <div class="container">
    <div class="media">
      <div>
        <p class="eyebrow">Why we exist</p>
        <h2>Data privacy became an operational problem before most organisations had an operational answer.</h2>
        <p class="lede">The conversation about India’s DPDP framework has mostly been conducted at the level of law and principle. That conversation matters. But the question leaders actually ask is narrower and more difficult: <em>what does this require us to do, who owns it, and how will we know it is working?</em></p>
        <p class="muted">Most organisations do not fail on awareness. They fail on translation — between a statutory obligation and a business process, between a policy statement and a system configuration, between a vendor contract and the data that vendor actually holds. Our practice is organised around that translation.</p>
        <p class="muted">That is also where our name comes from. <em>Sattva</em> is used here in its sense of clarity, balance and quality of being. It reflects what we are trying to bring to a subject that is often presented as either a legal threat or a technical abstraction.</p>
      </div>
      <div class="framework-panel">
        <p class="card__kicker">The gap we work in</p>
        <div style="display:grid;gap:0.9rem;margin-top:1rem">
          ${[
            ['The regulation says', 'Personal data must be processed for a lawful purpose, with notice, on a valid ground, with safeguards, for no longer than needed.'],
            ['The organisation needs', 'A named owner for each obligation, a process that runs in the systems people already use, and evidence that it ran.'],
            ['The distance between', 'Discovery, design, ownership, integration and assurance. This is where programmes stall — and where we work.'],
          ]
            .map(
              ([k, v], i) => `<div style="padding:0.9rem 1rem;background:${i === 2 ? 'var(--blue-050)' : 'var(--paper)'};border-radius:8px;border-left:3px solid ${i === 2 ? 'var(--blue)' : 'var(--line)'}">
                <p class="xsmall" style="margin:0 0 0.2rem;font-family:var(--font-head);font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:${i === 2 ? 'var(--blue-700)' : 'var(--ink-50)'}">${k}</p>
                <p class="small mb-0" style="color:var(--ink-70)">${v}</p>
              </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Our approach</p>
      <h2>Six commitments that shape how we work.</h2>
      <p class="lede">These are not differentiators in a marketing sense. They are the operating rules we hold ourselves to, and the reason clients tend to stay engaged past the first assessment.</p>
    </div>
    <ul class="approach-list">
      <li>
        <span class="approach-list__n">01</span>
        <div>
          <h3>We separate the mandatory from the sensible</h3>
          <p>Every finding we present is labelled: a statutory requirement, a conditional requirement, good practice or our recommendation. Organisations deserve to know which items carry legal weight and which are judgement calls. Blurring the two produces either unnecessary spend or unprotected risk.</p>
        </div>
      </li>
      <li>
        <span class="approach-list__n">02</span>
        <div>
          <h3>We start with evidence, not with documents</h3>
          <p>A register that cannot be produced, a consent flow that cannot be demonstrated, or a playbook that has never been rehearsed is treated as absent — because that is how it will be treated under examination. Our assessments ask for the artefact, not the assurance.</p>
        </div>
      </li>
      <li>
        <span class="approach-list__n">03</span>
        <div>
          <h3>We work in the systems people already use</h3>
          <p>Privacy processes that require a separate tool, a separate ticket queue or a separate team are the first to decay. We design into existing procurement, change management, HR onboarding and support workflows wherever the obligation allows.</p>
        </div>
      </li>
      <li>
        <span class="approach-list__n">04</span>
        <div>
          <h3>We build for the day after the engagement ends</h3>
          <p>A deliverable that only we can maintain is a dependency, not a solution. Every artefact we produce comes with an owner, a review cadence and enough documentation for someone else to run it.</p>
        </div>
      </li>
      <li>
        <span class="approach-list__n">05</span>
        <div>
          <h3>We say when we do not know</h3>
          <p>Regulatory positions change, and some questions genuinely require legal opinion rather than advisory judgement. Where a position is unsettled, we say so, explain what we are relying on, and recommend the right escalation.</p>
        </div>
      </li>
      <li>
        <span class="approach-list__n">06</span>
        <div>
          <h3>We keep the tone proportionate</h3>
          <p>Data protection is not served by fear. The penalty ceilings in the Act are real, and so is the commercial cost of poor data governance — but organisations implement better when they understand the reasoning, not when they are alarmed into buying documents.</p>
        </div>
      </li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid--2" style="gap:clamp(2rem,1rem + 3vw,3.5rem);align-items:start">
      <div>
        <p class="eyebrow">Who we work with</p>
        <h2>Built for the people who carry the obligation.</h2>
        <p class="muted">Privacy decisions are made in boardrooms, in product reviews, in procurement committees and in HR operations. We work with the people in all of those rooms.</p>
        ${tickList([
          'Boards, CEOs and CXOs who need a defensible position and a costed plan, not a summary of the Act.',
          'CIOs, CTOs and data leaders who need privacy requirements embedded in platforms and data architecture.',
          'Data Protection Officers and privacy professionals who need delivery capacity and structured assessment.',
          'Chief Risk Officers and compliance leaders who need privacy to sit credibly inside the enterprise risk framework.',
          'Legal teams who need operational implementation to follow their advice.',
          'Information security teams who need privacy-specific controls and breach processes that connect to incident response.',
          'Startups and SMEs who need a proportionate programme rather than an enterprise template.',
          'Organisations outside India that process personal data relating to individuals in India and need a local operational view.',
        ])}
      </div>
      <div>
        <p class="eyebrow">Engagement stages</p>
        <h2>Support at whatever stage you are at.</h2>
        <div class="card card--pad-lg">
          ${numList([
            '<strong>Orientation</strong>An indicative assessment, a scoping conversation and a view of where the exposure sits.',
            '<strong>Assessment</strong>An evidence-based readiness review, a gap register and a prioritised roadmap.',
            '<strong>Design</strong>Governance, policy architecture, notices, consent design, rights process and vendor framework.',
            '<strong>Implementation support</strong>Working alongside your teams to build, test and evidence the controls.',
            '<strong>Assurance</strong>Periodic review, control testing, rehearsal of breach response and DPIA discipline.',
          ])}
        </div>
        <div class="notice-strip notice-strip--info mt-6" style="margin-bottom:0">
          <span aria-hidden="true">${icon('info', 16)}</span>
          <span>We are an advisory practice, not a law firm. Where a question requires legal advice or a legal opinion, we say so and work alongside your counsel.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container container-narrow">
    <p class="eyebrow">A note on what we do not claim</p>
    <h2>Credibility is earned through the work, not through the website.</h2>
    <p class="muted">This site does not display client names, testimonials, awards, certifications or statistics about engagements, because none have been supplied for publication. Where such information is later provided and can be verified, it will be added. Until then, the substance of this website has to carry the argument: what we understand, how we work, and what you would receive.</p>
    <p class="muted">Equally, we do not claim to certify compliance, to hold regulatory approval, or to guarantee an outcome in any inquiry. What we can do is help you understand your obligations, build processes that address them, and be able to demonstrate that you did so.</p>
    <div class="btn-row mt-6">
      <a class="btn btn--primary" href="${ctas.assessment.href}">Start with the readiness assessment ${icon('arrow')}</a>
      <a class="btn btn--ghost" href="/contact/">Talk to the team</a>
    </div>
  </div>
</section>

${ctaCloser({
  title: 'The clearer side of data.',
  body: 'If you are at the beginning of your DPDP journey, start with an indicative assessment. If you already have a programme, start with a conversation about assurance.',
  primary: ctas.contact,
  secondary: ctas.assessment,
})}
`;

export default () => layout({ path: '/about/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
