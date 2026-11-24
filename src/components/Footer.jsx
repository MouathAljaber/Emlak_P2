import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLang } from '../i18n';
import { FOOTER, MOBILE_CTA } from '../content';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h3>{FOOTER.title}</h3>
            <p>{t(FOOTER.about)}</p>
            <a className="btn footer-cta" href="#anfrage">
              {t(FOOTER.cta)}
            </a>
          </div>
          <div>
            <h3>{t(FOOTER.contactTitle)}</h3>
            <p>
              <strong>{FOOTER.company}</strong>
              {FOOTER.address.map((l, i) => (
                <span key={i} className="line">
                  {t(l)}
                </span>
              ))}
            </p>
            <p className="footer-note">{t(FOOTER.reply)}</p>
          </div>
          <div>
            <h3>{t(FOOTER.legalTitle)}</h3>
            <ul className="legal">
              {FOOTER.legal.map(([label, url]) => (
                <li key={url}>
                  <a href={url}>{t(label)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t(FOOTER.guidesTitle)}</h3>
            <ul className="legal">
              {FOOTER.guides.map(([label, url]) => (
                <li key={url.de}>
                  <a href={t(url)}>{t(label)}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Fussballcamp Antalya · {t(FOOTER.copyright)}
        </div>
      </div>
    </footer>
  );
}

export function MobileCta() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById('anfrage');
      const atForm = form && form.getBoundingClientRect().top < window.innerHeight && form.getBoundingClientRect().bottom > 0;
      const foot = document.querySelector('.footer');
      const atFoot = foot && foot.getBoundingClientRect().top < window.innerHeight - 80;
      setShow(window.scrollY > window.innerHeight * 0.7 && !atForm && !atFoot);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mobilecta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <a className="btn btn-lg btn-block" href="#anfrage">
            {t(MOBILE_CTA)}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
