# Linktree — Ezequiel García Gilabert

A personal link page with light and dark themes, responsive backgrounds, and
animated canvas snow.

## Run locally

This is a static site with no build step or local dependencies. Open
`index.html` directly, or serve the project root with:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

Fonts and icons are loaded from Google Fonts and unpkg, so an internet
connection is required for those assets.

## Project structure

- `index.html`: page content, links, and social sharing metadata.
- `css/`: design tokens, base styles, components, and responsive rules.
  `main.css` imports the stylesheets in the required order.
- `js/`: startup code and modules for the theme and snow animation.
- `assets/img/`: AVIF/WebP backgrounds and profile image fallbacks.

## Maintenance

- Update profile details and destinations in `index.html`.
- Keep `og:url` and `og:image` aligned with the deployed domain and assets so
  social previews resolve correctly.
- Check the page on mobile and desktop, in both themes, and with reduced motion
  enabled.
- There is no automated test suite. Manually check links, theme switching,
  the email link, and the snow animation.
