// All page texts in one place.
// A text is either a plain string (same in both languages) or { de, en }.
// Arrays are rendered as separate lines (used for headlines).

export const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

// English for short repeated labels (link labels, badges, image descriptions).
const EN = {
  'Renoviert laut Unterlage': 'Renovated (per brochure)',
  'Preisbewusst': 'Budget-friendly',
  'Neu laut Unterlage': 'New (per brochure)',
  'Lara/Kundu-Region*': 'Lara/Kundu area*',
  'Hotelgalerie ansehen ↗': 'View hotel gallery ↗',
  'Hotelwebsite ↗': 'Hotel website ↗',
  'Offizielle Fotogalerie ↗': 'Official photo gallery ↗',
  'Hotelwebsite / Fotos ↗': 'Hotel website / photos ↗',
  'Offizielle Fotos ↗': 'Official photos ↗',
  'Offizielle Hotelbilder ↗': 'Official hotel images ↗',
  'Hotel-Fotogalerie suchen ↗': 'Search hotel photo gallery ↗',
  'Offizielle Website & Fotos ↗': 'Official website & photos ↗',
  'Hotelvideos ↗': 'Hotel videos ↗',
  'Hotelanlage mit Pool und Palmen – Hotelmotiv': 'Hotel complex with pool and palm trees – illustrative image',
  'Resortpool und Hotelarchitektur – Hotelmotiv': 'Resort pool and hotel architecture – illustrative image',
  'Außenpool eines Ferienresorts – Hotelmotiv': 'Outdoor pool of a holiday resort – illustrative image',
  'Resortanlage mit Garten und Pool – Hotelmotiv': 'Resort with garden and pool – illustrative image',
  'Luxuriöses Resort am Meer – Hotelmotiv': 'Luxury seaside resort – illustrative image',
  'Hotel mit weitläufigem Poolbereich – Hotelmotiv': 'Hotel with a large pool area – illustrative image',
  'Moderne Hotelanlage mit Palmen – Hotelmotiv': 'Modern hotel complex with palm trees – illustrative image',
  'Hotelpool mit Sonnenliegen – Hotelmotiv': 'Hotel pool with sun loungers – illustrative image',
  'Große Ferienanlage mit Poollandschaft – Hotelmotiv': 'Large holiday resort with pool landscape – illustrative image',
  'Grüner Fußballplatz mit Toren': 'Green football pitch with goals',
  'Fußballstadion und Spielfeld': 'Football stadium and pitch',
  'Hotelresort mit Pool und Palmen': 'Hotel resort with pool and palm trees',
  'Türkisblaue Meereswellen und Küste': 'Turquoise sea waves and coastline',
  'Trainingsplatz ansehen ↗': 'View training pitch ↗',
  'Fußballmotiv ansehen ↗': 'View football image ↗',
  'Resortmotiv ansehen ↗': 'View resort image ↗',
  'Meer & Riviera ansehen ↗': 'View sea & Riviera ↗',
};

/** German string → { de, en } using the dictionary above. */
const tr = (s) => ({ de: s, en: EN[s] ?? s });

/** "ca. 4,5 km zum Platz*" / "3 km · ca. 5–6 Min. Bus" → English. */
const dist = (s) => ({
  de: s,
  en:
    EN[s] ??
    s
      .replace(/(\d),(\d)/g, '$1.$2')
      .replace('ca. ', 'approx. ')
      .replace(' Min. Bus', ' min by bus')
      .replace(' km zum Platz', ' km to the pitch'),
});

export const CONTACT = {
  phone: '02203 9424121',
  phoneHref: 'tel:+4922039424121',
  email: 'info@reisegesucht.de',
};

export const TOPBAR = {
  de: '⚽ Trainingslager für Fußballvereine aus ganz Deutschland',
  en: '⚽ Football training camps for clubs across Germany',
};

export const BRAND = { name: 'FUSSBALLCAMP', tagline: 'ANTALYA · TEAM. TRAINING. SONNE.' };

export const NAV = [
  { href: '#leistungen', label: { de: 'Leistungen', en: "What's included" } },
  { href: '#hotels', label: { de: 'Hotels', en: 'Hotels' } },
  { href: '#galerie', label: { de: 'Fotos', en: 'Photos' } },
  { href: '#trainingsplaetze', label: { de: 'Trainingsplätze', en: 'Training pitches' } },
  { href: '#antalya', label: { de: 'Antalya erleben', en: 'Discover Antalya' } },
  { href: '#ablauf', label: { de: "So funktioniert's", en: 'How it works' } },
];
export const NAV_CTA = { de: 'Vereinsangebot anfragen ↗', en: 'Request a club quote ↗' };

export const HERO = {
  eyebrow: { de: 'Wintertrainingslager · Antalya, Türkei', en: 'Winter training camp · Antalya, Türkiye' },
  title: { de: ['Raus aus dem Winter.', 'Rein ins Spiel.'], en: ['Leave winter behind.', 'Get back in the game.'] },
  text: {
    de: 'Perfekte Bedingungen für eure Mannschaft: Naturrasen, professionelle Trainingslogistik, komfortable Hotels und Sonne an der türkischen Riviera. Wir koordinieren euer Trainingslager – damit ihr euch auf das konzentrieren könnt, was zählt: Fußball.',
    en: 'Better conditions for your team: natural grass pitches, professional training logistics, comfortable hotels and sunshine on the Turkish Riviera. We coordinate your camp, so you can focus on what matters: football.',
  },
  primary: { de: 'Jetzt unverbindlich planen →', en: 'Plan your camp — no obligation →' },
  secondary: { de: 'Leistungen entdecken', en: 'Explore the package' },
  micro: {
    de: 'Für Jugend-, Amateur- und leistungsorientierte Mannschaften · Individuell statt von der Stange',
    en: 'For youth, amateur and performance-focused teams · Tailored to your club',
  },
};

