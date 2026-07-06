import { defineConfig, fontProviders } from 'astro/config';

// Static, content-focused marketing page. Zero client framework runtime:
// the small amount of interactivity ships as a single vanilla-JS island.
export default defineConfig({
  site: 'https://media-up.local',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  fonts: [
    {
      name: 'Manrope',
      cssVariable: '--font-manrope',
      provider: fontProviders.google(),
      weights: [400, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
