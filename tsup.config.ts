import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/core/generator.ts',
    'src/core/random.ts',
    'src/core/types.ts',
    'src/corpora/classic.ts',
    'src/corpora/tech.ts',
    'src/corpora/startup.ts',
    'src/corpora/concise.ts',
    'src/corpora/musk.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
});

