import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useLang } from '../i18n';
import { DETAILS, GALLERY, HOTELS, img } from '../content';
import { Reveal, SectionHead, stagger } from '../ui';

const AREAS = ['all', 'Lara', 'Kundu'];

function HotelCard({ hotel, cheapest }) {
  const { t } = useLang();
  const ui = HOTELS.ui;
  return (
    <motion.article
      layout
      className="hotel"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hotel-photo">
        <a href={img(hotel.img, 1600)} target="_blank" rel="noopener" aria-label={t(ui.openImage)}>
          <img loading="lazy" src={img(hotel.img)} alt={t(hotel.alt)} />
        </a>
        {cheapest ? (
          <motion.span className="hotel-badge badge-cheap" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
            {t(ui.cheapest)}
          </motion.span>
        ) : (
          hotel.badge && <span className="hotel-badge">{t(hotel.badge)}</span>
        )}
        <span className="hotel-area">{hotel.area} · Antalya</span>
      </div>
      <div className="hotel-body">
        <h3>{hotel.name}</h3>
        <div className="hotel-price">
          <strong>{hotel.dz} €</strong>
          <small>
            {t(ui.perNight)}
            <br />
            {t(ui.double)}
          </small>
        </div>
        <div className="chips">
          <span>
            {t(ui.single)}: {hotel.ez} €
          </span>
          <span>{t(hotel.distance)}</span>
        </div>
        <p>{t(hotel.text)}</p>
        <div className="hotel-links">
          <a className="pill pill-sea" href={hotel.video} target="_blank" rel="noopener">
            {t(ui.video)}
          </a>
          <a className="pill pill-dark" href={hotel.link.url} target="_blank" rel="noopener">
            {t(hotel.link.label)}
          </a>
          <a className="pill pill-outline" href="#anfrage">
            {t(ui.request)}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Hotels() {
  const { t } = useLang();
  const ui = HOTELS.ui;
  const [area, setArea] = useState('all');
  const [sort, setSort] = useState('default');

  const list = useMemo(() => {
    const filtered = HOTELS.list.filter((h) => area === 'all' || h.area === area);
    return sort === 'price' ? [...filtered].sort((a, b) => a.dz - b.dz) : filtered;
  }, [area, sort]);

  const count = (a) => (a === 'all' ? HOTELS.list.length : HOTELS.list.filter((h) => h.area === a).length);

  return (
    <section className="section" id="hotels">
      <div className="wrap">
        <SectionHead eyebrow={HOTELS.eyebrow} title={HOTELS.title} text={HOTELS.text} />

        <Reveal className="toolbar">
          <div className="segmented" role="group" aria-label={t(ui.filterLabel)}>
            <LayoutGroup id="area">
              {AREAS.map((a) => (
                <button key={a} type="button" aria-pressed={area === a} onClick={() => setArea(a)}>
                  {area === a && <motion.span layoutId="seg-bg" className="seg-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="seg-label">
                    {a === 'all' ? t(ui.all) : a} <em>{count(a)}</em>
                  </span>
                </button>
              ))}
            </LayoutGroup>
          </div>
          <label className="sort">
            <span>{t(ui.sortLabel)}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">{t(ui.sortDefault)}</option>
              <option value="price">{t(ui.sortPrice)}</option>
            </select>
          </label>
        </Reveal>

        <motion.div layout className="hotelgrid">
          <AnimatePresence mode="popLayout">
            {list.map((h, i) => (
              <HotelCard key={h.name} hotel={h} cheapest={sort === 'price' && i === 0} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="note">{t(HOTELS.note)}</Reveal>
      </div>
    </section>
  );
}

export function Gallery() {
  const { t } = useLang();
  return (
    <section className="section section-soft" id="galerie">
      <div className="wrap">
        <SectionHead eyebrow={GALLERY.eyebrow} title={GALLERY.title} text={GALLERY.text} />
        <div className="gallery">
          {GALLERY.items.map((g, i) => (
            <Reveal key={g.id} delay={stagger(i)} className={`gallery-item g-${i + 1}`}>
              <a href={img(g.id, 1800)} target="_blank" rel="noopener">
                <img loading="lazy" src={img(g.id, i === 0 ? 1200 : 900)} alt={t(g.alt)} />
                <span>{t(g.label)}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="fineprint">{t(GALLERY.note)}</p>
      </div>
    </section>
  );
}

export function HotelDetails() {
  const { t } = useLang();
  const h = DETAILS.head;
  return (
    <section className="section" id="hotel-details">
      <div className="wrap">
        <SectionHead eyebrow={DETAILS.eyebrow} title={DETAILS.title} text={DETAILS.text} />
        <Reveal className="table-card">
          <div className="table-scroll" tabIndex={0} role="region" aria-label={t(DETAILS.title)}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">{h.hotel}</th>
                  <th scope="col">{t(h.training)}</th>
                  <th scope="col">{t(h.airport)}</th>
                  <th scope="col">{h.terra}</th>
                  <th scope="col">{t(h.altitude)}</th>
                  <th scope="col">{t(h.price)}</th>
                  <th scope="col">{t(h.links)}</th>
                </tr>
              </thead>
              <tbody>
                {DETAILS.rows.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td>{t(r.training)}</td>
                    <td>{r.airport}</td>
                    <td>{r.terra}</td>
                    <td>{r.altitude}</td>
                    <td className="nowrap">
                      {t(h.double)} <strong>{r.dz} €</strong> · {t(h.single)} <strong>{r.ez} €</strong>
                    </td>
                    <td>
                      <div className="table-links">
                        {r.links.map(([label, url]) => (
                          <a key={url} href={url} target="_blank" rel="noopener">
                            {t(label)}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="fineprint">{t(DETAILS.fineprint)}</p>
      </div>
    </section>
  );
}
