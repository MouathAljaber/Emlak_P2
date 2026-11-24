// English versions of the guide pages (same slugs, served under /en/).
import { HOTELS, DETAILS } from '../src/content.js';

const eur = (n) => '€' + n;
const hotels = HOTELS.list.map((h, i) => {
  const d = DETAILS.rows[i];
  return { name: h.name, area: h.area, dz: h.dz, ez: h.ez, text: h.text.en, pitch: d.training.en, airport: d.airport, url: h.link.url };
});
const table = (list) => `<div class="tablewrap"><table><thead><tr><th>Hotel</th><th>Training pitch*</th><th>Airport</th><th>Double p.p./night</th><th>Single p.p./night</th></tr></thead><tbody>${list.map((h) => `<tr><td><strong>${h.name}</strong></td><td>${h.pitch}</td><td>${h.airport}</td><td>${eur(h.dz)}</td><td>${eur(h.ez)}</td></tr>`).join('')}</tbody></table></div>`;
const cards = (list) => list.map((h) => `<h3>${h.name}</h3><p>${h.text} Reference rate per the brochure: double room ${eur(h.dz)}, single room ${eur(h.ez)} per person per night. Distance to the training pitch: ${h.pitch}; to Antalya Airport: ${h.airport}. <a href="${h.url}" target="_blank" rel="noopener">Hotel website / photos ↗</a></p>`).join('');
const lara = hotels.filter((h) => h.area === 'Lara');
const kundu = hotels.filter((h) => h.area === 'Kundu');
const sorted = [...hotels].sort((a, b) => a.dz - b.dz);
const cheapest = sorted[0], priciest = sorted[sorted.length - 1];
const NOTE = '<p class="note">*All prices and distances are reference values from our offer brochure for 02 Jan–20 Feb 2027 (euros per person per night). Availability, season, occupancy and scope of services are confirmed in your individual proposal.</p>';