export const QUICK = {
  title: { de: 'Euer Trainingslager beginnt mit einer Anfrage.', en: 'Your training camp starts with one enquiry.' },
  text: {
    de: 'Ein paar Angaben genügen. Wir erstellen ein passendes Konzept für Team, Zeitraum und Budget.',
    en: 'Just a few details. We’ll shape a proposal around your team, dates and budget.',
  },
  club: { de: 'Verein / Mannschaft', en: 'Club / team' },
  contact: { de: 'Ansprechpartner', en: 'Contact person' },
  email: { de: 'E-Mail', en: 'Email address' },
  period: { de: 'Gewünschter Zeitraum', en: 'Preferred travel period' },
  periodOptions: [
    { value: '', label: { de: 'Bitte auswählen', en: 'Please select' } },
    { value: 'Winter 2026/27', label: 'Winter 2026/27' },
    { value: 'Winter 2027/28', label: 'Winter 2027/28' },
    { value: 'Flexibel / noch offen', label: { de: 'Flexibel / noch offen', en: 'Flexible / undecided' } },
  ],
  clubPh: { de: 'z. B. FC Musterstadt', en: 'e.g. FC Sampletown' },
  contactPh: { de: 'Vor- und Nachname', en: 'First and last name' },
  emailPh: { de: 'name@verein.de', en: 'name@club.com' },
  submit: { de: 'Passendes Angebot anfragen →', en: 'Request a tailored quote →' },
  privacy: {
    de: 'Unverbindlich und persönlich. Eure Angaben werden zur Bearbeitung der Anfrage verwendet. Die Datenschutzhinweise sind im Footer verlinkt.',
    en: 'No obligation, personal service. Your details are used to respond to your enquiry. The privacy notice is linked in the footer.',
  },
};

export const TRUST = [
  { icon: '⚽', text: { de: '2 × 90 Min. Training pro Tag', en: '2 × 90-minute sessions per day' } },
  { icon: '🌱', text: { de: 'Naturrasen & Trainingslogistik', en: 'Natural grass & training logistics' } },
  { icon: '🏨', text: { de: 'Auswahl an Hotels', en: 'Choice of hotels' } },
  { icon: '🤝', text: { de: '32 Jahre Branchenerfahrung beim Partner', en: '32 years of industry experience at our partner' } },
];

export const SERVICES = {
  eyebrow: { de: 'Alles aus einer Hand', en: 'One team. One plan.' },
  title: { de: ['Ihr plant die Saison.', 'Wir kümmern uns um den Rest.'], en: ['You plan the season.', 'We take care of the rest.'] },
  text: {
    de: 'Von der ersten Anfrage bis zur letzten Trainingseinheit koordinieren wir die Bausteine eures Aufenthalts passend zu Mannschaft, Anforderungen und Budget.',
    en: 'From the first enquiry to the final training session, we coordinate the pieces of your stay around your team, needs and budget.',
  },
  items: [
    {
      icon: '🏟️',
      title: { de: 'Platz für eure Ziele', en: 'Pitches built for progress' },
      text: {
        de: 'Naturrasenplätze, Umkleiden, mobile Tore und Trainingsmaterial – abgestimmt auf euren Trainingsplan und die Verfügbarkeit vor Ort.',
        en: 'Natural grass pitches, changing rooms, portable goals and training equipment — aligned with your schedule and local availability.',
      },
    },
    {
      icon: '🛎️',
      title: { de: 'Komfort nach dem Training', en: 'Comfort after training' },
      text: {
        de: 'Ausgewählte Hotels, Buffetmahlzeiten, WLAN sowie – je nach Hotel – Fitness, Sauna und Pool.',
        en: 'Selected hotels, buffet meals, Wi-Fi and, depending on the hotel, gym, sauna and pool.',
      },
    },
    {
      icon: '🧺',
      title: { de: 'Organisation, die mitdenkt', en: 'Logistics that think ahead' },
      text: {
        de: 'Trainingsplatz-Transfers, Wasser am Platz, Massage- und Geräteraum, Wäscheservice und Unterstützung bei Freundschaftsspielen – je nach Paket.',
        en: 'Transfers to training, water at the pitch, massage and equipment rooms, laundry and friendly-match support — depending on the package.',
      },
    },
    {
      icon: '🍽️',
      title: { de: 'Verpflegung für das Team', en: 'Meals for the whole team' },
      text: {
        de: 'Frühstück, Mittag- und Abendessen als Buffet sowie ein separater Essbereich sind im beschriebenen Standardpaket vorgesehen.',
        en: 'Breakfast, lunch and dinner buffet plus a separate dining area are included in the standard package described in the offer.',
      },
    },
    {
      icon: '🧑‍🏫',
      title: { de: 'Raum für Team und Staff', en: 'Space for team and staff' },
      text: {
        de: 'Eine Suite für den Cheftrainer zum Preis eines Standardzimmers sowie ein Konferenzraum nach Zeitplan – gemäß Angebotsunterlage.',
        en: 'A suite for the head coach at the standard-room rate and a conference room subject to schedule, as described in the offer.',
      },
    },
    {
      icon: '🧭',
      title: { de: 'Persönlich geplant', en: 'Planned around your club' },
      text: {
        de: 'Wir stimmen Aufenthaltsdauer, Zimmermix, Trainingsumfang, Anreise und Extras individuell mit euch ab. Keine Anfrage ist wie die andere.',
        en: 'We tailor length of stay, room mix, training schedule, travel and extras to your club. Every enquiry is different.',
      },
    },
  ],
};

export const PARTNER = {
  title: {
    de: ['32 Jahre Erfahrung.', 'Ein gemeinsames Ziel: euer Camp läuft.'],
    en: ['32 years of experience.', 'One shared goal: a camp that runs smoothly.'],
  },
  text: {
    de: 'Unser Kooperationspartner TSS Tourism bringt mehr als 32 Jahre Branchenerfahrung in die Planung, Koordination und Durchführung von Sportcamps und Gruppenorganisationen ein – mit flexiblem, lösungsorientiertem Service und Betreuung vom ersten Planungsschritt bis zum Abschluss.',
    en: 'Our partner TSS Tourism brings more than 32 years of industry experience in planning, coordinating and delivering sports camps and group travel — with flexible, solution-focused service from the first planning step to the finish.',
  },
  cta: { de: 'Mit uns planen →', en: 'Plan with us →' },
};

const yt = (name) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} Antalya hotel official video`)}`;

