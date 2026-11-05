import { pageHead, layout, pageHero } from '../lib/layout.js';
import { contact, org } from '../data/site.js';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const head = pageHead({
  title: 'Website Privacy Notice | DataSattva',
  description:
    'How DataSattva handles personal data collected through this website: what we collect from enquiry forms, analytics and server logs, why, how long we keep it, and how to exercise your rights under the DPDP Act, 2023.',
  path: '/privacy/',
  noindex: true,
});

/*
  NOTE FOR THE CLIENT
  This notice describes what the site, as delivered, actually does: an enquiry
  form posting to a first-party API, server logs, and no third-party analytics,
  no advertising cookies and no embedded trackers. If you add analytics, a CRM,
  a chat widget or any third-party script, this notice must be updated to say so.
*/

const content = `
${pageHero({
  eyebrow: 'Legal',
  title: 'Website privacy notice',
  lede: 'This notice explains what personal data DataSattva collects through this website, why we collect it, how long we keep it, and how to exercise your rights.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Website privacy notice' }],
  meta: `<span>Last updated: 4 November 2026</span><span aria-hidden="true">·</span><span>Status: draft pending legal review</span>`,
})}

<section class="section">
  <div class="container container-narrow">
    <div class="notice-strip">
      <span aria-hidden="true">!</span>
      <span><strong>Status of this notice.</strong> This is a working draft prepared alongside the website. It describes what the site as built actually does — a first-party enquiry form, server-side logging, and no third-party analytics, advertising or tracking scripts. It should be reviewed by legal counsel and updated before launch if any tooling is added.</span>
    </div>

    <div class="prose">
      <h2>1. Who is responsible for your data</h2>
      <p>This website is operated by DataSattva. For the purposes of the Digital Personal Data Protection Act, 2023, DataSattva is the Data Fiduciary in respect of personal data collected through this website. Enquiries about this notice can be sent to <a href="mailto:${contact.email}">${contact.email}</a>.</p>
      <p class="small muted"><em>Placeholder:</em> the registered legal entity name, registered address and, where one is appointed, the name and contact details of the Data Protection Officer or the authorised person under section 8(10) of the Act are to be confirmed before publication. ${esc('[' + 'Legal entity details to be confirmed]')}</p>

      <h2>2. What we collect, and why</h2>
      <table>
        <caption>Personal data collected through this website, its purpose and our basis for processing it.</caption>
        <thead>
          <tr><th scope="col">What we collect</th><th scope="col">Why</th><th scope="col">Basis</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Contact form details</strong><br>Name, business email, organisation, designation, area of interest, message, consent statement</td>
            <td>To respond to your enquiry and keep a record of it</td>
            <td>Your consent, given by submitting the form</td>
          </tr>
          <tr>
            <td><strong>Server logs</strong><br>IP address, request path, user agent, timestamp</td>
            <td>To keep the site secure, diagnose faults and prevent abuse</td>
            <td>Certain legitimate uses under section 7 — where processing is necessary for the purposes listed in that section, including security of the service</td>
          </tr>
          <tr>
            <td><strong>Readiness assessment answers</strong><br>Organisation profile and twelve scored answers</td>
            <td>To calculate your indicative result</td>
            <td>None — the assessment is scored in your browser and responses are <strong>not transmitted to us</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>3. What we do not do</h2>
      <ul>
        <li>We do not set advertising or third-party tracking cookies.</li>
        <li>We do not embed third-party analytics, session-recording, chat or social widgets on this site as delivered.</li>
        <li>We do not use your enquiry details for marketing without your explicit agreement.</li>
        <li>We do not make automated decisions about you, and we do not profile you.</li>
        <li>We do not sell personal data.</li>
      </ul>
      <p class="small muted">This website does not use any cookie other than those strictly necessary for the site to function. If we later add analytics, this notice will be updated and, where required, consent will be sought before any non-essential cookie is set.</p>

      <h2>4. Who we share it with</h2>
      <p>Enquiry details are accessible to members of the DataSattva team who need them to respond. We use a hosting provider to serve this website and a transactional email service to deliver enquiry notifications; these providers act as Data Processors on our instructions. Their details are to be confirmed at deployment and will be listed here.</p>
      <p>We may disclose personal data where required by law, by a court, or by a competent authority exercising a statutory power. We do not otherwise share enquiry data with third parties.</p>

      <h2>5. Where your data is processed</h2>
      <p>This website and its enquiry database are hosted in the infrastructure region documented at deployment. <span class="small muted">[Hosting region and any cross-border transfer position to be confirmed before launch.]</span> Where processing takes place outside India, we will describe the transfer and the basis for it here.</p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li><strong>Enquiry records:</strong> retained for up to 24 months from the date of the last contact, so that we can pick up a conversation that resumes later, and then deleted.</li>
        <li><strong>Server logs:</strong> retained for up to 90 days on a rolling basis, then deleted.</li>
        <li><strong>Readiness assessment answers:</strong> not retained by us, because they are never transmitted.</li>
      </ul>
      <p>Where retention is required by law — for example, records relevant to a legal claim or a statutory obligation — we will retain the relevant data for the required period and restrict its use to that purpose.</p>

      <h2>7. Security</h2>
      <p>We apply reasonable technical and organisational safeguards to protect personal data submitted through this site, including transport encryption, server-side input validation, rate limiting on the enquiry endpoint, access restriction to enquiry records, and logging of administrative access. No method of transmission or storage is entirely secure; if you would prefer not to submit information through the form, you can write to us directly at the email address above.</p>

      <h2>8. Your rights</h2>
      <p>As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the right to obtain a summary of the personal data we process about you and the identities of the Data Fiduciaries with whom it has been shared, to seek correction and completion, to request erasure, to nominate another individual to exercise your rights in the event of death or incapacity, and to grievance redressal.</p>
      <p>To exercise any of these rights, or to raise a grievance, write to <a href="mailto:${contact.email}">${contact.email}</a> with enough detail for us to identify the relevant records. We will respond within the period prescribed by the DPDP Rules, 2025, and will tell you if we need further information to verify your identity.</p>
      <p>If you are not satisfied with our response, you may complain to the Data Protection Board of India.</p>

      <h2>9. Children</h2>
      <p>This website is intended for business use and is not directed at children. We do not knowingly collect personal data of children through this site. If you believe a child has provided personal data to us, please contact us so that we can delete it.</p>

      <h2>10. Changes to this notice</h2>
      <p>We will update this notice when our practices change or when the law requires it. The date at the top of this page shows when it was last revised, and material changes will be described here.</p>

      <h2>11. Regulatory context</h2>
      <p>This notice is drafted with reference to the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025. Certain obligations under those instruments commence in stages; the commitment in this notice is to meet them as they come into force. Nothing in this notice limits any right you have under applicable law.</p>
    </div>

    <hr class="divider">
    <div class="btn-row">
      <a class="btn btn--ghost btn--sm" href="/terms/">Terms &amp; disclaimers</a>
      <a class="btn btn--ghost btn--sm" href="/contact/">Contact us</a>
    </div>
  </div>
</section>
`;

export default () => layout({ path: '/privacy/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
