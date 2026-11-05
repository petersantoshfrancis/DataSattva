/**
 * Regulatory content model for the DPDP Act & Rules knowledge page.
 *
 * Editorial rules applied throughout (see README "Content integrity"):
 *  - Every statement is tagged by its nature: mandatory / conditional /
 *    good practice / advisory. Nothing is presented as an obligation unless
 *    it is one, and staged provisions are never described as already binding.
 *  - Section and Rule references are used where they could be verified against
 *    the notified text; where a point rests on a reading of the framework
 *    rather than a single provision, it is phrased as interpretation.
 *  - See `sources` for the primary material used.
 */

export const sources = [
  {
    label: 'Digital Personal Data Protection Act, 2023 — Act No. 22 of 2023 (MeitY)',
    href: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf',
    note: 'Assented 11 August 2023. 44 sections in 10 chapters, with a Schedule of penalties.',
  },
  {
    label: 'Digital Personal Data Protection Act, 2023 — Commencement notification, G.S.R. 843(E), 13 November 2025',
    href: 'https://www.meity.gov.in/',
    note: 'Appoints different dates for different provisions of the Act: on publication, at one year, and at eighteen months.',
  },
  {
    label: 'Digital Personal Data Protection Rules, 2025 — G.S.R. 846(E), 13 November 2025 (MeitY)',
    href: 'https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf',
    note: 'Rules numbered to Rule 23, supported by seven Schedules. Rule 1(2)–(4) sets the three commencement stages.',
  },
  {
    label: 'Press Information Bureau — “Government notifies DPDP Rules to empower citizens and protect privacy”, 14 November 2025',
    href: 'https://www.pib.gov.in/',
    note: 'Government summary of the notified Rules and the phased compliance timeline.',
  },
  {
    label: 'Press Information Bureau — explainer on the DPDP framework, 17 November 2025',
    href: 'https://www.pib.gov.in/',
    note: 'Citizen-facing explanation of rights, consent notices and Board processes.',
  },
];

/** Three-stage commencement picture, used on the knowledge page and in insights. */
export const commencement = [
  {
    date: '13 November 2025',
    title: 'Phase 1 — Framework and regulator',
    rules: 'Rules 1, 2 and 17–21',
    act: 'Sections 1(2), 2, 18–26, 35, 38–43 and 44(1) and (3)',
    what:
      'Definitions come into force and the Data Protection Board of India is established, together with the procedural machinery for its digital office, member appointments and appeals to the TDSAT. The Board is the authority that will inquire into breaches and impose penalties.',
    practical:
      'No new operational duty attaches to most organisations at this stage, but an enforcement authority now exists and complaints can be made to it. Governance documentation created now is evidence later.',
    status: 'in-force',
  },
  {
    date: '13 November 2026',
    title: 'Phase 2 — Consent Manager registration',
    rules: 'Rule 4 and the First Schedule',
    act: 'Section 6(9) and section 27(1)(d)',
    what:
      'The window opens for entities to register with the Board as Consent Managers — an India-incorporated intermediary with the prescribed net worth, technical capability and interoperable platform, operating under a fiduciary duty to the Data Principal.',
    practical:
      'Most organisations will not become Consent Managers. What matters is that the consent architecture your organisation builds — purpose-wise, revocable, logged — is capable of working alongside one.',
    status: 'upcoming',
  },
  {
    date: '13 May 2027',
    title: 'Phase 3 — Substantive obligations',
    rules: 'Rules 3, 5–16 and 22–23',
    act: 'Sections 3–5, 6(1)–(8) and (10), 7–17, 27 (except 27(1)(d)), 28–34, 36, 37 and 44(2)',
    what:
      'The operational core switches on: applicability, grounds for processing, notice, consent, legitimate uses, Data Fiduciary obligations, children’s data, Significant Data Fiduciary duties, Data Principal rights, cross-border transfer, breach intimation and the penalty regime in practice.',
    practical:
      'Design, build and test against this date. Consent notices, rights workflows, retention rules, vendor contracts, security safeguards and breach playbooks all need to be live and evidenced before it arrives.',
    status: 'upcoming',
  },
];

export const timelineCaveat =
  'MeitY consulted stakeholders in January 2026 on compressing the eighteen-month stage to twelve months, which would advance the substantive date to 13 November 2026. As at the verification date of this page, no amending commencement notification had been published, so 13 May 2027 remains the operative date in the Gazette. Treat the compression as a planning risk, not as law. Confirm the position against the Gazette before committing programme dates.';