export const HOTELS = {
  eyebrow: { de: 'Neun Hotels. Ein Trainingslager nach Maß.', en: 'Nine hotels. One camp tailored to your club.' },
  title: { de: ['Trainieren auf Top-Niveau.', 'Wohnen mit Urlaubsgefühl.'], en: ['Train at your best.', 'Stay in holiday comfort.'] },
  text: {
    de: 'Wählt die Hotelbasis, die zu Teamgröße, Budget und Komfortanspruch passt. Alle Preisangaben stammen aus der bereitgestellten Winter-Camps-Unterlage für 02.01.–20.02.2027 und gelten als Richtwerte pro Person und Nacht.',
    en: 'Choose the hotel base that suits your squad size, budget and comfort level. All rates are from the supplied Winter Camps brochure for 02 Jan–20 Feb 2027 and are indicative per person per night.',
  },
  ui: {
    all: { de: 'Alle Hotels', en: 'All hotels' },
    sortDefault: { de: 'Empfohlen', en: 'Recommended' },
    sortPrice: { de: 'Preis aufsteigend', en: 'Price: low to high' },
    filterLabel: { de: 'Region', en: 'Area' },
    sortLabel: { de: 'Sortieren', en: 'Sort' },
    perNight: { de: 'pro Person/Nacht', en: 'per person/night' },
    double: { de: 'Doppelzimmer', en: 'Double room' },
    single: { de: 'Einzelzimmer', en: 'Single room' },
    video: { de: '▶ Hotelvideo ansehen', en: '▶ Watch hotel video' },
    request: { de: 'Angebot anfragen', en: 'Request a quote' },
    openImage: { de: 'Hotelbild in voller Größe öffnen', en: 'Open full-size hotel image' },
  },
  list: [
    {
      name: 'Fame Residence Lara', area: 'Lara', dz: 95, ez: 145, distance: 'ca. 4,5 km zum Platz*',
      badge: 'Renoviert laut Unterlage', img: '1571896349842-33c89424de2d', alt: 'Hotelanlage mit Pool und Palmen – Hotelmotiv',
      text: {
        de: 'In der Angebotsunterlage als neu renoviert gekennzeichnet. Eine Option für Teams, die eine komfortable Hotelbasis nahe den Trainingsplätzen suchen.',
        en: 'Marked as newly renovated in the offer brochure. An option for teams seeking a comfortable hotel base near the training pitches.',
      },
      link: { label: 'Hotelgalerie ansehen ↗', url: 'https://famehotels.com/fame-residence-lara-spa/galeri' },
    },
    {
      name: 'Concorde De Luxe Resort', area: 'Lara', dz: 105, ez: 158, distance: 'ca. 4 km zum Platz*',
      img: '1566073771259-6a8506099945', alt: 'Resortpool und Hotelarchitektur – Hotelmotiv',
      text: {
        de: 'Komfortorientierte Resort-Option in Lara. Die Unterlage führt den Preis als mittleres bis gehobenes Angebot im Hotelportfolio.',
        en: 'A comfort-focused resort option in Lara. The brochure lists it among the mid-to-upper priced options in the hotel portfolio.',
      },
      link: { label: 'Hotelwebsite ↗', url: 'https://www.concordehotels.com.tr/' },
    },
    {
      name: 'Ramada Resort Lara', area: 'Lara', dz: 75, ez: 112, distance: 'ca. 3 km zum Platz*',
      badge: 'Preisbewusst', img: '1576013551627-0cc20b96c2a7', alt: 'Außenpool eines Ferienresorts – Hotelmotiv',
      text: {
        de: 'Eine der preisgünstigsten Optionen der Liste. Laut Hotelwebsite gehören unter anderem Pool- und Strandangebote zum Resort; konkrete Leistungen bitte für den Reisezeitraum bestätigen.',
        en: "One of the most affordable options in the list. The hotel's website highlights pool and beach facilities; confirm specific services for your travel dates.",
      },
      link: { label: 'Offizielle Fotogalerie ↗', url: 'https://ramadaresortlara.com/en/gallery' },
    },
    {
      name: 'Swandor Topkapı Palace', area: 'Kundu', dz: 85, ez: 128, distance: 'Lara/Kundu-Region*',
      img: '1582719508461-905c673771fd', alt: 'Resortanlage mit Garten und Pool – Hotelmotiv',
      text: {
        de: 'Resort im Stil eines Palastkomplexes. Interessant für Vereine, die neben dem Sport ein besonderes Hotelambiente wünschen.',
        en: 'A resort inspired by a palace complex. An option for clubs looking for a distinctive hotel atmosphere alongside training.',
      },
      link: { label: 'Offizielle Fotogalerie ↗', url: 'https://www.swandorhotels.com/swandor-topkapi-palace/gallery' },
    },
    {
      name: 'Voyage Kundu', area: 'Kundu', dz: 150, ez: 225, distance: 'ca. 8 km zum Platz*',
      badge: 'Neu laut Unterlage', img: '1542314831-068cd1dbfeeb', alt: 'Luxuriöses Resort am Meer – Hotelmotiv',
      text: {
        de: 'Als neues Hotel in der Unterlage aufgeführt und die hochpreisigste Option der Liste. Für Teams mit entsprechendem Komfort- und Budgetanspruch.',
        en: 'Listed as a new hotel in the brochure and the highest-priced option in the list. Suited to clubs with a matching comfort and budget preference.',
      },
      link: { label: 'Hotelwebsite / Fotos ↗', url: 'https://www.voyagehotel.com/' },
    },
    {
      name: 'Club Hotel Sera', area: 'Lara', dz: 75, ez: 112, distance: 'ca. 8 km zum Platz*',
      img: '1564501049412-61c2a3083791', alt: 'Hotel mit weitläufigem Poolbereich – Hotelmotiv',
      text: {
        de: 'Preislich attraktive Hotelalternative in Lara. Die konkrete Zimmerkategorie, Verpflegung und Verfügbarkeit werden im individuellen Angebot bestätigt.',
        en: 'A competitively priced hotel alternative in Lara. Room category, meal plan and availability will be confirmed in the individual proposal.',
      },
      link: { label: 'Hotelwebsite / Fotos ↗', url: 'https://www.clubhotelsera.com.tr/' },
    },
    {
      name: 'Liberty Lara', area: 'Lara', dz: 90, ez: 135, distance: 'ca. 8 km zum Platz*',
      img: '1578774204375-826dc5d996ed', alt: 'Moderne Hotelanlage mit Palmen – Hotelmotiv',
      text: {
        de: 'Eine weitere 5-Sterne-Option für Mannschaften, die eine Resortumgebung mit Strand- und Freizeitmöglichkeiten bevorzugen.',
        en: 'Another 5-star option for teams preferring a resort setting with beach and leisure facilities.',
      },
      link: { label: 'Hotelwebsite / Fotos ↗', url: 'https://www.libertyhotels.com/' },
    },
    {
      name: 'Miracle Resort', area: 'Lara', dz: 110, ez: 165, distance: 'ca. 8 km zum Platz*',
      img: '1571003123894-1f0594d2b5d9', alt: 'Hotelpool mit Sonnenliegen – Hotelmotiv',
      text: {
        de: 'Komfortoption im oberen Preisbereich. Eignet sich für Vereine, die Trainingsbetrieb mit Erholung und Resortkomfort verbinden möchten.',
        en: 'A comfort option in the upper price range, for clubs looking to combine training with recovery and resort facilities.',
      },
      link: { label: 'Hotelwebsite / Fotos ↗', url: 'https://www.miraclehotel.com.tr/' },
    },
    {
      name: 'Titanic Deluxe Lara', area: 'Lara', dz: 110, ez: 165, distance: 'ca. 8 km zum Platz*',
      img: '1568084680786-a84f91d1153c', alt: 'Große Ferienanlage mit Poollandschaft – Hotelmotiv',
      text: {
        de: 'Große Resortanlage mit vielfältigen Freizeit- und Wellnessbereichen. Hotelgalerie und genaue Leistungen direkt beim Anbieter ansehen.',
        en: "A large resort with a variety of leisure and wellness areas. See the hotel's gallery and confirm specific services with the provider.",
      },
      link: { label: 'Offizielle Fotogalerie ↗', url: 'https://www.titanic.com.tr/titanic-deluxe-lara/gallery' },
    },
  ].map((h) => ({
    ...h,
    video: yt(h.name),
    badge: h.badge && tr(h.badge),
    distance: dist(h.distance),
    alt: tr(h.alt),
    link: { ...h.link, label: tr(h.link.label) },
  })),
  note: {
    de: 'Sterne: Alle neun Hotels sind in der bereitgestellten Angebotsunterlage als Hotels aufgeführt; die Sterne zeigen diese Angabe und sind keine unabhängige aktuelle Klassifizierungsprüfung. Die Video-Schaltfläche öffnet eine YouTube-Suche nach Hotelvideos, nicht ein einzeln verifiziertes offizielles Video. Wichtig: Die eingeblendeten Hotelbilder dienen in dieser Entwurfsfassung als stimmungsvolle Bildmotive und sind nicht als verifizierte Originalfotos des jeweils genannten Hotels gekennzeichnet. Die Links führen – soweit verfügbar – zu Hotelwebsites bzw. offiziellen Galerien. Vor Veröffentlichung sollten Originalfotos mit Nutzungsrechten eingebunden werden. Entfernungen zum Trainingszentrum sind je nach Hotel und Route zu bestätigen. *Preiszeitraum der PDF: 02.01.–20.02.2027. Flughafentransfer, Eis für Eisbäder und Freundschaftsspiele sind laut Unterlage Zusatzleistungen.',
    en: 'Important: The hotel images in this draft are atmospheric illustrative imagery, not verified original photos of each named hotel. Links lead to hotel websites or official galleries where available. Before publication, replace these with original images cleared for use. Distances to the training centre must be confirmed by hotel and route. *Brochure rate period: 02 Jan–20 Feb 2027. Airport transfers, ice for ice baths and friendly matches are listed as extras.',
  },
};