export const PAGES_EN = [
  {
    slug: 'trainingslager-antalya',
    title: 'Football Training Camp in Antalya: Guide for Clubs | Fussballcamp Antalya',
    description: 'Everything about a football training camp in Antalya: pitches, hotels in Lara and Kundu, process, reference costs and planning for clubs and youth teams.',
    h1: 'Football training camp in Antalya',
    lead: 'Natural grass, hotels by the sea and organisation from one source: why Antalya is a popular choice for winter preparation — and what matters when planning.',
    body: () => `
<h2>Why Antalya for pre-season?</h2>
<p>Antalya on the Turkish Riviera combines professional training conditions with the infrastructure of a major holiday destination. For clubs from Germany the flight is short, hotels and pitches are close together, and the daily rhythm of training, recovery and team time is easy to organise. During the winter break, when pitches at home are frozen or closed, a camp on the Mediterranean is a real alternative.</p>
<h2>Training conditions</h2>
<p>Our offer brochure describes the Never Give Up Football Center in Lara with six FIFA-standard natural-grass pitches, changing rooms, mobile goals and training equipment. The standard package provides two 90-minute sessions per day. More on our page <a href="/en/trainingsplaetze-antalya">Training pitches in Antalya</a>.</p>
<h2>The hotel areas: Lara and Kundu</h2>
<p>Our hotels are in the resort areas of <a href="/en/hotels-lara">Lara</a> and <a href="/en/hotels-kundu">Kundu</a>. We currently compare ${hotels.length} hotels — from budget-friendly resorts at ${eur(cheapest.dz)} to premium properties at ${eur(priciest.dz)} per person per night in a double room. Board, room category and services are confirmed in your individual proposal.</p>
${table(sorted)}
${NOTE}
<h2>What the standard package includes</h2>
<ul>
<li>Standard room, buffet breakfast, lunch and dinner</li>
<li>Two 90-minute training sessions daily on natural grass</li>
<li>Water at the pitch and in the massage room, changing rooms, goals, training equipment</li>
<li>Equipment room, massage room, conference room subject to schedule</li>
<li>Gym, sauna and pool, Wi-Fi at the hotel</li>
<li>Laundry service for the complete sports kit</li>
<li>Transfers to the training pitch</li>
</ul>
<p>Airport–hotel–airport transfers, ice for ice baths and friendly matches are listed as extras. Flights are not part of the standard package. Details on <a href="/en/trainingslager-kosten">costs &amp; prices</a>.</p>
<h2>Who is it for?</h2>
<p>The offer is designed for youth, amateur and performance-focused football teams. Training volume, accommodation and logistics are tailored to your needs.</p>
<h2>How planning works</h2>
<p>Four steps to your proposal: send an enquiry, discuss your needs, receive a proposal, prepare together. A practical checklist is in <a href="/en/trainingslager-planen">Planning a training camp</a>.</p>`,
    faq: [
      ['When is the best time for a training camp in Antalya?', 'Our price references cover 2 January to 20 February 2027, i.e. winter preparation. We agree exact dates and availability with you individually.'],
      ['Are flights included in the standard package?', 'No. Flights are not part of the standard package; airport–hotel–airport transfers are listed as an extra.'],
    ],
  },
  {
    slug: 'hotels-lara',
    title: 'Hotels in Lara for Football Training Camps | Fussballcamp Antalya',
    description: `Hotels in Lara (Antalya) for football teams compared: ${lara.length} resorts from ${eur(Math.min(...lara.map((h) => h.dz)))} per person/night, distances to pitch and airport.`,
    h1: 'Hotels in Lara for training camps',
    lead: 'Lara is the resort area east of Antalya where most of our partner hotels are located — close to the training centre.',
    body: () => `
<h2>Lara at a glance</h2>
<p>The Lara hotel zone runs along the coast east of Antalya city. It suits football teams because hotels and pitches are close together and the resorts are set up for groups. We currently offer ${lara.length} hotels in Lara.</p>
<h2>Hotels in Lara compared</h2>
${table(lara)}
${NOTE}
<h2>The hotels in detail</h2>
${cards(lara)}
<h2>Which hotel suits my team?</h2>
<p>Three questions usually decide: How large is the squad (rooms, single or double)? How important is proximity to the pitch? And what budget per person per night is planned? Budget-conscious teams find resorts in Lara from ${eur(Math.min(...lara.map((h) => h.dz)))} in a double room; teams with higher comfort needs find properties up to ${eur(Math.max(...lara.map((h) => h.dz)))}. We are happy to advise and align the choice with your schedule and transfers.</p>`,
    faq: [
      ['How far are the Lara hotels from the training pitch?', 'According to the brochure between approx. 3 km and approx. 8 km, depending on the hotel. Travel times are reference values, not live traffic data.'],
      ['Are single and double rooms available?', 'Yes, reference rates for single and double rooms per person per night are given for every hotel.'],
    ],
  },
  {
    slug: 'hotels-kundu',
    title: 'Hotels in Kundu for Football Training Camps | Fussballcamp Antalya',
    description: `Hotels in Kundu (Antalya) for football training camps: ${kundu.map((h) => h.name).join(' and ')} with reference rates, distances and selection tips.`,
    h1: 'Hotels in Kundu for training camps',
    lead: 'Kundu lies at the eastern edge of the hotel zone, close to Antalya Airport. Teams with higher comfort needs find suitable properties here.',
    body: () => `
<h2>Kundu at a glance</h2>
<p>The Kundu resort area adjoins Lara to the east. The journey from the airport is short: for the Kundu hotels the brochure lists about 12 km to the airport. We currently offer ${kundu.length} hotels in the area.</p>
<h2>Hotels in Kundu compared</h2>
${table(kundu)}
${NOTE}
<h2>The hotels in detail</h2>
${cards(kundu)}
<h2>Kundu or Lara?</h2>
<p>For the lowest price there is more choice in <a href="/en/hotels-lara">Lara</a>. Kundu suits teams that want a premium resort or a particularly short airport transfer. The exact travel time to training depends on hotel, traffic and transfer planning — your proposal states the confirmed routes for your hotel.</p>`,
    faq: [
      ['How far is Kundu from the airport?', 'According to the brochure about 12 km for the listed hotels. Travel times are reference values.'],
    ],
  },
  {
    slug: 'trainingsplaetze-antalya',
    title: 'Training Pitches in Antalya: Natural Grass & Facilities | Fussballcamp Antalya',
    description: 'Natural-grass pitches, changing rooms, massage and equipment rooms: the Never Give Up Football Center in Lara for football training camps — facilities and daily schedule.',
    h1: 'Training pitches in Antalya',
    lead: 'Six FIFA-standard natural-grass pitches, two sessions a day: this is what daily training looks like.',
    body: () => `
<h2>Never Give Up Football Center Lara</h2>
<p>According to our offer brochure, teams train at the Never Give Up Football Center in Lara. The complex has six FIFA-standard natural-grass pitches plus changing rooms, mobile goals and training equipment. Capacity differs by pitch and is agreed with your schedule.</p>
<h2>Training rhythm</h2>
<p>The described standard package includes two 90-minute sessions per day on natural grass — typically morning and afternoon. In between there is time for lunch, recovery, video analysis in the conference room (subject to schedule) or team activities.</p>
<h2>Facilities around the pitch</h2>
<ul>
<li>Six natural-grass pitches, changing rooms</li>
<li>Mobile goals and training equipment</li>
<li>Water at the pitch and in the massage room</li>
<li>Equipment room and massage room</li>
<li>Conference room subject to schedule</li>
<li>Laundry service for the complete sports kit</li>
<li>Transfers between hotel and pitch</li>
</ul>
<h2>Friendlies and extras</h2>
<p>Friendly matches and ice for ice baths are listed as extras in the brochure. We agree together which matches make sense and how they fit into the training plan.</p>
<h2>Distance between hotel and pitch</h2>
<p>Hotels are in <a href="/en/hotels-lara">Lara</a> (approx. 3–8 km to the pitch) and <a href="/en/hotels-kundu">Kundu</a>. Travel times are reference values from the brochure; we state the confirmed routes in your individual proposal.</p>`,
    faq: [
      ['How many pitches are available?', 'The brochure lists six FIFA-standard natural-grass pitches at the Never Give Up Football Center Lara.'],
      ['Are training sessions part of the standard package?', 'Yes, two 90-minute sessions a day on natural grass are part of the standard package.'],
    ],
  },
  {
    slug: 'trainingslager-kosten',
    title: 'Training Camp Antalya: Costs & Prices per Person | Fussballcamp Antalya',
    description: `What does a football training camp in Antalya cost? Reference rates from ${eur(cheapest.dz)} to ${eur(priciest.dz)} per person/night, example calculation, services and extra costs.`,
    h1: 'Costs & prices for the training camp',
    lead: 'Transparent reference values instead of blanket promises: how the costs of a training camp in Antalya add up.',
    body: () => `
<h2>Reference rates per person per night</h2>
<p>The following reference values are from our offer brochure for 02 Jan–20 Feb 2027. They apply per person per night in the standard package.</p>
${table(sorted)}
${NOTE}
<h2>Example calculation (reference)</h2>
<p>A group of 24 people (players and staff) stays 7 nights in double rooms:</p>
<ul>
<li>Lowest-priced hotel (${cheapest.name}, ${eur(cheapest.dz)}): 24 × 7 × ${eur(cheapest.dz)} = <strong>${eur(24 * 7 * cheapest.dz)}</strong></li>
<li>Highest-priced hotel (${priciest.name}, ${eur(priciest.dz)}): 24 × 7 × ${eur(priciest.dz)} = <strong>${eur(24 * 7 * priciest.dz)}</strong></li>
</ul>
<p>This is a calculation aid based on reference values, not an offer. Single rooms, extras, flights and current availability change the total.</p>
<h2>What is included?</h2>
<ul>
<li>Standard room, buffet breakfast, lunch and dinner</li>
<li>Two 90-minute training sessions daily on natural grass</li>
<li>Water at the pitch and massage room, changing rooms, goals, training equipment</li>
<li>Gym, sauna, pool, Wi-Fi at the hotel</li>
<li>Laundry service for the complete sports kit</li>
<li>Transfers to the training pitch</li>
</ul>
<h2>Extras and what is not included</h2>
<p>According to the brochure, airport–hotel–airport transfers, ice for ice baths and friendly matches are extra. Flights are not included in the standard package. We itemise every position in the proposal so you can budget cleanly.</p>
<h2>Request a proposal</h2>
<p>For a binding proposal we need dates, group size, room preferences and your budget. <a href="/#anfrage">Send a no-obligation enquiry</a>.</p>`,
    faq: [
      ['Are the prices binding?', 'No. They are reference values for 2 January to 20 February 2027. You receive the binding proposal after your enquiry.'],
      ['What does the single-room supplement cost?', 'For each hotel we state reference rates for single and double rooms per person per night (see table).'],
    ],
  },
  {
    slug: 'trainingslager-planen',
    title: 'Planning a Training Camp: Checklist for Clubs | Fussballcamp Antalya',
    description: 'Step by step to your training camp: checklist for coaches and club officials — dates, group size, hotel, training, travel and budget.',
    h1: 'Planning a training camp: the checklist',
    lead: 'A training camp is easier to organise when the key questions are settled early. This checklist helps.',
    body: () => `
<h2>1. Set dates and duration</h2>
<p>When does the camp fit your season plan? Our reference prices cover 2 January to 20 February 2027. Plan arrival and departure days so the squad gets as many full training days as possible.</p>
<h2>2. Group size and rooms</h2>
<p>How many players, coaches and staff travel? Double rooms are cheaper per person; single rooms cost more. According to the brochure, the head-coach suite is offered at the standard-room rate.</p>
<h2>3. Choose a hotel</h2>
<p>Compare <a href="/en/hotels-lara">hotels in Lara</a> and <a href="/en/hotels-kundu">hotels in Kundu</a> by budget, comfort and distance to the pitch.</p>
<h2>4. Define training volume</h2>
<p>Two 90-minute sessions a day are part of the standard package. Do you want friendlies, video analysis or extra recovery? We build them into the schedule — more under <a href="/en/trainingsplaetze-antalya">training pitches</a>.</p>
<h2>5. Travel and transfers</h2>
<p>Clubs usually book flights themselves or through a travel agent. Airport–hotel–airport transfers can be booked as an extra. When flying with baggage, clarify sports luggage and times early.</p>
<h2>6. Agree your budget</h2>
<p>Use the reference rates under <a href="/en/trainingslager-kosten">costs &amp; prices</a> for a first per-person calculation.</p>
<h2>7. Send the enquiry and review the proposal</h2>
<p>With the <a href="/#anfrage">no-obligation enquiry</a> you receive an individual proposal. Check scope, extras, payment terms and cancellation rules in particular.</p>
<h2>Internal coordination at the club</h2>
<p>Settle early who signs (authorised representative, possibly with club stamp), how parents of youth players are informed and which documents players need (travel documents, consent forms for minors).</p>`,
    faq: [
      ['How early should I enquire?', 'As early as possible, so hotels and training slots are available for your preferred dates. We confirm availability in your individual proposal.'],
      ['Do I need a passport?', 'Please check the current entry requirements for Turkey for your nationality and the age of travellers well in advance.'],
    ],
  },
  {
    slug: 'haeufige-fragen',
    title: 'Frequently Asked Questions: Training Camp in Antalya | Fussballcamp Antalya',
    description: 'Answers to the most common questions about football training camps in Antalya: services, prices, flights and transfers, hotels, training and enquiries.',
    h1: 'Frequently asked questions',
    lead: 'Short and honest answers — with links to the details in our guides.',
    body: () => `<p>Answers on services, prices, travel and process. More information: <a href="/en/trainingslager-antalya">Training camp Antalya guide</a>, <a href="/en/trainingslager-kosten">costs &amp; prices</a>, <a href="/en/trainingslager-planen">planning checklist</a>.</p>`,
    faq: [
      ['Which teams is this suitable for?', 'Youth, amateur and performance-focused football teams. Training, accommodation and logistics are tailored to your needs.'],
      ['What is included in the standard package?', 'Standard room, buffet breakfast, lunch and dinner, two 90-minute natural-grass sessions daily, water at the pitch and massage room, changing rooms, goals, training equipment, equipment and massage rooms, conference room subject to schedule, gym/sauna/pool, Wi-Fi, laundry service and transfers to the pitch.'],
      ['Are flights and airport transfers included?', 'Flights are not included. Airport–hotel–airport transfers are listed as an extra.'],
      ['Are the website prices binding?', 'No. They are reference values for 2 January to 20 February 2027. You receive the binding proposal after your enquiry.'],
      ['Which hotels can I choose from?', `Currently ${hotels.length} hotels in Lara and Kundu, from ${eur(cheapest.dz)} to ${eur(priciest.dz)} per person per night in a double room.`],
      ['How many pitches are there?', 'Six FIFA-standard natural-grass pitches at the Never Give Up Football Center Lara (per the offer brochure).'],
      ['How do I request a proposal?', 'Use the form on the home page. You get an email confirmation and we reply with an individual proposal.'],
      ['Is the enquiry binding?', 'No, the enquiry via the website is non-binding.'],
    ],
  },
  {
    slug: '404', noindex: true,
    title: 'Page not found | Fussballcamp Antalya', description: 'This page could not be found.', h1: 'Offside: page not found',
    lead: 'The page you are looking for does not exist (any more). Back into the game:',
    body: () => `<ul><li><a href="/">Home</a></li><li><a href="/en/trainingslager-antalya">Guide: training camp in Antalya</a></li><li><a href="/en/hotels-lara">Hotels in Lara</a></li><li><a href="/en/trainingslager-kosten">Costs &amp; prices</a></li><li><a href="/#anfrage">Send an enquiry</a></li></ul>`,
  },
];
