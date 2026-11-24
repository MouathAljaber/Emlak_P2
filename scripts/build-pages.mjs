// Generates static, crawlable HTML pages (legal + SEO guides), sitemap.xml and robots.txt into /public.
// Run automatically before `vite build` (see package.json). Content lives in scripts/pages-content.mjs.
import { writeFileSync, mkdirSync } from 'node:fs';
import { COMPANY } from '../src/company.js';
import { PAGES } from './pages-content.mjs';
import { PAGES_EN } from './pages-content-en.mjs';

const OUT = new URL('../public/', import.meta.url);
mkdirSync(OUT, { recursive: true });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const todayISO = new Date().toISOString().slice(0, 10);

const LEGAL = PAGES.filter((p) => p.legal);
const GUIDES = PAGES.filter((p) => !p.legal && !p.noindex);
const GUIDES_EN = PAGES_EN.filter((p) => !p.noindex);
const I18N = {
  de: { prefix: '', home: 'Start', nav: ['Hotels', 'Ratgeber', 'Kosten', 'Anfrage'], faq: 'Häufige Fragen', more: 'Weiterlesen', ctaH: 'Unverbindliches Vereinsangebot anfragen', ctaP: 'Teilt uns Teamgröße, Zeitraum und Wünsche mit – wir melden uns mit einem individuellen Angebot.', ctaB: 'Trainingslager anfragen →', legalNote: '' },
  en: { prefix: '/en', home: 'Home', nav: ['Hotels', 'Guides', 'Costs', 'Enquiry'], faq: 'Frequently asked questions', more: 'Read more', ctaH: 'Request a no-obligation club proposal', ctaP: 'Tell us your squad size, dates and requirements — we will reply with an individual proposal.', ctaB: 'Enquire about a camp →', legalNote: ' (German)' },
};

const layout = (p, lang = 'de') => {
  const L = I18N[lang];
  const base = lang === 'en' ? `${COMPANY.domain}/en` : COMPANY.domain;
  const url = `${base}/${p.slug}`;
  const hasAlt = !p.legal && !p.noindex;
  const altLang = lang === 'de' ? 'en' : 'de';
  const altPath = lang === 'de' ? `/en/${p.slug}` : `/${p.slug}`;
  const hreflang = hasAlt
    ? `<link rel="alternate" hreflang="${lang}" href="${url}"><link rel="alternate" hreflang="${altLang}" href="${COMPANY.domain}${altPath}"><link rel="alternate" hreflang="x-default" href="${COMPANY.domain}/${p.slug}">`
    : '';
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: COMPANY.site, item: `${COMPANY.domain}/` },
    { '@type': 'ListItem', position: 2, name: p.h1, item: url } ] };
  const ld = [crumbs];
  if (hasAlt) ld.push({ '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.description, inLanguage: lang, mainEntityOfPage: url, dateModified: todayISO, author: { '@type': 'Organization', name: COMPANY.site }, publisher: { '@type': 'Organization', name: COMPANY.site } });
  if (p.faq) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
  const faq = p.faq ? `<section><h2>${L.faq}</h2>${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</section>` : '';
  const guides = lang === 'en' ? GUIDES_EN : GUIDES;
  const related = !hasAlt ? '' : `<aside class="related"><h2>${L.more}</h2><ul>${guides.filter((g) => g.slug !== p.slug).map((g) => `<li><a href="${L.prefix}/${g.slug}">${esc(g.h1)}</a></li>`).join('')}</ul></aside>`;
  const cta = !hasAlt ? '' : `<div class="cta"><h2>${L.ctaH}</h2><p>${L.ctaP}</p><a class="btn" href="/#anfrage">${L.ctaB}</a></div>`;
  const switcher = `<a class="langsw" href="${p.legal ? '/' : altPath}" hreflang="${altLang}" lang="${altLang}">${altLang.toUpperCase()}</a>`;
  return `<!doctype html>
<html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${p.noindex ? 'noindex,follow' : 'index,follow'}">
<link rel="canonical" href="${url}">
${hreflang}
<meta name="theme-color" content="#062a1c">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'de_DE'}"><meta property="og:image" content="${COMPANY.domain}/og-image.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/pages.css">
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head><body>
<header class="top"><div class="wrap"><a class="brand" href="/">FUSSBALLCAMP <small>ANTALYA</small></a>
<nav><a href="/#hotels">${L.nav[0]}</a><a href="${L.prefix}/trainingslager-antalya">${L.nav[1]}</a><a href="${L.prefix}/trainingslager-kosten">${L.nav[2]}</a>${p.noindex && !p.legal ? '' : switcher}<a class="btn sm" href="/#anfrage">${L.nav[3]}</a></nav></div></header>
<main class="wrap article"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">${L.home}</a> › <span>${esc(p.h1)}</span></nav>
<h1>${esc(p.h1)}</h1>${p.lead ? `<p class="lead">${p.lead}</p>` : ''}
${p.body(COMPANY)}
${faq}${cta}${related}
</main>
<footer class="foot"><div class="wrap"><div><strong>${esc(COMPANY.site)}</strong><br><a href="mailto:${esc(COMPANY.email)}">${esc(COMPANY.email)}</a></div>
<div>${LEGAL.map((l) => `<a href="/${l.slug}">${esc(l.h1)}${L.legalNote}</a>`).join(' · ')}</div></div></footer>
</body></html>`;
};

mkdirSync(new URL('en/', OUT), { recursive: true });
for (const p of PAGES) writeFileSync(new URL(`${p.slug}.html`, OUT), layout(p, 'de'));
for (const p of PAGES_EN) writeFileSync(new URL(`en/${p.slug}.html`, OUT), layout(p, 'en'));

const urlEntry = (loc, alts = '') => `  <url><loc>${loc}</loc><lastmod>${todayISO}</lastmod>${alts}</url>`;
const alt = (hl, href) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${href}"/>`;
const entries = [urlEntry(`${COMPANY.domain}/`)];
for (const g of GUIDES) {
  const de = `${COMPANY.domain}/${g.slug}`, en = `${COMPANY.domain}/en/${g.slug}`;
  const alts = alt('de', de) + alt('en', en) + alt('x-default', de);
  entries.push(urlEntry(de, alts), urlEntry(en, alts));
}
for (const l of LEGAL) entries.push(urlEntry(`${COMPANY.domain}/${l.slug}`));
writeFileSync(new URL('sitemap.xml', OUT), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
writeFileSync(new URL('robots.txt', OUT), `User-agent: *\nAllow: /\n\nSitemap: ${COMPANY.domain}/sitemap.xml\n`);
console.log(`Generated ${PAGES.length} DE + ${PAGES_EN.length} EN pages + sitemap.xml + robots.txt`);
