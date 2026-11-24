import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLang } from '../i18n';
import { REQUEST } from '../content';
import { Reveal, SectionHead } from '../ui';
import { sanitize, validate } from '../validation';

const EMPTY = {
  club: '', team: '', name: '', role: '', email: '', phone: '', arrival: '', departure: '',
  players: '', staff: '', rooms: 'Noch offen', budget: 'Noch offen', details: '', contact_method: 'E-Mail',
};

function Field({ label, full, error, children }) {
  return (
    <label className={`field${full ? ' full' : ''}`}>
      <span>{label}</span>
      {children}
      {error && (
        <small className="field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}

export default function Request({ prefill }) {
  const { t, lang } = useLang();
  const f = REQUEST.fields;
  const [v, setV] = useState(EMPTY);
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState('idle');
  const sent = state === 'sent';
  const [errors, setErrors] = useState({});
  const CLEAN = { club: sanitize.org, team: sanitize.org, name: sanitize.name, phone: sanitize.phone };
  const set = (k) => (e) => {
    const value = CLEAN[k] ? CLEAN[k](e.target.value) : e.target.value;
    setV((s) => ({ ...s, [k]: value }));
    setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er));
  };
  const err = (k) => (errors[k] ? t(REQUEST.err[errors[k]]) : '');

  // Quick form in the hero → copy its values into this form.
  useEffect(() => {
    if (!prefill) return;
    setV((s) => ({
      ...s,
      club: prefill.club,
      name: prefill.contact,
      email: prefill.email,
      details: s.details || (prefill.period ? t(REQUEST.periodPrefix) + prefill.period : ''),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  const optionLabel = (key, value) => {
    const opt = REQUEST.options[key]?.find((o) => o.value === value);
    return opt ? t(opt.label) : value;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state === 'sending') return;
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector('.field-error')?.closest('label')?.querySelector('input,textarea,select')?.focus();
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...v, lang, website: e.target.website?.value || '' }),
      });
      if (!res.ok) throw new Error(res.status);
      setState('sent');
      setV(EMPTY);
      setAgree(false);
    } catch {
      setState('error');
    }
  };

  const select = (key) => (
    <select name={key} value={v[key]} onChange={set(key)}>
      {REQUEST.options[key].map((o) => (
        <option key={o.value} value={o.value}>
          {t(o.label)}
        </option>
      ))}
    </select>
  );

  return (
    <section className="section section-mint" id="anfrage">
      <div className="wrap">
        <SectionHead eyebrow={REQUEST.eyebrow} title={REQUEST.title} text={REQUEST.text} />
        <div className="request-grid">
          <Reveal className="download-card">
            <div className="download-icon" aria-hidden="true">🗓️</div>
            <strong>{t(REQUEST.download.title)}</strong>
            <p>{t(REQUEST.download.text)}</p>
            <a className="btn" href={REQUEST.download.href}>
              {t(REQUEST.download.button)}
            </a>
          </Reveal>

          <Reveal className="requestbox" delay={0.1}>
            <h2>{t(REQUEST.formTitle)}</h2>
            <p className="requestbox-sub">{t(REQUEST.formText)}</p>
            <form className="formgrid" onSubmit={onSubmit}>
              <Field label={t(f.club)} error={err('club')}>
                <input name="club" required minLength={2} maxLength={80} autoComplete="organization" value={v.club} onChange={set('club')} />
              </Field>
              <Field label={t(f.team)} error={err('team')}>
                <input name="team" required maxLength={40} placeholder={t(f.teamPh)} value={v.team} onChange={set('team')} />
              </Field>
              <Field label={t(f.name)} error={err('name')}>
                <input name="name" required minLength={5} maxLength={60} autoComplete="name" value={v.name} onChange={set('name')} />
              </Field>
              <Field label={t(f.role)}>{select('role')}</Field>
              <Field label={t(f.email)} error={err('email')}>
                <input type="email" name="email" required maxLength={254} autoComplete="email" value={v.email} onChange={set('email')} />
              </Field>
              <Field label={t(f.phone)} error={err('phone')}>
                <input type="tel" name="phone" inputMode="tel" maxLength={25} autoComplete="tel" value={v.phone} onChange={set('phone')} />
              </Field>
              <Field label={t(f.arrival)} error={err('arrival')}>
                <input type="date" name="arrival" min={new Date().toISOString().slice(0, 10)} value={v.arrival} onChange={set('arrival')} />
              </Field>
              <Field label={t(f.departure)} error={err('departure')}>
                <input type="date" name="departure" min={v.arrival || new Date().toISOString().slice(0, 10)} value={v.departure} onChange={set('departure')} />
              </Field>
              <Field label={t(f.players)} error={err('players')}>
                <input type="number" name="players" min="1" max="150" placeholder={t(f.playersPh)} value={v.players} onChange={set('players')} />
              </Field>
              <Field label={t(f.staff)} error={err('staff')}>
                <input type="number" name="staff" min="0" max="50" placeholder={t(f.staffPh)} value={v.staff} onChange={set('staff')} />
              </Field>
              <Field label={t(f.rooms)}>{select('rooms')}</Field>
              <Field label={t(f.budget)}>{select('budget')}</Field>
              <Field label={t(f.details)} full error={err('details')}>
                <textarea name="details" rows={4} maxLength={2000} placeholder={t(f.detailsPh)} value={v.details} onChange={set('details')} />
              </Field>
              <Field label={t(f.contactMethod)} full>
                {select('contact_method')}
              </Field>
              <div className="full checkrow">
                <input type="checkbox" id="privacy" required checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <label htmlFor="privacy">{t(f.privacy)}</label>
              </div>
              <div className="full">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
                <motion.button className="btn btn-lg" type="submit" disabled={state === 'sending'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {state === 'sending' ? t(REQUEST.sending) : t(REQUEST.submit)}
                </motion.button>
                <p className="privacy">{t(REQUEST.hint)}</p>
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      key={lang}
                      className="formstatus"
                      role="status"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span
                        className="checkpop"
                        aria-hidden="true"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.1 }}
                      >
                        ✓
                      </motion.span>{' '}
                      {t(REQUEST.status)}
                    </motion.div>
                  )}
                </AnimatePresence>
                {state === 'error' && (
                  <div className="formstatus" role="alert">
                    {t(REQUEST.error)}
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
