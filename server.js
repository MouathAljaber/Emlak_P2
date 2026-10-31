import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const siteUrl = (process.env.PUBLIC_SITE_URL || `http://localhost:${port}`).replace(/\/$/, '');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'fussballcamp',
  waitForConnections: true,
  connectionLimit: 10
});
const tripTypes = new Set(['player camp', 'family football holiday', 'team & group trip', 'school holiday camp']);
const statuses = new Set(['new', 'contacted', 'qualified', 'closed']);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '24kb' }));
app.get('/site-config.js', (_req, res) => res.type('js').send(`window.SITE_CONFIG=${JSON.stringify({
  siteUrl, ga4MeasurementId: process.env.GA4_MEASUREMENT_ID || '',
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || ''
})};`));
app.get('/robots.txt', (_req, res) => res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`));
app.get('/sitemap.xml', (_req, res) => res.type('application/xml').send(
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>`
));
app.use(express.static(root, { extensions: ['html'] }));

function text(value, field, max = 500, required = true) {
  if ((typeof value !== 'string' || !value.trim()) && required) throw new Error(`${field} is required`);
  if (value == null || value === '') return null;
  if (value.length > max) throw new Error(`${field} is too long`);
  return value.trim();
}
function number(value, field, max) {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > max) throw new Error(`${field} must be a valid number`);
  return parsed;
}
function validateLead(body) {
  const email = text(body.email, 'email', 320);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('A valid email is required');
  if (body.website) throw new Error('Unable to process this request');
  const lead = {
    name: text(body.name, 'name', 200), email, phone: text(body.phone, 'phone', 60, false),
    playerAge: number(body.playerAge, 'playerAge', 99), groupSize: number(body.groupSize, 'groupSize', 500),
    travelMonth: text(body.travelMonth, 'travelMonth', 40, false),
    tripType: text(body.tripType, 'tripType', 80), message: text(body.message, 'message', 3000, false),
    consent: body.consent === true
  };
  if (!tripTypes.has(lead.tripType)) throw new Error('Please choose a valid trip type');
  if (!lead.consent) throw new Error('Consent is required');
  return lead;
}
function adminOnly(req, res, next) {
  if (!process.env.ADMIN_API_KEY || req.get('x-admin-key') !== process.env.ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
async function notify(lead) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.ADMIN_EMAIL || !process.env.SMTP_FROM) {
    console.warn('Email notifications disabled: configure SMTP_* and ADMIN_EMAIL');
    return;
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
  const summary = [`Name: ${lead.name}`, `Email: ${lead.email}`, `Phone: ${lead.phone || '-'}`,
    `Trip: ${lead.tripType}`, `Player age: ${lead.playerAge || '-'}`, `Group size: ${lead.groupSize || '-'}`,
    `Travel: ${lead.travelMonth || '-'}`, `Message: ${lead.message || '-'}`].join('\n');
  await Promise.all([
    transport.sendMail({ from: process.env.SMTP_FROM, to: process.env.ADMIN_EMAIL, replyTo: lead.email, subject: `New Fussballcamp enquiry: ${lead.name}`, text: summary }),
    transport.sendMail({ from: process.env.SMTP_FROM, to: lead.email, subject: 'Your Fussballcamp Antalya enquiry', text: `Thanks ${lead.name}, we received your enquiry and will reply within one working day.` })
  ]);
}
app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, database: 'connected' }); }
  catch (error) { console.error('Health check failed', error); res.status(503).json({ ok: false, database: 'unavailable' }); }
});
app.post('/api/leads', async (req, res) => {
  try {
    const lead = validateLead(req.body);
    const [result] = await pool.execute(
      `INSERT INTO leads (name,email,phone,player_age,group_size,travel_month,trip_type,message,consent) VALUES (?,?,?,?,?,?,?,?,?)`,
      [lead.name, lead.email, lead.phone, lead.playerAge, lead.groupSize, lead.travelMonth, lead.tripType, lead.message, lead.consent]
    );
    await notify({ ...lead, id: result.insertId });
    res.status(201).json({ id: result.insertId, message: 'Enquiry received' });
  } catch (error) {
    if (/required|valid|too long|Consent|choose|number/.test(error.message)) return res.status(400).json({ error: error.message });
    console.error('Lead submission failed', error); res.status(500).json({ error: 'Unable to save your enquiry right now.' });
  }
});
app.get('/api/admin/leads', adminOnly, async (_req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 300'); res.json(rows); }
  catch (error) { console.error('Lead listing failed', error); res.status(500).json({ error: 'Unable to load leads' }); }
});
app.patch('/api/admin/leads/:id', adminOnly, async (req, res) => {
  if (!statuses.has(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
  try { const [result] = await pool.execute('UPDATE leads SET status = ? WHERE id = ?', [req.body.status, Number(req.params.id)]); if (!result.affectedRows) return res.status(404).json({ error: 'Lead not found' }); res.json({ ok: true }); }
  catch (error) { console.error('Lead update failed', error); res.status(500).json({ error: 'Unable to update lead' }); }
});
app.listen(port, () => console.log(`Fussballcamp Antalya listening on http://localhost:${port}`));
