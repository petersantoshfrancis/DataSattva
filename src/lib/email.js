/**
 * Email delivery for website enquiries.
 *
 * Supports three providers, chosen by which environment variables are present.
 * Whichever is configured first in the priority list below is used:
 *
 *   1. ZEPTOMAIL_SEND_TOKEN       → Zoho ZeptoMail HTTP API   (recommended for Zoho users)
 *   2. RESEND_API_KEY             → Resend HTTP API
 *   3. SMTP_HOST + SMTP_USER + SMTP_PASS → SMTP via nodemailer (self-hosted servers only)
 *
 * Why the order matters: Vercel serverless functions block outbound SMTP on
 * port 25 and — more importantly — pause background work as soon as the
 * function returns, which can silently drop an SMTP send. An HTTP API call is
 * awaited inside the same invocation and completes cleanly, so ZeptoMail or
 * Resend is the correct choice on Vercel. SMTP is offered for self-hosted
 * deployments (VPS, Render, Railway) where a persistent process exists and
 * Zoho Mail's regular mailbox SMTP can be used.
 *
 * Nothing here throws on missing configuration: the caller is told whether a
 * message was sent, and why not, so a form submission is never lost.
 */
import { renderEnquiry } from './enquiry.js';

/** Which provider is configured? Exported so the health endpoint can report it. */
export function emailProvider() {
  if (process.env.ZEPTOMAIL_SEND_TOKEN) return 'zeptomail';
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return 'smtp';
  return null;
}

/** Recipients, supporting a comma-separated list. */
function recipients() {
  return (process.env.ENQUIRY_TO_EMAIL || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * From address.
 *  - ZeptoMail requires the address to be on a domain verified in ZeptoMail.
 *  - SMTP uses the authenticated mailbox unless overridden.
 */
function fromAddress(provider) {
  const explicit = process.env.ENQUIRY_FROM_EMAIL;
  if (explicit) {
    const m = explicit.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
    return m ? { name: m[1] || 'DataSattva Website', address: m[2] } : { name: 'DataSattva Website', address: explicit.trim() };
  }
  if (provider === 'smtp') return { name: 'DataSattva Website', address: process.env.SMTP_USER };
  return { name: 'DataSattva Website', address: process.env.DS_CONTACT_EMAIL || 'website@datasattva.com' };
}

function subjectFor(record) {
  return `Website enquiry — ${record.data.organisation} (${record.reference})`;
}

/* ------------------------------------------------------------- ZeptoMail API */

async function sendViaZeptoMail(record) {
  const token = process.env.ZEPTOMAIL_SEND_TOKEN;
  const to = recipients();
  if (!to.length) return { sent: false, reason: 'ENQUIRY_TO_EMAIL not set' };

  const from = fromAddress('zeptomail');
  const { text, html } = renderEnquiry(record);

  // Region matters: an Indian data centre account uses .in, EU uses .eu.
  const host = process.env.ZEPTOMAIL_API_HOST || 'api.zeptomail.in';

  const body = {
    from: { address: from.address, name: from.name },
    to: to.map((address) => ({ email_address: { address } })),
    reply_to: [{ address: record.data.email, name: record.data.name }],
    subject: subjectFor(record),
    htmlbody: html,
    textbody: text,
    // Helps you find the message in the ZeptoMail activity log.
    client_reference: record.reference,
  };
  if (process.env.ZEPTOMAIL_BOUNCE_ADDRESS) body.bounce_address = process.env.ZEPTOMAIL_BOUNCE_ADDRESS;

  try {
    const res = await fetch(`https://${host}/v1.1/email`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-enczapikey ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { sent: false, reason: `ZeptoMail ${res.status}: ${detail.slice(0, 300)}` };
    }
    return { sent: true, provider: 'zeptomail' };
  } catch (err) {
    return { sent: false, reason: `ZeptoMail error: ${err.message}` };
  }
}

/* ------------------------------------------------------------------- Resend */

async function sendViaResend(record) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!to.length) return { sent: false, reason: 'ENQUIRY_TO_EMAIL not set' };

  const from = fromAddress('resend');
  const { text, html } = renderEnquiry(record);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${from.name} <${from.address}>`,
        to,
        reply_to: record.data.email,
        subject: subjectFor(record),
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { sent: false, reason: `Resend ${res.status}: ${detail.slice(0, 300)}` };
    }
    return { sent: true, provider: 'resend' };
  } catch (err) {
    return { sent: false, reason: `Resend error: ${err.message}` };
  }
}

/* --------------------------------------------------------------------- SMTP */

async function sendViaSmtp(record) {
  const to = recipients();
  if (!to.length) return { sent: false, reason: 'ENQUIRY_TO_EMAIL not set' };

  let nodemailer;
  try {
    nodemailer = (await import('nodemailer')).default;
  } catch {
    return { sent: false, reason: 'nodemailer is not installed' };
  }

  const from = fromAddress('smtp');
  const { text, html } = renderEnquiry(record);
  const port = Number(process.env.SMTP_PORT || 465);

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // Must be awaited: serverless runtimes pause background work on return.
    const info = await transport.sendMail({
      from: `${from.name} <${from.address}>`,
      to,
      replyTo: `${record.data.name} <${record.data.email}>`,
      subject: subjectFor(record),
      text,
      html,
    });
    return { sent: true, provider: 'smtp', messageId: info.messageId };
  } catch (err) {
    return { sent: false, reason: `SMTP error: ${err.message}` };
  }
}

/* ------------------------------------------------------------------ public */

/**
 * Send the notification for one enquiry.
 * @returns {Promise<{sent:boolean, provider?:string, reason?:string}>}
 */
export async function sendEnquiryNotification(record) {
  const provider = emailProvider();
  if (!provider) {
    return {
      sent: false,
      reason:
        'No email provider configured. Set ZEPTOMAIL_SEND_TOKEN (or RESEND_API_KEY, or SMTP_HOST/USER/PASS) plus ENQUIRY_TO_EMAIL.',
    };
  }
  if (provider === 'zeptomail') return sendViaZeptoMail(record);
  if (provider === 'resend') return sendViaResend(record);
  return sendViaSmtp(record);
}
