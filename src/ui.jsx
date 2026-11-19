import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { useLang } from './i18n';

export const EASE = [0.22, 1, 0.36, 1];

/** Fades + slides its children up once when they scroll into view. */
export function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Renders a string or an array of strings as stacked lines. */
export function Lines({ value }) {
  const lines = Array.isArray(value) ? value : [value];
  return lines.map((line, i) => (
    <span className="line" key={i}>
      {line}
    </span>
  ));
}

export function SectionHead({ eyebrow, title, text, tone, align, children }) {
  const { t } = useLang();
  return (
    <Reveal className={`sectionhead${tone === 'light' ? ' is-light' : ''}${align === 'center' ? ' is-center' : ''}`}>
      {eyebrow && <div className="eyebrow">{t(eyebrow)}</div>}
      <h2>
        <Lines value={t(title)} />
      </h2>
      {text && <p>{t(text)}</p>}
      {children}
    </Reveal>
  );
}

/** Counts from 0 to `value` once visible. */
export function CountUp({ value, decimals = 0, suffix = '', className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setN });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const fmt = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={className}>
      {fmt.format(n)}
      {suffix}
    </span>
  );
}

export const stagger = (i, base = 0.08) => i * base;
