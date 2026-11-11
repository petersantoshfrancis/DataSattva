#!/usr/bin/env node
/**
 * Vercel build step. Vercel serves a static output directory, so the site is
 * generated into ./dist exactly as it is for any other host. This wrapper adds
 * a guard: if the environment variables that contact details depend on are
 * missing in Production, it fails the build rather than shipping placeholders
 * to the live site. The same applies to a SITE_URL that is not a plain
 * https address, because that value is written into every canonical link,
 * sharing tag, the sitemap and robots.txt.
 */
import { build } from '../build.mjs';

const isProd = process.env.VERCEL_ENV === 'production';

if (isProd) {
  const missing = [];
  if (!process.env.SITE_URL) missing.push('SITE_URL');
  else if (!/^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(process.env.SITE_URL)) {
    missing.push(
      `SITE_URL (must be the site address written exactly like https://www.datasattva.com — "https://" first, no "/" at the end. It is currently "${process.env.SITE_URL}")`
    );
  }
  if (!process.env.DS_CONTACT_EMAIL || /\.example$/i.test(process.env.DS_CONTACT_EMAIL)) {
    missing.push('DS_CONTACT_EMAIL (must be a real mailbox, not .example)');
  }
  if (missing.length) {
    console.error('\n✗ Production build blocked. Missing, placeholder or malformed environment variables:\n');
    missing.forEach((m) => console.error('   - ' + m));
    console.error('\nSet these in Vercel → Settings → Environment Variables (Production), then redeploy.\n');
    process.exit(1);
  }
  const hasEmail = Boolean(
    process.env.ZEPTOMAIL_SEND_TOKEN ||
      process.env.RESEND_API_KEY ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
  const hasWebhook = Boolean(process.env.ENQUIRY_WEBHOOK_URL);

  if (!hasEmail && !hasWebhook) {
    console.error('\n✗ Production build blocked. No delivery channel for website enquiries.\n');
    console.error('   Set ZEPTOMAIL_SEND_TOKEN + ENQUIRY_TO_EMAIL (Zoho users),');
    console.error('   or RESEND_API_KEY + ENQUIRY_TO_EMAIL,');
    console.error('   or ENQUIRY_WEBHOOK_URL.\n');
    console.error('   Without one of these, enquiries from the contact form and the assessment');
    console.error('   results form would be lost. See docs/deployment-and-editing-guide.html §8.\n');
    process.exit(1);
  }
  if (!process.env.ENQUIRY_TO_EMAIL) {
    console.error('\n✗ Production build blocked. ENQUIRY_TO_EMAIL is not set — there is nowhere to send enquiries.\n');
    process.exit(1);
  }
  console.log(`✓ Delivery configured: ${hasEmail ? (process.env.ZEPTOMAIL_SEND_TOKEN ? 'ZeptoMail' : process.env.RESEND_API_KEY ? 'Resend' : 'SMTP') : 'webhook'} → ${process.env.ENQUIRY_TO_EMAIL}`);
}

await build();
