import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLang } from '../i18n';
import { ANTALYA, QUOTE, STEPS, TRAINING, img } from '../content';
import { Reveal, SectionHead, stagger } from '../ui';

export function Training() {
  const { t } = useLang();
  return (
    <section className="section section-dark" id="trainingsplaetze">
      <div className="pitch-lines" aria-hidden="true" />
      <div className="wrap">
        <SectionHead eyebrow={TRAINING.eyebrow} title={TRAINING.title} text={TRAINING.text} tone="light" />
        <div className="grid3">
          {TRAINING.items.map((item, i) => (
            <Reveal as="article" key={i} delay={stagger(i)} className="glass-card">
              <div className="icon-tile icon-tile-light" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-cta">
          <a className="btn btn-lg" href="#anfrage">
            {t(TRAINING.cta)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Antalya() {
  const { t } = useLang();
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className="section section-sea" id="antalya">
      <div className="wrap">
        <SectionHead eyebrow={ANTALYA.eyebrow} title={ANTALYA.title} text={ANTALYA.text} />
        <div className="destination">
          <Reveal className="destination-photo">
            <div ref={photoRef} className="parallax">
              <motion.img style={{ y }} src={img(ANTALYA.photo.id, 1400)} alt={t(ANTALYA.photo.alt)} loading="lazy" />
            </div>
          </Reveal>
          <div className="facts">
            {ANTALYA.facts.map((f, i) => (
              <Reveal key={i} delay={stagger(i)} className="fact">
                <strong>{t(f.title)}</strong>
                <span>{t(f.text)}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="map-note">
          <div>
            <strong>{t(ANTALYA.map.title)}</strong>
            <p>{t(ANTALYA.map.text)}</p>
          </div>
          <a className="btn btn-dark" href="#anfrage">
            {t(ANTALYA.map.link)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Steps() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });

  return (
    <section className="section" id="ablauf">
      <div className="wrap">
        <SectionHead eyebrow={STEPS.eyebrow} title={STEPS.title} text={STEPS.text} />
        <div className="steps" ref={ref}>
          <div className="track track-x" aria-hidden="true">
            <motion.div className="track-fill" style={{ scaleX: scrollYProgress }} />
          </div>
          <div className="track track-y" aria-hidden="true">
            <motion.div className="track-fill" style={{ scaleY: scrollYProgress }} />
          </div>
          {STEPS.items.map((s, i) => (
            <Reveal as="article" key={i} delay={stagger(i, 0.12)} className="step">
              <div className="step-num" aria-hidden="true">
                {i + 1}
              </div>
              <div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  const { t } = useLang();
  return (
    <section className="section section-soft">
      <div className="wrap">
        <Reveal className="quote">
          <blockquote>{t(QUOTE.quote)}</blockquote>
          <p>{t(QUOTE.sub)}</p>
        </Reveal>
      </div>
    </section>
  );
}
