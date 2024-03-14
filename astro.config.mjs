import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import sanity from '@sanity/astro';

import react from '@astrojs/react';

import { loadEnv } from "vite";
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// Different environments use different variables
const projectId = PUBLIC_SANITY_PROJECT_ID
const dataset = PUBLIC_SANITY_DATASET

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      studioBasePath: '/studio',
      apiVersion: "2024-03-01",
    }),
    react(),
  ],
});
