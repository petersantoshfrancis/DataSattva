import { esc } from './layout.js';
import { icon } from './icons.js';
import { services } from '../data/services.js';
import { implementation } from '../data/regulatory.js';

/* ---------------------------------------------------------------- hero art */

export function heroVisual() {
  return `<svg class="hero-diagram" viewBox="0 0 560 470" role="img" aria-labelledby="hv-title" xmlns="http://www.w3.org/2000/svg">
  <title id="hv-title">Diagram: personal data flows from Data Principals through governed processing inside an organisation to third-party processors, with governance, consent, rights, security and retention controls applying throughout.</title>
  <defs>
    <linearGradient id="hv-panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#17365E"/><stop offset="100%" stop-color="#10294A"/>
    </linearGradient>
    <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2F80FF" stop-opacity="0.1"/>
      <stop offset="50%" stop-color="#2F80FF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#2F80FF" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="hv-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- grid -->
  <g stroke="#FFFFFF" stroke-opacity="0.05">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 40 + 8}" x2="560" y2="${i * 40 + 8}"/>`).join('')}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 40 + 8}" y1="0" x2="${i * 40 + 8}" y2="470"/>`).join('')}
  </g>

  <!-- outer frame -->
  <rect x="8" y="8" width="544" height="454" rx="20" fill="none" stroke="#FFFFFF" stroke-opacity="0.1"/>

  <!-- Data Principals column -->
  <text x="40" y="62" fill="#7FA8E4" font-family="Montserrat,sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.6">DATA PRINCIPALS</text>
  <g class="hv-nodes hv-nodes--in" font-family="Inter,sans-serif" font-size="11.5" fill="#DCE8F8">
    <g><rect x="40" y="76" width="112" height="34" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.14"/><circle cx="58" cy="93" r="4.5" fill="#FFB020"/><text x="72" y="97">Customers</text></g>
    <g><rect x="40" y="120" width="112" height="34" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.14"/><circle cx="58" cy="137" r="4.5" fill="#2F80FF"/><text x="72" y="141">Employees</text></g>
    <g><rect x="40" y="164" width="112" height="34" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.14"/><circle cx="58" cy="181" r="4.5" fill="#6AA8FF"/><text x="72" y="185">Prospects</text></g>
    <g><rect x="40" y="208" width="112" height="34" rx="8" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.14"/><circle cx="58" cy="225" r="4.5" fill="#8AA0BB"/><text x="72" y="229">Contacts</text></g>
  </g>

  <!-- flows in -->
  <g class="hv-flow hv-flow--in" fill="none" stroke="url(#hv-line)" stroke-width="1.6">
    <path d="M152 93 C186 93 186 150 214 168"/>
    <path d="M152 137 C190 137 192 176 214 186"/>
    <path d="M152 181 C190 181 194 200 214 204"/>
    <path d="M152 225 C188 225 192 224 214 220"/>
  </g>

  <!-- governance core -->
  <g class="hv-core">
    <rect x="214" y="86" width="180" height="272" rx="16" fill="url(#hv-panel)" stroke="#2F80FF" stroke-opacity="0.45"/>
    <text x="232" y="112" fill="#FFFFFF" font-family="Montserrat,sans-serif" font-size="11.5" font-weight="700" letter-spacing="0.4">Data Fiduciary</text>
    <text x="232" y="127" fill="#7FA8E4" font-family="Inter,sans-serif" font-size="9.5">governance &amp; controls</text>
    <line x1="232" y1="137" x2="376" y2="137" stroke="#FFFFFF" stroke-opacity="0.12"/>
    <g font-family="Inter,sans-serif" font-size="10" fill="#DCE8F8">
      ${[
        ['Notice', 150],
        ['Consent', 178],
        ['Rights', 206],
        ['Retention', 234],
        ['Security', 262],
        ['Breach', 290],
      ]
        .map(
          ([label, y], i) =>
            `<g><rect x="232" y="${y - 11}" width="144" height="23" rx="6" fill="#FFFFFF" fill-opacity="0.07"/><circle cx="245" cy="${y + 0.5}" r="3" fill="${i === 1 ? '#FFB020' : '#2F80FF'}"/><text x="256" y="${y + 4}">${label}</text></g>`
        )
        .join('')}
    </g>
    <rect x="232" y="318" width="144" height="22" rx="6" fill="#FFB020" fill-opacity="0.14" stroke="#FFB020" stroke-opacity="0.4"/>
    <text x="245" y="333" fill="#FFC44D" font-family="Inter,sans-serif" font-size="9.5" font-weight="600">Accountability &amp; oversight</text>
  </g>

  <!-- flows out -->
  <g class="hv-flow hv-flow--out" fill="none" stroke="url(#hv-line)" stroke-width="1.6">
    <path d="M394 160 C424 160 424 142 448 142"/>
    <path d="M394 204 C428 204 428 196 448 196"/>
    <path d="M394 248 C428 248 428 250 448 250"/>
    <path d="M394 292 C424 292 424 304 448 304"/>
  </g>

  <!-- third parties -->
  <text x="448" y="62" fill="#7FA8E4" font-family="Montserrat,sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.6">THIRD PARTIES</text>
  <g class="hv-nodes hv-nodes--out" font-family="Inter,sans-serif" font-size="10.5" fill="#DCE8F8">
    ${[
      ['Cloud', 126],
      ['Processors', 180],
      ['Analytics', 234],
      ['Partners', 288],
    ]
      .map(
        ([label, y]) =>
          `<g><rect x="448" y="${y}" width="80" height="32" rx="8" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.12" stroke-dasharray="4 3"/><text x="460" y="${y + 20}">${label}</text></g>`
      )
      .join('')}
  </g>

  <!-- review loop -->
  <path class="hv-loop" d="M304 358 C304 412 214 412 214 358" fill="none" stroke="#FFB020" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="241" y="404" fill="#FFC44D" font-family="Inter,sans-serif" font-size="9.5">monitor · review · improve</text>

  <!-- base plate -->
  <rect x="40" y="386" width="480" height="1" fill="#FFFFFF" fill-opacity="0.1"/>
  <g font-family="Inter,sans-serif" font-size="9.5" fill="#8AA0BB">
    <text x="40" y="408">DPDP Act, 2023</text>
    <text x="40" y="424">DPDP Rules, 2025</text>
    <circle class="hv-pulse" cx="452" cy="404" r="3" fill="#2F80FF" filter="url(#hv-glow)"/>
    <text x="462" y="408">assets</text>
    <circle cx="452" cy="420" r="3" fill="#FFB020"/>
    <text x="462" y="424">controls</text>
  </g>