/** Content blocks for the roles section. */
export const roles = [
  {
    name: 'Data Principal',
    statutory: 'The individual to whom the personal data relates.',
    practical:
      'Every customer, employee, candidate, contractor, website visitor and beneficiary your organisation deals with. The Act also gives Data Principals duties — to comply with the Act, not to impersonate another person, not to suppress material information, not to file false or frivolous complaints, and to furnish authentic information where required.',
    tag: 'mandatory',
  },
  {
    name: 'Data Fiduciary',
    statutory:
      'The person who alone or in conjunction with others determines the purpose and means of processing personal data.',
    practical:
      'In practice this is your organisation, and often more than one part of it. It carries the core set of obligations: notice, lawful grounds for processing, accuracy, security safeguards, breach intimation, erasure, grievance redressal and the accountability that goes with them. Deciding who inside the organisation is the Fiduciary for a given data set is a governance exercise, not a legal formality.',
    tag: 'mandatory',
  },
  {
    name: 'Data Processor',
    statutory:
      'A person who processes personal data on behalf of a Data Fiduciary under a valid contract.',
    practical:
      'Your payroll provider, cloud host, analytics vendor, contact centre, marketing agency, KYC utility. A Processor acts on the Fiduciary’s instructions; the Fiduciary remains answerable for the processing. That makes contract quality, instruction limits and oversight the real control points.',
    tag: 'mandatory',
  },
  {
    name: 'Significant Data Fiduciary',
    statutory:
      'A Data Fiduciary notified by the Central Government on the basis of factors such as the volume and sensitivity of data processed, the risk to Data Principals, potential impact on the sovereignty and integrity of India, risk to electoral democracy, security of the State and public order.',
    practical:
      'Designation is by government notification, not self-assessment. If notified, additional obligations apply — including an India-based Data Protection Officer, independent data audits, periodic impact assessments and algorithmic due diligence, with further restrictions on transfer of specified data outside India. Organisations should be able to show that they are ready for designation, not wait for it.',
    tag: 'conditional',
  },
  {
    name: 'Consent Manager',
    statutory:
      'A person registered with the Board who acts as a single point of contact for a Data Principal to give, manage, review and withdraw consent through an accessible, transparent and interoperable platform, owing a fiduciary duty to the Data Principal.',
    practical:
      'A new class of regulated intermediary, not a role most organisations take on. Expect Data Principals to compare your consent experience against Consent Manager standards, and expect procurement and product teams to ask whether your consent flows will interoperate.',
    tag: 'conditional',
  },
  {
    name: 'Data Protection Officer',
    statutory:
      'Required where a Data Fiduciary is notified as a Significant Data Fiduciary, and appointable voluntarily by others. The Act also requires a Data Fiduciary to publish the business contact information of a Data Protection Officer or another person able to answer questions about its processing.',
    practical:
      'Even where an appointment is not mandated, a named, reachable point of accountability is expected. Someone must own the notice, the rights queue, the breach escalation path and the vendor register — and be findable from your website.',
    tag: 'conditional',
  },
];

