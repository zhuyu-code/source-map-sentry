// eslint-disable-next-line no-undef
const { override,addLessLoader,fixBabelImports, addDecoratorsLegacy } = require('customize-cra');
// eslint-disable-next-line no-undef
module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
      javascriptEnabled:true,
      modifyVars:{
        // "@primary-color":"#0ff"
      }
      }),
      fixBabelImports("import",{
        "libraryName":"antd",
        "libraryDirectory":"es",
        "style":true
      })
);
