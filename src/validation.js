// Strict input rules shared by the website forms and the Cloudflare Worker.
// validate() returns { field: errorCode } – empty object means valid.

const NAME = /^\p{L}[\p{L} .'’-]*$/u; // letters, spaces, . ' ’ -
const ORG = /^(?=.*\p{L})[\p{L}\d &.,'’()/+-]+$/u; // must contain a letter
const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const PHONE = /^\+?[\d\s()/.-]+$/;

const isoDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const todayISO = () => new Date().toISOString().slice(0, 10);

export const sanitize = {
  name: (s) => s.replace(/[^\p{L} .'’-]/gu, ''),
  phone: (s) => s.replace(/[^\d+\s()/.-]/g, ''),
  org: (s) => s.replace(/[^\p{L}\d &.,'’()/+-]/gu, ''),
};

export function validate(v) {
  const e = {};
  const club = (v.club || '').trim();
  const team = (v.team || '').trim();
  const name = (v.name || '').trim().replace(/\s+/g, ' ');
  const email = (v.email || '').trim();
  const phone = (v.phone || '').trim();

  if (club.length < 2 || club.length > 80 || !ORG.test(club)) e.club = 'club';
  if (team.length < 1 || team.length > 40 || !ORG.test(team)) e.team = 'team';
  if (name.length < 5 || name.length > 60 || !NAME.test(name) || name.split(' ').filter((p) => p.length >= 2).length < 2) e.name = 'name';
  if (email.length > 254 || !EMAIL.test(email)) e.email = 'email';
  if (phone) {
    const digits = phone.replace(/\D/g, '').length;
    if (!PHONE.test(phone) || digits < 7 || digits > 15) e.phone = 'phone';
  }
  const arrival = v.arrival || '';
  const departure = v.departure || '';
  if (arrival && (!isoDate(arrival) || arrival < todayISO())) e.arrival = 'arrival';
  if (departure && (!isoDate(departure) || (arrival && departure < arrival) || departure < todayISO())) e.departure = 'departure';
  if (v.players !== '' && v.players != null) {
    const n = Number(v.players);
    if (!Number.isInteger(n) || n < 1 || n > 150) e.players = 'players';
  }
  if (v.staff !== '' && v.staff != null) {
    const n = Number(v.staff);
    if (!Number.isInteger(n) || n < 0 || n > 50) e.staff = 'staff';
  }
  const details = v.details || '';
  if (details.length > 2000 || (details.match(/https?:\/\//gi) || []).length > 2) e.details = 'details';
  return e;
}
