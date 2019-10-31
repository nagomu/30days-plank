'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const env = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    FIREBASE_API_KEY: JSON.stringify(process.env.APP_FIREBASE_API_KEY),
    FIREBASE_PROJECT_ID: JSON.stringify(process.env.APP_FIREBASE_PROJECT_ID),
    FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.APP_FIREBASE_AUTH_DOMAIN),
  },
};

const svgPath = path.resolve(__dirname, 'src/assets/sprite.svg');
const svg = fs.readFileSync(svgPath).toString();

const config = {
  entry: path.resolve('src/index.tsx'),
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    pathinfo: false,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'warning',
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    stats: 'errors-only',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
    }),
    new CopyWebpackPlugin([{ from: 'src/static', to: 'static/' }]),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      template: 'src/index.html',
      svg,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve('src'),
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

module.exports = config;
