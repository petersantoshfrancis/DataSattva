/**
 * DPDP Readiness Assessment — question bank and scoring model.
 *
 * Shared by the build (which renders the no-JavaScript form) and the browser
 * runtime (which scores in-page). No responses leave the browser.
 *
 * Scoring model, documented in full on the assessment page:
 *  - Each question is scored 0–3 and carries a weight of 1–3 reflecting how
 *    foundational the area is to a defensible position under the Act and Rules.
 *  - Readiness score = Σ(score × weight) ÷ Σ(3 × weight), as a percentage.
 *  - Per-question gap severity is derived from both the score and the weight,
 *    so a low score in a foundational area cannot be averaged away.
 *  - The overall category is capped when critical gaps exist.
 */

export const profile = [
  {
    id: 'orgType',
    label: 'Organisation type',
    type: 'select',
    options: [
      'Private limited company',
      'Public listed company',
      'Multinational subsidiary in India',
      'Foreign entity processing data of individuals in India',
      'Partnership or LLP',
      'Sole proprietorship',
      'Government or public sector body',
      'Non-profit or trust',
      'Other',
    ],
  },
  {
    id: 'industry',
    label: 'Industry',
    type: 'select',
    options: [
      'Technology and SaaS',
      'Banking, financial services and insurance',
      'Healthcare and life sciences',
      'Retail and e-commerce',
      'Education',
      'Manufacturing and industrials',
      'Telecom and media',
      'Professional services',
      'Logistics and mobility',
      'Hospitality and travel',
      'Other',
    ],
  },
  {
    id: 'size',
    label: 'Organisation size',
    type: 'select',
    options: ['1–20 employees', '21–200 employees', '201–1,000 employees', '1,001–5,000 employees', 'More than 5,000 employees'],
  },
  {
    id: 'digitalData',
    label: 'Does your organisation process personal data in digital form (customer, employee, prospect or vendor contact data)?',
    type: 'radio',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'indiaNexus',
    label: 'Where does your processing take place, or who does it relate to?',
    type: 'radio',
    options: [
      'We operate in India and process data of individuals in India',
      'We are outside India but offer goods or services to individuals in India',
      'We are outside India and do not target individuals in India',
      'Not sure',
    ],
  },
];

