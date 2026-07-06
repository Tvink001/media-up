# Media UP

Mobile landing page for Media UP, a performance-marketing agency. Single-page,
long-scroll layout on a dark "liquid chrome" theme, implemented from the mobile
design handoff.

## Stack

- Astro, static output, no client framework runtime
- Manrope + Inter, self-hosted through Astro's Fonts API (latin subset only)
- Build-time image optimization (Sharp) to responsive AVIF/WebP
- One small vanilla-JS island: the mobile menu and contact-form validation

## Develop

```
npm install
npm run dev        # http://localhost:4321
```

## Build

```
npm run build      # -> dist/
npm run preview    # serve the production build locally
```

## Assets

Raw client PNGs live in `design-assets/` (ignored by git). `npm run optimize:assets`
re-encodes them into metadata-stripped masters under `src/assets/images/`, each sized
about twice its on-screen dimensions; the build emits responsive AVIF/WebP from those.
Purely decorative art (the footer bar, and the panel texture at full resolution) is
reproduced in CSS to avoid shipping large images.

## Structure

```
src/
  layouts/Base.astro     document shell, meta tags, fonts
  pages/index.astro      section composition
  components/            one component per section, plus Panel and MobileMenu
  data/content.ts        repeated content (niches, channels, partners, check lists)
  styles/global.css      design tokens, reset, shared utilities
  assets/images/         optimized image masters
scripts/
  optimize-assets.mjs    raw PNG -> optimized masters
  crossbrowser.mjs       Playwright screenshots across Chromium, Firefox, WebKit
```

## Cross-browser

CSS targets the `browserslist` range in `package.json`; Autoprefixer adds vendor
prefixes during the build. The chrome-gradient text, the partners marquee mask, and the
blur / drop-shadow filters also carry explicit `-webkit-` fallbacks. After a build,
`node scripts/crossbrowser.mjs` renders the page in all three engines for a visual check.

## Notes

- The contact form validates on the client and shows a success state. Point the submit
  handler in `src/components/Cta.astro` at a real endpoint when integrating.
- Channel and partner icons are emoji, so they render in each platform's own emoji font;
  swap them for icon assets if pixel-identical branding is required.
