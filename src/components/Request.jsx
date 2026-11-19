import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLang } from '../i18n';
import { CONTACT, REQUEST } from '../content';
import { Reveal, SectionHead } from '../ui';

const EMPTY = {
  club: '', team: '', name: '', role: '', email: '', phone: '', arrival: '', departure: '',
  players: '', staff: '', rooms: 'Noch offen', budget: 'Noch offen', details: '', contact_method: 'E-Mail',
};

function Field({ label, full, children }) {
  return (
    <label className={`field${full ? ' full' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function Request({ prefill }) {
  const { t, lang } = useLang();
  const f = REQUEST.fields;
  const [v, setV] = useState(EMPTY);
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

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

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = Object.entries(v)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${REQUEST.options[key] ? optionLabel(key, value) : value}`);
    const subject = `Trainingslager-Anfrage – ${v.club || 'Fußballverein'}`;
    const body = `Neue unverbindliche Anfrage über fussballcamp-antalya.de\n\n${lines.join('\n')}\n\nBitte Datenschutzhinweis und Live-Formularintegration prüfen.`;
    setSent(true);
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <div className="download-icon" aria-hidden="true">📄</div>
            <strong>{t(REQUEST.download.title)}</strong>
            <p>{t(REQUEST.download.text)}</p>
            <a className="btn" href={REQUEST.download.href} download>
              {t(REQUEST.download.button)}
            </a>
          </Reveal>

          <Reveal className="requestbox" delay={0.1}>
            <h2>{t(REQUEST.formTitle)}</h2>
            <p className="requestbox-sub">{t(REQUEST.formText)}</p>
            <form className="formgrid" onSubmit={onSubmit}>
              <Field label={t(f.club)}>
                <input name="club" required autoComplete="organization" value={v.club} onChange={set('club')} />
              </Field>
              <Field label={t(f.team)}>
                <input name="team" required placeholder={t(f.teamPh)} value={v.team} onChange={set('team')} />
              </Field>
              <Field label={t(f.name)}>
                <input name="name" required autoComplete="name" value={v.name} onChange={set('name')} />
              </Field>
              <Field label={t(f.role)}>{select('role')}</Field>
              <Field label={t(f.email)}>
                <input type="email" name="email" required autoComplete="email" value={v.email} onChange={set('email')} />
              </Field>
              <Field label={t(f.phone)}>
                <input type="tel" name="phone" autoComplete="tel" value={v.phone} onChange={set('phone')} />
              </Field>
              <Field label={t(f.arrival)}>
                <input type="date" name="arrival" value={v.arrival} onChange={set('arrival')} />
              </Field>
              <Field label={t(f.departure)}>
                <input type="date" name="departure" min={v.arrival || undefined} value={v.departure} onChange={set('departure')} />
              </Field>
              <Field label={t(f.players)}>
                <input type="number" name="players" min="1" max="150" placeholder={t(f.playersPh)} value={v.players} onChange={set('players')} />
              </Field>
              <Field label={t(f.staff)}>
                <input type="number" name="staff" min="0" max="50" placeholder={t(f.staffPh)} value={v.staff} onChange={set('staff')} />
              </Field>
              <Field label={t(f.rooms)}>{select('rooms')}</Field>
              <Field label={t(f.budget)}>{select('budget')}</Field>
              <Field label={t(f.details)} full>
                <textarea name="details" rows={4} placeholder={t(f.detailsPh)} value={v.details} onChange={set('details')} />
              </Field>
              <Field label={t(f.contactMethod)} full>
                {select('contact_method')}
              </Field>
              <div className="full checkrow">
                <input type="checkbox" id="privacy" required checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <label htmlFor="privacy">{t(f.privacy)}</label>
              </div>
              <div className="full">
                <motion.button className="btn btn-lg" type="submit" whileTap={{ scale: 0.97 }}>
                  {t(REQUEST.submit)}
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
                      ✓ {t(REQUEST.status)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