/** The twelve core requirement clusters. */
export const requirements = [
  {
    id: 'notice',
    ref: 'Act s.5–6; Rule 3',
    title: 'Notice and transparency',
    tag: 'mandatory',
    body:
      'Before or at the time of seeking consent, a Data Fiduciary must give notice describing the personal data sought, the specific purpose of processing, and the manner in which a Data Principal may exercise rights and complain to the Board. Rule 3 tightens the drafting brief: the notice must be presented and stand alone, be itemised and understandable, give the particulars of the goods or services and the purpose, explain how consent may be withdrawn and how a complaint may be made, and be offered in English and, on request, in any of the twenty-two languages listed in the Eighth Schedule to the Constitution.',
    impl:
      'Layered notices, one per purpose and per collection point. Marketing consent separate from service delivery. A stored version history of every notice a user saw, because a notice you cannot produce is a notice you cannot evidence.',
  },
  {
    id: 'consent',
    ref: 'Act s.4, s.6, s.7',
    title: 'Consent and lawful processing',
    tag: 'mandatory',
    body:
      'Personal data may be processed only for a lawful purpose for which the Data Principal has given consent, or for certain legitimate uses. Consent must be free, specific, informed, unconditional and unambiguous, given by clear affirmative action, and limited to the specified purpose. It may be withdrawn at any time and withdrawal must be as easy as giving it — which in practice means the revocation path must live where the collection path lives.',
    impl:
      'Purpose-level consent capture with an audit trail; withdrawal that actually propagates to downstream systems; no pre-ticked boxes, bundled acceptances or consent walls; a defensible register mapping each processing activity to its ground — consent or a specified legitimate use — because you will be asked how consent was obtained, not merely whether it exists.',
  },
  {
    id: 'legitimate-uses',
    ref: 'Act s.7, s.17; Rules 5, 16',
    title: 'Certain legitimate uses and exemptions',
    tag: 'conditional',
    body:
      'Section 7 permits processing without consent in defined situations — voluntary data provision for a specified purpose, State functions and benefits, compliance with judgments or legal obligations, medical emergencies, disasters, safety of the public and State functions such as research and statistics where the data is not used to make decisions about individuals. Section 17 creates further exemptions, including research, archiving and statistical purposes subject to prescribed standards. Rule 5 sets conditions for processing by the State.',
    impl:
      'Read section 7 narrowly and document the reasoning for each reliance. There is no general “legitimate interest” ground comparable to the GDPR, so “business interest” is not a lawful basis. Where you rely on an exemption, record who decided, on what facts, and review it when the purpose changes.',
  },
  {
    id: 'rights',
    ref: 'Act s.11–14; Rule 14',
    title: 'Data Principal rights',
    tag: 'mandatory',
    body:
      'Data Principals have rights to obtain a summary of the personal data being processed and the identities of Data Fiduciaries with whom it has been shared, to correction and completion, to erasure, to grievance redressal, and to nominate another individual to exercise their rights in the event of death or incapacity. Rule 14 prescribes the mechanics and a maximum response period of ninety days from receipt of a request.',
    impl:
      'A single intake point that spans products, channels and jurisdictions; identity verification that does not itself over-collect; a tracker with owners and ageing; templated responses in plain language; and a documented position on what “erasure” means in back-ups, archives and downstream processors.',
  },
  {
    id: 'grievance',
    ref: 'Act s.8(10), s.13; Rule 9',
    title: 'Grievance redressal and published contacts',
    tag: 'mandatory',
    body:
      'A Data Fiduciary must operate a readily available grievance redressal mechanism and publish the business contact information of its Data Protection Officer or another person who can answer questions about its processing. Rule 9 prescribes how that contact information is presented. Grievances have to be addressed — a consumer inbox that quietly ages out is not a mechanism.',
    impl:
      'A published route with a service-level target, an escalation ladder reaching a named accountable person, root-cause feedback into product teams, and reporting to management so that repeated complaints surface as a governance issue rather than a support metric.',
  },
  {
    id: 'fiduciary',
    ref: 'Act s.8; Rule 6–9',
    title: 'Data Fiduciary responsibilities',
    tag: 'mandatory',
    body:
      'The general obligations are cumulative: suppose processing only where consent or a legitimate use applies, give notice, keep data accurate where it is used to make decisions or is shared, take reasonable security safeguards, intimate breaches, erase data when the purpose is no longer served and detention is no longer needed, publish contacts, operate grievance redressal, and appoint or move to erase with the data of Data Principals whose consent has been withdrawn. Responsibility follows the data into the hands of Processors.',
    impl:
      'Convert each obligation into a control with an owner, a frequency, an evidence trail and a test. Obligations that exist only in a policy document will not survive an inquiry or a security incident.',
  },
  {
    id: 'security',
    ref: 'Act s.8(5); Rule 6',
    title: 'Security safeguards',
    tag: 'mandatory',
    body:
      'A Data Fiduciary must take reasonable security safeguards to prevent a personal data breach — the Act’s ceiling for failure here is the highest in the Schedule. Rule 6 prescribes the minimum measures, which are expressed as outcomes and baseline practices: appropriate technical and organisational measures, access controls, visibility over processing, monitoring, and readiness to detect and respond.',
    impl:
      'Map the Rule 6 expectations against what your security programme already evidences — asset inventories, access reviews, logging and monitoring, encryption, vulnerability management, privileged access, and testing. Privacy-specific gaps usually sit in unstructured repositories and downstream tools rather than in core application stacks.',
  },
  {
    id: 'breach',
    ref: 'Act s.8(6); Rule 7',
    title: 'Personal data breach management',
    tag: 'mandatory',
    body:
      'On becoming aware of a personal data breach, a Data Fiduciary must intimate the Board and each affected Data Principal. Rule 7 sets the mechanics: intimation to affected Data Principals without delay, a detailed report to the Board, further particulars as required, and content in plain language describing the nature, extent, timing and likely consequences of the breach and the measures taken. Practitioners commonly work to a seventy-two-hour window for the Board report.',
    impl:
      'Define “aware” so the clock is realistic; a severity matrix that distinguishes reportable breaches from near-misses; a single incident log; pre-approved plain-language templates; a named notifier; processor obligations that escalate to you quickly; and rehearsal — a playbook that has never been exercised fails at the worst moment.',
  },
  {
    id: 'retention',
    ref: 'Act s.8(7); Rule 8; Third and Seventh Schedules',
    title: 'Retention and erasure',
    tag: 'mandatory',
    body:
      'Personal data must be erased when the purpose is no longer served and retention is no longer required by law. Rule 8 and the Third Schedule set out retention expectations by class of Data Fiduciary and purpose, and provide that a Data Principal is given advance notice before scheduled erasure so that they may exercise rights or, where applicable, continue the service. The Seventh Schedule addresses minimum keeping of data and associated logs. Sectoral retention duties continue to apply alongside.',
    impl:
      'Retention schedules built purpose by purpose and system by system, not by document type; automated deletion with exception logs; a process for legal holds; and a defensible answer to the question every regulator asks — “where is it, and why is it still there?”',
  },
  {
    id: 'processors',
    ref: 'Act s.8(2)–(3); Rule 6',
    title: 'Processing by Data Processors',
    tag: 'mandatory',
    body:
      'A Data Fiduciary may engage a Processor only under a valid contract, and remains responsible for compliance in respect of the processing the Processor carries out. That single sentence redistributes risk across your entire vendor estate — cloud, SaaS, analytics, payroll, logistics, marketing, collections and offshore shared services.',
    impl:
      'A processor register tied to the personal data each vendor touches; contract clauses covering purpose limitation, security, breach escalation, sub-processor approval, audit rights, return and deletion, and assistance with Data Principal requests; and oversight that is proportionate to the data at stake rather than to the size of the invoice.',
  },
  {
    id: 'sdf',
    ref: 'Act s.10; Rules 12–13',
    title: 'Significant Data Fiduciary obligations',
    tag: 'conditional',
    body:
      'A Data Fiduciary notified as significant must appoint a Data Protection Officer based in India who reports to its board, appoint an independent data auditor, conduct periodic Data Protection Impact Assessments and audits, undertake measures for algorithmic due diligence so that software does not pose a risk to Data Principals’ rights, and observe any restriction notified on transfer of specified personal data outside India.',
    impl:
      'Even if no notification has been received, boards should know the designation criteria and be able to answer whether the organisation is close to them. Building a DPIA template, an audit calendar and an algorithmic inventory early is cheaper than retrofitting them under a deadline.',
  },
  {
    id: 'children',
    ref: 'Act s.9; Rules 10–11',
    title: 'Children’s personal data',
    tag: 'mandatory',
    body:
      'Where a Data Fiduciary processes the personal data of a child — a person under eighteen — it must obtain verifiable consent of a parent or lawful guardian and must not undertake tracking or behavioural monitoring of children or targeted advertising directed at them. Rule 10 prescribes how verifiable consent is obtained and the limited classes of exemption where the interests of the child or public health and safety justify it; Rule 11 addresses verifiable consent for persons with disabilities who have a lawful guardian.',
    impl:
      'Age assurance proportionate to risk; a parental consent workflow that is genuinely verifiable rather than a checkbox; a product review to find anywhere behavioural data about minors is used for profiling; and a documented exemption assessment wherever an exemption is relied on.',
  },
  {
    id: 'cross-border',
    ref: 'Act s.16; Rule 15',
    title: 'Cross-border data transfers',
    tag: 'conditional',
    body:
      'The Act permits transfer of personal data outside India, subject to restrictions the Central Government may notify — a negative-list model rather than an adequacy model. Rule 15 prescribes how restrictions are imposed. For Significant Data Fiduciaries, additional restrictions may apply to specified categories of data.',
    impl:
      'Reconcile the DPDP position with GDPR transfer mechanisms, sectoral localisation duties and contractual commitments you have already given. A transfer register — data category, destination, recipient, basis, safeguard — turns a legal question into an operational one.',
  },
  {
    id: 'enforcement',
    ref: 'Act Chapter V, s.27, s.33, Schedule; Rules 17–22',
    title: 'Regulatory oversight and enforcement',
    tag: 'mandatory',
    body:
      'The Data Protection Board of India inquires into breaches, hears complaints, issues directions, and may impose penalties after considering factors such as the nature, gravity and duration of the breach, whether it was negligent, whether the organisation gained or avoided loss, whether it took mitigating action, and whether it reported promptly. The Schedule sets monetary ceilings — the highest being ₹250 crore for failure to take reasonable security safeguards — with further entries for breach-notification failure, children’s data, Significant Data Fiduciary obligations and other contraventions. These are ceilings, not standard penalties, and the Schedule is not a pricing table.',
    impl:
      'Two things reduce exposure more than any other: evidence of reasonable safeguards, and prompt, honest reporting. Build both before you need them. Appeals from Board orders lie to the TDSAT, and the Board may also accept voluntary undertakings.',
  },
];

