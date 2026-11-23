# Fussballcamp Antalya

Landing page for winter football training camps in Antalya (German/English).
React + Vite, animations with `motion`, hosted on Cloudflare Workers.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # generates the guide/legal pages, then builds into /dist
npx wrangler deploy
```

Requires Node.js 20.19 or newer.

## Structure

| What | Where |
|---|---|
| All texts (DE + EN), hotels, prices | `src/content.js` |
| Site name, domain, contact email | `src/company.js` |
| Form validation (shared by site and Worker) | `src/validation.js` |
| Page sections | `src/components/*.jsx` |
| Colours, layout | `src/styles.css` |
| SEO guide + legal pages (German, static HTML) | `scripts/pages-content.mjs` → generated into `public/` on build |
| Enquiry endpoint (`POST /api/enquiry`, sends the emails) | `worker/index.js` |
| Worker/deploy config | `wrangler.jsonc` |

## Enquiry emails

The Worker sends a notification to `NOTIFY_EMAIL` (in `wrangler.jsonc`) and a confirmation to the customer through Resend.

```bash
npx wrangler secret put RESEND_API_KEY
```

Without a verified sending domain in Resend, mail only reaches the Resend account owner's address. Set `FROM_EMAIL` once a domain is verified.

## Before going live

- Add provider details to the Impressum (`scripts/pages-content.mjs`) and have the legal texts reviewed.
- Replace the Unsplash example photos with original hotel and pitch photos.
- Point `fussballcamp-antalya.de` at the Worker (canonical URLs and sitemap already use it).
