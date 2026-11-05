import { pageHead, layout, pageHero } from '../lib/layout.js';
import { contact, org } from '../data/site.js';

const head = pageHead({
  title: 'Terms of Use & Disclaimers | DataSattva',
  description:
    'Terms governing use of the DataSattva website, the scope and limits of the DPDP readiness assessment, and the professional positioning of DataSattva’s advisory services.',
  path: '/terms/',
  noindex: true,
});

const content = `
${pageHero({
  eyebrow: 'Legal',
  title: 'Terms of use and disclaimers',
  lede: 'The basis on which this website and its free tools are provided, and a clear statement of what DataSattva does and does not do.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Terms & disclaimers' }],
  meta: `<span>Last updated: 4 November 2026</span><span aria-hidden="true">·</span><span>Status: draft pending legal review</span>`,
})}

<section class="section">
  <div class="container container-narrow">
    <div class="notice-strip">
      <span aria-hidden="true">!</span>
      <span><strong>Status.</strong> These terms are a working draft prepared alongside the website and should be reviewed by counsel before publication. Placeholders identify details that have not been supplied.</span>
    </div>

    <div class="prose">
      <h2>1. About this website</h2>
      <p>This website is published by DataSattva. By using it, you accept these terms. If you do not accept them, please do not use the site. The operator's legal identity and registered address are to be confirmed: <span class="small muted">[Legal entity details to be confirmed]</span>.</p>

      <h2>2. What DataSattva does</h2>
      <p>DataSattva provides data privacy advisory, assessment and implementation support, focused on India's Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025. Our work includes readiness assessments, governance framework development, data mapping, consent and notice design, rights process design, third-party risk management, retention design, breach response readiness, policy and control development, and organisational enablement.</p>

      <h2>3. What DataSattva does not do</h2>
      <ul>
        <li>We are not a law firm, and nothing on this website is legal advice or a legal opinion.</li>
        <li>We are not a regulator, a statutory authority, or an agent of any government body.</li>
        <li>We do not certify compliance, issue compliance certificates, or grant any form of regulatory approval.</li>
        <li>We do not guarantee any regulatory outcome, penalty outcome, audit outcome or commercial result.</li>
        <li>We do not hold ourselves out as endorsed, approved or accredited by MeitY, the Data Protection Board of India or any other authority.</li>
      </ul>
      <p>Where a question requires legal advice, we recommend that you obtain it from qualified counsel. Where our work touches a live regulatory position, we will say what we are relying on and recommend verification.</p>

      <h2>4. Regulatory information on this site</h2>
      <p>Regulatory content is provided for general information and reflects our reading of the Act and the Rules as in force on the date of publication, verified as stated on the relevant page. The framework commences in stages and is subject to amendment, notification and regulatory guidance. Before relying on any statement for a decision, confirm the current position against the Gazette notifications, the notified text and any guidance issued by the Data Protection Board of India.</p>
      <p>Where we are aware that a position is unsettled, subject to an unnotified proposal, or dependent on facts we do not have, we say so on the page rather than presenting it as settled.</p>

      <h2>5. The DPDP Readiness Assessment</h2>
      <p>The free readiness assessment is an indicative self-assessment tool. Specifically:</p>
      <ul>
        <li>It is based entirely on the answers you provide, without verification.</li>
        <li>It does not involve any review of your documentation, systems, contracts, notices or records.</li>
        <li>It does not constitute an audit, an assurance engagement, a legal opinion, a compliance evaluation or a certification.</li>
        <li>Its scoring model is published on the assessment page, and its limitations are stated there.</li>
        <li>It must not be represented to a regulator, a customer, an auditor or a board as evidence of compliance.</li>
      </ul>
      <p>The assessment runs in your browser. We do not receive or store your answers. A downloaded summary is generated locally by your browser.</p>

      <h2>6. No professional relationship</h2>
      <p>Nothing on this website, and no communication through the enquiry form, creates an advisory, fiduciary or professional relationship between you and DataSattva. An engagement begins only when a written scope of work is agreed and signed by both parties.</p>

      <h2>7. Accuracy and availability</h2>
      <p>We take care to keep content accurate and current, but we make no warranty that the site is complete, error-free or available without interruption. We may change, suspend or withdraw any part of the site, including the assessment, without notice. Links to third-party websites are provided for convenience; we do not control them and are not responsible for their content.</p>

      <h2>8. Intellectual property</h2>
      <p>The content, design, structure and code of this website belong to DataSattva unless otherwise indicated. You may read, print and share pages for your own internal business use with attribution. You may not republish, resell or create derivative works from the content without written permission, except for short quotations with clear attribution and a link to the source.</p>
      <p>References to legislation, regulation and official publications do not imply any ownership of, or affiliation with, the source material.</p>

      <h2>9. Limitation of liability</h2>
      <p>To the extent permitted by law, DataSattva is not liable for any loss arising from reliance on the general information published on this website or on the output of the free assessment. Liability in respect of a paid engagement is governed by the terms of that engagement.</p>

      <h2>10. Personal data</h2>
      <p>Our handling of personal data collected through this website is described in the <a href="/privacy/">website privacy notice</a>.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts at <span class="small muted">[jurisdiction to be confirmed]</span> have exclusive jurisdiction, subject to any mandatory provisions of applicable law.</p>

      <h2>12. Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:${contact.email}">${contact.email}</a> or through the <a href="/contact/">contact form</a>.</p>
    </div>

    <hr class="divider">
    <div class="btn-row">
      <a class="btn btn--ghost btn--sm" href="/privacy/">Website privacy notice</a>
      <a class="btn btn--ghost btn--sm" href="/contact/">Contact us</a>
    </div>
  </div>
</section>
`;

export default () => layout({ path: '/terms/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
