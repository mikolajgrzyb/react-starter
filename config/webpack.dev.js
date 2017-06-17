const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const helpers = require('./helpers.js')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const getMainPugFiles = require('../scripts/get_html_files.js');

let rewrites = getMainPugFiles()
  .map(function (pugFile) { return pugFile.replace('.pug', '')})
  .map(function (name) { return {from: `/${name}`, to: `/${name}.html`}})

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig({env: ENV}), {
  devServer: {
    port: 3001,
    contentBase: helpers.root('dist'),
    publicPath: '/assets',
    historyApiFallback: {
      rewrites: rewrites
    }
  },
  plugins: [
    new HtmlWebpackHarddiskPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader', options: {
              data: '@import \'variables\';',
              includePaths: [
                helpers.root('src', 'styles')
              ]
            }
          }
        ]
      },
    ]
  }
})

