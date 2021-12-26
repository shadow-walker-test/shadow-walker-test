import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const babelConfig = {
  extensions,
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
  comments: false,
};

const plugins = [
  babel(babelConfig),
  resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true,
    extensions,
    modulesOnly: true,
  }),
  commonjs(),
];

export default [
  {
    external: ['react', 'react-i18next', '@shadow-walker-test/theme', 'lodash'],
    input: 'src/index.ts',
    plugins,
    output: {
      dir: `dist`,
      format: 'cjs',
      sourcemap: true,
    },
  },
];
