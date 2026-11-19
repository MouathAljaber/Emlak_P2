import { motion } from 'motion/react';
import { useLang } from '../i18n';
import { PARTNER, SERVICES } from '../content';
import { CountUp, Lines, Reveal, SectionHead, stagger } from '../ui';

export function Services() {
  const { t } = useLang();
  return (
    <section className="section" id="leistungen">
      <div className="wrap">
        <SectionHead eyebrow={SERVICES.eyebrow} title={SERVICES.title} text={SERVICES.text} />
        <div className="bento">
          {SERVICES.items.map((item, i) => (
            <Reveal as="article" key={i} delay={stagger(i % 3)} className={`bento-card bento-${i + 1}`}>
              <div className="icon-tile" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partner() {
  const { t } = useLang();
  return (
    <section className="section section-tight">
      <div className="wrap">
        <Reveal className="partner">
          <div className="partner-ring" aria-hidden="true" />
          <div className="partner-num" aria-hidden="true">
            <CountUp value={32} />
          </div>
          <div className="partner-copy">
            <h2>
              <Lines value={t(PARTNER.title)} />
            </h2>
            <p>{t(PARTNER.text)}</p>
          </div>
          <motion.a className="btn btn-lg" href="#anfrage" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            {t(PARTNER.cta)}
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
