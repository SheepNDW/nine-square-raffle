import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import {
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          cdn: 'https://esm.sh/',
          prefix: 'i-',
        }),
      ],
      shortcuts: [
        [/^badge-lg-(.*)$/, ([, c]) => `badge-${c} px3 py0.8`],
        [/^badge-(.*)$/, ([, c]) => `bg-${c}4:10 text-${c}5 rounded`],
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