export const GALLERY = {
  eyebrow: { de: 'Bilder & Eindrücke', en: 'Photos & impressions' },
  title: { de: 'Fußball, Sonne und Mittelmeer', en: 'Football, sun and the Mediterranean' },
  text: {
    de: 'Ein erster Eindruck von Trainingsplätzen, Hotelanlagen und der türkischen Riviera. Tippe auf ein Bild, um es größer zu öffnen. Die Hotelkarten oben verlinken zusätzlich zu Hotelgalerien und Videotreffern.',
    en: 'A first look at the training pitches, hotel resorts and the Turkish Riviera. Tap an image to open it larger. The hotel cards above also link to hotel galleries and video results.',
  },
  items: [
    { id: '1522778119026-d647f0596c20', alt: 'Grüner Fußballplatz mit Toren', label: 'Trainingsplatz ansehen ↗' },
    { id: '1518604666860-9ed391f76460', alt: 'Fußballstadion und Spielfeld', label: 'Fußballmotiv ansehen ↗' },
    { id: '1571896349842-33c89424de2d', alt: 'Hotelresort mit Pool und Palmen', label: 'Resortmotiv ansehen ↗' },
    { id: '1500375592092-40eb2168fd21', alt: 'Türkisblaue Meereswellen und Küste', label: 'Meer & Riviera ansehen ↗' },
  ].map((g) => ({ ...g, alt: tr(g.alt), label: tr(g.label) })),
  note: {
    de: 'Hinweis: Die Galerie nutzt illustrative Bildmotive von Unsplash und keine garantierten Originalaufnahmen der jeweiligen Hotels oder des konkreten Trainingszentrums. Vor Veröffentlichung Bildrechte und Bildquellen prüfen.',
    en: 'Note: The gallery uses illustrative images from Unsplash, not guaranteed original photos of the hotels or the actual training centre. Check image rights and sources before publication.',
  },
};