/** Practical implementation framework (11 workstreams). */
export const implementation = [
  {
    step: '01',
    title: 'Governance and accountability',
    body:
      'Agree the mandate: who owns privacy, how the board is informed, which committee decides, what the risk appetite is, and how accountability is delegated to product, HR, marketing, IT and procurement.',
    outputs: 'Governance charter · RACI · reporting cadence · escalation paths',
  },
  {
    step: '02',
    title: 'Data discovery and mapping',
    body:
      'Find personal data where it actually lives — applications, data warehouses, shared drives, mailboxes, ticketing tools, spreadsheets, vendor portals and archives — then trace how it moves.',
    outputs: 'Data inventory · flow maps · system of record list',
  },
  {
    step: '03',
    title: 'Processing inventory and RoPA',
    body:
      'For each activity: purpose, data categories, Data Principal groups, ground for processing, systems, recipients, transfers, retention and owner. This is the spine of every other control.',
    outputs: 'Records of processing activities · purpose register · ground-by-ground justification',
  },
  {
    step: '04',
    title: 'Notices and transparency',
    body:
      'Redraft notices at the point of collection, itemised and readable, in the languages the Rules require on request, with a version history and a mapping back to the processing inventory.',
    outputs: 'Notice suite · layered notice standards · published contact details',
  },
  {
    step: '05',
    title: 'Consent management',
    body:
      'Capture, store and evidence consent at purpose granularity; make withdrawal as simple as grant; propagate preferences to downstream systems; keep artefacts where a regulator can see them.',
    outputs: 'Consent architecture · revocation workflows · consent artefact log',
  },
  {
    step: '06',
    title: 'Data Principal rights',
    body:
      'One intake, identity verification proportionate to the request, an owner per request type, ageing and escalation, templated responses, and a defensible position on backup and archive erasure.',
    outputs: 'Rights SOP · request tracker · response templates · service levels',
  },
  {
    step: '07',
    title: 'Vendor and processor management',
    body:
      'Classify vendors by the personal data they touch; refresh contracts; set security and breach-escalation expectations; approve sub-processors; monitor and, where it matters, audit.',
    outputs: 'Processor register · contract clause library · due-diligence and review cadence',
  },
  {
    step: '08',
    title: 'Security safeguards',
    body:
      'Map the Rule 6 expectations to existing controls, close the privacy-specific gaps, and be able to evidence the whole set — controls that cannot be shown are treated as absent.',
    outputs: 'Control mapping · gap closure plan · evidence pack',
  },
  {
    step: '09',
    title: 'Incident and breach response',
    body:
      'Define a personal data breach, set the clock, agree who declares severity, pre-approve notifications, log everything, and rehearse with the people who would actually be in the room.',
    outputs: 'Incident playbook · severity matrix · notification templates · rehearsal report',
  },
  {
    step: '10',
    title: 'Retention and deletion',
    body:
      'Build purpose-based retention schedules, automate erasure where possible, handle legal holds and advance notice, and keep deletion evidence for systems, backups and vendors.',
    outputs: 'Retention schedule · deletion runbook · exception log',
  },
  {
    step: '11',
    title: 'Monitoring, review and assurance',
    body:
      'Metrics that management can act on, periodic review, internal or independent assurance, DPIA discipline, and a feedback loop from complaints and incidents into design.',
    outputs: 'KPI set · review calendar · assurance report · DPIA register',
  },
];

