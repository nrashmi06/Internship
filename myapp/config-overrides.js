const { override, addWebpackModuleRule, addWebpackPlugin } = require('customize-cra');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react']
      }
    }
  }),
  addWebpackPlugin(
    new WebpackObfuscator({
      rotateStringArray: true
    })
  )
);
