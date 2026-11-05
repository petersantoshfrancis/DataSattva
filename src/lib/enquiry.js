/**
 * Shared enquiry validation.
 *
 * Used by BOTH:
 *   - server.mjs            (self-hosted Express server)
 *   - api/enquiries.js      (Vercel serverless function)
 *
 * Keeping one copy means the two deployment targets cannot drift apart.
 */

export const MAX = {
  name: 120,
  email: 254,
  organisation: 160,
  designation: 120,
  interest: 120,
  message: 4000,
};

/** Must stay in sync with the <select> options in src/pages/contact.js. */
export const INTERESTS = [
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

export const INTEREST_SET = new Set(INTERESTS);

/** Strip control characters and normalise whitespace. */
export const clean = (v) =>
  typeof v === 'string'
    ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim()
    : '';

export const isEmail = (v) =>
  /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[^\s@<>()[\]\\,;:]{2,}$/.test(v);

/**
 * Validate an optional "share my assessment result" submission.
 * Same contact fields as an enquiry, plus the score payload the visitor chose
 * to share. Kept separate from validateEnquiry because the interest/message
 * requirements differ.
 */
export const ASSESSMENT_BANDS = ['Leading', 'Established', 'Developing', 'Foundational'];

export function validateAssessmentShare(body = {}) {
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    organisation: clean(body.organisation),
    designation: '',
    interest: 'Assessment result shared from the DPDP Readiness Assessment',
    message: clean(body.message) || 'No additional note provided.',
    pageSource: clean(body.pageSource).slice(0, 200) || '/readiness-assessment/',
    consent: body.consent === 'yes' || body.consent === true || body.consent === 'on',
  };

  const errors = {};
  if (data.name.length < 2) errors.name = 'Please provide your name.';
  else if (data.name.length > MAX.name) errors.name = 'Name is too long.';
  if (!isEmail(data.email)) errors.email = 'Please provide a valid business email address.';
  else if (data.email.length > MAX.email) errors.email = 'Email is too long.';
  if (data.organisation.length > MAX.organisation) errors.organisation = 'Organisation name is too long.';
  if (!data.consent) errors.consent = 'Please confirm you agree to be contacted about this result.';
  if (data.message.length > MAX.message) errors.message = 'Message is too long.';

  const score = Math.max(0, Math.min(100, Number(body.score) || 0));
  const band = ASSESSMENT_BANDS.includes(clean(body.band)) ? clean(body.band) : 'Not stated';
  const gaps = {
    critical: Math.max(0, Math.min(99, Number(body.gapsCritical) || 0)),
    high: Math.max(0, Math.min(99, Number(body.gapsHigh) || 0)),
    moderate: Math.max(0, Math.min(99, Number(body.gapsModerate) || 0)),
  };
  const priorities = clean(body.priorities).slice(0, 600);

  return {
    data: { ...data, assessment: { score, band, gaps, priorities } },
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

/** Normalise a raw request body into the stored record shape + field errors. */
export function validateEnquiry(body = {}) {
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    organisation: clean(body.organisation),
    designation: clean(body.designation),
    interest: clean(body.interest),
    message: clean(body.message),
    pageSource: clean(body.pageSource).slice(0, 200),
    consent: body.consent === 'yes' || body.consent === true || body.consent === 'on',
  };

  const errors = {};

  if (data.name.length < 2) errors.name = 'Please provide your name.';
  else if (data.name.length > MAX.name) errors.name = 'Name is too long.';

  if (!isEmail(data.email)) errors.email = 'Please provide a valid business email address.';
  else if (data.email.length > MAX.email) errors.email = 'Email is too long.';

  if (data.organisation.length < 2) errors.organisation = 'Please provide your organisation name.';
  else if (data.organisation.length > MAX.organisation) errors.organisation = 'Organisation name is too long.';

  if (!data.interest) errors.interest = 'Please select an area of interest.';
  else if (!INTEREST_SET.has(data.interest)) errors.interest = 'Please select an area of interest from the list.';

  if (data.message.length < 20) errors.message = 'Please add at least 20 characters so we can route your enquiry.';
  else if (data.message.length > MAX.message) errors.message = 'Message is too long. Please keep it under 4,000 characters.';

  if (!data.consent) errors.consent = 'Please confirm you agree to be contacted about this enquiry.';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

/** Human-readable reference shown to the enquirer and used to trace the record. */
export function makeReference(now = new Date()) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DS-${now.getUTCFullYear()}-${rand}`;
}

/** Minimal HTML escape for the notification email body. */
export const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Plain-text + HTML rendering of an enquiry, used for email notifications. */
export function renderEnquiry(record) {
  const { data, reference, receivedAt } = record;
  const rows = [
    ['Reference', reference],
    ['Received', receivedAt],
    ['Name', data.name],
    ['Email', data.email],
    ['Organisation', data.organisation],
    ['Designation', data.designation || '—'],
    ['Area of interest', data.interest],
    ['Consent given', data.consent ? 'Yes' : 'No'],
    ['Submitted from', data.pageSource || '—'],
    ['User agent', record.userAgent || '—'],
    ['IP', record.ip || '—'],
  ];

  const a = data.assessment;
  const assessmentRows = a
    ? [
        ['Readiness score', `${a.score} / 100 (${a.band})`],
        ['Gaps flagged', `${a.gaps.critical} critical · ${a.gaps.high} high · ${a.gaps.moderate} moderate`],
        ['Priority areas', a.priorities || '—'],
      ]
    : [];

  const text = [
    a ? 'New DataSattva DPDP Readiness Assessment result shared' : 'New DataSattva website enquiry',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(assessmentRows.length ? ['', 'Assessment result (self-reported, indicative):', ...assessmentRows.map(([k, v]) => `  ${k}: ${v}`)] : []),
    '',
    'Message:',
    data.message,
  ].join('\n');

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0B1F3A;max-width:640px">
  <h2 style="margin:0 0 4px;font-size:18px">${a ? 'DPDP Readiness Assessment result shared' : 'New website enquiry'}</h2>
  <p style="margin:0 0 18px;color:#55677F;font-size:13px">Reference ${esc(reference)} · ${esc(receivedAt)}</p>
  <table style="border-collapse:collapse;width:100%;font-size:13px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 10px 6px 0;color:#6B7C93;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;border-bottom:1px solid #EEF2F8">${esc(v)}</td></tr>`
      )
      .join('')}
  </table>
  ${
    a
      ? `<div style="margin:20px 0;padding:14px 16px;background:#EEF5FF;border:1px solid #DBE9FF;border-radius:8px">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#0F57CC;font-weight:700">Indicative readiness ${a.score}/100 · ${esc(a.band)}</p>
    <p style="margin:0;font-size:13px;color:#17365e">${a.gaps.critical} critical · ${a.gaps.high} high · ${a.gaps.moderate} moderate gaps${a.priorities ? ` — priority areas: ${esc(a.priorities)}` : ''}</p>
    <p style="margin:8px 0 0;font-size:11px;color:#55677F">Self-reported and indicative only; not a compliance evaluation.</p>
  </div>`
      : ''
  }
  <h3 style="margin:20px 0 6px;font-size:14px">Message</h3>
  <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#F7F9FC;border-left:3px solid #2F80FF;padding:12px 14px;margin:0">${esc(data.message)}</p>
  <p style="margin:20px 0 0;font-size:11.5px;color:#8AA0AA">Sent automatically from the DataSattva website contact form. Reply directly to this message to reach the enquirer.</p>
</div>`;

  return { text, html };
}