export const questions = [
  {
    id: 'q1',
    area: 'Applicability',
    weight: 3,
    question:
      'Has your organisation established, and documented, which parts of the DPDP Act and Rules apply to it and from which date?',
    why:
      'Applicability is the foundation of the programme. Obligations in the Act and Rules commence in stages, so a documented position on scope and timing is what makes every later decision coherent.',
    service: 'dpdp-applicability-and-readiness',
    options: [
      { label: 'No position taken yet', score: 0 },
      { label: 'Informal discussions only, nothing documented', score: 1 },
      { label: 'Documented internal view, not reviewed against the notified Rules', score: 2 },
      { label: 'Documented, reviewed against the Act and Rules, with staged dates mapped', score: 3 },
    ],
  },
  {
    id: 'q2',
    area: 'Data discovery and mapping',
    weight: 3,
    question: 'How well does your organisation know where personal data is stored across systems, tools and business functions?',
    why:
      'Notice, consent, rights, retention and breach scoping are all computed from this picture. Incomplete discovery is the most common root cause of failed privacy programmes.',
    service: 'data-mapping-and-records-of-processing',
    options: [
      { label: 'We have no reliable view of where personal data sits', score: 0 },
      { label: 'We know the main systems, but not exports, tools or local copies', score: 1 },
      { label: 'A partial inventory exists and is maintained informally', score: 2 },
      { label: 'A current inventory covers systems, functions and third parties, with named owners', score: 3 },
    ],
  },
  {
    id: 'q3',
    area: 'Processing inventory',
    weight: 3,
    question: 'Are your processing activities documented with purpose, data categories, ground for processing and retention?',
    why:
      'A records-of-processing register ties each activity to a lawful ground and a retention rule. Without it, purposes are reconstructed after the fact and consent cannot be tied to anything specific.',
    service: 'data-mapping-and-records-of-processing',
    options: [
      { label: 'No processing inventory exists', score: 0 },
      { label: 'Partial records held in scattered documents', score: 1 },
      { label: 'Register exists for some functions, without grounds or retention', score: 2 },
      { label: 'Maintained register covering purpose, ground, recipients and retention', score: 3 },
    ],
  },
  {
    id: 'q4',
    area: 'Privacy notices',
    weight: 2,
    question: 'Do your privacy notices state specific purposes, rights and withdrawal routes in plain language at each point of collection?',
    why:
      'Rule 3 sets out what a notice must contain and how it must be presented, including availability in scheduled languages on request. Notices that cannot be produced and versioned cannot be evidenced.',
    service: 'consent-and-privacy-notice-frameworks',
    options: [
      { label: 'No notice beyond a website privacy policy', score: 0 },
      { label: 'Single generic notice, not purpose-specific', score: 1 },
      { label: 'Purpose-specific notices at main channels, some gaps remain', score: 2 },
      { label: 'Purpose-specific, versioned notices across channels with withdrawal routes stated', score: 3 },
    ],
  },
  {
    id: 'q5',
    area: 'Consent',
    weight: 3,
    question: 'How is consent captured, recorded and withdrawn across your digital channels?',
    why:
      'Consent must be free, specific, informed, unconditional and unambiguous, and withdrawal must be as easy as giving it. Consent buried in terms, or withdrawal that does not reach downstream systems, is the most common exposure.',
    service: 'consent-and-privacy-notice-frameworks',
    options: [
      { label: 'Consent is bundled into terms or pre-ticked', score: 0 },
      { label: 'Consent captured, but not purpose-level or centrally recorded', score: 1 },
      { label: 'Purpose-level capture with records, but withdrawal is manual or partial', score: 2 },
      { label: 'Purpose-level, logged consent with withdrawal that propagates downstream', score: 3 },
    ],
  },
  {
    id: 'q6',
    area: 'Data Principal rights',
    weight: 3,
    question: 'Do you have a working process to receive, verify and respond to access, correction, erasure and grievance requests?',
    why:
      'Rule 14 prescribes procedure and a maximum response period of ninety days. Rights handling is the obligation Data Principals exercise directly, and the most frequent route to a complaint.',
    service: 'data-principal-rights-management',
    options: [
      { label: 'No defined process; requests handled ad hoc', score: 0 },
      { label: 'Informal process, no tracker, no service levels', score: 1 },
      { label: 'Documented process with a tracker, but uneven across systems', score: 2 },
      { label: 'Single intake, tracker with ageing, service levels and tested erasure position', score: 3 },
    ],
  },
  {
    id: 'q7',
    area: 'Governance and accountability',
    weight: 3,
    question: 'Is privacy accountability assigned to a named owner, with reporting to executive or board level?',
    why:
      'Obligations attach to the Data Fiduciary as an entity. Evidence of accountability — a named owner, a decision forum, an oversight rhythm — is what an inquiry or an audit will look for.',
    service: 'privacy-governance-and-framework',
    options: [
      { label: 'No named owner; privacy sits informally with legal or IT', score: 0 },
      { label: 'Owner identified but no mandate, forum or reporting', score: 1 },
      { label: 'Owner and committee exist, reporting is inconsistent', score: 2 },
      { label: 'Chartered owner, decision forum, escalation ladder and regular board reporting', score: 3 },
    ],
  },
  {
    id: 'q8',
    area: 'Third-party data processing',
    weight: 3,
    question: 'Do you know which vendors and partners process personal data on your behalf, and do contracts carry enforceable privacy obligations?',
    why:
      'A Data Fiduciary may engage a processor only under a valid contract and remains responsible for that processing. Contract quality and oversight are the controls that make this obligation real.',
    service: 'third-party-privacy-risk-management',
    options: [
      { label: 'No register of vendors touching personal data', score: 0 },
      { label: 'List exists, but contracts are generic and oversight is one-time', score: 1 },
      { label: 'Register with some privacy clauses; sub-processors partly tracked', score: 2 },
      { label: 'Risk-tiered register, refreshed contracts, due diligence and periodic oversight', score: 3 },
    ],
  },
  {
    id: 'q9',
    area: 'Security safeguards',
    weight: 3,
    question: 'Can you evidence reasonable security safeguards over personal data, including access control, monitoring and testing?',
    why:
      'Failure to take reasonable security safeguards carries the highest penalty ceiling in the Schedule. Safeguards that cannot be evidenced are treated as absent.',
    service: 'privacy-policies-procedures-and-controls',
    options: [
      { label: 'Limited controls; evidence is not retained', score: 0 },
      { label: 'Controls exist in core systems; personal data outside them is unprotected', score: 1 },
      { label: 'Documented controls and testing, with gaps in evidence for privacy-specific items', score: 2 },
      { label: 'Mapped controls, tested regularly, with an evidence pack available on request', score: 3 },
    ],
  },
  {
    id: 'q10',
    area: 'Breach management',
    weight: 3,
    question: 'If a personal data breach were suspected today, would you know whether to notify, who decides, and what to send?',
    why:
      'The Act requires intimation to the Board and to affected Data Principals, and Rule 7 prescribes the content and manner. Notification failure carries its own penalty entry, and prompt reporting is a mitigating factor.',
    service: 'personal-data-breach-management',
    options: [
      { label: 'No specific breach process for personal data', score: 0 },
      { label: 'Security incident process exists; privacy notification is improvised', score: 1 },
      { label: 'Documented playbook, not tested, templates incomplete', score: 2 },
      { label: 'Defined declaration authority, templates, processor escalation and rehearsed', score: 3 },
    ],
  },
  {
    id: 'q11',
    area: 'Retention and deletion',
    weight: 2,
    question: 'Do you operate retention schedules with actual deletion, including backups and vendor systems?',
    why:
      'Personal data must be erased when the purpose is no longer served and retention is no longer required by law. Data held beyond its purpose is data you must still protect, disclose and defend.',
    service: 'data-retention-and-erasure',
    options: [
      { label: 'Data is retained indefinitely by default', score: 0 },
      { label: 'Retention understood informally; deletion is manual and partial', score: 1 },
      { label: 'Schedules exist for main systems; backups and vendors excluded', score: 2 },
      { label: 'Purpose-based schedules, automated deletion with evidence, exceptions documented', score: 3 },
    ],
  },
  {
    id: 'q12',
    area: 'Awareness and training',
    weight: 1,
    question: 'Do the people who make day-to-day decisions about data — product, marketing, procurement, HR — know what to do and whom to ask?',
    why:
      'Every obligation depends on someone recognising a privacy question when they see one. Distributed awareness is what lets a programme scale beyond a central team.',
    service: 'privacy-awareness-and-enablement',
    options: [
      { label: 'No privacy awareness activity', score: 0 },
      { label: 'Generic annual training, not role-specific', score: 1 },
      { label: 'Some role-based guidance and a known escalation route', score: 2 },
      { label: 'Role-based enablement, job aids, champions network and measured outcomes', score: 3 },
    ],
  },
];

