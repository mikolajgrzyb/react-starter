const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
  webpack = require('webpack'),
  env = require('node-env-file'),
  getMainPugFiles = require('../scripts/get_html_files.js');

env('./.env')

module.exports = function (options) {
  let plugins = [
    new webpack.DefinePlugin({})
  ]

  let rules = [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ],
      exclude: path.resolve(__dirname, '../node_modules'),
    },
    {
      test: /\.(png|jpe?g|svg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 30000,
            outputPath: '/assets/',
            name: `[path][name].[hash].[ext]`
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            optimizationLevel: 3,
            pngquant:{
              quality: "65-70",
              speed: 4
            }
          }
        }
      ],
      exclude: path.resolve(__dirname, 'node_modules')
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader',
          options: {pretty: true}
        }
      ],
      exclude: path.resolve(__dirname, '../node_modules'),
    }
  ]

  let htmlPlugins = getMainPugFiles().map(function (pugFilePath) {
    let fileName = pugFilePath.replace('.pug', '')
    return new HtmlWebpackPlugin({
      title: "My Website2",
      filename: path.resolve(__dirname, "../dist/" + fileName + ".html"),
      template: path.resolve(__dirname, '../src/' + fileName + '.pug'),
      alwaysWriteToDisk: true
    })
  })

  plugins = plugins.concat(htmlPlugins)
  // WEBPACK CONFIG OBJECT STARTS HERE
  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './app.js'
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, '../src/js/components/'),
        "@services": path.resolve(__dirname, '../src/js/services/'),
      },
    },
    output: {
      path: path.resolve(__dirname, '../dist/assets'),
      filename: "[name].[hash].js",
      publicPath: '/assets/'
    },
    plugins: plugins,
    module: {
      rules: rules,
    },
  }
}
