import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  babel({ exclude: 'node_modules/**' }),
  typescript({ tsconfig: './tsconfig.json' }),
];

export default [
  {
    input: 'src/index.tsx',
    plugins,
    output: {
      file: `dist/index.js`,
      format: 'esm',
    },
  },
];
