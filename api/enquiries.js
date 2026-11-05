/**
 * POST /api/enquiries — Vercel serverless function.
 *
 * Mirrors the /api/enquiries route in server.mjs. Shared validation lives in
 * src/lib/enquiry.js and email delivery in src/lib/email.js, so all three
 * deployment shapes (Express, Vercel, other serverless) behave identically.
 *
 * Delivery, in priority order:
 *   1. ZEPTOMAIL_SEND_TOKEN → Zoho ZeptoMail HTTP API (best for Zoho Mail users)
 *   2. RESEND_API_KEY       → Resend HTTP API
 *   3. SMTP_*               → SMTP (not recommended on Vercel, see src/lib/email.js)
 *   4. ENQUIRY_WEBHOOK_URL  → POST the enquiry as JSON (CRM / Zapier / Slack)
 * With none set, the submission is validated and acknowledged and the event is
 * logged with the reason nothing was delivered.
 *
 * No secrets are ever exposed to the browser.
 */
import { validateEnquiry, validateAssessmentShare, makeReference } from '../src/lib/enquiry.js';
import { sendEnquiryNotification, emailProvider } from '../src/lib/email.js';

/* Very small in-memory throttle. Serverless instances are ephemeral, so this is
   a best-effort guard against bursts from one client, not a security boundary.
   For hard limits, enable Vercel Firewall or a KV/Upstash based limiter. */
const HITS = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 8;

function throttled(ip) {
  const now = Date.now();
  const bucket = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  bucket.push(now);
  HITS.set(ip, bucket);
  if (HITS.size > 5000) HITS.clear(); // crude memory bound
  return bucket.length > MAX_PER_WINDOW;
}

function parseBody(req) {
  const contentType = String(req.headers['content-type'] || '');
  const raw = typeof req.body === 'string' ? req.body : req.body && typeof req.body === 'object' ? null : '';
  if (req.body && typeof req.body === 'object') return req.body;
  if (!raw) return {};
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  // application/x-www-form-urlencoded
  return Object.fromEntries(new URLSearchParams(raw));
}

async function forwardWebhook(record) {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return { sent: false, reason: 'ENQUIRY_WEBHOOK_URL not set' };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
    });
    return res.ok ? { sent: true } : { sent: false, reason: `Webhook ${res.status}` };
  } catch (err) {
    return { sent: false, reason: `Webhook error: ${err.message}` };
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, message: 'Method not allowed. Submit the contact form with POST.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  try {
    const body = parseBody(req);

    /* Honeypot — accept and discard silently. */
    if (body.company_website) {
      return res.status(200).json({ ok: true, reference: 'DS-ACK' });
    }

    if (throttled(ip)) {
      return res.status(429).json({
        ok: false,
        message: 'Too many enquiries from this address in a short period. Please try again later or email us directly.',
      });
    }

    // The assessment results view posts the same endpoint with kind='assessment'.
    const isAssessmentShare = String(body.kind || '') === 'assessment';
    const { data, errors, valid } = isAssessmentShare ? validateAssessmentShare(body) : validateEnquiry(body);
    if (!valid) {
      return res.status(422).json({
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors,
      });
    }

    const receivedAt = new Date().toISOString();
    const record = {
      reference: makeReference(new Date(receivedAt)),
      receivedAt,
      ip,
      userAgent: String(req.headers['user-agent'] || '').slice(0, 300),
      data,
    };

    /* Deliver. Both fail independently and never block the acknowledgement
       more than a few hundred milliseconds. */
    const [email, webhook] = await Promise.all([
      sendEnquiryNotification(record).catch((e) => ({ sent: false, reason: e.message })),
      forwardWebhook(record).catch((e) => ({ sent: false, reason: e.message })),
    ]);

    const delivered = email.sent || webhook.sent;

    /* If nothing was delivered, there is no copy anywhere — Vercel has no
       persistent disk. Log the WHOLE record so the lead can be recovered from
       the function logs, and tell the visitor honestly to email instead of
       showing a success message for something that went nowhere. */
    console.log(
      JSON.stringify({
        level: delivered ? 'info' : 'error',
        msg: delivered ? 'enquiry-delivered' : 'enquiry-undelivered',
        reference: record.reference,
        kind: isAssessmentShare ? 'assessment' : 'enquiry',
        emailSent: email.sent,
        webhookSent: webhook.sent,
        provider: emailProvider(),
        reasons: [email.reason, webhook.reason].filter(Boolean),
        record: delivered ? undefined : record,
      })
    );

    if (!delivered) {
      return res.status(503).json({
        ok: false,
        reference: record.reference,
        message:
          'The enquiry could not be delivered to the team inbox. Please email us directly using the address on the contact page, quoting reference ' +
          record.reference +
          '.',
      });
    }

    return res.status(201).json({ ok: true, reference: record.reference, delivered: true });
  } catch (err) {
    console.error('enquiry handler error', err);
    return res.status(500).json({
      ok: false,
      message: 'The enquiry could not be recorded. Please email us directly using the address on the contact page.',
    });
  }
}
