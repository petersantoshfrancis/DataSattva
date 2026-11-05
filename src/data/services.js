/**
 * Advisory service catalogue. Drives both the services index and the ten
 * dedicated service pages. Language stays descriptive: these are support
 * activities, not certifications or guarantees.
 */

export const services = [
  {
    slug: 'dpdp-applicability-and-readiness',
    letter: 'A',
    title: 'DPDP Applicability & Readiness Assessment',
    short:
      'Help organisations understand the applicability of the Act and Rules, evaluate current practices and identify potential gaps.',
    outcome: 'A clear answer on what applies to you, and a prioritised gap list you can act on.',
    icon: 'compass',
    problem:
      'Leadership teams are being asked whether the DPDP Act applies to them, what changes are needed, and how much it will cost — usually with nothing more than a legal summary to work from. The result is either paralysis or a document that restates the Act without saying anything about this organisation.',
    why:
      'Applicability depends on what personal data you process, in what form, where the Data Principals are, and which obligations attach to your role. The Act and Rules also commence in stages, so “are we compliant?” is the wrong question. The useful question is which obligations apply, by when, and what evidence will demonstrate that they have been met.',
    challenges: [
      'No agreed view of which business lines process personal data relating to individuals in India.',
      'Existing policies written against GDPR or the IT Act and assumed to carry over.',
      'Uncertainty about the staged commencement of the Act and the Rules, and what to sequence first.',
      'Assessment fatigue: previous exercises produced slideware rather than an actionable plan.',
    ],
    approach: [
      'Scope and applicability workshop with legal, technology, operations and business owners to fix the perimeter.',
      'Structured review across the twelve obligation areas of the framework, using evidence rather than assertion.',
      'Maturity and gap scoring that separates critical exposures from presentation issues.',
      'A sequenced roadmap aligned to the staged commencement dates and to your existing change calendar.',
      'A management-ready readout with decisions required, owners and indicative effort.',
    ],
    deliverables: [
      'Applicability and scope note, with the reasoning recorded.',
      'Readiness assessment report with gap ratings and supporting evidence references.',
      'Prioritised remediation roadmap with owners and indicative timelines.',
      'Executive summary and board-ready briefing pack.',
      'Optional: a follow-up review checkpoint on agreed milestones.',
    ],
    outcomes: [
      'One defensible position on applicability that legal, technology and business teams share.',
      'A prioritised list of gaps with the evidence needed to close each one.',
      'A costed, sequenced plan instead of a compliance panic.',
    ],
    faq: [
      {
        q: 'Is this the same as the online readiness assessment?',
        a: 'No. The online tool gives an indicative view in about three minutes and is designed for orientation. This engagement is evidence-based: documents are reviewed and people are interviewed, and the output is a defensible assessment rather than a self-reported score.',
      },
      {
        q: 'How long does it take?',
        a: 'Typically two to four weeks depending on the number of business units and the availability of documentation. Scoping fixes the timeline before work begins.',
      },
    ],
  },
  {
    slug: 'privacy-governance-and-framework',
    letter: 'B',
    title: 'Data Privacy Governance & Framework Development',
    short:
      'Support the development of privacy governance structures, accountability frameworks, policies and oversight mechanisms.',
    outcome: 'Named accountability, a decision-making structure and a policy set that matches how the business actually runs.',
    icon: 'governance',
    problem:
      'Privacy obligations are usually distributed informally across legal, security, IT, HR and product teams. Nobody holds the whole picture, and no forum makes trade-offs between privacy risk and commercial priorities.',
    why:
      'The Act places obligations on the Data Fiduciary as an entity, not on a team. When the Board looks at conduct, it looks for evidence of accountability: a named owner, a documented decision, an oversight rhythm and a record that concerns were raised and addressed. Governance is the mechanism that produces that evidence in the ordinary course of business.',
    challenges: [
      'Privacy treated as a legal review step rather than an operating discipline.',
      'No privacy representation in product, procurement or data platform design.',
      'Policies copied from other jurisdictions and disconnected from real workflows.',
      'Board reporting limited to incident counts, with no view of risk or residual exposure.',
    ],
    approach: [
      'Design the accountability model: owner, committee, escalation ladder, delegations and interfaces with risk, security, legal and audit.',
      'Build a policy architecture that separates principles, standards, procedures and records so that documents have a purpose and a maintenance path.',
      'Define the management information set — the small number of measures that tell a board whether privacy is under control.',
      'Integrate privacy gates into change, procurement and data initiatives.',
      'Run a working session with the accountable executives to test the model before it is adopted.',
    ],
    deliverables: [
      'Privacy governance charter and RACI.',
      'Policy architecture with drafting support for core policies.',
      'Committee terms of reference and reporting templates.',
      'Privacy risk appetite statement and register structure.',
      'First-cycle board or committee pack.',
    ],
    outcomes: [
      'Everyone can name who is accountable for what.',
      'Decisions on privacy risk are made in a documented forum, at the right level.',
      'Policies that survive audit because they describe what people do.',
    ],
    faq: [
      {
        q: 'We already have an information security management system. Can privacy sit inside it?',
        a: 'Partly. Security and privacy overlap on safeguards and incident response, but privacy also owns notice, consent, rights fulfilment, retention and third-party purpose limitation. The usual outcome is a shared operating model with distinct accountabilities per obligation.',
      },
      {
        q: 'Do we need a Data Protection Officer?',
        a: 'A DPO appointment is mandatory where a Data Fiduciary is notified as significant; others may appoint voluntarily. Independently of that, the Act requires published contact details for a DPO or another person who can answer questions about your processing, so a named and reachable owner is needed in every case.',
      },
    ],
  },
  {
    slug: 'data-mapping-and-records-of-processing',
    letter: 'C',
    title: 'Data Mapping & Records of Processing Activities',
    short:
      'Help organisations identify personal data, understand processing activities and establish visibility over data flows across functions and systems.',
    outcome: 'A defensible inventory of what personal data exists, where it lives, why it is held and who can see it.',
    icon: 'map',
    problem:
      'Almost every privacy obligation depends on knowing what data you hold. In practice, organisations discover at the worst possible moment that their understanding of their own data estate is incomplete — during a breach, a rights request, or a vendor negotiation.',
    why:
      'Notice, consent, rights fulfilment, retention, breach scoping and vendor oversight all draw on the same underlying picture. Building the inventory once, properly, is what converts a compliance programme from a set of documents into an operating capability.',
    challenges: [
      'Personal data spread across core systems, SaaS tools, exports, mailboxes and archives.',
      'No consistent definition of a system, a data set or a processing activity.',
      'Business teams describing processes differently from how technology teams describe systems.',
      'Mapping exercises that stall because they attempt perfection before producing anything useful.',
    ],
    approach: [
      'Start from business processes and customer journeys, then reconcile with system and vendor evidence.',
      'Run structured discovery workshops with function owners, supported by technical interviews where needed.',
      'Build the records of processing activity in a structure that supports notice drafting, rights fulfilment and retention design.',
      'Trace flows to third parties and identify onward transfers and offshore locations.',
      'Set a maintenance model so the inventory does not decay after the engagement ends.',
    ],
    deliverables: [
      'Personal data inventory by system and business function.',
      'Records of processing activities with purpose, ground, recipients and retention.',
      'Data flow maps for priority processes.',
      'Third-party and cross-border recipient list.',
      'Inventory maintenance and ownership model.',
    ],
    outcomes: [
      'A single reference point for anyone asked “what data do we hold and why?”',
      'Faster, more accurate responses to rights requests and breach scoping.',
      'Evidence for vendor negotiations and transfer assessments.',
    ],
    faq: [
      {
        q: 'Do we need a tool to do this?',
        a: 'Not necessarily. A well-structured register maintained by named owners is more valuable than an unmaintained platform. Where volumes justify a tool, we help define requirements and migrate content — the design comes first.',
      },
      {
        q: 'How much detail is enough?',
        a: 'Enough to answer operational questions: which systems hold which data categories for which purpose, who receives it, how long it is kept and who owns it. Granularity beyond that tends to cost more than it returns.',
      },
    ],
  },
  {
    slug: 'consent-and-privacy-notice-frameworks',
    letter: 'D',
    title: 'Consent & Privacy Notice Frameworks',
    short:
      'Support the review and development of consent mechanisms, privacy notices and related operational processes.',
    outcome: 'Notices people can actually read, and consent that can be evidenced purpose by purpose.',
    icon: 'consent',
    problem:
      'Notices are often long, legally defensive and identical across channels, while consent is captured as a single acceptance buried in terms of use. Both are difficult to reconcile with a requirement for specific, informed consent tied to a stated purpose.',
    why:
      'Notice and consent sit at the front of the data lifecycle and are the most visible part of a privacy programme — to Data Principals, to the Board and to commercial partners. Rule 3 sets out what a notice must contain and how it must be presented, including availability in the languages of the Eighth Schedule on request. Rule 4 and the Consent Manager framework raise the bar on how consent is captured and withdrawn.',
    challenges: [
      'Consent bundled into terms and conditions or pre-ticked by default.',
      'One notice covering many purposes and channels, updated without version control.',
      'Withdrawal routes that exist in policy but not in product.',
      'Marketing and analytics consent indistinguishable from service-delivery consent.',
    ],
    approach: [
      'Review every collection point across web, app, retail, call centre and partner channels and map the notice and consent actually experienced by a user.',
      'Redesign notices as layered, purpose-specific documents with plain-language summaries.',
      'Design consent capture as an affirmative, purpose-level, logged action, with withdrawal as accessible as grant.',
      'Define the architecture that connects consent state to downstream systems.',
      'Draft the operational procedures: version control, change management, and the evidence trail for both consent and notice delivery.',
    ],
    deliverables: [
      'Notice and consent inventory across channels.',
      'Redrafted notice suite with plain-language layers.',
      'Consent capture and withdrawal design specification.',
      'Consent artefact and audit-trail requirements.',
      'Notice change-control and versioning procedure.',
    ],
    outcomes: [
      'Notices that state purpose, data, rights and withdrawal clearly enough to be understood.',
      'Consent records that can be produced and attributed to a specific purpose and version.',
      'Fewer complaints about communications and clearer downstream preference states.',
    ],
    faq: [
      {
        q: 'Do we need to offer notices in all twenty-two languages?',
        a: 'Rule 3 requires the notice to be available in English and, on request, in any of the languages listed in the Eighth Schedule to the Constitution. In practice that means a fulfilment route for requests, with the languages prioritised against your Data Principal population.',
      },
      {
        q: 'Will a Consent Manager replace our own consent flows?',
        a: 'Consent Managers are registered intermediaries that let a Data Principal manage consent across fiduciaries. They do not remove your obligations to obtain, record and honour consent. The practical requirement is that your architecture can interoperate credibly.',
      },
    ],
  },
  {
    slug: 'data-principal-rights-management',
    letter: 'E',
    title: 'Data Principal Rights Management',
    short:
      'Support the design of processes for handling requests relating to access, correction, erasure, grievance redressal and other applicable rights.',
    outcome: 'A rights process that meets the prescribed timelines without swamping your operations team.',
    icon: 'rights',
    problem:
      'Rights requests arrive through any channel, addressed to anyone, in any format. Without a single intake and a clear owner, they are answered late, inconsistently, or not at all — and the organisation cannot show what it did.',
    why:
      'The Act gives Data Principals rights to information, correction and erasure, grievance redressal and nomination, with Rule 14 prescribing procedure and a maximum response period of ninety days. Rights handling is also the obligation most likely to generate a complaint to the Board, because it is the one Data Principals exercise directly.',
    challenges: [
      'Requests scattered across support, sales, HR and social media inboxes.',
      'No reliable way to locate all data relating to one individual across systems.',
      'Identity verification that either over-collects or is trivially bypassed.',
      'No agreed position on erasure from backups, archives and processor systems.',
    ],
    approach: [
      'Design a single intake with channel adapters, so every request lands in one tracked queue.',
      'Define verification proportionate to request type and sensitivity.',
      'Build request playbooks: search instructions per system, decision trees, templates and escalation.',
      'Agree and document the erasure position, including exceptions for legal retention and backups.',
      'Set service levels and management reporting so ageing is visible before it becomes a complaint.',
    ],
    deliverables: [
      'Rights fulfilment procedure with per-right playbooks.',
      'Intake, tracker and ageing dashboard specification.',
      'Search instructions per system of record.',
      'Response templates in plain language.',
      'Erasure standard including backups, archives and processor copies.',
    ],
    outcomes: [
      'Requests answered within prescribed timelines, with evidence of how they were handled.',
      'Predictable effort instead of ad hoc firefighting.',
      'A complaint-ready record of every request and its resolution.',
    ],
    faq: [
      {
        q: 'What is the response timeline?',
        a: 'Rule 14 prescribes a maximum period of ninety days from receipt of a request for the relevant rights procedures. That is an outer limit; internal service levels should be much shorter so that verification and search time is absorbed well inside it.',
      },
      {
        q: 'Can we refuse a request?',
        a: 'The Act contains exemptions and grounds on which processing may continue — for example where retention is required by law. Refusals should be reasoned, documented and consistent, and taken with legal input. We help design the decision framework; we do not provide legal opinions.',
      },
    ],
  },
  {
    slug: 'third-party-privacy-risk-management',
    letter: 'F',
    title: 'Third-Party Data Privacy Risk Management',
    short:
      'Help organisations understand personal data shared with vendors, processors and business partners, and establish appropriate oversight and safeguards.',
    outcome: 'Visibility and enforceable safeguards over personal data that leaves your perimeter.',
    icon: 'network',
    problem:
      'Personal data moves beyond an organisation’s immediate boundaries constantly — into cloud platforms, analytics tools, payroll providers, contact centres, logistics partners, marketing agencies and group affiliates. Each relationship is a commercial decision; only some are treated as a privacy decision.',
    why:
      'Under the Act, a Data Fiduciary may engage a Data Processor only under a valid contract and remains responsible for compliance in respect of that processing. The practical consequence is that your vendor estate becomes part of your compliance perimeter, whether or not it appears in your registers. Third-party processing is also where most breach exposure originates, because you cannot protect what you cannot see.',
    challenges: [
      'Personal data shared informally with partners, resellers and agencies outside procurement.',
      'Contracts with no purpose limitation, breach-escalation clock or deletion commitment.',
      'Sub-processors engaged without notice, and offshore locations undocumented.',
      'Due diligence performed once at onboarding and never repeated.',
      'No single list of which vendors touch which categories of personal data.',
    ],
    approach: [
      'Build a processor and third-party register tied to the data mapping: who touches what, for which purpose, on what basis.',
      'Classify relationships by data sensitivity, volume, access level and downstream reliance.',
      'Refresh contractual safeguards: purpose limitation, security obligations, sub-processor approval, breach escalation, audit and information rights, return and deletion, and assistance with Data Principal requests.',
      'Set a due-diligence and ongoing oversight cadence proportionate to inherent risk.',
      'Design the exit path: what happens to the data when the relationship ends, and how deletion is evidenced.',
      'Establish visibility over downstream flows, including onward transfers and offshore processing.',
    ],
    deliverables: [
      'Processor and third-party register with risk classification.',
      'Contract clause library and gap analysis against existing agreements.',
      'Due-diligence questionnaire and scoring model.',
      'Ongoing oversight and review calendar.',
      'Breach escalation and notification protocol for processors.',
      'Exit, return and deletion checklist.',
    ],
    outcomes: [
      'A complete, owned view of where personal data goes and who holds it.',
      'Contractual safeguards that can actually be enforced during an incident.',
      'Procurement decisions that account for privacy risk before signature.',
    ],
    faq: [
      {
        q: 'Is a vendor a processor or a fiduciary?',
        a: 'It depends on the relationship. A payroll provider acting on your documented instructions is typically a processor; a partner that decides how to use the data for its own purposes may be a fiduciary in its own right, which changes the risk and the contractual position. Classification should be documented relationship by relationship.',
      },
      {
        q: 'How many vendors do we need to review?',
        a: 'All relationships that touch personal data should be on the register, but depth should follow risk. We typically recommend tiers: full assessment for high-risk processors, a structured questionnaire for the middle, and attestation-based confirmation for the long tail.',
      },
    ],
  },
  {
    slug: 'data-retention-and-erasure',
    letter: 'G',
    title: 'Data Retention & Erasure',
    short:
      'Support the development of data retention schedules, deletion processes and governance mechanisms.',
    outcome: 'Data kept because there is a reason, for as long as there is a reason — and deleted when there is not.',
    icon: 'retention',
    problem:
      'Retention is rarely a decision. It is the accumulated default of systems that were never asked to forget. The result is personal data held indefinitely, replicated into backups, exports and vendor platforms, protected and disclosable long after its purpose has passed.',
    why:
      'The Act requires erasure once the purpose is no longer served and retention is no longer required by law. Rule 8 and the Third Schedule address retention expectations and provide for advance notice to Data Principals before scheduled erasure, and the Seventh Schedule addresses minimum retention of data and associated logs. Sectoral rules — tax, financial services, health, employment — continue to run in parallel, so a retention programme has to reconcile several clocks.',
    challenges: [
      'No retention schedule, or one expressed in document types rather than purposes and systems.',
      'Deletion that is manual, partial and untested.',
      'Fear that deleting data will break reporting, audit or analytics.',
      'Backups, archives and processor copies excluded from scope.',
      'Conflicting retention duties across sectoral requirements.',
    ],
    approach: [
      'Derive retention periods purpose by purpose and system by system, reconciling legal requirements and sectoral duties.',
      'Distinguish active retention, archival retention and legal hold.',
      'Design deletion execution: automated where possible, evidenced everywhere.',
      'Address bounded exceptions — back-ups, immutable stores, litigation holds — explicitly rather than by omission.',
      'Design the advance-notice workflow for scheduled erasure where it applies.',
      'Set review cadence so schedules stay aligned as requirements change.',
    ],
    deliverables: [
      'Retention schedule mapped to the processing inventory.',
      'Deletion runbook including backups, archives and processors.',
      'Legal hold and exception process.',
      'Advance-notice workflow and templates where applicable.',
      'Deletion evidence logging and periodic assurance process.',
    ],
    outcomes: [
      'A reduced data estate, which reduces both risk and cost.',
      'Defensible answers to “why is this still here?”',
      'Deletion that can be demonstrated rather than asserted.',
    ],
    faq: [
      {
        q: 'Can we delete everything on a fixed cycle?',
        a: 'A single blanket period is rarely defensible in either direction — it deletes what you are required to keep and keeps what you should delete. Periods should follow purpose and legal requirement, which is why the schedule is built from the processing inventory.',
      },
      {
        q: 'What about backups?',
        a: 'Practical erasure in backups is usually achieved by rolling expiry plus documented suppression during restore. The important step is deciding and recording the position, including how a restore would honour an erasure request, rather than leaving it unaddressed.',
      },
    ],
  },
  {
    slug: 'personal-data-breach-management',
    letter: 'H',
    title: 'Personal Data Breach Management',
    short:
      'Support incident response frameworks, escalation procedures, documentation and applicable notification processes.',
    outcome: 'A tested response that meets reporting expectations under pressure.',
    icon: 'shield',
    problem:
      'Most organisations have a security incident process. Few can reliably answer, at two in the morning, whether an incident is a personal data breach, who declares it, what must be reported, to whom, by when and in what form.',
    why:
      'The Act requires intimation of a personal data breach to the Board and to each affected Data Principal, and Rule 7 prescribes the content and manner, including plain-language communication to individuals. Failure to notify carries its own penalty entry in the Schedule, separate from the security-safeguards entry. Notification quality is also one of the factors the Board may weigh when deciding on penalties.',
    challenges: [
      'No shared definition of “personal data breach” and no agreed point at which the clock starts.',
      'Incident severity models built for availability, not for privacy harm.',
      'Notification content drafted by lawyers for regulators, not by anyone for affected individuals.',
      'Processor breaches that surface late, or never.',
      'No record of past incidents and decisions, which weakens every future response.',
    ],
    approach: [
      'Define personal data breach, the point of awareness and the declaration authority in plain terms.',
      'Extend the severity matrix so privacy impact is scored alongside operational impact.',
      'Build a notification pack: Board report content, individual intimation templates in plain language, and approval flow.',
      'Set processor breach-escalation obligations and test them.',
      'Run a tabletop exercise with legal, security, communications and business owners, then fix what breaks.',
      'Design the incident log and post-incident review so patterns become programme improvements.',
    ],
    deliverables: [
      'Breach response playbook with roles and decision trees.',
      'Severity and reportability matrix.',
      'Board and individual notification templates and approval workflow.',
      'Processor escalation protocol and contract wording.',
      'Tabletop exercise and findings report.',
      'Incident log and post-incident review template.',
    ],
    outcomes: [
      'Faster, calmer and more consistent response.',
      'Notifications that are timely, accurate and understandable.',
      'Evidence that reasonable steps were in place before and after the event.',
    ],
    faq: [
      {
        q: 'What is the reporting window?',
        a: 'Rule 7 requires intimation to affected Data Principals without delay and a detailed report to the Board in the prescribed form and manner. Practitioner guidance frequently works to seventy-two hours for the Board report. Confirm the current requirement against the notified Rule and any Board guidance before you fix internal clocks.',
      },
      {
        q: 'Do we report every incident?',
        a: 'The obligation attaches to personal data breaches. Whether a given event is one requires a documented, reasoned assessment — which is precisely why the reportability matrix and decision log matter.',
      },
    ],
  },
  {
    slug: 'privacy-policies-procedures-and-controls',
    letter: 'I',
    title: 'Privacy Policies, Procedures & Controls',
    short:
      'Support the development and review of privacy-related policies, procedures, operating models and controls.',
    outcome: 'A policy set that maps to obligations, and controls that produce evidence.',
    icon: 'document',
    problem:
      'Many organisations hold a privacy policy that is really a public notice, and very little else. Operational staff have no procedure to follow, and control owners have no way to show that an obligation is being met.',
    why:
      'Obligations are met through repeatable procedures and evidenced controls, not through statements of intent. When conduct is examined, what matters is whether a documented process existed, whether it was followed and whether it was reviewed.',
    challenges: [
      'Policy documents that restate the law without describing internal behaviour.',
      'Duplicate, overlapping or contradictory procedures across functions.',
      'Controls defined by security teams that do not address privacy-specific obligations.',
      'No testing, no evidence and no review cycle.',
    ],
    approach: [
      'Map every applicable obligation to a policy, a procedure and a control owner.',
      'Separate the public-facing privacy notice from internal policy — they serve different readers.',
      'Write procedures as instructions a competent person can follow, with named roles and records produced.',
      'Define control testing: what is tested, how often, by whom and what evidence is retained.',
      'Set a review and change-control cycle tied to regulatory movement.',
    ],
    deliverables: [
      'Obligation-to-policy-to-control mapping.',
      'Drafted or redrafted core policies and procedures.',
      'Control register with owners, frequency and evidence requirements.',
      'Control testing plan and evidence templates.',
      'Policy review and change-control calendar.',
    ],
    outcomes: [
      'Staff know what to do, in what order, and what to record.',
      'Audit and assurance activity has something concrete to test.',
      'Policy maintenance becomes routine rather than a biennial rewrite.',
    ],
    faq: [
      {
        q: 'How many policies do we need?',
        a: 'Fewer than most drafts contain, but each one has to be used. A workable structure is a short set of principles, a standard per obligation area, procedures where work actually happens, and records that evidence execution.',
      },
      {
        q: 'Can you align this with ISO 27001 or ISO 27701 work we already have?',
        a: 'Yes. Where an existing management system is in place, we map privacy obligations onto it rather than creating a parallel structure, and identify the privacy-specific controls it does not cover.',
      },
    ],
  },
  {
    slug: 'privacy-awareness-and-enablement',
    letter: 'J',
    title: 'Privacy Awareness & Organisational Enablement',
    short:
      'Help organisations build privacy awareness and integrate data protection responsibilities into business operations.',
    outcome: 'Privacy decisions made correctly at the point of work, not escalated to a central team.',
    icon: 'people',
    problem:
      'A central privacy team cannot attend every product launch, procurement decision and campaign brief. If the people closest to the data do not recognise a privacy question when they see one, the central team becomes a bottleneck and requests arrive after decisions are already made.',
    why:
      'Every obligation in the framework depends on someone recognising that an action has a privacy consequence. Enablement is the difference between a programme that scales through design and one that scales by hiring.',
    challenges: [
      'Generic annual training that nobody retains and nothing measures.',
      'Product, marketing and procurement teams unaware of privacy gates.',
      'No practical guidance for common decisions such as a new tool, a new campaign or a data request.',
      'Uncertainty about who to ask, and fear of asking.',
    ],
    approach: [
      'Target the roles that make privacy-relevant decisions rather than training everyone identically.',
      'Write scenario-based modules drawn from the organisation’s own processes.',
      'Build job aids: checklists for new vendors, campaigns, features and data requests.',
      'Establish a privacy champions network with a defined remit and a route into governance.',
      'Measure recognition and outcomes — escalation quality, gate compliance — rather than completion rates alone.',
    ],
    deliverables: [
      'Role-based awareness curriculum.',
      'Scenario modules and job aids for product, procurement, marketing and HR.',
      'Privacy champions terms of reference and operating rhythm.',
      'Onboarding and refresher content.',
      'Awareness measurement framework.',
    ],
    outcomes: [
      'Privacy questions raised earlier, when they are cheap to resolve.',
      'Fewer late-stage redesigns caused by missed obligations.',
      'A distributed capability instead of a single point of dependency.',
    ],
    faq: [
      {
        q: 'Is training mandatory under the Act?',
        a: 'The Act does not prescribe a general staff-training programme as such. Awareness forms part of taking reasonable safeguards and of demonstrating accountability in practice, and it is expected in most assurance frameworks. We frame enablement as good practice with a compliance benefit rather than as a statutory box.',
      },
      {
        q: 'How do we reach a distributed or frontline workforce?',
        a: 'Short, role-specific content delivered in the flow of work — a two-minute decision aid at the point of escalation usually outperforms a forty-minute annual module.',
      },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
