// Generates static, crawlable HTML pages (legal + SEO guides), sitemap.xml and robots.txt into /public.
// Run automatically before `vite build` (see package.json). Content lives in scripts/pages-content.mjs.
import { writeFileSync, mkdirSync } from 'node:fs';
import { COMPANY } from '../src/company.js';
import { PAGES } from './pages-content.mjs';

const OUT = new URL('../public/', import.meta.url);
mkdirSync(OUT, { recursive: true });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const todayISO = new Date().toISOString().slice(0, 10);

const LEGAL = PAGES.filter((p) => p.legal);
const GUIDES = PAGES.filter((p) => !p.legal && !p.noindex);

const layout = (p) => {
  const url = `${COMPANY.domain}/${p.slug}`;
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: COMPANY.site, item: `${COMPANY.domain}/` },
    { '@type': 'ListItem', position: 2, name: p.h1, item: url } ] };
  const ld = [crumbs];
  if (!p.legal && !p.noindex) ld.push({ '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.description, inLanguage: 'de', mainEntityOfPage: url, dateModified: todayISO, author: { '@type': 'Organization', name: COMPANY.site }, publisher: { '@type': 'Organization', name: COMPANY.site } });
  if (p.faq) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
  const faq = p.faq ? `<section><h2>Häufige Fragen</h2>${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</section>` : '';
  const related = p.legal || p.noindex ? '' : `<aside class="related"><h2>Weiterlesen</h2><ul>${GUIDES.filter((g) => g.slug !== p.slug).map((g) => `<li><a href="/${g.slug}">${esc(g.h1)}</a></li>`).join('')}</ul></aside>`;
  const cta = p.legal || p.noindex ? '' : `<div class="cta"><h2>Unverbindliches Vereinsangebot anfragen</h2><p>Teilt uns Teamgröße, Zeitraum und Wünsche mit – wir melden uns mit einem individuellen Angebot.</p><a class="btn" href="/#anfrage">Trainingslager anfragen →</a></div>`;
  return `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${p.noindex ? 'noindex,follow' : 'index,follow'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#062a1c">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="de_DE"><meta property="og:image" content="${COMPANY.domain}/og-image.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/pages.css">
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head><body>
<header class="top"><div class="wrap"><a class="brand" href="/">FUSSBALLCAMP <small>ANTALYA</small></a>
<nav><a href="/#hotels">Hotels</a><a href="/trainingslager-antalya">Ratgeber</a><a href="/trainingslager-kosten">Kosten</a><a class="btn sm" href="/#anfrage">Anfrage</a></nav></div></header>
<main class="wrap article"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Start</a> › <span>${esc(p.h1)}</span></nav>
<h1>${esc(p.h1)}</h1>${p.lead ? `<p class="lead">${p.lead}</p>` : ''}
${p.body(COMPANY)}
${faq}${cta}${related}
</main>
<footer class="foot"><div class="wrap"><div><strong>${esc(COMPANY.site)}</strong><br><a href="mailto:${esc(COMPANY.email)}">${esc(COMPANY.email)}</a></div>
<div>${LEGAL.map((l) => `<a href="/${l.slug}">${esc(l.h1)}</a>`).join(' · ')}</div></div></footer>
</body></html>`;
};

for (const p of PAGES) writeFileSync(new URL(`${p.slug}.html`, OUT), layout(p));

const urls = ['', ...GUIDES.filter((g) => !g.noindex).map((g) => g.slug), ...LEGAL.map((l) => l.slug)];
writeFileSync(new URL('sitemap.xml', OUT), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${COMPANY.domain}/${u}</loc><lastmod>${todayISO}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(new URL('robots.txt', OUT), `User-agent: *\nAllow: /\n\nSitemap: ${COMPANY.domain}/sitemap.xml\n`);
console.log(`Generated ${PAGES.length} pages + sitemap.xml + robots.txt`);
