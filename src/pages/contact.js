import { pageHead, layout, pageHero } from '../lib/layout.js';
import { icon } from '../lib/icons.js';
import { org, contact, ctas } from '../data/site.js';
import { services } from '../data/services.js';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const head = pageHead({
  title: 'Contact DataSattva — DPDP advisory, readiness reviews and implementation support',
  description:
    'Speak to the DataSattva team about DPDP applicability, readiness, governance, data mapping, consent, third-party risk or breach readiness. Complete the form and we will respond to your business email address.',
  path: '/contact/',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact DataSattva',
      url: `${org.url}/contact/`,
      about: { '@type': 'Organization', name: 'DataSattva', url: org.url },
    },
  ],
});

const interestOptions = [
  'DPDP applicability and readiness',
  'Privacy governance and framework',
  'Data mapping and records of processing',
  'Consent and privacy notices',
  'Data Principal rights',
  'Third-party data privacy risk',
  'Data retention and erasure',
  'Personal data breach management',
  'Policies, procedures and controls',
  'Awareness and enablement',
  'Something else',
];

const content = `
${pageHero({
  eyebrow: 'Contact',
  title: 'Reach out to the DataSattva team to explore the next step.',
  lede: 'Tell us what prompted the enquiry and where you are in your DPDP journey. We will respond with a considered view of whether an engagement is warranted, and what the smallest useful scope would look like.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Contact Us' }],
})}

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div>
        <h2 style="font-size:clamp(1.3rem,1.15rem + 0.8vw,1.7rem)">Send an enquiry</h2>
        <p class="muted">Fields marked with an asterisk are required. We use the details you provide only to respond to your enquiry, and we do not add you to a marketing list without your explicit agreement.</p>

        <div class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></div>

        <form id="contact-form" action="/api/enquiries" method="post" novalidate>
          <div class="field-row">
            <div class="field">
              <label for="name">Full name <span aria-hidden="true" style="color:var(--risk)">*</span></label>
              <input class="input" type="text" id="name" name="name" autocomplete="name" data-required aria-describedby="err-name">
              <span class="error-text" id="err-name" data-error-for="name" role="alert"></span>
            </div>
            <div class="field">
              <label for="email">Business email <span aria-hidden="true" style="color:var(--risk)">*</span></label>
              <input class="input" type="email" id="email" name="email" autocomplete="email" inputmode="email" data-required aria-describedby="err-email">
              <span class="error-text" id="err-email" data-error-for="email" role="alert"></span>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="organisation">Organisation <span aria-hidden="true" style="color:var(--risk)">*</span></label>
              <input class="input" type="text" id="organisation" name="organisation" autocomplete="organization" data-required aria-describedby="err-organisation">
              <span class="error-text" id="err-organisation" data-error-for="organisation" role="alert"></span>
            </div>
            <div class="field">
              <label for="designation">Designation</label>
              <input class="input" type="text" id="designation" name="designation" autocomplete="organization-title" aria-describedby="hint-designation">
              <span class="field__hint" id="hint-designation">Optional. Helps us route the enquiry appropriately.</span>
            </div>
          </div>

          <div class="field">
            <label for="interest">Area of interest <span aria-hidden="true" style="color:var(--risk)">*</span></label>
            <select class="select" id="interest" name="interest" data-required aria-describedby="err-interest">
              <option value="">Select an area</option>
              ${interestOptions.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}
            </select>
            <span class="error-text" data-error-for="interest" role="alert"></span>
          </div>

          <div class="field">
            <label for="message">Message <span aria-hidden="true" style="color:var(--risk)">*</span></label>
            <textarea class="textarea" id="message" name="message" data-required aria-describedby="hint-message err-message" placeholder="For example: we are a 400-person insurance business, we have policies but no data inventory, and our board has asked for a plan before the Rules take effect."></textarea>
            <span class="field__hint" id="hint-message">A short description of your situation is more useful to us than a formal request for proposal. Please do not include confidential documents or sensitive personal data.</span>
            <span class="error-text" data-error-for="message" role="alert"></span>
          </div>

          <div class="field">
            <label class="checkbox-row" for="consent">
              <input type="checkbox" id="consent" name="consent" value="yes" data-required aria-describedby="err-consent">
              <span>I agree that DataSattva may use the details I have provided to respond to this enquiry, in accordance with the <a href="/privacy/">website privacy notice</a>. <span aria-hidden="true" style="color:var(--risk)">*</span></span>
            </label>
            <span class="error-text" data-error-for="consent" role="alert"></span>
          </div>

          <input type="hidden" name="pageSource" value="/contact/">
          <div style="position:absolute;left:-9999px" aria-hidden="true">
            <label for="company_website">Leave this field blank</label>
            <input type="text" id="company_website" name="company_website" tabindex="-1" autocomplete="off">
          </div>

          <div class="btn-row">
            <button type="submit" class="btn btn--primary">${esc(ctas.talk.label)} ${icon('arrow')}</button>
          </div>
          <p class="form-note mt-5">If you would prefer to write directly, use <a href="mailto:${contact.email}">${contact.email}</a>. Form submissions are processed by our server and are not stored in your browser.</p>
        </form>
      </div>

      <aside>
        <div class="contact-aside">
          <div class="card card--pad-lg">
            <p class="card__kicker">Contact details</p>
            <div class="contact-item mt-5">
              <h3>Email</h3>
              <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            </div>
            ${
              contact.phone
                ? `<div class="contact-item mt-5"><h3>Phone</h3><p><a href="tel:${contact.phone.replace(/\s+/g, '')}">${contact.phone}</a></p></div>`
                : `<div class="contact-item mt-5"><h3>Phone</h3><p class="xsmall" style="color:var(--ink-50)">Not published — <span class="visually-hidden">placeholder: </span>a telephone number has not been supplied for publication. Please use the form or the email address above.</p></div>`
            }
            <div class="contact-item mt-5">
              <h3>Base</h3>
              <p>${esc(contact.office)}<br><span class="xsmall" style="color:var(--ink-50)">A registered office address has not been supplied for publication.</span></p>
            </div>
            <div class="contact-item mt-5">
              <h3>Response</h3>
              <p>We aim to respond to enquiries within two business days.</p>
            </div>
          </div>

          <div class="card">
            <p class="card__kicker">Before you write</p>
            <ul class="tick-list" style="margin-top:0.75rem;font-size:0.86rem">
              <li>${icon('check')}<span><strong>Just starting?</strong> The <a href="/readiness-assessment/">three-minute assessment</a> gives you a useful starting point to discuss.</span></li>
              <li>${icon('check')}<span><strong>Under a deadline?</strong> Tell us the date and what is driving it. Sequencing is often the hardest part.</span></li>
              <li>${icon('check')}<span><strong>Need a legal opinion?</strong> We are an advisory practice, not a law firm, and we will say so. We work alongside your counsel.</span></li>
              <li>${icon('check')}<span><strong>Need a quotation?</strong> A short scoping call is usually faster than a written brief, and cheaper for you.</span></li>
            </ul>
          </div>

          <div class="card" style="background:var(--paper)">
            <p class="card__kicker">Handling of your information</p>
            <p class="xsmall muted mb-0">Enquiry details are used to respond to your message and to keep a record of the enquiry. They are not sold, shared with third parties for marketing, or used for automated decision-making. Our <a href="/privacy/">website privacy notice</a> explains what we collect through this site, why, how long we keep it and how to exercise your rights.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--paper section--tight">
  <div class="container">
    <div class="grid grid--3">
      <div>
        <div style="color:var(--blue-700);margin-bottom:0.6rem">${icon('compass', 22)}</div>
        <h3 style="font-size:1rem">Not sure what you need?</h3>
        <p class="small muted mb-0">Describe the situation rather than the service. We will suggest the smallest useful first step — including when that is no engagement at all.</p>
      </div>
      <div>
        <div style="color:var(--blue-700);margin-bottom:0.6rem">${icon('shield', 22)}</div>
        <h3 style="font-size:1rem">Security or incident enquiry?</h3>
        <p class="small muted mb-0">If you are contacting us about a suspected personal data breach involving DataSattva, mark the message clearly as urgent.</p>
      </div>
      <div>
        <div style="color:var(--blue-700);margin-bottom:0.6rem">${icon('book', 22)}</div>
        <h3 style="font-size:1rem">Looking for reference material?</h3>
        <p class="small muted mb-0">The <a href="/dpdp-act-and-rules/">DPDP explainer</a> sets out the framework, the staged commencement timeline and the implementation challenges.</p>
      </div>
    </div>
  </div>
</section>
`;

export default () =>
  layout({
    path: '/contact/',
    head,
    content,
    scripts: '<script src="/assets/main.js" defer></script>\n<script src="/assets/contact.js" defer></script>',
  });
