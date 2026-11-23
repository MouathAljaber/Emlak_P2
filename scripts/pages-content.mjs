import { HOTELS, DETAILS } from '../src/content.js';

const eur = (n) => n.toLocaleString('de-DE') + ' €';
const hotels = HOTELS.list.map((h, i) => {
  const d = DETAILS.rows[i];
  return { name: h.name, area: h.area, dz: h.dz, ez: h.ez, text: h.text.de, pitch: d.training.de, airport: d.airport, terra: d.terra, alt: d.altitude, url: h.link.url };
});
const table = (list) => `<div class="tablewrap"><table><thead><tr><th>Hotel</th><th>Trainingsplatz*</th><th>Flughafen</th><th>DZ p. P./Nacht</th><th>EZ p. P./Nacht</th></tr></thead><tbody>${list.map((h) => `<tr><td><strong>${h.name}</strong></td><td>${h.pitch}</td><td>${h.airport}</td><td>${eur(h.dz)}</td><td>${eur(h.ez)}</td></tr>`).join('')}</tbody></table></div>`;
const cards = (list) => list.map((h) => `<h3>${h.name}</h3><p>${h.text} Richtwert laut Unterlage: Doppelzimmer ${eur(h.dz)}, Einzelzimmer ${eur(h.ez)} pro Person und Nacht. Entfernung zum Trainingsplatz: ${h.pitch}, zum Flughafen Antalya: ${h.airport}. <a href="${h.url}" target="_blank" rel="noopener">Hotelwebsite / Fotos ↗</a></p>`).join('');
const lara = hotels.filter((h) => h.area === 'Lara');
const kundu = hotels.filter((h) => h.area === 'Kundu');
const sorted = [...hotels].sort((a, b) => a.dz - b.dz);
const cheapest = sorted[0], priciest = sorted[sorted.length - 1];
const calc = (persons, nights, rate) => eur(persons * nights * rate);
const PRICE_NOTE = '<p class="note">*Alle Preise und Entfernungen sind Richtwerte aus unserer Angebotsunterlage für den Zeitraum 02.01.–20.02.2027 (Euro pro Person und Nacht). Verfügbarkeit, Saison, Belegung und Leistungsumfang werden im individuellen Angebot bestätigt.</p>';


