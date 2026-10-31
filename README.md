# Fussballcamp Antalya

Independent full-stack website for **fussballcamp-antalya.de**: football holiday camps for young players, families, school holidays, and groups in Antalya. This is a separate project from Emlak_P1 and does not modify it.

## Stack

- Responsive semantic HTML/CSS/JavaScript landing page
- Node.js 20 + Express + Helmet
- MySQL 8 persistence for enquiries
- Nodemailer notifications when SMTP is configured
- API-key protected dashboard at `/admin.html`
- SEO metadata, JSON-LD, canonical URL, sitemap, robots, and consent-aware GA4 loading

## Local setup

```sh
cp .env.example .env
docker compose up -d mysql
npm install
npm start
```

Open `http://localhost:3000`. Set a strong `ADMIN_API_KEY` in `.env`, then open `/admin.html`.

## API

- `GET /api/health` — database health check
- `POST /api/leads` — validates consent and stores a lead
- `GET /api/admin/leads` — latest 300 leads; requires `x-admin-key`
- `PATCH /api/admin/leads/:id` — update `new`, `contacted`, `qualified`, or `closed`

## Launch checklist

1. Use managed MySQL and production secrets for all `MYSQL_*` and `ADMIN_API_KEY` values.
2. Configure SMTP and `ADMIN_EMAIL` for notifications.
3. Set `PUBLIC_SITE_URL=https://fussballcamp-antalya.de`, deploy HTTPS, and submit `/sitemap.xml` in Search Console.
4. Add `GA4_MEASUREMENT_ID` only after a consent/privacy review; the frontend loads analytics only after opt-in.
5. Add licensed photography/video before launch and update `og:image` when final media is available.

GitHub CLI was not available in this environment, so repository creation/push remains an external step.
