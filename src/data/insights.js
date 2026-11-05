/**
 * Insights content. Entries are authored here and rendered at build time, so
 * new articles can be added by appending an object and rebuilding.
 *
 * IMPORTANT — content status:
 * Every article below is marked `draft: true`. They exist to demonstrate the
 * editorial layout, category taxonomy and long-form treatment, and are visibly
 * labelled in the interface as draft content pending editorial sign-off.
 * No author, publication date, statistic, client reference or quotation has
 * been invented. Regulatory statements are limited to provisions that can be
 * checked against the notified Act and Rules. Replace `author` and `date` when
 * the client supplies real editorial details, then set `draft: false`.
 */

export const insightCategories = [
  { slug: 'dpdp-act-rules', label: 'DPDP Act & Rules' },
  { slug: 'privacy-governance', label: 'Privacy Governance' },
  { slug: 'data-protection', label: 'Data Protection' },
  { slug: 'third-party-risk', label: 'Third-Party Risk' },
  { slug: 'consent-management', label: 'Consent Management' },
  { slug: 'implementation', label: 'Data Privacy Implementation' },
  { slug: 'privacy-technology', label: 'Privacy & Technology' },
];

export const insights = [
  {
    slug: 'dpdp-applicability-questions-for-indian-organisations',
    title: 'Applicability under the DPDP Act: the questions to answer before anything else',
    category: 'dpdp-act-rules',
    draft: true,
    author: null,
    date: null,
    readingTime: '7 min read',
    excerpt:
      'Applicability sounds like a single legal question. In practice it is a set of decisions about data, geography, form and role — and each one changes what the programme has to build.',
    lede:
      'Before a governance structure, before a notice rewrite, the first useful output of a DPDP programme is a documented position on scope. Not a legal opinion — a shared, reasoned understanding of what the organisation processes, where the individuals are, and which obligations attach.',
    blocks: [
      {
        type: 'p',
        text: 'The Digital Personal Data Protection Act, 2023 applies to the processing of digital personal data. That short sentence expands into several practical questions, and teams that skip them usually end up building for the wrong perimeter: rewriting notices for a website while an outsourced contact centre quietly processes a far larger data set, or deferring work on the assumption that a foreign parent is the responsible entity.',
      },
      { type: 'h2', text: '1. Is the data digital, or has it become digital?' },
      {
        type: 'p',
        text: 'The Act is framed around digital personal data. Personal data collected in non-digital form is drawn in once it is digitised — a paper enrolment form scanned into a workflow, or a physical patient record indexed into a system. The practical consequence is that “we keep that on paper” is only a stable answer while the paper stays paper.',
      },
      { type: 'h2', text: '2. Whose data is it, and where are they?' },
      {
        type: 'p',
        text: 'Processing within India is covered. So is processing outside India where it relates to offering goods or services to Data Principals in India. That second limb is the one that most often catches organisations by surprise, because “offering goods or services” is a question of conduct, not of incorporation: a local sales team, India-specific pricing, an India-facing app store listing or an India support line all bear on the analysis. A foreign entity with Indian users but no Indian establishment still needs its own answer.',
      },
      { type: 'h2', text: '3. Who is the Data Fiduciary?' },
      {
        type: 'p',
        text: 'The Data Fiduciary determines the purpose and means of processing. Inside a group, that can be several entities for different activities, and inside one entity it can be several functions for different data sets. The question that matters operationally is not only “which legal entity” but “who decides why this data is processed, and who can be asked to evidence it”. A useful test is to pick three data sets — customer, employee and vendor contact data — and ask which entity decides the purpose of each.',
      },
      { type: 'h2', text: '4. Which obligations attach, and from when?' },
      {
        type: 'p',
        text: 'The Act and the Rules commence in stages. Framework and regulator provisions came into force on publication; Consent Manager registration follows at one year; the substantive obligations — notice, consent, rights, security, breach intimation, retention, children’s data, Significant Data Fiduciary duties and cross-border restrictions — come into force at eighteen months. A programme plan that assumes everything applies from a single date will mis-sequence its work and mis-state its status to the board.',
      },
      {
        type: 'callout',
        title: 'A caution on dates',
        text: 'MeitY consulted in January 2026 on compressing the eighteen-month stage to twelve months. No amending commencement notification had been published at the time of writing, so the Gazette date stands. Plan to the notified date; hold the compression as a risk.',
      },
      { type: 'h2', text: 'What a documented applicability position contains' },
      {
        type: 'ul',
        items: [
          'The data sets in scope, and those deliberately excluded with reasons.',
          'The individuals concerned, and where they are located.',
          'The role taken for each activity — fiduciary, processor or neither.',
          'The obligations that attach, mapped to their commencement dates.',
          'The decisions still open, with an owner and a date for each.',
        ],
      },
      {
        type: 'p',
        text: 'The value of writing this down is not bureaucratic. It is the difference between a programme that can defend a scope decision two years later and one that has to reconstruct its own reasoning from email.',
      },
    ],
  },
  {
    slug: 'dpdp-rules-2025-staged-commencement-what-it-means',
    title: 'The DPDP Rules, 2025 commence in three stages. Here is what that means for planning',
    category: 'dpdp-act-rules',
    draft: true,
    author: null,
    date: null,
    readingTime: '6 min read',
    excerpt:
      'The most common programme error is treating the DPDP framework as a single deadline. The gazetted commencement is staged, and the sequencing is a gift if you use it.',
    lede:
      'The Rules were notified on 13 November 2025 under G.S.R. 846(E). Rule 1 does not bring them all into force at once. Understanding the three stages turns an intimidating wall of obligations into a workable order of operations.',
    blocks: [
      {
        type: 'h2',
        text: 'Stage one — framework and regulator',
      },
      {
        type: 'p',
        text: 'Rules 1, 2 and 17 to 21 came into force on publication, alongside the Act’s definitions and the provisions establishing the Data Protection Board of India. Nothing new lands on most organisations operationally. What changes is that an authority now exists with the machinery to inquire into breaches and impose penalties, and the procedural route through which it will do so.',
      },
      {
        type: 'p',
        text: 'The practical implication is evidential. Documents, registers and minutes created in the ordinary course from this point forward are the material that demonstrates good faith later. Retrospective reconstruction after an incident is always weaker.',
      },
      { type: 'h2', text: 'Stage two — Consent Manager registration' },
      {
        type: 'p',
        text: 'Rule 4 and the First Schedule come into force one year after publication, alongside section 6(9) and section 27(1)(d). This opens registration for entities seeking to operate as Consent Managers. Most organisations will not become one. The practical question is whether your consent architecture — purpose-level, revocable, logged, interoperable in principle — would hold up alongside a Consent Manager.',
      },
      { type: 'h2', text: 'Stage three — the substantive core' },
      {
        type: 'p',
        text: 'Rules 3, 5 to 16 and 22 to 23, together with the remaining substantive sections of the Act, come into force eighteen months after publication. This is where notice content, security safeguards, breach intimation, retention and erasure, published contacts, children’s data, Significant Data Fiduciary obligations, Data Principal rights and cross-border restrictions all switch on together.',
      },
      {
        type: 'p',
        text: 'The sequencing advice that follows is straightforward: treat stage three as the build deadline and work backwards from the hardest dependencies. Consent notices depend on the processing inventory. Rights fulfilment depends on the inventory and on an erasure position. Breach notification depends on a defined declaration authority. Security safeguards depend on an evidence pack. None of those can be compressed into the final quarter.',
      },
      {
        type: 'callout',
        title: 'What to put in front of the board',
        text: 'Not a compliance countdown. A short statement of the obligations that will apply, the two or three capabilities that take longest to build, the decisions required from the board, and the evidence that will exist at each milestone.',
      },
      { type: 'h2', text: 'Two orders of work that fail' },
      {
        type: 'ul',
        items: [
          'Policy-first: rewriting documents before knowing what data exists, then discovering the documents describe a business that does not exist.',
          'Tool-first: buying a privacy platform before agreeing purposes, owners and process, then using ten per cent of it while paying for the whole.',
        ],
      },
      {
        type: 'p',
        text: 'A more resilient order is scope, then discovery, then accountability, then notices and rights, then vendor and security evidence, with retention and assurance running across the whole sequence.',
      },
    ],
  },
  {
    slug: 'building-a-processing-inventory-that-survives-contact',
    title: 'Building a processing inventory that survives contact with the business',
    category: 'implementation',
    draft: true,
    author: null,
    date: null,
    readingTime: '8 min read',
    excerpt:
      'Most records-of-processing exercises produce a large spreadsheet, one round of engagement and a slow decay. The design choices that prevent that are made in the first week.',
    lede:
      'Every control in a privacy programme is downstream of the inventory. Notices describe it, consent scopes to it, rights requests search it, retention schedules apply to it, and breach scoping depends on it. Which is why an inventory that nobody maintains is worse than an obviously incomplete one: it invites false confidence.',
    blocks: [
      { type: 'h2', text: 'Start from processes, not from systems' },
      {
        type: 'p',
        text: 'An inventory organised around systems tells you what technology holds. An inventory organised around processes tells you why. Start with the business process and the customer or employee journey, then reconcile to the systems and vendors that support it. Function owners can describe a process. They cannot reliably describe a data architecture, and they should not be asked to.',
      },
      { type: 'h2', text: 'Collect only what changes a decision' },
      {
        type: 'p',
        text: 'The temptation is to design a comprehensive schema and then fail to populate it. A register is useful when each field earns its place: the purpose, the categories of data, the groups of individuals, the ground for processing, the systems, the recipients, the locations, the retention period and the owner. Anything beyond that should have to justify itself against a specific obligation.',
      },
      {
        type: 'callout',
        title: 'The one field teams skip',
        text: 'The ground for processing. Consenting to a purpose is not the same as processing under a section 7 legitimate use, and the evidence you keep differs entirely. Tag each activity at the point of entry, not in a later exercise.',
      },
      { type: 'h2', text: 'Reconcile three sources of truth' },
      {
        type: 'ul',
        items: [
          'What business owners say happens (workshops and process maps).',
          'What systems show (data dictionaries, export lists, integration maps, access reviews).',
          'What contracts say (purpose limitation, sub-processors, locations, deletion commitments).',
        ],
      },
      {
        type: 'p',
        text: 'Where the three disagree, you have found something more valuable than a completed row: a real gap, either in practice or in the contract. Both are worth fixing before an incident raises the question for you.',
      },
      { type: 'h2', text: 'Design for maintenance from day one' },
      {
        type: 'p',
        text: 'An inventory decays at the speed of change. The practical measures are unglamorous: a named owner per processing activity, a review cadence that matches how often the area changes, a trigger in the change and procurement processes that forces an update, and a version history. Without a trigger, the register is accurate only on the day it was signed off.',
      },
      {
        type: 'p',
        text: 'One useful discipline is to make the register the source of truth for something the business needs anyway — a vendor onboarding form, a data-sharing approval, a retention decision. Registers that only serve compliance are maintained only under duress.',
      },
    ],
  },
  {
    slug: 'third-party-privacy-risk-beyond-the-vendor-list',
    title: 'Third-party privacy risk is not a vendor list. It is an oversight capability',
    category: 'third-party-risk',
    draft: true,
    author: null,
    date: null,
    readingTime: '7 min read',
    excerpt:
      'A Fiduciary remains responsible for processing it did not perform. That single proposition turns procurement and vendor governance into privacy controls.',
    lede:
      'Ask a leadership team how many third parties process personal data on their behalf and the answer is usually too low. Ask whether those contracts contain an enforceable breach-escalation obligation and the answer is usually unknown. The distance between those two answers is the third-party risk problem.',
    blocks: [
      { type: 'h2', text: 'Why the perimeter is bigger than it looks' },
      {
        type: 'p',
        text: 'Personal data leaves an organisation in ordinary commercial activity: cloud hosting, analytics, CRM, payroll, background verification, contact centres, logistics, collections, marketing agencies, group shared services. Each is a legitimate business relationship. The privacy question is not whether a vendor receives data — it is whether the purpose, the safeguards and the exit have all been defined and can be evidenced.',
      },
      { type: 'h2', text: 'Processor or fiduciary? Ask about purpose' },
      {
        type: 'p',
        text: 'The distinction turns on who determines purpose and means. A payroll provider acting on documented instructions is typically a processor. A partner that uses shared customer data to build its own products may be determining purpose itself. The classification drives the contract, the oversight and the risk allocation, and it should be recorded relationship by relationship rather than assumed from a template.',
      },
      {
        type: 'callout',
        title: 'Field-tested check',
        text: 'For each vendor, ask two questions: what is the documented purpose they may process data for, and who would tell them to stop? If the second answer is unclear, oversight is nominal.',
      },
      { type: 'h2', text: 'The contractual terms that matter during an incident' },
      {
        type: 'ul',
        items: [
          'Purpose limitation, with an explicit prohibition on use for the vendor’s own purposes.',
          'A breach-notification obligation with a clock short enough to let you meet your own.',
          'Sub-processor approval, with a current list and change notification.',
          'Security obligations expressed as standards, not aspirations.',
          'Audit or information rights proportionate to the data held.',
          'Assistance with Data Principal requests, with a stated turnaround.',
          'Return and deletion on exit, with evidence of deletion.',
          'Acknowledged locations of processing, including offshore support.',
        ],
      },
      { type: 'h2', text: 'Oversight has to be tiered and repeated' },
      {
        type: 'p',
        text: 'Reviewing five hundred vendors to the same depth is not feasible, and treating them all identically is not risk management either. Tier by data sensitivity, volume, access level and substitutability; apply full assessment to the top tier, a structured questionnaire to the middle, and attestation to the tail. Then repeat on a cadence, because a vendor’s data holdings change quietly.',
      },
      { type: 'h2', text: 'Make procurement the control point' },
      {
        type: 'p',
        text: 'The cheapest time to fix a third-party privacy obligation is before signature. A short set of questions in the procurement workflow — what personal data, for what purpose, where processed, which sub-processors, how long retained — prevents most of the backlog that privacy teams spend their year clearing.',
      },
    ],
  },
  {
    slug: 'consent-and-notice-redesign-where-to-start',
    title: 'Consent and notice redesign: start where the user experiences it',
    category: 'consent-management',
    draft: true,
    author: null,
    date: null,
    readingTime: '6 min read',
    excerpt:
      'A notice is not a document you publish. It is an experience at a collection point. Mapping those points before redrafting anything prevents a website-shaped solution to a channel-shaped problem.',
    lede:
      'Most organisations have one privacy policy and many collection points. The policy is what gets reviewed; the collection points are what the Data Principal actually encounters. Rule 3 addresses the second.',
    blocks: [
      { type: 'h2', text: 'Map the collection points first' },
      {
        type: 'p',
        text: 'Website forms, mobile onboarding, app permissions, retail sign-up, call centre scripts, partner referrals, event registrations, employee onboarding and vendor portals each capture personal data differently and display a different notice, if any. Before redrafting, build the inventory: what is collected here, what is shown to the person, what is recorded about their acceptance, and how they would withdraw.',
      },
      { type: 'h2', text: 'Separate the purposes, and mean it' },
      {
        type: 'p',
        text: 'Service delivery, account security, analytics, personalisation, marketing and third-party sharing are different purposes with different consequences for the individual. Bundling them into one acceptance produces a consent record that cannot answer the question a regulator will ask: what exactly did this person agree to, and when?',
      },
      {
        type: 'callout',
        title: 'A drafting test',
        text: 'Read the notice aloud to someone outside the legal team. If they cannot say what the organisation will do with their data, in what circumstances it will be shared, and how to stop, the notice is doing the wrong job.',
      },
      { type: 'h2', text: 'Make withdrawal as easy as grant' },
      {
        type: 'p',
        text: 'The requirement is symmetry, and it is where most implementations fail. A single consent screen at sign-up, followed by a withdrawal route buried in settings or available only by email, is asymmetric by design. The operational test is end-to-end: withdraw, then confirm the change reached marketing, analytics, the CRM and any processors acting on those purposes.',
      },
      { type: 'h2', text: 'Version everything' },
      {
        type: 'p',
        text: 'A notice you cannot reproduce as it appeared on a given date is a notice you cannot evidence. Store the notice text, the date it took effect, the language provided, and for each consent artefact the purpose, the notice version and the action taken. That record is the difference between a claim and a defence.',
      },
      {
        type: 'p',
        text: 'Finally, plan for language. Rule 3 requires availability in English and, on request, in the languages listed in the Eighth Schedule. That is a fulfilment capability, not a translation project: decide which languages your population needs, and how a request gets answered reliably within a stated period.',
      },
    ],
  },
  {
    slug: 'operationalising-data-principal-rights',
    title: 'Operationalising Data Principal rights without breaking the service desk',
    category: 'data-protection',
    draft: true,
    author: null,
    date: null,
    readingTime: '7 min read',
    excerpt:
      'Rights handling is the part of the framework individuals exercise directly. It is also the least tolerant of improvisation.',
    lede:
      'A rights request is a small operational event with a legal consequence. Handled well, it is a routine ticket. Handled badly, it is a late response, an inconsistent answer and, potentially, a complaint to the Board.',
    blocks: [
      { type: 'h2', text: 'One intake, many channels' },
      {
        type: 'p',
        text: 'Requests arrive wherever the individual happens to be: a support email, a sales contact, a social media message, a store, a call to an account manager, or a letter to the registered office. A single intake with channel adapters is not bureaucracy — it is the only way to know how many requests you have, how old they are, and whether the answer was consistent.',
      },
      { type: 'h2', text: 'Verify without over-collecting' },
      {
        type: 'p',
        text: 'Verification has to be strong enough to stop someone else obtaining an individual’s data, and light enough not to become a new collection exercise. The workable pattern is proportionate verification: existing authenticated channels for logged-in users, and a reasoned fallback for others, with the reasoning recorded per request type.',
      },
      { type: 'h2', text: 'Decide what erasure means before you are asked' },
      {
        type: 'callout',
        title: 'The question that stalls programmes',
        text: '“Delete my data” collides with statutory retention, audit obligations, litigation holds, backups and processor copies. Agree the position once, in writing, with legal input — including how a restore would honour an erasure — and apply it consistently.',
      },
      {
        type: 'p',
        text: 'The related decision is scope: which systems are searched for a given request type, and in what order. Without per-system search instructions, every request becomes an investigation, and the ninety-day outer limit in Rule 14 becomes the plan rather than the backstop.',
      },
      { type: 'h2', text: 'Measure the thing that matters' },
      {
        type: 'ul',
        items: [
          'Volume by request type and channel, to see where effort sits.',
          'Ageing against internal service levels, not only the statutory limit.',
          'Root causes, to feed back into design — most repeat requests point at a product or communication problem.',
          'Exceptions and refusals, with reasoned grounds, so consistency can be tested.',
        ],
      },
    ],
  },
  {
    slug: 'retention-schedules-from-purpose-to-deletion',
    title: 'From purpose to deletion: designing retention schedules that actually execute',
    category: 'privacy-governance',
    draft: true,
    author: null,
    date: null,
    readingTime: '6 min read',
    excerpt:
      'A retention schedule is a decision about purpose and law, an engineering plan for deletion, and an evidence trail. Most organisations produce only the first.',
    lede:
      'Personal data is retained by default because retention is the absence of a decision. The Act requires erasure once the purpose is no longer served and retention is no longer required by law — which means every retained data set needs a reason that can be stated.',
    blocks: [
      { type: 'h2', text: 'Derive periods, do not choose them' },
      {
        type: 'p',
        text: 'Retention periods come from three inputs: the purpose the data was collected for, the legal or sectoral requirement to keep it, and the risk of keeping it. A blanket period satisfies none of these. Done properly, the schedule follows the processing inventory and produces a per-activity period with a named justification.',
      },
      { type: 'h2', text: 'Separate active, archival and hold' },
      {
        type: 'ul',
        items: [
          'Active retention: data in operational systems, used for the stated purpose.',
          'Archival retention: data moved out of operational use but kept for a legal or evidential requirement.',
          'Legal hold: retention suspended from erasure because of an actual or anticipated dispute or investigation.',
        ],
      },
      {
        type: 'p',
        text: 'Confusing these three is why deletion programmes stall. Archival storage and holds are legitimate; they are simply narrower and better documented than “we keep everything just in case”.',
      },
      { type: 'h2', text: 'Engineer the deletion' },
      {
        type: 'p',
        text: 'Manual deletion does not scale and is rarely evidenced. Automate where the system allows, and where it does not, define a repeatable runbook with a named owner. Cover the places that get forgotten: exports, spreadsheets, staging environments, analytics extracts, ticketing attachments, mailboxes, and every vendor that holds a copy.',
      },
      {
        type: 'callout',
        title: 'Treat backups explicitly',
        text: 'Practical erasure in backups is usually achieved by rolling expiry combined with documented suppression during restore. What matters is that the position is decided and recorded, and that a restore test confirms it holds.',
      },
      { type: 'h2', text: 'Keep the evidence' },
      {
        type: 'p',
        text: 'Deletion that cannot be demonstrated is indistinguishable from deletion that did not happen. Log what was deleted, from where, when, by which process, and who approved exceptions. Review those logs periodically — a deletion job that has been silently failing for a year is a common discovery.',
      },
    ],
  },
  {
    slug: 'pseudonymisation-and-anonymisation-practical-limits',
    title: 'Anonymisation, pseudonymisation and the limits of “it is not personal data”',
    category: 'privacy-technology',
    draft: true,
    author: null,
    date: null,
    readingTime: '6 min read',
    excerpt:
      'Analytics, testing and model development are usually the reason teams ask whether data can be de-identified. The answer depends on re-identification risk in context, not on a technique name.',
    lede:
      'De-identification is often approached as a permission slip: if the data is no longer personal, the obligations fall away. That conclusion is defensible only when the risk of re-identification has been assessed against the actual data environment, not against the label applied to the data set.',
    blocks: [
      { type: 'h2', text: 'The distinction that matters' },
      {
        type: 'p',
        text: 'Pseudonymised data replaces direct identifiers with a key that still allows re-linkage. It reduces exposure in day-to-day use but the data remains linkable to an individual by whoever holds the key. Anonymisation aims at a state in which re-identification is not reasonably possible — and whether that has been achieved depends on the other data reasonably available, the population size, the granularity retained and the incentives of anyone who might attempt it.',
      },
      {
        type: 'callout',
        title: 'A practical test',
        text: 'State the scenario: who could attempt re-identification, with what other data, at what cost, and what would they gain? If that sentence cannot be completed honestly, the data set is probably still personal data in effect.',
      },
      { type: 'h2', text: 'Where teams get caught' },
      {
        type: 'ul',
        items: [
          'Free-text fields, notes and comments left untouched while structured fields are masked.',
          'Small populations where a combination of quasi-identifiers is effectively unique.',
          'Test environments populated from production with masking applied incompletely.',
          'Retention of the mapping key with weak access control — pseudonymisation that exists on paper only.',
          'Downstream vendor copies created before de-identification was applied.',
        ],
      },
      { type: 'h2', text: 'Document the assessment, not just the outcome' },
      {
        type: 'p',
        text: 'Where a team concludes that a data set is no longer personal data, that conclusion should be written down with the reasoning, the technique applied, the residual risk and the review trigger. This is also the natural home for a data protection impact assessment: the exercise is less about producing a document than about forcing the questions early enough that the answers can still change the design.',
      },
    ],
  },
];

export const getInsight = (slug) => insights.find((i) => i.slug === slug);
export const categoryLabel = (slug) => (insightCategories.find((c) => c.slug === slug) || {}).label || slug;