export const PAGES = [
  {
    slug: 'trainingslager-antalya',
    title: 'Fußball-Trainingslager Antalya: Ratgeber für Vereine | Fussballcamp Antalya',
    description: 'Alles zum Fußball-Trainingslager in Antalya: Trainingsplätze, Hotels in Lara und Kundu, Ablauf, Kosten-Richtwerte und Planung für Vereine und Jugendmannschaften.',
    h1: 'Fußball-Trainingslager in Antalya',
    lead: 'Naturrasen, Hotels am Meer und Organisation aus einer Hand: Warum Antalya für viele Vereine das Ziel der Wintervorbereitung ist – und worauf es bei der Planung ankommt.',
    body: () => `
<h2>Warum Antalya für die Saisonvorbereitung?</h2>
<p>Antalya an der türkischen Riviera verbindet professionelle Trainingsbedingungen mit der Infrastruktur eines großen Urlaubsziels. Für Vereine aus Deutschland ist der Flug kurz, Hotels und Trainingsplätze liegen eng beieinander, und der Alltag aus Training, Regeneration und Teamzeit lässt sich gut takten. Gerade für die Winterpause, wenn zu Hause Kunstrasen, Hallen oder gesperrte Plätze den Trainingsplan bestimmen, ist ein Camp am Mittelmeer eine echte Alternative.</p>
<h2>Trainingsbedingungen</h2>
<p>Unsere Angebotsunterlage beschreibt das Never Give Up Football Center in Lara mit sechs Naturrasenplätzen nach FIFA-Standard, Umkleideräumen, mobilen Toren und Trainingsmaterial. Im Standardpaket sind zwei Trainingseinheiten à 90 Minuten pro Tag vorgesehen. Mehr dazu auf unserer Seite <a href="/trainingsplaetze-antalya">Trainingsplätze in Antalya</a>.</p>
<h2>Die Hotelregionen: Lara und Kundu</h2>
<p>Unsere Hotels liegen in den Feriengebieten <a href="/hotels-lara">Lara</a> und <a href="/hotels-kundu">Kundu</a>. Wir vergleichen derzeit ${hotels.length} Hotels – vom preisbewussten Resort ab ${eur(cheapest.dz)} bis zum Premium-Haus ab ${eur(priciest.dz)} pro Person und Nacht im Doppelzimmer. Alle Hotels bieten Poolanlagen und Resort-Infrastruktur; Verpflegung, Zimmerkategorie und Leistungen bestätigen wir im individuellen Angebot.</p>
${table(sorted)}
${PRICE_NOTE}
<h2>Was im Standardpaket vorgesehen ist</h2>
<ul>
<li>Standardzimmer, Frühstück, Mittag- und Abendessen als Buffet</li>
<li>Zwei Trainingseinheiten à 90 Minuten täglich auf Naturrasen</li>
<li>Wasser am Platz und im Massageraum, Umkleiden, Tore, Trainingsmaterial</li>
<li>Geräteraum, Massageraum, Konferenzraum nach Zeitplan</li>
<li>Fitnessraum, Sauna und Pool, WLAN im Hotel</li>
<li>Wäscheservice für die komplette Sportausrüstung</li>
<li>Transfers zum Trainingsplatz</li>
</ul>
<p>Als Zusatzleistungen sind unter anderem der Transfer Flughafen–Hotel–Flughafen, Eis für Eisbäder und Freundschaftsspiele ausgewiesen. Flüge sind nicht Teil des Standardpakets. Details finden Sie unter <a href="/trainingslager-kosten">Kosten &amp; Preise</a>.</p>
<h2>Für wen eignet sich ein Trainingslager?</h2>
<p>Das Angebot richtet sich an Jugend-, Amateur- und leistungsorientierte Fußballmannschaften. Ob U15-Mannschaft, Kreisliga-Team oder Oberliga-Kader: Trainingsumfang, Unterkunft und Abläufe werden nach Bedarf abgestimmt.</p>
<h2>So läuft die Planung ab</h2>
<p>In vier Schritten zum Angebot: Anfrage senden, Bedarf abstimmen, Angebot erhalten, gemeinsam vorbereiten. Eine praktische Checkliste finden Sie im Beitrag <a href="/trainingslager-planen">Trainingslager planen</a>.</p>`,
    faq: [
      ['Wann ist die beste Reisezeit für ein Trainingslager in Antalya?', 'Unsere Preisangaben beziehen sich auf den Zeitraum 2. Januar bis 20. Februar 2027, also die Wintervorbereitung. Konkrete Termine und Verfügbarkeit stimmen wir individuell mit Ihnen ab.'],
      ['Sind Flüge im Standardpaket enthalten?', 'Nein. Flüge sind nicht Teil des Standardpakets; der Transfer Flughafen–Hotel–Flughafen ist als Zusatzleistung ausgewiesen.'],
    ],
  },
  {
    slug: 'hotels-lara',
    title: 'Hotels in Lara für Fußball-Trainingslager | Fussballcamp Antalya',
    description: `Hotels in Lara (Antalya) für Fußballmannschaften im Vergleich: ${lara.length} Resorts mit Preisen ab ${eur(Math.min(...lara.map((h) => h.dz)))} pro Person/Nacht, Entfernungen zu Trainingsplatz und Flughafen.`,
    h1: 'Hotels in Lara für Trainingslager',
    lead: 'Lara ist das Feriengebiet östlich von Antalya, in dem die meisten unserer Partnerhotels liegen – und in dessen Nähe sich das Trainingszentrum befindet.',
    body: () => `
<h2>Lara im Überblick</h2>
<p>Die Hotelzone Lara reicht entlang der Küste östlich der Stadt Antalya. Für Fußballmannschaften ist sie interessant, weil Hotels und Trainingsplätze nah beieinander liegen und die Resorts auf Gruppen eingestellt sind. Wir führen aktuell ${lara.length} Hotels in Lara im Angebot.</p>
<h2>Hotels in Lara im Vergleich</h2>
${table(lara)}
${PRICE_NOTE}
<h2>Die Hotels im Detail</h2>
${cards(lara)}
<h2>Welches Hotel passt zu meinem Team?</h2>
<p>Entscheidend sind meist drei Fragen: Wie groß ist der Kader (Zimmerbedarf, Einzel- oder Doppelzimmer)? Wie wichtig ist die Nähe zum Trainingsplatz? Und welches Budget pro Person und Nacht ist vorgesehen? Preisbewusste Teams finden in Lara Resorts ab ${eur(Math.min(...lara.map((h) => h.dz)))} im Doppelzimmer, Teams mit höherem Komfortanspruch Häuser bis ${eur(Math.max(...lara.map((h) => h.dz)))}. Wir beraten gern und stimmen die Wahl mit Ihrem Zeitplan und den Transferwegen ab.</p>`,
    faq: [
      ['Wie weit sind die Hotels in Lara vom Trainingsplatz entfernt?', 'Laut Unterlage zwischen ca. 3 km und ca. 8 km, je nach Hotel. Fahrzeiten sind Richtwerte, keine Live-Verkehrsangaben.'],
      ['Gibt es Einzel- und Doppelzimmer?', 'Ja, für jedes Hotel sind Richtwerte für Einzel- und Doppelzimmer pro Person und Nacht angegeben.'],
    ],
  },
  {
    slug: 'hotels-kundu',
    title: 'Hotels in Kundu für Fußball-Trainingslager | Fussballcamp Antalya',
    description: `Hotels in Kundu (Antalya) für Fußball-Trainingslager: ${kundu.map((h) => h.name).join(' und ')} mit Preis-Richtwerten, Entfernungen und Hinweisen zur Auswahl.`,
    h1: 'Hotels in Kundu für Trainingslager',
    lead: 'Kundu liegt am östlichen Rand der Hotelzone, nahe am Flughafen Antalya. Hier finden Teams Häuser für höhere Komfortansprüche.',
    body: () => `
<h2>Kundu im Überblick</h2>
<p>Das Feriengebiet Kundu schließt sich östlich an Lara an. Die Anreise vom Flughafen ist kurz: Für die Hotels in Kundu geben wir in der Unterlage Entfernungen von ca. 12 km zum Flughafen an. Wir führen aktuell ${kundu.length} Hotels der Region im Angebot.</p>
<h2>Hotels in Kundu im Vergleich</h2>
${table(kundu)}
${PRICE_NOTE}
<h2>Die Hotels im Detail</h2>
${cards(kundu)}
<h2>Kundu oder Lara?</h2>
<p>Wer das preisgünstigste Angebot sucht, findet in <a href="/hotels-lara">Lara</a> mehr Auswahl. Kundu eignet sich für Teams, die ein Premium-Resort oder eine besonders kurze Anreise vom Flughafen wünschen. Die konkrete Fahrzeit zum Training hängt von Hotel, Verkehr und Transferplanung ab – im Angebot weisen wir die bestätigten Wege für Ihr Hotel aus.</p>`,
    faq: [
      ['Wie weit ist Kundu vom Flughafen entfernt?', 'Laut Unterlage ca. 12 km für die gelisteten Hotels. Fahrzeiten sind Richtwerte.'],
    ],
  },
  {
    slug: 'trainingsplaetze-antalya',
    title: 'Trainingsplätze in Antalya: Naturrasen & Ausstattung | Fussballcamp Antalya',
    description: 'Naturrasenplätze, Umkleiden, Massage- und Geräteraum: Das Never Give Up Football Center in Lara für Fußball-Trainingslager – Ausstattung und Ablauf.',
    h1: 'Trainingsplätze in Antalya',
    lead: 'Sechs Naturrasenplätze nach FIFA-Standard, zwei Einheiten täglich: So sieht der Trainingsalltag im Camp aus.',
    body: () => `
<h2>Never Give Up Football Center Lara</h2>
<p>Laut unserer Angebotsunterlage trainieren die Teams im Never Give Up Football Center in Lara. Die Anlage umfasst sechs Naturrasenplätze nach FIFA-Standard sowie Umkleideräume, mobile Tore und Trainingsmaterial. Die Kapazität unterscheidet sich je nach Platz und wird bei der Planung mit Ihrem Zeitplan abgestimmt.</p>
<h2>Trainingsrhythmus</h2>
<p>Im beschriebenen Standardpaket sind zwei Einheiten à 90 Minuten pro Tag auf Naturrasen vorgesehen – typischerweise morgens und nachmittags. Dazwischen bleibt Zeit für Mittagessen, Regeneration, Videoanalyse im Konferenzraum (nach Zeitplan) oder Teamaktivitäten.</p>
<h2>Ausstattung rund um den Platz</h2>
<ul>
<li>Sechs Naturrasenplätze, Umkleideräume</li>
<li>Mobile Tore und Trainingsmaterial</li>
<li>Wasser am Platz und im Massageraum</li>
<li>Geräteraum und Massageraum</li>
<li>Konferenzraum nach Zeitplan</li>
<li>Wäscheservice für die komplette Sportausrüstung</li>
<li>Transfers zwischen Hotel und Trainingsplatz</li>
</ul>
<h2>Testspiele und Zusatzleistungen</h2>
<p>Freundschaftsspiele und Eis für Eisbäder sind in der Unterlage als Zusatzleistungen ausgewiesen. Wir klären gemeinsam, welche Spiele sinnvoll sind und wie sie in den Trainingsplan passen.</p>
<h2>Entfernung zwischen Hotel und Platz</h2>
<p>Die Hotels liegen in <a href="/hotels-lara">Lara</a> (ca. 3–8 km zum Platz) und <a href="/hotels-kundu">Kundu</a>. Die Fahrzeiten sind Richtwerte aus der Unterlage; die bestätigten Wege nennen wir im individuellen Angebot.</p>`,
    faq: [
      ['Wie viele Plätze stehen zur Verfügung?', 'Die Unterlage nennt sechs Naturrasenplätze nach FIFA-Standard im Never Give Up Football Center Lara.'],
      ['Sind Trainingseinheiten im Standardpaket enthalten?', 'Ja, zwei Einheiten à 90 Minuten täglich auf Naturrasen sind im Standardpaket vorgesehen.'],
    ],
  },
  {
    slug: 'trainingslager-kosten',
    title: 'Trainingslager Antalya: Kosten & Preise pro Person | Fussballcamp Antalya',
    description: `Was kostet ein Fußball-Trainingslager in Antalya? Preis-Richtwerte von ${eur(cheapest.dz)} bis ${eur(priciest.dz)} pro Person/Nacht, Beispielrechnung, Leistungen und Zusatzkosten.`,
    h1: 'Kosten & Preise für das Trainingslager',
    lead: 'Transparente Richtwerte statt Pauschalversprechen: So setzen sich die Kosten für ein Trainingslager in Antalya zusammen.',
    body: () => `
<h2>Preis-Richtwerte pro Person und Nacht</h2>
<p>Die folgenden Richtwerte stammen aus unserer Angebotsunterlage für den Zeitraum 02.01.–20.02.2027. Sie gelten pro Person und Nacht im Standardpaket.</p>
${table(sorted)}
${PRICE_NOTE}
<h2>Beispielrechnung (Richtwert)</h2>
<p>Eine Gruppe mit 24 Personen (Spieler und Betreuer) bleibt 7 Nächte im Doppelzimmer:</p>
<ul>
<li>Günstigstes Hotel (${cheapest.name}, ${eur(cheapest.dz)}): 24 × 7 × ${eur(cheapest.dz)} = <strong>${calc(24, 7, cheapest.dz)}</strong></li>
<li>Höchstpreisiges Hotel (${priciest.name}, ${eur(priciest.dz)}): 24 × 7 × ${eur(priciest.dz)} = <strong>${calc(24, 7, priciest.dz)}</strong></li>
</ul>
<p>Das ist eine reine Rechenhilfe auf Basis der Richtwerte, kein Angebot. Einzelzimmer, Zusatzleistungen, Flüge und aktuelle Verfügbarkeit verändern die Summe.</p>
<h2>Was ist im Preis enthalten?</h2>
<ul>
<li>Standardzimmer, Frühstück, Mittag- und Abendessen als Buffet</li>
<li>Zwei Trainingseinheiten à 90 Minuten täglich auf Naturrasen</li>
<li>Wasser am Platz und im Massageraum, Umkleiden, Tore, Trainingsmaterial</li>
<li>Fitnessraum, Sauna, Pool, WLAN im Hotel</li>
<li>Wäscheservice für die komplette Sportausrüstung</li>
<li>Transfers zum Trainingsplatz</li>
</ul>
<h2>Zusatzleistungen und was nicht enthalten ist</h2>
<p>Laut Unterlage sind der Transfer Flughafen–Hotel–Flughafen, Eis für Eisbäder und Freundschaftsspiele zusätzlich. Flüge sind nicht im Standardpaket enthalten. Wir weisen alle Positionen im Angebot einzeln aus, damit Sie sauber kalkulieren können.</p>
<h2>Angebot anfragen</h2>
<p>Für ein verbindliches Angebot brauchen wir Zeitraum, Gruppengröße, Zimmerwünsche und Ihr Budget. <a href="/#anfrage">Zur unverbindlichen Anfrage</a>.</p>`,
    faq: [
      ['Sind die Preise verbindlich?', 'Nein. Es sind Orientierungswerte für den Zeitraum 2. Januar bis 20. Februar 2027. Das verbindliche Angebot erhalten Sie nach Ihrer Anfrage.'],
      ['Was kostet der Einzelzimmerzuschlag?', 'Für jedes Hotel nennen wir Richtwerte für Einzel- und Doppelzimmer pro Person und Nacht (siehe Tabelle).'],
    ],
  },
  {
    slug: 'trainingslager-planen',
    title: 'Trainingslager planen: Checkliste für Vereine | Fussballcamp Antalya',
    description: 'Schritt für Schritt zum Trainingslager: Checkliste für Trainer und Vereinsverantwortliche – Zeitraum, Gruppengröße, Hotel, Training, Anreise und Budget.',
    h1: 'Trainingslager planen: die Checkliste',
    lead: 'Ein Trainingslager organisiert sich leichter, wenn die wichtigsten Fragen früh geklärt sind. Diese Checkliste hilft Ihnen dabei.',
    body: () => `
<h2>1. Zeitraum und Dauer festlegen</h2>
<p>Wann passt das Camp in die Saisonplanung? Unsere Preis-Richtwerte beziehen sich auf den Zeitraum 2. Januar bis 20. Februar 2027. Planen Sie Anreise- und Abreisetag so, dass die Mannschaft möglichst viele volle Trainingstage hat.</p>
<h2>2. Gruppengröße und Zimmerbedarf</h2>
<p>Wie viele Spieler, Trainer und Betreuer reisen mit? Doppelzimmer sind günstiger pro Person, Einzelzimmer kosten mehr. Die Cheftrainer-Suite ist laut Unterlage zum Standardzimmerpreis vorgesehen.</p>
<h2>3. Hotel wählen</h2>
<p>Vergleichen Sie <a href="/hotels-lara">Hotels in Lara</a> und <a href="/hotels-kundu">Hotels in Kundu</a> nach Budget, Komfort und Entfernung zum Platz.</p>
<h2>4. Trainingsumfang klären</h2>
<p>Zwei Einheiten à 90 Minuten täglich sind im Standardpaket vorgesehen. Möchten Sie Testspiele, Videoanalyse oder zusätzliche Regeneration? Das planen wir im Zeitplan mit ein – mehr unter <a href="/trainingsplaetze-antalya">Trainingsplätze</a>.</p>
<h2>5. Anreise und Transfers</h2>
<p>Flüge organisieren Vereine in der Regel selbst oder über ein Reisebüro. Transfers Flughafen–Hotel–Flughafen sind als Zusatzleistung buchbar. Bei Anreise mit Fluggepäck lohnt es sich, Sportgepäck und Zeiten früh zu klären.</p>
<h2>6. Budget abstimmen</h2>
<p>Nutzen Sie die Richtwerte unter <a href="/trainingslager-kosten">Kosten &amp; Preise</a> für eine erste Rechnung pro Person.</p>
<h2>7. Anfrage senden und Angebot prüfen</h2>
<p>Mit der <a href="/#anfrage">unverbindlichen Anfrage</a> erhalten Sie ein individuelles Angebot. Prüfen Sie darin besonders Leistungsumfang, Zusatzleistungen, Zahlungsbedingungen und Stornoregelungen.</p>
<h2>Interne Abstimmung im Verein</h2>
<p>Klären Sie früh, wer unterschreibt (vertretungsberechtigte Person, ggf. mit Vereinsstempel), wie Eltern bei Jugendmannschaften informiert werden und welche Unterlagen Spieler benötigen (Reisedokumente, Einverständniserklärungen bei Minderjährigen).</p>`,
    faq: [
      ['Wie früh sollte ich anfragen?', 'So früh wie möglich, damit Hotels und Trainingszeiten für Ihren Wunschzeitraum verfügbar sind. Die Verfügbarkeit bestätigen wir im individuellen Angebot.'],
      ['Brauche ich einen Reisepass?', 'Bitte informieren Sie sich rechtzeitig über die aktuellen Einreisebestimmungen der Türkei für Ihre Staatsangehörigkeit und das Alter der Mitreisenden.'],
    ],
  },
  {
    slug: 'haeufige-fragen',
    title: 'Häufige Fragen zum Trainingslager in Antalya | Fussballcamp Antalya',
    description: 'Antworten auf die häufigsten Fragen zum Fußball-Trainingslager in Antalya: Leistungen, Preise, Flug und Transfer, Hotels, Training und Anfrage.',
    h1: 'Häufige Fragen zum Trainingslager',
    lead: 'Kurz und ehrlich beantwortet – mit Verweis auf die Details in unseren Ratgebern.',
    body: () => `<p>Hier finden Sie Antworten zu Leistungen, Preisen, Anreise und Ablauf. Weitere Informationen: <a href="/trainingslager-antalya">Ratgeber Trainingslager Antalya</a>, <a href="/trainingslager-kosten">Kosten &amp; Preise</a>, <a href="/trainingslager-planen">Checkliste zur Planung</a>.</p>`,
    faq: [
      ['Für welche Mannschaften eignet sich das Angebot?', 'Für Jugend-, Amateur- und leistungsorientierte Fußballmannschaften. Training, Unterkunft und Abläufe werden nach Bedarf abgestimmt.'],
      ['Was ist im Standardpaket enthalten?', 'Standardzimmer, Frühstück, Mittag- und Abendessen als Buffet, zwei Einheiten à 90 Minuten täglich auf Naturrasen, Wasser am Platz und im Massageraum, Umkleiden, Tore, Trainingsmaterial, Geräte- und Massageraum, Konferenzraum nach Zeitplan, Fitnessraum/Sauna/Pool, WLAN, Wäscheservice und Transfers zum Trainingsplatz.'],
      ['Sind Flug und Flughafentransfer inklusive?', 'Flüge sind nicht enthalten. Der Transfer Flughafen–Hotel–Flughafen ist als Zusatzleistung ausgewiesen.'],
      ['Sind die Preise auf der Website verbindlich?', 'Nein. Es sind Orientierungswerte für 2. Januar bis 20. Februar 2027. Das verbindliche Angebot erhalten Sie nach Ihrer Anfrage.'],
      ['Welche Hotels stehen zur Auswahl?', `Aktuell ${hotels.length} Hotels in Lara und Kundu, von ${eur(cheapest.dz)} bis ${eur(priciest.dz)} pro Person und Nacht im Doppelzimmer.`],
      ['Wie viele Trainingsplätze gibt es?', 'Sechs Naturrasenplätze nach FIFA-Standard im Never Give Up Football Center Lara (laut Angebotsunterlage).'],
      ['Wie kann ich ein Angebot anfragen?', 'Über das Formular auf der Startseite. Sie erhalten eine Bestätigung per E-Mail und wir melden uns mit einem individuellen Angebot.'],
      ['Ist die Anfrage verbindlich?', 'Nein, die Anfrage über die Website ist unverbindlich.'],
    ],
  },

  // ---------------- Legal ----------------
  {
    slug: 'impressum', legal: true,
    title: 'Impressum | Fussballcamp Antalya', description: 'Impressum und Kontakt von Fussballcamp Antalya: Anbieterinformationen, Haftungs- und Urheberrechtshinweise.', h1: 'Impressum',
    body: (c) => `
<h2>Anbieter dieser Website</h2>
<p><strong>${c.site}</strong> ist ein Informations- und Anfrageangebot für Fußball-Trainingslager in Antalya, Türkei. Die Website richtet sich an Fußballvereine, Jugend- und Amateurmannschaften.</p>
<h2>Kontakt</h2>
<p>Für Anfragen, Angebote und Rückfragen erreichen Sie uns per E-Mail: <a href="mailto:${c.email}">${c.email}</a>. Alternativ nutzen Sie das <a href="/#anfrage">Anfrageformular</a> auf der Startseite. Wir melden uns in der Regel innerhalb von 24 Stunden.</p>
<h2>Inhalt dieser Website</h2>
<p>Wir prüfen und aktualisieren die Inhalte regelmäßig. Preis-, Entfernungs- und Leistungsangaben sind Richtwerte aus unserer Angebotsunterlage und werden erst im individuellen Angebot verbindlich bestätigt. Eine Haftung für die Vollständigkeit, Richtigkeit und Aktualität der Angaben können wir nicht übernehmen; verbindlich ist ausschließlich das schriftlich bestätigte Angebot.</p>
<h2>Haftung für externe Links</h2>
<p>Diese Website enthält Links zu externen Webseiten, zum Beispiel zu Hotels oder Videoplattformen. Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Links umgehend.</p>
<h2>Urheberrecht</h2>
<p>Texte, Gestaltung und Zusammenstellung dieser Website unterliegen dem Urheberrecht. Eine Vervielfältigung oder Verwendung bedarf unserer vorherigen Zustimmung. Die verwendeten Fotos sind Beispielbilder; sie können von den tatsächlichen Hotels und Trainingsplätzen abweichen. Hotelnamen und Marken gehören den jeweiligen Inhabern.</p>
<h2>Datenschutz</h2>
<p>Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>`,
  },
  {
    slug: 'datenschutz', legal: true,
    title: 'Datenschutzerklärung | Fussballcamp Antalya', description: 'Datenschutzerklärung von Fussballcamp Antalya: Verarbeitung von Anfragedaten, Hosting und Ihre Rechte.', h1: 'Datenschutzerklärung',
    body: (c) => `
<h2>1. Verantwortlicher</h2>
<p>${c.site}<br>E-Mail: <a href="mailto:${c.email}">${c.email}</a></p>
<h2>2. Hosting und Server-Logfiles</h2>
<p>Diese Website wird über Cloudflare (Cloudflare, Inc., USA) ausgeliefert. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browsertyp verarbeitet, um die Seite sicher und stabil bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Cloudflare ist unser Auftragsverarbeiter; Datenübermittlungen in die USA stützen sich auf Standardvertragsklauseln bzw. das EU-US Data Privacy Framework.</p>
<h2>3. Anfrageformular</h2>
<p>Wenn Sie das Formular „Vereinsanfrage“ nutzen, verarbeiten wir die eingegebenen Daten (Verein, Mannschaft, Name, Funktion, E-Mail, Telefon, Reisezeitraum, Gruppengröße, Wünsche und gewünschter Kontaktweg), um Ihre Anfrage zu bearbeiten und ein Angebot zu erstellen (Art. 6 Abs. 1 lit. b DSGVO, vorvertragliche Maßnahmen). Die Daten werden uns per E-Mail zugestellt; zusätzlich senden wir Ihnen eine Bestätigung an die angegebene Adresse. Für den E-Mail-Versand nutzen wir den Dienst Resend (Resend, Inc., USA) als Auftragsverarbeiter. Wir speichern die Daten, solange es für die Bearbeitung nötig ist bzw. gesetzliche Aufbewahrungsfristen bestehen.</p>
<h2>4. Schriftarten, Cookies und Tracking</h2>
<p>Die Schriftarten sind lokal eingebunden; es werden keine Daten an Google Fonts übertragen. Wir setzen derzeit keine Analyse- oder Marketing-Cookies ein. Sollte sich das ändern, holen wir vorher Ihre Einwilligung ein.</p>
<h2>5. Externe Links</h2>
<p>Unsere Seiten verlinken auf externe Angebote (z. B. Hotelwebsites, YouTube). Beim Anklicken gelten die Datenschutzbestimmungen der jeweiligen Anbieter.</p>
<h2>6. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit widerrufen. Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Wenden Sie sich für Anfragen an ${c.email}.</p>
<h2>7. Aktualität</h2>
<p>Stand: ${new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}. Wir passen diese Erklärung an, wenn sich Dienste oder Rechtslage ändern.</p>`,
  },
  {
    slug: 'agb', legal: true,
    title: 'Allgemeine Geschäftsbedingungen | Fussballcamp Antalya', description: 'Allgemeine Geschäftsbedingungen (AGB) für Angebote und Anfragen bei Fussballcamp Antalya.', h1: 'Allgemeine Geschäftsbedingungen',
    body: (c) => `
<h2>1. Geltungsbereich</h2>
<p>Diese AGB gelten für Anfragen, Angebote und Verträge über die Organisation und Vermittlung von Fußball-Trainingslagern (Unterkunft, Training, Transfers und Zusatzleistungen) durch ${c.site} („Anbieter“) für Vereine und Gruppen („Kunde“).</p>
<h2>2. Anfrage und Angebot</h2>
<p>Die Anfrage über die Website ist unverbindlich. Preis-, Entfernungs- und Leistungsangaben auf der Website sind Richtwerte. Ein Vertrag kommt erst durch schriftliche Bestätigung des individuellen Angebots durch beide Seiten zustande. Alle Angebote gelten vorbehaltlich Verfügbarkeit.</p>
<h2>3. Leistungen</h2>
<p>Art und Umfang der Leistungen ergeben sich ausschließlich aus dem bestätigten Angebot. Flüge sind nur enthalten, wenn sie im Angebot ausdrücklich ausgewiesen sind. Zusatzleistungen (z. B. Flughafentransfers, Freundschaftsspiele, Eis für Eisbäder) werden einzeln ausgewiesen.</p>
<h2>4. Preise und Zahlung</h2>
<p>Es gelten die im bestätigten Angebot genannten Preise in Euro. Zahlungsfristen und Anzahlungen werden im Angebot festgelegt.</p>
<h2>5. Änderungen und Stornierung</h2>
<p>Änderungs- und Stornobedingungen werden im jeweiligen Angebot geregelt und richten sich nach den Bedingungen der beteiligten Leistungsträger (z. B. Hotels). Der Kunde erhält diese vor Vertragsschluss.</p>
<h2>6. Mitwirkungspflichten</h2>
<p>Der Kunde stellt sicher, dass alle Teilnehmenden über gültige Reisedokumente verfügen und bei Minderjährigen die erforderlichen Einverständniserklärungen vorliegen. Eine ausreichende Reise- und Sportversicherung liegt in der Verantwortung des Kunden bzw. der Teilnehmenden.</p>
<h2>7. Haftung</h2>
<p>Der Anbieter haftet nach den gesetzlichen Bestimmungen für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit. Bei leichter Fahrlässigkeit haftet er nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vorhersehbaren, typischen Schaden. Für Leistungen Dritter (z. B. Hotels, Transportunternehmen) haftet der jeweilige Leistungsträger im Rahmen der gesetzlichen Regelungen.</p>
<h2>8. Schlussbestimmungen</h2>
<p>Es gilt deutsches Recht. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.</p>`,
  },
];
