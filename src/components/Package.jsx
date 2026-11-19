import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLang } from '../i18n';
import { FAQ, PACKAGE } from '../content';
import { CountUp, Reveal, SectionHead, stagger } from '../ui';

export function Package() {
  const { t } = useLang();
  return (
    <section className="section" id="paketdetails">
      <div className="wrap">
        <SectionHead eyebrow={PACKAGE.eyebrow} title={PACKAGE.title} text={PACKAGE.text} />
        <div className="grid3">
          {PACKAGE.items.map((item, i) => (
            <Reveal as="article" key={i} delay={stagger(i)} className="card">
              <div className="icon-tile" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="scoreboard">
          {PACKAGE.stats.map((s, i) => (
            <div key={i} className="score">
              <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} className="score-num" />
              <span>{t(s.label)}</span>
            </div>
          ))}
        </Reveal>
        <p className="fineprint">{t(PACKAGE.note)}</p>
      </div>
    </section>
  );
}

function FaqItem({ item, open, onToggle, id }) {
  const { t } = useLang();
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span>{t(item.q)}</span>
          <span className="faq-icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{t(item.a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-soft">
      <div className="wrap faq-layout">
        <SectionHead eyebrow={FAQ.eyebrow} title={FAQ.title} />
        <Reveal className="faq">
          {FAQ.items.map((item, i) => (
            <FaqItem key={i} id={`faq-${i}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
