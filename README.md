# LernBücher

Static, mobile-first template for a multilingual **German learning book** library.

- **Deutsche Bücher** — German-language materials  
- **Немецкие книги** — Russian-speaking learners  
- **Libra Gjermanisht** — Albanian-speaking learners  

Stack: HTML5, Tailwind CSS (CDN), vanilla JavaScript. No build step.

## Run locally

Open `index.html` in a browser, or from this folder:

```bash
npx --yes serve .
```

Then visit the URL printed in the terminal (typically `http://localhost:3000`).

## Add or edit books

All catalog data lives in [`js/books.js`](js/books.js). Duplicate an existing object and fill in:

| Field | Meaning |
| --- | --- |
| `id` | Unique slug |
| `title` | Card heading |
| `level` | `A1` … `C2` |
| `category` | `de`, `ru`, or `sq` |
| `description` | 2–3 lines |
| `downloadUrl` | Path or URL to the PDF |
| `cover` | `{ from, to, kicker }` gradient colours |

Header, footer, search, and cards are rendered by [`js/app.js`](js/app.js). Extra look-and-feel is in [`css/app.css`](css/app.css).

## Pages

| File | Role |
| --- | --- |
| `index.html` | Long-scroll homepage |
| `deutsche-buecher.html` | German category |
| `nemetskie-knigi.html` | Russian category |
| `libra-gjermanisht.html` | Albanian category |
| `privacy.html` | Privacy Policy |
| `dmca.html` | Copyright takedown |
| `terms.html` | Terms & Conditions |
| `about.html` | About |

Replace `privacy@example.com` / `dmca@example.com` before you publish. Swap the YouTube `iframe` `src` in `index.html` for your own download tutorial.

## GitHub

`.gitignore` already excludes `.env`, keys, `node_modules`, and a local `/files` PDF folder. Sample titles in the catalog are original demos — do not point `downloadUrl` at books you do not have the right to distribute.