</svg>`;
}

/* --------------------------------------------------- challenge framework */

/* The six obligations, stated as the Act states them. Kept deliberately terse:
   this is the "what you are actually being asked to do" strip, not a framework. */
const obligations = [
  ['Notice', 'Tell people what you collect and why, in language they can read.'],
  ['Consent', 'Ask before you use it — and make withdrawing as easy as giving.'],
  ['Rights', 'Answer access, correction and erasure requests, on time.'],
  ['Security', 'Protect the data, and be able to show how.'],
  ['Retention', 'Delete it when the purpose is served, and prove you did.'],
  ['Vendors', 'Govern what processors and partners do with it.'],
];

export function challengeFramework() {
  return `<div class="framework-panel framework-panel--tight">
  <div class="obligation-grid">
    ${obligations
      .map(
        ([title, body], i) => `<div class="obligation">
      <p class="obligation__num">${String(i + 1).padStart(2, '0')}</p>
      <h3>${esc(title)}</h3>
      <p>${esc(body)}</p>
    </div>`
      )
      .join('')}
  </div>
  <p class="framework-note">
    <span aria-hidden="true">${icon('info', 16)}</span>
    <span>Six obligations, one operating model. Most programmes stall not on understanding the Act but on translating it into processes, named owners and evidence that survives scrutiny.</span>
  </p>
