const webpack = require('webpack');
const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const vendor = [
  'chart.js',
  'chartjs-plugin-deferred',
  'debounce',
  'idb',
  'material-ui',
  'react',
  'react-dom',
  'react-motion',
  'react-redux',
  'react-swipeable-views',
  'react-tap-event-plugin',
  'redux',
  'redux-logger',
  'redux-thunk',
  'scroll-into-view',
];

module.exports = {
  entry: {
    main: './src/root.js',
    vendor,
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin([{ from: 'manifest.json' }, { from: 'favicon.ico' }]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'osp.effai',
      filename: 'sw.js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
