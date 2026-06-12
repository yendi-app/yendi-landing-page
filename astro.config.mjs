// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yendi-app.github.io',
  base: '/yendi-landing-page',
  server: {
    open: true,
  },
});