</div>`;
}

/* ------------------------------------------------------------ journey */

const journeySteps = [
  ['Understand applicability', 'Establish what applies, to which data, from which date.'],
  ['Identify personal data', 'Find the data and the processing activities across systems and functions.'],
  ['Assess practices and gaps', 'Compare current practice against the obligations, with evidence.'],
  ['Establish governance', 'Assign accountability, forums and escalation.'],
  ['Implement controls', 'Build notices, consent, rights, retention, vendor and security processes.'],
  ['Monitor and improve', 'Measure, review, re-assess and keep pace with regulatory change.'],
];

export function journey() {
  return `<ol class="journey" role="list">
  ${journeySteps
    .map(
      ([title, body], i) => `<li class="journey__step">
      <div class="journey__dot">${String(i + 1).padStart(2, '0')}</div>
      <h3>${esc(title)}</h3>
      <p>${esc(body)}</p>
    </li>`
    )
    .join('')}
</ol>`;
}

/* ------------------------------------------------------- service cards */

export function serviceCards(list = services, { headingLevel = 3 } = {}) {
  return `<div class="grid grid--3">
  ${list
    .map(
      (sv) => `<a class="service-card" href="/services/${sv.slug}/">
      <div class="service-card__top">
        <span class="service-card__icon">${icon(sv.icon)}</span>
        <span class="service-card__letter">${esc(sv.letter)}</span>
      </div>
      <h${headingLevel}>${esc(sv.title)}</h${headingLevel}>
      <p>${esc(sv.short)}</p>
      <div class="service-card__outcome">${icon('check')}<span>${esc(sv.outcome)}</span></div>
      <span class="service-card__more">Explore this service ${icon('arrow')}</span>
    </a>`
    )
    .join('')}
</div>`;
}

/* ------------------------------------------------- implementation roadmap */

export function roadmap() {
  return `<div class="roadmap">
  ${implementation
    .map(
      (st) => `<div class="roadmap__item">
      <div class="roadmap__marker"><span>${esc(st.step)}</span></div>
      <div class="roadmap__body">
        <h3>${esc(st.title)}</h3>
        <p>${esc(st.body)}</p>
        <p class="roadmap__out"><strong>Outputs:</strong> ${esc(st.outputs)}</p>
      </div>
    </div>`
    )
    .join('')}
</div>`;
}

/* ------------------------------------------------------------ agreements */

export function tickList(items, variant = '') {
  return `<ul class="tick-list ${variant}">
    ${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}
  </ul>`;
}

export function numList(items) {
  return `<ol class="num-list">
    ${items.map((i) => `<li>${i}</li>`).join('')}
  </ol>`;
}

export function accordion({ summary, ref = '', body, open = false }) {
  return `<details class="acc"${open ? ' open' : ''}>
  <summary>${summary}${ref ? ` <span class="acc__ref">${esc(ref)}</span>` : ''}</summary>
  <div class="acc__body">${body}</div>
</details>`;
}

export function tagFor(kind) {
  const map = {
    mandatory: ['mandatory', 'Statutory requirement'],
    conditional: ['conditional', 'Conditional'],
    practice: ['practice', 'Good practice'],
    advisory: ['moderate', 'Advisory recommendation'],
  };
  const [cls, label] = map[kind] || map.practice;
  return `<span class="tag tag--${cls}">${label}</span>`;
}

export function insightCard(article, { feature = false, categoryLabel }) {
  return `<a class="card insight-card${feature ? ' insight-card--feature' : ''}" href="/insights/${article.slug}/">
  <div class="insight-card__top">
    <span class="insight-card__cat">${esc(categoryLabel(article.category))}</span>
    ${article.draft ? '<span class="draft-badge">Draft content</span>' : ''}
  </div>
  <h3>${esc(article.title)}</h3>
  <p>${esc(article.excerpt)}</p>
  <div class="insight-card__foot">
    <span>${esc(article.readingTime)}</span>
    <span aria-hidden="true">·</span>
    <span>${article.date ? esc(article.date) : 'Publication date pending'}</span>
  </div>
</a>`;
}
