// Cloudflare Worker: serves the built site and handles POST /api/enquiry.
// Sends (1) a notification to NOTIFY_EMAIL and (2) a confirmation to the customer via Resend.

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const LABELS = {
  club: 'Verein', team: 'Mannschaft', name: 'Name', role: 'Funktion', email: 'E-Mail', phone: 'Telefon',
  arrival: 'Anreise ab', departure: 'Abreise bis', players: 'Spieler', staff: 'Trainer/Betreuer',
  rooms: 'Zimmerwunsch', budget: 'Budget p. P.', details: 'Wünsche', contact_method: 'Kontaktweg',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

async function sendMail(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function handleEnquiry(request, env) {
  let d;
  try { d = await request.json(); } catch { return json({ error: 'bad_request' }, 400); }
  if (d.website) return json({ ok: true }); // honeypot: pretend success to bots

  const v = {};
  for (const k of Object.keys(LABELS)) v[k] = String(d[k] ?? '').trim().slice(0, k === 'details' ? 3000 : 200);
  const lang = d.lang === 'en' ? 'en' : 'de';
  if (!v.club || !v.team || !v.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    return json({ error: 'invalid' }, 400);

  const rows = Object.entries(LABELS)
    .filter(([k]) => v[k])
    .map(([k, l]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${l}</b></td><td>${esc(v[k]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  const table = `<table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
  const from = env.FROM_EMAIL || 'Fussballcamp Antalya <onboarding@resend.dev>';

  try {
    await sendMail(env, {
      from, to: [env.NOTIFY_EMAIL], reply_to: v.email,
      subject: `Neue Trainingslager-Anfrage – ${v.club}`,
      html: `<p>Neue Anfrage über die Website:</p>${table}`,
    });
  } catch (e) {
    console.error(e);
    return json({ error: 'send_failed' }, 502);
  }

  // Confirmation to the customer; failure here must not fail the request.
  const txt = lang === 'en'
    ? { s: 'We received your enquiry – Fussballcamp Antalya', h: `Hello ${esc(v.name)},`, p: 'thank you for your enquiry. It has reached us successfully and we will get back to you shortly. This is your copy:', b: 'Best regards<br>Fussballcamp Antalya' }
    : { s: 'Ihre Anfrage ist bei uns eingegangen – Fussballcamp Antalya', h: `Hallo ${esc(v.name)},`, p: 'vielen Dank für Ihre Anfrage. Sie ist erfolgreich bei uns eingegangen und wir melden uns in Kürze. Hier Ihre Angaben als Kopie:', b: 'Viele Grüße<br>Fussballcamp Antalya' };
  try {
    await sendMail(env, {
      from, to: [v.email], reply_to: env.NOTIFY_EMAIL, subject: txt.s,
      html: `<p>${txt.h}</p><p>${txt.p}</p>${table}<p>${txt.b}</p>`,
    });
  } catch (e) {
    console.error('confirmation failed', e);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/enquiry') {
      if (request.method !== 'POST') return json({ error: 'method' }, 405);
      return handleEnquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
