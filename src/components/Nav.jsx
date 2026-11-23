import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useLang } from '../i18n';
import { BRAND, CONTACT, NAV, NAV_CTA, TOPBAR } from '../content';

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleLang = () => setLang(lang === 'de' ? 'en' : 'de');
  const de = lang === 'de';

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />

      <div className="topbar">
        <div className="wrap topbar-inner">
          <span>{t(TOPBAR)}</span>
          <span className="topbar-contact">
            {CONTACT.phone && (
              <>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                <span aria-hidden="true">·</span>
              </>
            )}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </span>
        </div>
      </div>

      <header className={`nav${scrolled || open ? ' is-solid' : ''}`}>
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label={de ? 'Fussballcamp Antalya Startseite' : 'Fussballcamp Antalya home'} onClick={() => setOpen(false)}>
            {BRAND.name}
            <span>{BRAND.tagline}</span>
          </a>

          <nav className="navlinks" aria-label={de ? 'Hauptnavigation' : 'Main navigation'}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="lang" type="button" onClick={toggleLang} aria-label={de ? 'Switch to English' : 'Auf Deutsch wechseln'}>
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a className="btn btn-sm nav-cta" href="#anfrage">
              {t(NAV_CTA)}
            </a>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              type="button"
              aria-label={open ? (de ? 'Menü schließen' : 'Close menu') : de ? 'Menü öffnen' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              className="mobile-menu"
              aria-label={de ? 'Mobile Navigation' : 'Mobile navigation'}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  {t(item.label)}
                </motion.a>
              ))}
              <a className="btn" href="#anfrage" onClick={() => setOpen(false)}>
                {t(NAV_CTA)}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