/** Per-question gap severity from score and weight. */
export function gapSeverity(score, weight) {
  if (score >= 3) return null;
  if (score === 0) return weight === 3 ? 'critical' : 'high';
  if (score === 1) return weight >= 2 ? 'critical' : 'high';
  if (score === 2) return weight === 3 ? 'high' : 'moderate';
  return null;
}

export const categories = [
  {
    min: 85,
    key: 'leading',
    label: 'Leading',
    summary:
      'Your practices appear consistent with a managed privacy programme. Focus on assurance, evidence quality and keeping pace with the staged commencement of the remaining obligations.',
  },
  {
    min: 65,
    key: 'established',
    label: 'Established',
    summary:
      'Core elements are in place but coverage is uneven. The priority is closing the specific gaps below and making sure evidence exists for what you already do.',
  },
  {
    min: 45,
    key: 'developing',
    label: 'Developing',
    summary:
      'Some foundations exist, but several obligations are not yet supported by process or evidence. Sequence work around the foundational areas first.',
  },
  {
    min: 0,
    key: 'foundational',
    label: 'Foundational',
    summary:
      'Significant elements are not yet in place. Start with applicability, discovery and accountability — the rest of the programme depends on them.',
  },
];

export const disclaimerShort =
  'This assessment provides an indicative overview based on self-reported answers. It is not an exhaustive compliance evaluation, a legal opinion or a certification of compliance.';

export const nextSteps = [
  {
    title: 'Review the result areas in order of severity',
    body:
      'The Critical and High items are listed first because they represent foundational exposures. A strong overall score does not offset a missing obligation in a core area.',
  },
  {
    title: 'Validate the result internally with evidence',
    body:
      'Self-reported maturity is often higher than evidenced maturity. Ask the owner of each area to produce the artefact — a register, a notice, a playbook, a test record.',
  },
  {
    title: 'Book a structured readiness review',
    body:
      'An evidence-based assessment takes an indicative score and turns it into a defensible position on applicability, scope and sequencing.',
  },
  {
    title: 'Align the roadmap to the commencement dates',
    body:
      'Substantive obligations under the Act and Rules are staged. Map planning to the notified dates, and treat any reported proposal to compress the timeline as a planning risk.',
  },
];
