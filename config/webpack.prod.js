const path = require('path'),
  webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common.js'),
  UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig({env: ENV}), {
  output: {
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        loader: ExtractTextPlugin.extract({
          loader: [
            {loader: 'css-loader', options: {minimize: true}},
            'resolve-url-loader',
            'postcss-loader',
            'sass-loader?sourceMap'
          ]
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.[hash].css"),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: {removeAll: true } }
    }),
    new UglifyJsPlugin({
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
    }),
  ]
})
