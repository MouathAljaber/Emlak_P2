// Cloudflare Worker: serves the built site and handles POST /api/enquiry.
// Sends (1) a notification to NOTIFY_EMAIL and (2) a confirmation to the customer via Resend.

import { validate } from '../src/validation.js';

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
  const problems = validate(v);
  if (Object.keys(problems).length) return json({ error: 'invalid', fields: problems }, 400);

  const from = env.FROM_EMAIL || 'Fussballcamp Antalya <onboarding@resend.dev>';

  const T = {
    de: { thanks: 'Vielen Dank', recv: 'Ihre Anfrage ist bei uns eingegangen.', soon: 'Wir melden uns in Kürze bei Ihnen. Hier Ihre Angaben als Kopie:', arrive: 'ANREISE', depart: 'ABREISE', group: 'Gruppe', players: 'Spieler', staff: 'Betreuer', rooms: 'Zimmer', budget: 'Budget p. P.', pref: 'Bevorzugt', reply: '✉ Antworten', new: '● NEU', wants: 'möchte ein Trainingslager<br>in Antalya anfragen.', sent: 'automatisch gesendet', sub: 'Neue Trainingslager-Anfrage', subC: 'Ihre Anfrage ist bei uns eingegangen – Fussballcamp Antalya', loc: 'de-DE' },
    en: { thanks: 'Thank you', recv: 'We have received your enquiry.', soon: 'We will get back to you shortly. Here is your copy:', arrive: 'ARRIVAL', depart: 'DEPARTURE', group: 'Group', players: 'players', staff: 'staff', rooms: 'Rooms', budget: 'Budget p.p.', pref: 'Preferred', reply: '✉ Reply', new: '● NEW', wants: 'wants to enquire about a<br>training camp in Antalya.', sent: 'sent automatically', sub: 'New training camp enquiry', subC: 'We received your enquiry – Fussballcamp Antalya', loc: 'en-GB' },
  };
  const OWNER = T.de; // owner mail is always German
  const initials = v.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const fmt = (iso, loc) => {
    const dt = new Date(iso);
    return isNaN(dt) ? esc(iso) : dt.toLocaleDateString(loc, { day: 'numeric', month: 'short', timeZone: 'UTC' });
  };
  const sub = [v.role, v.club, v.team].filter(Boolean).map(esc).join(' · ');

  const build = (L, customer) => {
    const trow = (label, value, last) =>
      `<tr><td style="padding:12px 0;${last ? '' : 'border-bottom:1px solid #efefef;'}color:#6a7d72">${label}</td><td align="right" style="padding:12px 0;${last ? '' : 'border-bottom:1px solid #efefef;'}font-weight:700;color:#0f2219">${value}</td></tr>`;
    const items = [];
    const g = [v.players && `${esc(v.players)} ${L.players}`, v.staff && `${esc(v.staff)} ${L.staff}`].filter(Boolean).join(' · ');
    if (g) items.push([L.group, g]);
    if (v.rooms) items.push([L.rooms, esc(v.rooms)]);
    if (v.budget) items.push([L.budget, esc(v.budget)]);
    if (v.contact_method) items.push([L.pref, esc(v.contact_method)]);
    const rows = items.map(([l, x], i) => trow(l, x, i === items.length - 1)).join('');

    const dates = v.arrival || v.departure
      ? `<tr><td style="padding:22px 30px 4px"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8f6;border-radius:14px"><tr>
<td align="center" style="padding:18px 8px"><div style="font-size:11px;color:#6a7d72;letter-spacing:.08em">${L.arrive}</div><div style="font-size:17px;font-weight:800;color:#0f2219;margin-top:4px">${v.arrival ? fmt(v.arrival, L.loc) : '–'}</div></td>
<td align="center" style="color:#1f7a4d;font-size:22px">✈ ⟶</td>
<td align="center" style="padding:18px 8px"><div style="font-size:11px;color:#6a7d72;letter-spacing:.08em">${L.depart}</div><div style="font-size:17px;font-weight:800;color:#0f2219;margin-top:4px">${v.departure ? fmt(v.departure, L.loc) : '–'}</div></td>
</tr></table></td></tr>` : '';

    const quote = v.details
      ? `<p style="margin:12px 0 0;padding:14px 16px;background:#f6f8f6;border-radius:12px;font-size:13px;line-height:1.55;color:#2b3d33">„${esc(v.details).replace(/\n/g, '<br>')}“</p>` : '';

    const tel = v.phone.replace(/[^\d+]/g, '');
    const buttons = customer ? '' : `<tr><td style="padding:22px 30px 10px"><table width="100%"><tr>
<td ${tel ? 'width="50%" style="padding-right:6px"' : ''}><a href="mailto:${esc(v.email)}?subject=${encodeURIComponent('Ihre Trainingslager-Anfrage')}" style="display:block;text-align:center;background:#0b4430;color:#ffffff;font-weight:800;font-size:13px;text-decoration:none;padding:14px 0;border-radius:12px">${L.reply}</a></td>
${tel ? `<td width="50%" style="padding-left:6px"><a href="tel:${esc(tel)}" style="display:block;text-align:center;background:#fff4d6;color:#4a3b0e;font-weight:800;font-size:13px;text-decoration:none;padding:14px 0;border-radius:12px">📞 ${esc(v.phone)}</a></td>` : ''}
</tr></table></td></tr>`;

    const first = esc(v.name.split(/\s+/)[0]);
    const headline = customer
      ? `${L.thanks}, ${first}!<br><span style="color:#1f7a4d">${L.recv}</span>`
      : L.wants;
    const intro = customer ? `<p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#55685e">${L.soon}</p>` : '';
    const badge = customer ? '' : `<td align="right"><span style="background:#e9f4ed;color:#1f7a4d;font-size:11px;font-weight:800;padding:6px 12px;border-radius:99px">${L.new}</span></td>`;
    const person = customer ? '' : `<table cellpadding="0" cellspacing="0"><tr>
<td width="56"><div style="width:52px;height:52px;line-height:52px;text-align:center;border-radius:50%;background-color:#0b4430;color:#ffffff;font-size:18px;font-weight:800">${esc(initials)}</div></td>
<td style="padding-left:14px"><div style="font-size:20px;font-weight:800;color:#0f2219">${esc(v.name)}</div><div style="font-size:13px;color:#6a7d72">${sub}</div></td></tr></table>`;

    return `<!doctype html><html><body style="margin:0;background:#eef2ef;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e5e5">
<tr><td style="padding:28px 30px 0"><table width="100%"><tr><td><span style="font-size:15px;font-weight:800;color:#0b4430;letter-spacing:.05em">FUSSBALLCAMP</span><span style="font-size:11px;color:#e3a213;letter-spacing:.2em"> ANTALYA</span></td>${badge}</tr></table></td></tr>
<tr><td style="padding:26px 30px 6px">${person}<p style="margin:${customer ? '0' : '20px'} 0 0;font-size:26px;line-height:1.25;font-weight:800;color:#0f2219">${headline}</p>${intro}</td></tr>
${dates}
<tr><td style="padding:14px 30px 0"><table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">${rows}</table>${quote}</td></tr>
${buttons}
<tr><td style="padding:18px 30px 26px;font-size:11px;color:#9aa8a0;text-align:center">fussballcamp-antalya.de · ${L.sent}</td></tr>
</table></td></tr></table></body></html>`;
  };

  try {
    await sendMail(env, {
      from, to: [env.NOTIFY_EMAIL], reply_to: v.email,
      subject: `${OWNER.sub} – ${v.club}`,
      html: build(OWNER, false),
    });
  } catch (e) {
    console.error(e);
    return json({ error: 'send_failed' }, 502);
  }

  // Confirmation to the customer; failure here must not fail the request.
  const C = T[lang];
  try {
    await sendMail(env, {
      from, to: [v.email], reply_to: env.NOTIFY_EMAIL, subject: C.subC,
      html: build(C, true),
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
