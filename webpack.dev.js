const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.config.js');
console.log('Loading dev config for webpack');

module.exports = merge(common, {
  output: {
    path: '/dist',
    filename: '[hash].app.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
  ],
  mode: 'development',
  watch: true,
});