export const challenges = [
  {
    title: 'Limited visibility into where personal data sits',
    body:
      'Most organisations can name their core systems but not the spreadsheets, exports, mailboxes, marketing tools and local copies that surround them. Discovery is the step that most programmes underestimate, and every downstream control inherits its accuracy.',
    risk: 'Notice, rights, retention and breach scope are all computed from an incomplete picture.',
  },
  {
    title: 'Data silos across business functions',
    body:
      'Customer data sits with marketing, order data with operations, employee data with HR, candidate data with recruitment, and payment data with finance. Each function has its own vocabulary for the same individual.',
    risk: 'A single Data Principal request becomes five separate hunts with no shared definition of “the record”.',
  },
  {
    title: 'Personal data flowing to third parties',
    body:
      'Analytics, cloud, CRM, payroll, logistics, collections, contact centres and offshore affiliates process data on your behalf, often through sub-processors you have never reviewed.',
    risk: 'The Fiduciary remains answerable for processing it did not perform and cannot see.',
  },
  {
    title: 'Inadequate vendor oversight',
    body:
      'Contracts drafted for commercial terms rarely carry privacy obligations that are specific enough to be enforced, and oversight is often a one-time onboarding check.',
    risk: 'No audit rights, no breach-escalation clock and no deletion commitment at the moment they are needed.',
  },
  {
    title: 'Difficulty stating purposes precisely',
    body:
      '“Improving services” and “business purposes” do not survive contact with a purpose-limitation test. Purposes are frequently inferred after the fact from what a system happens to do.',
    risk: 'Consent that is not tied to a specific purpose is difficult to defend, and reuse for a new purpose breaks the original basis.',
  },
  {
    title: 'Consent across many digital channels',
    body:
      'Web, app, kiosk, call centre, WhatsApp, retail point of sale and partner channels each capture consent differently, and revocation rarely reaches all of them.',
    risk: 'Consent records that cannot be reconciled, and withdrawal that leaves live processing untouched.',
  },
  {
    title: 'Retention and deletion in practice',
    body:
      'Retention is often “forever by default”; deletion is manual, partial, or blocked by a fear of breaking analytics or audit trails. Backups, archives and vendor copies are usually out of scope.',
    risk: 'Data kept beyond its purpose is data you must still protect, disclose and defend.',
  },
  {
    title: 'Unclear ownership of privacy responsibilities',
    body:
      'Privacy is frequently treated as a legal or IT matter, with no named owner for notices, consent, rights requests, vendor registers or incident declaration.',
    risk: 'Obligations fall between functions, and the gap is only discovered during an incident or an inquiry.',
  },
  {
    title: 'Integration with existing IT and business processes',
    body:
      'Consent, rights and deletion requirements arrive in the middle of multi-year platform programmes, legacy systems and outsourced operations.',
    risk: 'Privacy becomes a parallel workstream that never lands in the systems that actually process the data.',
  },
  {
    title: 'Resource constraints in smaller organisations',
    body:
      'Startups and SMEs handle the same categories of personal data with a fraction of the capacity, and often without a dedicated privacy or legal function.',
    risk: 'Attempts to copy an enterprise programme fail on cost, while doing nothing leaves the largest exposures unmanaged.',
  },
];

export const glossary = [
  ['Data Principal', 'The individual to whom the personal data relates.'],
  ['Data Fiduciary', 'The entity that determines the purpose and means of processing personal data.'],
  ['Data Processor', 'An entity that processes personal data on behalf of a Data Fiduciary under contract.'],
  ['Significant Data Fiduciary', 'A Data Fiduciary notified as significant by the Central Government, carrying additional obligations.'],
  ['Consent Manager', 'A Board-registered intermediary through which a Data Principal can manage consent across fiduciaries.'],
  ['Personal data breach', 'Any unauthorised use, disclosure, alteration, destruction or loss of personal data in a Data Fiduciary’s possession.'],
  ['Data Protection Board of India', 'The authority established under the Act to inquire into breaches and impose penalties.'],
  ['Verifiable consent', 'Consent for a child’s personal data that is confirmed to have been given by a parent or lawful guardian.'],
  ['DPIA', 'Data Protection Impact Assessment — a structured assessment of the risks of a processing activity.'],
  ['RoPA', 'Records of Processing Activities — the documented inventory of what personal data is processed, why and by whom.'],
];
