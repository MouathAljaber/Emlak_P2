import { useState } from 'react';
import { motion } from 'motion/react';
import { useLang } from '../i18n';
import { HERO, QUICK, TRUST } from '../content';
import { EASE } from '../ui';

function ChalkLines() {
  const draw = (delay) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 2, ease: 'easeInOut', delay }, opacity: { duration: 0.2, delay } },
  });
  return (
    <svg className="chalk" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <motion.line x1="1080" y1="0" x2="1080" y2="900" {...draw(0.3)} />
      <motion.circle cx="1080" cy="450" r="230" {...draw(0.6)} />
      <motion.path d="M1440 170 H1290 V730 H1440" {...draw(0.9)} />
      <motion.path d="M1440 320 H1380 V580 H1440" {...draw(1.1)} />
    </svg>
  );
}

function QuickForm({ onSubmit }) {
  const { t } = useLang();
  const [v, setV] = useState({ club: '', contact: '', email: '', period: '' });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  return (
    <form
      className="quickform"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
    >
      <label>
        <span>{t(QUICK.club)}</span>
        <input name="club" required placeholder={t(QUICK.clubPh)} autoComplete="organization" value={v.club} onChange={set('club')} />
      </label>
      <label>
        <span>{t(QUICK.contact)}</span>
        <input name="contact" required placeholder={t(QUICK.contactPh)} autoComplete="name" value={v.contact} onChange={set('contact')} />
      </label>
      <label>
        <span>{t(QUICK.email)}</span>
        <input type="email" name="email" required placeholder={t(QUICK.emailPh)} autoComplete="email" value={v.email} onChange={set('email')} />
      </label>
      <label>
        <span>{t(QUICK.period)}</span>
        <select name="period" required value={v.period} onChange={set('period')}>
          {QUICK.periodOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {t(o.label)}
            </option>
          ))}
        </select>
      </label>
      <button className="btn btn-block" type="submit">
        {t(QUICK.submit)}
      </button>
      <p className="privacy">{t(QUICK.privacy)}</p>
    </form>
  );
}

function Ticker() {
  const { t } = useLang();
  const items = [...TRUST, ...TRUST];
  return (
    <div className="ticker" aria-label="Highlights">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul className="ticker-group" key={copy} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <li key={i}>
                <span className="ticker-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {t(item.text)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onQuickSubmit }) {
  const { t, lang } = useLang();
  const up = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <ChalkLines />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.div className="eyebrow" {...up(0.1)}>
            {t(HERO.eyebrow)}
          </motion.div>
          <h1>
            {t(HERO.title).map((line, i) => (
              <span className="line-mask" key={`${lang}-${i}`}>
                <motion.span
                  className={`line${i === 1 ? ' accent' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.14 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-text" {...up(0.5)}>
            {t(HERO.text)}
          </motion.p>
          <motion.div className="hero-actions" {...up(0.6)}>
            <a className="btn btn-lg" href="#anfrage">
              {t(HERO.primary)}
            </a>
            <a className="btn btn-lg btn-ghost" href="#leistungen">
              {t(HERO.secondary)}
            </a>
          </motion.div>
          <motion.p className="hero-micro" {...up(0.7)}>
            {t(HERO.micro)}
          </motion.p>
        </div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 48, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
        >
          <h2>{t(QUICK.title)}</h2>
          <p>{t(QUICK.text)}</p>
          <QuickForm onSubmit={onQuickSubmit} />
        </motion.div>
      </div>
      <Ticker />
    </section>
  );
}
