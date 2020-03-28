const { override, addWebpackAlias, addDecoratorsLegacy, addLessLoader, fixBabelImports } = require('customize-cra');
const path = require('path')

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      css: true,
      style: true,
  }),
  addLessLoader({
     javascriptEnabled: true,
     modifyVars: { '@primary-color': '#fe346e' },
 }),
);