export const DETAILS = {
  eyebrow: { de: 'Hotelwahl mit Überblick', en: 'Compare the hotels' },
  title: { de: 'Entfernungen, Lage und offizielle Fotogalerien', en: 'Distances, location and official photo galleries' },
  text: {
    de: 'Die folgenden Distanzen stammen aus der PDF. Die Entfernungen beziehen sich auf den Trainingsplatz, den Flughafen Antalya und das Einkaufszentrum TerraCity. Fahrzeiten sind Richtwerte aus der Unterlage, keine Live-Verkehrsangaben.',
    en: 'The following distances are taken from the PDF. They refer to the training pitch, Antalya Airport and the TerraCity shopping centre. Travel times are reference values from the brochure, not live traffic data.',
  },
  head: {
    hotel: 'Hotel',
    training: { de: 'Trainingsplatz', en: 'Training pitch' },
    airport: { de: 'Flughafen', en: 'Airport' },
    terra: 'TerraCity',
    altitude: { de: 'Höhenlage', en: 'Elevation' },
    price: { de: 'Preis pro Person/Nacht', en: 'Price per person/night' },
    links: { de: 'Fotos & Videos', en: 'Photos & videos' },
    double: { de: 'DZ', en: 'Double' },
    single: { de: 'EZ', en: 'Single' },
  },
  rows: [
    ['Fame Residence Lara', '4,5 km · ca. 6 Min. Bus', '8 km', '8 km', '40 m', 95, 145, [['Offizielle Fotos ↗', 'https://famehotels.com/fame-residence-lara-spa/galeri'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Fame+Residence+Lara+official+hotel+video']]],
    ['Concorde De Luxe Lara', '4 km', '9 km', '9 km', '40 m', 105, 158, [['Offizielle Hotelbilder ↗', 'https://concordehotels.com/de/hotels/concorde-de-luxe-resort'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Concorde+De+Luxe+Resort+Lara+official+video']]],
    ['Ramada Resort Lara', '3 km · ca. 5–6 Min. Bus', '9 km', '7 km', '40 m', 75, 112, [['Hotel-Fotogalerie suchen ↗', 'https://www.google.com/search?q=Ramada+Resort+Lara+official+gallery'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Ramada+Resort+Lara+Antalya+hotel+video']]],
    ['Swandor Topkapı Palace', '8 km', '12 km', '13 km', '40 m', 85, 128, [['Offizielle Website & Fotos ↗', 'https://www.swandorhotels.com/'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Swandor+Topkapi+Palace+official+hotel+video']]],
    ['Voyage Kundu', '8 km · ca. 12 Min. Bus', '12 km', '12 km', '30 m', 150, 225, [['Hotel-Fotogalerie suchen ↗', 'https://www.google.com/search?q=Voyage+Kundu+Antalya+official+hotel+gallery'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Voyage+Kundu+Antalya+hotel+video']]],
    ['Club Hotel Sera Lara', '8 km · ca. 12 Min. Bus', '9 km', '5 km', '20 m', 75, 112, [['Hotel-Fotogalerie suchen ↗', 'https://www.google.com/search?q=Club+Hotel+Sera+official+gallery'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Club+Hotel+Sera+Antalya+hotel+video']]],
    ['Liberty Lara', '6 km · ca. 8 Min. Bus', '13 km', '12 km', '20 m', 90, 135, [['Hotel-Fotogalerie suchen ↗', 'https://www.google.com/search?q=Liberty+Lara+official+hotel+gallery'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Liberty+Lara+Antalya+hotel+video']]],
    ['Miracle Resort Lara', '3,8 km · ca. 5 Min. Bus', '8 km', '6 km', '30 m', 110, 165, [['Offizielle Fotogalerie ↗', 'https://miraclehotel.com/en/gallery/'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Miracle+Resort+Lara+official+hotel+video']]],
    ['Titanic Deluxe Lara', '4 km · ca. 6–7 Min. Bus', '8 km', '8 km', '35 m', 110, 165, [['Offizielle Fotogalerie ↗', 'https://www.titanic.com.tr/titanic-deluxe-lara/gallery'], ['Hotelvideos ↗', 'https://www.youtube.com/results?search_query=Titanic+Deluxe+Lara+official+hotel+video']]],
  ].map(([name, training, airport, terra, altitude, dz, ez, links]) => ({
    name,
    training: dist(training),
    airport,
    terra,
    altitude,
    dz,
    ez,
    links: links.map(([label, url]) => [tr(label), url]),
  })),
  fineprint: {
    de: 'Alle Preise sind Richtwerte laut Unterlage für den Zeitraum 02.01.–20.02.2027, in Euro pro Person und Nacht. Aktuelle Verfügbarkeit, Saison, Zimmerbelegung und Leistungsumfang müssen individuell bestätigt werden.',
    en: 'All prices are reference values from the brochure for 02 Jan–20 Feb 2027, in euros per person per night. Current availability, season, room occupancy and services must be confirmed individually.',
  },
};

export const TRAINING = {
  eyebrow: { de: 'Fokus auf dem Platz', en: 'Focus on the pitch' },
  title: { de: ['Sechs Naturrasenplätze.', 'Ein gemeinsames Ziel.'], en: ['Six natural-grass pitches.', 'One shared goal.'] },
  text: {
    de: 'Das Never Give Up Football Center Lara wird in der Angebotsunterlage mit sechs FIFA-Standard-Naturrasenplätzen, Umkleideräumen, mobilen Toren und Trainingsmaterial beschrieben. Im Standardpaket sind zwei Trainingseinheiten à 90 Minuten täglich sowie Transfers zu den Trainingsplätzen vorgesehen.',
    en: "The PDF names Never Give Up Football Center in Lara, with six FIFA-standard natural-grass pitches. Training and transfers are coordinated around your team's schedule.",
  },
  items: [
    {
      icon: '🌱',
      title: { de: '6 Naturrasenplätze', en: '6 natural-grass pitches' },
      text: {
        de: 'Laut Unterlage: sechs FIFA-Standard-Naturrasenplätze, Umkleideräume, mobile Tore und Trainingsmaterial.',
        en: 'The brochure lists six pitches with changing rooms; capacity varies by pitch.',
      },
    },
    {
      icon: '⏱️',
      title: { de: '2 × 90 Minuten täglich', en: '2 × 90 minutes daily' },
      text: {
        de: 'Zwei Trainingseinheiten auf Naturrasen pro Tag sind im beschriebenen Standardpaket vorgesehen.',
        en: 'Two daily natural-grass training sessions are listed in the standard package.',
      },
    },
    {
      icon: '🧳',
      title: { de: 'Mehr als Training', en: 'More than training' },
      text: {
        de: 'Geräteraum, Massageraum, Konferenzraum nach Zeitplan und Wäscheservice für die komplette Sportausrüstung sind in der Unterlage genannt.',
        en: 'The brochure lists an equipment room, massage room, conference room subject to schedule and laundry for the full sports kit.',
      },
    },
  ],
  cta: { de: 'Trainingslager individuell planen →', en: 'Plan a tailored training camp →' },
};

export const ANTALYA = {
  eyebrow: { de: 'Sport trifft Riviera', en: 'Football meets the Riviera' },
  title: {
    de: ['Antalya: Trainingsfokus am Tag.', 'Riviera-Gefühl danach.'],
    en: ['Antalya: training focus by day.', 'Riviera feeling afterwards.'],
  },
  text: {
    de: 'Antalya verbindet Trainingsmöglichkeiten mit Meer, Palmen, Gastronomie und Ausflügen. So wird aus der Saisonvorbereitung ein gemeinsames Erlebnis für Spieler, Trainer und Betreuer.',
    en: 'Antalya combines training opportunities with the sea, palm trees, food and excursions — making pre-season preparation a shared experience for players, coaches and staff.',
  },
  photo: { id: '1533105079780-92b9be482077', alt: { de: 'Türkische Riviera mit Meer und Küste', en: 'Turkish Riviera with sea and coastline' } },
  facts: [
    { title: { de: '☀️ Mildes Winterklima', en: '☀️ Mild winter climate' }, text: { de: 'Die genauen Temperaturen sind reisezeitabhängig; Wetter bitte vor Abreise prüfen.', en: 'Exact temperatures depend on dates; check the forecast before travel.' } },
    { title: { de: '🌊 Meer & Strände', en: '🌊 Sea & beaches' }, text: { de: 'Zeit für Regeneration und gemeinsame Momente nach dem Training.', en: 'Time to recover and share moments after training.' } },
    { title: { de: '🏛️ Altstadt Kaleiçi', en: '🏛️ Kaleiçi old town' }, text: { de: 'Historische Gassen, Hafen und Kultur als mögliche Freizeitoption.', en: 'Historic streets, harbour and culture as a possible leisure option.' } },
    { title: { de: '🍽️ Essen & Teamabend', en: '🍽️ Food & team evenings' }, text: { de: 'Lokale Küche und gemeinsame Abende ergänzen das Sportprogramm.', en: 'Local food and shared evenings complement the sports programme.' } },
  ],
  map: {
    title: { de: 'Lage und Wege transparent planen', en: 'Plan locations and transfers clearly' },
    text: {
      de: 'Die Hotels liegen in den Feriengebieten Lara und Kundu. Die konkrete Fahrzeit zum Trainingszentrum und zum Flughafen hängt von Hotel, Verkehr und Transferplanung ab. Im Angebot weisen wir die bestätigten Wege für eure gewählte Unterkunft aus.',
      en: 'The hotels are in the Lara and Kundu resort areas. Exact travel time to the training centre and airport depends on hotel, traffic and transfer arrangements. The proposal will confirm routes for your selected accommodation.',
    },
    link: { de: 'Hotel und Transfer gemeinsam abstimmen →', en: 'Discuss hotel and transfers →' },
  },
};

export const STEPS = {
  eyebrow: { de: 'Einfach zum Angebot', en: 'From enquiry to proposal' },
  title: { de: 'Vier Schritte. Ein starkes Teamgefühl.', en: 'Four steps. One stronger team.' },
  text: {
    de: 'Wir halten die Planung übersichtlich – mit einem klaren Ansprechpartner und einem Konzept, das zu eurer Mannschaft passt.',
    en: 'We keep planning straightforward, with one clear point of contact and a proposal built around your team.',
  },
  items: [
    { title: { de: 'Anfrage senden', en: 'Send an enquiry' }, text: { de: 'Teilt uns Teamgröße, Zeitraum und Wünsche mit.', en: 'Tell us your squad size, dates and requirements.' } },
    { title: { de: 'Bedarf abstimmen', en: 'Discuss your needs' }, text: { de: 'Wir klären Unterkunft, Training, Anreise und Extras.', en: 'We clarify accommodation, training, travel and extras.' } },
    { title: { de: 'Angebot erhalten', en: 'Receive your proposal' }, text: { de: 'Ihr bekommt eine nachvollziehbare, individuell passende Kalkulation.', en: 'You receive a transparent proposal tailored to your club.' } },
    { title: { de: 'Gemeinsam vorbereiten', en: 'Prepare together' }, text: { de: 'Nach Freigabe koordinieren wir die vereinbarten Leistungen.', en: 'Once approved, we coordinate the agreed services.' } },
  ],
};

export const QUOTE = {
  quote: {
    de: '„Das Trainingslager soll euch sportlich weiterbringen – und organisatorisch entlasten.“',
    en: '“Your training camp should move the team forward — without adding to your workload.”',
  },
  sub: {
    de: 'Individuell geplant für euren Verein. Transparent abgestimmt. Professionell organisiert.',
    en: 'Tailored to your club. Clearly agreed. Professionally coordinated.',
  },
};

export const REQUEST = {
  eyebrow: { de: 'Euer nächstes Trainingslager', en: 'Your next training camp' },
  title: { de: 'Erzählt uns, was eure Mannschaft braucht.', en: 'Tell us what your team needs.' },
  text: {
    de: 'Je genauer eure Angaben, desto passender können wir planen. Die Anfrage ist unverbindlich.',
    en: 'The more detail you share, the better we can tailor the proposal. No obligation.',
  },
  download: {
    title: { de: 'Anmeldeformular für den Verein', en: 'Registration form for your club' },
    text: {
      de: 'Ihr könnt das Formular herunterladen, ausfüllen und von einer vertretungsberechtigten Person unterschreiben sowie mit Vereinsstempel versehen lassen. Die Anfrage über diese Landingpage bleibt unverbindlich.',
      en: 'You can download the form, fill it in and have it signed by an authorised club representative and stamped with the club stamp. Enquiries via this landing page remain non-binding.',
    },
    button: { de: '📄 Anmeldeformular herunterladen (PDF)', en: '📄 Download registration form (PDF)' },
    href: 'Anmeldeformular_Fussballcamp_Antalya.pdf',
  },
  formTitle: { de: 'Vereinsanfrage', en: 'Club enquiry' },
  formText: { de: 'Wir melden uns zur Abstimmung der Details.', en: 'We’ll get in touch to discuss the details.' },
  fields: {
    club: { de: 'Verein *', en: 'Club *' },
    team: { de: 'Mannschaft / Altersklasse *', en: 'Team / age group *' },
    teamPh: { de: 'z. B. 1. Herren, U17', en: 'e.g. first team, U17' },
    name: { de: 'Vor- und Nachname *', en: 'Full name *' },
    role: { de: 'Funktion im Verein', en: 'Role at the club' },
    email: { de: 'E-Mail *', en: 'Email *' },
    phone: { de: 'Telefon', en: 'Phone' },
    arrival: { de: 'Gewünschte Anreise ab', en: 'Preferred arrival date' },
    departure: { de: 'Gewünschte Abreise bis', en: 'Preferred departure date' },
    players: { de: 'Anzahl Spieler', en: 'Number of players' },
    playersPh: { de: 'z. B. 24', en: 'e.g. 24' },
    staff: { de: 'Anzahl Trainer / Betreuer', en: 'Coaches / staff' },
    staffPh: { de: 'z. B. 4', en: 'e.g. 4' },
    rooms: { de: 'Zimmerwunsch', en: 'Room preference' },
    budget: { de: 'Budget pro Person (optional)', en: 'Budget per person (optional)' },
    details: { de: 'Was ist euch wichtig? (optional)', en: 'What matters most to your team? (optional)' },
    detailsPh: {
      de: 'Hotel, Trainingsumfang, Flug/Transfer, Testspiele, besondere Anforderungen …',
      en: 'Hotel, training volume, flights/transfers, friendlies, special requirements …',
    },
    contactMethod: { de: 'Wie möchtet ihr kontaktiert werden?', en: 'How should we contact you?' },
    privacy: { de: 'Ich habe die Datenschutzhinweise gelesen. *', en: 'I have read the privacy information. *' },
  },
  options: {
    role: [
      { value: '', label: 'Bitte auswählen / Please select' },
      { value: 'Trainer / Coach', label: 'Trainer / Coach' },
      { value: 'Sportliche Leitung / Sporting director', label: 'Sportliche Leitung / Sporting director' },
      { value: 'Vorstand / Board', label: 'Vorstand / Board' },
      { value: 'Teammanagement / Team manager', label: 'Teammanagement / Team manager' },
      { value: 'Sonstiges / Other', label: 'Sonstiges / Other' },
    ],
    rooms: [
      { value: 'Noch offen', label: { de: 'Noch offen', en: 'Undecided' } },
      { value: 'Doppelzimmer', label: { de: 'Doppelzimmer', en: 'Double rooms' } },
      { value: 'Einzelzimmer', label: { de: 'Einzelzimmer', en: 'Single rooms' } },
      { value: 'Gemischt', label: { de: 'Gemischt', en: 'Mixed' } },
    ],
    budget: [
      { value: 'Noch offen', label: { de: 'Noch offen', en: 'Undecided' } },
      { value: 'Unter 500 €', label: 'Unter 500 €' },
      { value: '500–750 €', label: '500–750 €' },
      { value: '750–1.000 €', label: '750–1.000 €' },
      { value: 'Über 1.000 €', label: 'Über 1.000 €' },
      { value: 'Bitte beraten', label: { de: 'Bitte beraten', en: 'Please advise' } },
    ],
    contact_method: [
      { value: 'E-Mail', label: { de: 'E-Mail', en: 'Email' } },
      { value: 'Telefon', label: { de: 'Telefon', en: 'Phone' } },
    ],
  },
  submit: { de: 'Unverbindliche Anfrage vorbereiten →', en: 'Prepare my no-obligation enquiry →' },
  hint: {
    de: 'Hinweis: In dieser HTML-Version wird beim Absenden eine E-Mail vorbereitet; es gibt noch keine sichere Serverübermittlung. Für den Livebetrieb das Formular mit CRM/Formular-Backend verbinden und Analytics erst nach gültiger Einwilligung aktivieren.',
    en: 'Note: this HTML demo does not yet send data to a server. Submitting prepares an email with the details. For production, connect the form securely to your CRM or form backend.',
  },
  status: {
    de: 'Die Anfrage wird als vorbereitete E-Mail an info@reisegesucht.de geöffnet. Bitte im E-Mail-Programm auf Senden klicken. Für automatischen Versand ohne E-Mail-Programm ist eine sichere Formular-/Backend-Anbindung nötig.',
    en: 'A prepared email to info@reisegesucht.de should open. Click Send in your email application. Automatic submission without an email app requires a secure form backend.',
  },
  periodPrefix: { de: 'Gewünschter Zeitraum: ', en: 'Preferred period: ' },
};

export const PACKAGE = {
  eyebrow: { de: 'Details aus der Angebotsunterlage', en: 'Details from the offer brochure' },
  title: { de: 'Was im Standardpaket vorgesehen ist', en: 'What the standard package includes' },
  text: {
    de: 'Die folgenden Leistungen sind in der bereitgestellten PDF aufgeführt. Verfügbarkeit und Umfang werden im individuellen Angebot bestätigt.',
    en: 'The following services are listed in the supplied PDF. Availability and scope will be confirmed in your individual proposal.',
  },
  items: [
    {
      icon: '🍽️',
      title: { de: 'Verpflegung & Unterkunft', en: 'Meals & accommodation' },
      text: {
        de: 'Standardzimmer, Frühstück, Mittag- und Abendessen als Buffet sowie ein separater Essbereich. Die Cheftrainer-Suite ist laut Unterlage zum Standardzimmerpreis vorgesehen.',
        en: 'Standard rooms, buffet breakfast, lunch and dinner, plus a separate dining area. According to the brochure, the head-coach suite is offered at the standard-room rate.',
      },
    },
    {
      icon: '⚽',
      title: { de: 'Training & Ausstattung', en: 'Training & equipment' },
      text: {
        de: 'Zwei Einheiten à 90 Minuten täglich auf Naturrasen, Wasser am Platz und im Massageraum, Umkleiden, Tore, Trainingsmaterial sowie ein Geräte- und Massageraum.',
        en: 'Two 90-minute sessions a day on natural grass, water at the pitch and in the massage room, changing rooms, goals and training equipment, plus an equipment room and a massage room.',
      },
    },
    {
      icon: '🧺',
      title: { de: 'Service vor Ort', en: 'On-site services' },
      text: {
        de: 'WLAN im Hotel, Fitnessraum, Sauna und Pool, zweimal täglicher Wäscheservice für die komplette Sportausrüstung, Kaffeepause und Konferenzraum nach Zeitplan.',
        en: 'Wi-Fi at the hotel, gym, sauna and pool, twice-daily laundry for the full sports kit, coffee break and a conference room subject to schedule.',
      },
    },
  ],
  stats: [
    { value: 85, label: 'Teams*' },
    { value: 836, label: { de: 'Trainingseinheiten*', en: 'Training sessions*' } },
    { value: 58, label: { de: 'Freundschaftsspiele*', en: 'Friendly matches*' } },
    { value: 1872, label: 'Transfers*' },
    { value: 19675, label: { de: 'Übernachtungen*', en: 'Overnight stays*' } },
    { value: 82, suffix: ' %', label: { de: 'Platz-Auslastung*', en: 'Pitch utilisation*' } },
    { value: 60, suffix: ' %', label: { de: 'Wiederkehrende Teams*', en: 'Returning teams*' } },
    { value: 98.6, decimals: 1, suffix: ' %', label: { de: 'Zufriedenheit*', en: 'Satisfaction*' } },
  ],
  note: {
    de: '*Saisonkennzahlen aus der PDF; nicht als garantierte aktuelle Leistungswerte zu verstehen. Flughafen–Hotel–Flughafen, Eis für Eisbad und Freundschaftsspiele sind in der Unterlage als Zusatzleistungen ausgewiesen. Trainingsplatz-Transfers sind im Standardpaket aufgeführt.',
    en: '*Season figures from the PDF; not to be read as guaranteed current performance values. Airport–hotel–airport transfers, ice for ice baths and friendly matches are listed as extras in the brochure. Transfers to the training pitch are included in the standard package.',
  },
};

export const FAQ = {
  eyebrow: 'FAQ',
  title: { de: 'Gut zu wissen, bevor ihr anfragt.', en: 'A few things to know before enquiring.' },
  items: [
    {
      q: { de: 'Für welche Mannschaften eignet sich das Angebot?', en: 'Which teams is this suitable for?' },
      a: {
        de: 'Die Planung richtet sich an Jugend-, Amateur- und leistungsorientierte Fußballmannschaften. Trainingsumfang, Unterkunft und Abläufe werden nach Bedarf abgestimmt.',
        en: 'The offer is designed for youth, amateur and performance-focused football teams. Training, accommodation and logistics are tailored to your needs.',
      },
    },
    {
      q: { de: 'Was ist im Standardpaket enthalten?', en: 'What is included in the standard package?' },
      a: {
        de: 'Die vorliegende Unterlage nennt Standardzimmer, Suite für den Cheftrainer zum Standardzimmerpreis, drei Buffetmahlzeiten, Wasser am Platz und im Massageraum, zwei 90-minütige Einheiten pro Tag auf Naturrasen, Massage- und Geräteraum, Konferenzraum nach Zeitplan, Fitness/Sauna/Pool, zweimal täglichen Wäscheservice für komplette Sportausrüstung, WLAN, Organisation von Freundschaftsspielen, Kaffeepause und Transfers zum Trainingsplatz. Details bitte im individuellen Angebot bestätigen lassen.',
        en: 'The brochure lists standard rooms, a head-coach suite at the standard-room rate, three buffet meals, water at the pitch and massage room, two 90-minute natural-grass sessions per day, massage and equipment rooms, a conference room subject to schedule, gym/sauna/pool access, twice-daily laundry for full sports kit, Wi-Fi, friendly-match organisation, coffee break and transfers to the training pitch. Confirm the details in your individual proposal.',
      },
    },
    {
      q: { de: 'Sind Flug und Flughafentransfer inklusive?', en: 'Are flights and airport transfers included?' },
      a: {
        de: 'In der vorliegenden Standardpaketbeschreibung ist der Transfer Flughafen–Hotel–Flughafen als Zusatzleistung ausgewiesen. Flüge sind nicht in der aufgeführten Standardliste genannt. Beides sollte separat angefragt und im Angebot eindeutig ausgewiesen werden.',
        en: 'The brochure lists airport–hotel–airport transfers as an extra. Flights are not listed in the standard package. Please request both separately and have them clearly itemised in your proposal.',
      },
    },
    {
      q: { de: 'Sind die Preise auf der Website verbindlich?', en: 'Are the website prices binding?' },
      a: {
        de: 'Nein. Es sind Orientierungswerte aus einer Angebotsunterlage für den Zeitraum 2. Januar bis 20. Februar 2027. Aktuelle Verfügbarkeit, Saison, Zimmerbelegung, Dauer und Zusatzleistungen beeinflussen das individuelle Angebot.',
        en: 'No. These are reference rates from a brochure for 2 January to 20 February 2027. Current availability, season, room occupancy, length of stay and extras affect the individual proposal.',
      },
    },
  ],
};

export const FOOTER = {
  title: 'FUSSBALLCAMP ANTALYA',
  about: {
    de: 'Trainingslager für Vereine – professionell geplant, persönlich abgestimmt und mit Urlaubsgefühl an der türkischen Riviera.',
    en: 'Football training camps for clubs — professionally planned, tailored to your needs and set on the Turkish Riviera.',
  },
  contactTitle: { de: 'Kontakt & Anbieter', en: 'Contact & provider' },
  company: 'ReiseGesucht Group',
  address: [
    'Kaiserstr. 51',
    { de: '51145 Köln, Deutschland', en: '51145 Cologne, Germany' },
    { de: 'Telefon: +49 (0)2203 94 24 121', en: 'Phone: +49 (0)2203 94 24 121' },
    { de: 'E-Mail: info@reisegesucht.de', en: 'Email: info@reisegesucht.de' },
    { de: 'Geschäftsführung: Prof. Dr. Haksun Gülcicek', en: 'Managing director: Prof. Dr. Haksun Gülcicek' },
  ],
  legalTitle: { de: 'Rechtliches', en: 'Legal' },
  // The legal pages themselves are German; the English labels keep the German term for clarity.
  legal: [
    [{ de: 'Impressum ↗', en: 'Legal notice (Impressum) ↗' }, 'https://www.fussballcamp-antalya.de/impressum.html'],
    [{ de: 'Datenschutz ↗', en: 'Privacy policy (Datenschutz) ↗' }, 'https://www.fussballcamp-antalya.de/datenschutz.html'],
    [{ de: 'AGB ↗', en: 'Terms & conditions (AGB) ↗' }, 'https://www.fussballcamp-antalya.de/agb.html'],
  ],
  copyright: {
    de: 'Alle Angebote vorbehaltlich Verfügbarkeit und schriftlicher Bestätigung.',
    en: 'All offers subject to availability and written confirmation.',
  },
};

export const MOBILE_CTA = { de: 'Trainingslager anfragen →', en: 'Enquire about a camp →' };
