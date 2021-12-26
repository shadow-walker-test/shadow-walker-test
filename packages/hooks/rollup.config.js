import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
// import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const babelConfig = {
  extensions,
  exclude: /node_modules/,
  babelHelpers: 'bundled',
  comments: false,
};

const plugins = [
  resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true,
    extensions,
    modulesOnly: true,
  }),
  babel(babelConfig),
  // babel({ exclude: 'node_modules/**' }),
  // typescript({ tsconfig: './tsconfig.json' }),
  // commonjs(),
  // terser(),
];

export default [
  {
    input: 'src/index.ts',
    plugins,
    output: {
      dir: `dist`,
      format: 'cjs',
      sourcemap: true,
      // preserveModules: true,
    },
  },
];
