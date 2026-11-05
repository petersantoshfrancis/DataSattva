/**
 * DataSattva server.
 *
 * Serves the generated site from ./dist and exposes a single JSON endpoint,
 * POST /api/enquiries, which validates, rate-limits and stores contact form
 * submissions.
 *
 * Delivery: every enquiry is appended to data/enquiries.ndjson, then a
 * notification is sent through whichever provider src/lib/email.js finds
 * configured (ZeptoMail, Resend or SMTP), and/or POSTed to ENQUIRY_WEBHOOK_URL.
 * Identical behaviour to the Vercel function in api/enquiries.js — both share
 * src/lib/enquiry.js and src/lib/email.js.
 * No secret is ever exposed to the browser — the client only knows the path.
 */
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appendFile, mkdir } from 'node:fs/promises';
import 'dotenv/config';
import { validateEnquiry, validateAssessmentShare, makeReference } from './src/lib/enquiry.js';
import { sendEnquiryNotification, emailProvider } from './src/lib/email.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const DATA_DIR = process.env.DS_DATA_DIR || path.join(__dirname, 'data');
const ENQUIRY_FILE = path.join(DATA_DIR, 'enquiries.ndjson');

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'script-src': ["'self'", "'unsafe-inline'"], // inline JSON config + CSP-safe inline site scripts
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:'],
          'font-src': ["'self'"],
          'connect-src': ["'self'"],
          'frame-ancestors': ["'self'", 'https://*.e2b.app', 'https://*.arena.ai'],
          'form-action': ["'self'"],
          'base-uri': ["'self'"],
          'object-src': ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      // We set frame-ancestors explicitly above; the X-Frame-Options default
      // would otherwise block the site from being embedded in the hosted
      // preview pane.
      frameguard: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      hsts: process.env.NODE_ENV === 'production' ? undefined : false,
    })
  );

  app.use(express.json({ limit: '32kb' }));
  app.use(express.urlencoded({ extended: false, limit: '32kb' }));

  /* ------------------------------------------------------------- API routes */
  const enquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, message: 'Too many enquiries from this address. Please try again later or email us directly.' },
  });

  app.get('/api/health', (_req, res) =>
    res.json({
      ok: true,
      service: 'datasattva',
      time: new Date().toISOString(),
      emailProvider: emailProvider() || 'none',
      enquiryRecipient: process.env.ENQUIRY_TO_EMAIL ? 'configured' : 'missing',
    })
  );

  app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
    try {
      const body = req.body || {};

      /* Honeypot: silently accept bots. */
      if (String(body.company_website || '').trim()) {
        return res.status(200).json({ ok: true, reference: 'DS-ACK' });
      }

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
      const reference = makeReference(new Date(receivedAt));
      const record = {
        reference,
        receivedAt,
        ip: req.ip,
        userAgent: String(req.get('user-agent') || '').slice(0, 300),
        data,
      };

      await mkdir(DATA_DIR, { recursive: true });
      await appendFile(ENQUIRY_FILE, JSON.stringify(record) + '\n', { mode: 0o600 });

      if (process.env.DS_WEBHOOK_URL) {
        fetch(process.env.DS_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.DS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.DS_WEBHOOK_TOKEN}` } : {}),
          },
          body: JSON.stringify({ reference, ...data }),
        }).catch((e) => console.error('[webhook] failed:', e.message));
      }

      const email = await sendEnquiryNotification(record).catch((e) => ({ sent: false, reason: e.message }));
      if (!email.sent) console.warn('[enquiry] email not sent:', email.reason);

      console.log(
        `[enquiry] ${reference} from ${data.organisation} (${data.email}) provider=${emailProvider() || 'none'} emailSent=${email.sent}`
      );

      /* Same contract as the Vercel function: never acknowledge an enquiry that
         nobody received. The record is already on disk here, so it is not lost —
         but the visitor still gets an honest 503 and a way to reach you. */
      if (!email.sent) {
        return res.status(503).json({
          ok: false,
          reference,
          message:
            'Your enquiry was saved but the notification email could not be delivered. Please email us directly using the address on the contact page, quoting reference ' +
            reference +
            '.',
        });
      }

      return res.status(201).json({ ok: true, reference, delivered: true });
    } catch (err) {
      console.error('[enquiry] error:', err);
      return res.status(500).json({ ok: false, message: 'The enquiry could not be recorded. Please email us directly.' });
    }
  });

  /* ----------------------------------------------------------- static files */
  app.use(
    express.static(DIST, {
      extensions: ['html'],
      maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.woff2')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        if (filePath.endsWith('.css') || filePath.endsWith('.js')) res.setHeader('Cache-Control', 'public, max-age=300');
      },
    })
  );

  /* Pretty URLs: /about → /about/ and trailing-slash directory index. */
  app.get(/^([^.]+)$/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    if (req.path.endsWith('/')) return next();
    const qs = req.url.slice(req.path.length);
    res.redirect(301, req.path + '/' + qs);
  });

  app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ ok: false, message: 'Not found' });
    res.status(404).sendFile(path.join(DIST, '404.html'));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error('[server]', err);
    if (res.headersSent) return;
    res.status(500).json({ ok: false, message: 'Unexpected server error.' });
  });

  return app;
}

export async function startServer(port = 8080) {
  const app = createApp();
  return new Promise((resolve) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`→ http://localhost:${port}  (bound 0.0.0.0)`);
      resolve(server);
    });
  });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  startServer(process.env.PORT || 8080);
}
