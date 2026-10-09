# bukhariabbas.github.io

Public research portfolio for Syed Abbas Bukhari, PhD. Plain HTML, CSS, and JavaScript; no build or runtime dependencies. GitHub Pages deploys the `main` branch.

## Preview

Serve the repository root locally, for example with `python3 -m http.server 8000 --bind 127.0.0.1`, then visit `http://127.0.0.1:8000/`. Links are root-relative, matching the public site.

## Content

- `index.html`: research overview.
- `research.html` and `research/`: research summaries and methods examples.
- `publications.html`: complete static publication list with optional search and topic filtering.
- `software.html`: public tools and analysis repositories.
- `cv.html`, `contact.html`: background, downloads, and direct contact.
- `credits.html`: sources and scientific interpretation notes.

All pages share the navigation, portrait, stylesheet, and footer. Existing page URLs remain available. `styles.css` controls layout; `site.js` provides the mobile menu, publication filtering, and accessible figure dialog. Core content works without JavaScript.

## Figures and updates

The ITH figures are anonymous statistical renderings of ongoing research. Keep their limitations and captions with the figures. Never add the original program identities, private mappings, patient records, source matrices, or analysis caches. Published figures retain attribution in `credits.html`.

The portrait is `assets/headshot.jpg`; the original aspect ratio is retained and CSS handles display cropping. CV links use `assets/Syed_Abbas_Bukhari_Public_CV.pdf` and `assets/Syed_Abbas_Bukhari_Industry_Resume.pdf`. Update the page links and files together when replacing them.

Before publishing changes, check local links, desktop/mobile layout, image loading, menu keyboard behavior, and publication filtering. Keep `sitemap.xml` synchronized with page URLs.
