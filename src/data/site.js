/**
 * Site-wide configuration and brand constants.
 * Values that are NOT yet supplied by the client are kept as clearly-marked
 * placeholders and are also listed in README.md ("Configuration required").
 * Nothing here invents credentials, client names, awards or statistics.
 */

export const brand = {
  name: 'DataSattva',
  tagline: 'The clearer side of data.',
  positioning:
    'DataSattva helps organisations understand, assess and address the core elements of the DPDP Act and Rules through practical privacy advisory, readiness assessments, governance frameworks and implementation support.',
  descriptor: 'Data privacy & DPDP advisory',
};

/** @type {{email:string, phone:string|null, office:string, linkedin:string|null, formInboxHint:string}} */
export const contact = {
  // PLACEHOLDER — reserved .example domain. Replace via DS_CONTACT_EMAIL at build time.
  email: process.env.DS_CONTACT_EMAIL || 'contact@datasattva.example',
  // Not supplied — left blank so no fabricated number is published.
  phone: process.env.DS_CONTACT_PHONE || '',
  office: process.env.DS_OFFICE || 'Bengaluru, India',
  linkedin: process.env.DS_LINKEDIN || '',
  formInboxHint:
    'Enquiries submitted through this form are routed to the DataSattva team inbox. Do not include confidential documents or special-category information in the message field.',
};

export const legalEntityPlaceholder = '[Legal entity name to be confirmed]';

/* `short` is used in the header at narrower desktop widths so the full label
   set fits without collapsing to the mobile menu. */
export const nav = [
  { label: 'Home', short: 'Home', href: '/' },
  { label: 'About DataSattva', short: 'About', href: '/about/' },
  { label: 'DPDP Act & Rules', short: 'DPDP Act', href: '/dpdp-act-and-rules/' },
  { label: 'Advisory Services', short: 'Services', href: '/services/' },
  { label: 'Readiness Assessment', short: 'Assessment', href: '/readiness-assessment/' },
  { label: 'Insights', short: 'Insights', href: '/insights/' },
  { label: 'Contact Us', short: 'Contact', href: '/contact/' },
];

export const headerCta = {
  label: 'Take the 3-Minute Assessment',
  href: '/readiness-assessment/#start',
  shortLabel: '3-Minute Assessment',
};

export const footer = {
  blurb:
    'Independent data privacy and DPDP advisory. We help organisations turn regulatory text into workable governance, processes and controls.',
  columns: [
    {
      title: 'Advisory',
      links: [
        { label: 'DPDP Applicability & Readiness', href: '/services/dpdp-applicability-and-readiness/' },
        { label: 'Governance & Framework', href: '/services/privacy-governance-and-framework/' },
        { label: 'Data Mapping & RoPA', href: '/services/data-mapping-and-records-of-processing/' },
        { label: 'Consent & Privacy Notices', href: '/services/consent-and-privacy-notice-frameworks/' },
        { label: 'Data Principal Rights', href: '/services/data-principal-rights-management/' },
        { label: 'All services', href: '/services/' },
      ],
    },
    {
      title: 'Knowledge',
      links: [
        { label: 'DPDP Act & Rules', href: '/dpdp-act-and-rules/' },
        { label: 'Implementation roadmap', href: '/dpdp-act-and-rules/#implementation-framework' },
        { label: 'Implementation challenges', href: '/dpdp-act-and-rules/#challenges' },
        { label: 'Insights', href: '/insights/' },
        { label: 'Glossary of DPDP terms', href: '/dpdp-act-and-rules/#glossary' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About DataSattva', href: '/about/' },
        { label: 'Readiness Assessment', href: '/readiness-assessment/' },
        { label: 'Contact Us', href: '/contact/' },
        { label: 'Website privacy notice', href: '/privacy/' },
        { label: 'Terms & disclaimers', href: '/terms/' },
      ],
    },
  ],
  disclaimer:
    'DataSattva provides data privacy advisory, assessment and implementation support. We are not a law firm, a regulator or a statutory authority, and our services do not constitute legal advice or a legal opinion. Regulatory content on this website is provided for general information and reflects our reading of the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 as in force on the date of publication.',
};

export const org = {
  legalName: 'DataSattva',
  url: process.env.SITE_URL || 'https://www.datasattva.example',
  areaServed: 'India',
  description:
    'Data privacy and DPDP advisory for organisations in India and organisations outside India processing personal data relating to individuals in India.',
};

/** Shared CTA copy so messaging stays consistent across pages. */
export const ctas = {
  assessment: { label: 'Take the 3-Minute DPDP Readiness Assessment', href: '/readiness-assessment/#start' },
  assessmentShort: { label: 'Start Your Free Assessment', href: '/readiness-assessment/#start' },
  services: { label: 'Explore Our Advisory Services', href: '/services/' },
  contact: { label: 'Reach Out to DataSattva', href: '/contact/' },
  talk: { label: 'Reach Out to the DataSattva Team to Explore the Next Step', href: '/contact/' },
};

/** Regulatory currency stamp shown on knowledge pages. */
export const regulatoryStatus = {
  verifiedOn: '4 November 2026',
  act: 'Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)',
  rules: 'Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E), 13 November 2025)',
  commencement: 'G.S.R. 843(E), 13 November 2025',
  note:
    'Statutory positions stated on this website were checked against the Gazette notifications and MeitY publications listed in the sources panel. Regulatory positions change; confirm the current position before relying on this material for a decision.',
};
