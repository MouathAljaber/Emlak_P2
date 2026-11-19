# Fussballcamp Antalya

Landing page for **fussballcamp-antalya.de**: winter training camps in Antalya for German football clubs.
German/English, built with React + Vite. Animations use the `motion` library.

## Run it

```bash
npm install      # once
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in /dist (upload this folder to the web server)
```

Requires Node.js 20.19 or newer.

## Project structure

| What | Where |
|---|---|
| All texts (German + English), hotels, prices, links | `src/content.js` |
| Colours, spacing, layout | `src/styles.css` (colours at the top in `:root`) |
| Page sections | `src/components/*.jsx` |
| Section order | `src/App.jsx` |
| Single-file HTML version of the same page (no build step) | `static-version/index.html` |

## Before going live

- Add `public/Anmeldeformular_Fussballcamp_Antalya.pdf` (the download button links to it).
- Replace the Unsplash example photos with original hotel and pitch photos.
- The enquiry form currently opens the visitor's email program (mailto). For real submissions, connect a form backend.
- Fonts are bundled locally (no Google Fonts request). The `static-version` still loads Google Fonts.

## Previous version

The earlier Express + MySQL version of this site (server, admin dashboard, enquiry API) was replaced by this page.
Its code is still in the git history: commit `c8a6f2a`.

```bash
git checkout c8a6f2a -- .   # restore the old files into the working tree
```
