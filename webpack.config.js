'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const env = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    FIREBASE_API_KEY: JSON.stringify(process.env.APP_FIREBASE_API_KEY),
    FIREBASE_PROJECT_ID: JSON.stringify(process.env.APP_FIREBASE_PROJECT_ID),
    FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.APP_FIREBASE_AUTH_DOMAIN),
    SERVICE_WORKER: JSON.stringify(process.env.APP_SERVICE_WORKER),
  },
};

const svgPath = path.resolve(__dirname, 'src/assets/sprite.svg');
const svg = fs.readFileSync(svgPath).toString();
const cssPath = path.resolve(__dirname, 'src/index.css');
const css = fs.readFileSync(cssPath).toString();

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: path.resolve('src/index.tsx'),
  output: {
    path: path.resolve('public'),
    filename: '30d-[hash].js',
    chunkFilename: '30d-[chunkhash].js',
    publicPath: '/',
    pathinfo: false,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
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
    new CopyWebpackPlugin([{ from: 'src/static', to: './' }]),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
      template: 'src/index.html',
      svg,
      css,
      APP_VERSION: JSON.stringify(process.env.npm_package_version)
        .toString()
        .replace(/"/g, ''),
      APP_BUILD_VERSION: childProcess
        .execSync('git rev-parse --short HEAD')
        .toString()
        .trim(),
    }),
    new webpack.DefinePlugin(env),
  ],
  optimization: {
    // This is true by default in production mode.
    // https://webpack.js.org/configuration/optimization/
    // minimize: true,
    splitChunks: {
      chunks: 'all',
      maxSize: 500000,
    },
    runtimeChunk: true,
  },
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

const serviceWorkerConfig = new GenerateSW({
  cacheId: '30days-plank-challenge',
  swDest: path.resolve(__dirname, 'public', 'sw.js'),
  clientsClaim: true,
  skipWaiting: true,
  exclude: [
    '',
    /apple-touch-icon\.png$/,
    /favicon\.ico$/,
    /robots\.txt$/,
    /static\/manifest\.json$/,
    /static\/sw\.js$/,
    /static\/images\/favicon-16x16\.png$/,
    /static\/images\/favicon-32x32\.png$/,
  ],
  runtimeCaching: [
    {
      urlPattern: '/',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'sign-in',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
        },
      },
    },
    {
      urlPattern: '/dashboard',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'dashboard',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
        },
      },
    },
    {
      urlPattern: new RegExp('/challenges/.*/workouts/.*'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'workout',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: new RegExp('/static/images/.*'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern:
        'https://thirty-days-plank-v1.firebaseapp.com/__/auth/iframe.js',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'auth',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: new RegExp('^https://firestore.googleapis.com/.*'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'firestore',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
        },
      },
    },
    {
      urlPattern: new RegExp('^https://ajax.googleapis.com/.*'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-loader',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
          maxAgeSeconds: 30 * 24 * 60,
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: new RegExp('^https://fonts.googleapis.com.*'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-face',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
        },
      },
    },
    {
      urlPattern: new RegExp('^https://fonts.gstatic.com/.*'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 255,
        },
      },
    },
  ],
});

if (isProduction || process.env.APP_SERVICE_WORKER === 'enable') {
  config.plugins.push(serviceWorkerConfig);
}

if (isProduction) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
