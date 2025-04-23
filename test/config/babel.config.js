/**
 * This file is used ONLY for Jest testing
 * It is not used for Next.js builds (which now use SWC/Turbopack)
 */

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};