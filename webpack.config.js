'use strict';

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssPath = path.resolve(__dirname, 'src/index.css');
const css = fs.readFileSync(cssPath).toString();

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  devtool: isProduction ? false : 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    stats: 'errors-only',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
      template: 'src/index.html',
      css,
    }),
  ],
};

module.exports = config;
