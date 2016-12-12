/* eslint object-shorthand: [0] */
const path = require('path');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: ['./src/root.js'],

  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        include: require.resolve('material-design-lite'),
        loader: 'exports?window.componentHandler'
      }, {
        test: /(\.js)$/,
        loaders: ['babel']
      }, {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'manifest.json'},
      {from: 'favicon.ico'},
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'osp.ficalculator',
      filename: 'sw.js',
      runtimeCaching: [{
        handler: 'cacheFirst',
        urlPattern: /[.]mp3$/,
      }],
    }),
  ],

  resolve: {
    modulesDirectories: [
      'src', 'node_modules'
    ],
    root: path.resolve('./src'),
    extensions: [
      '', '.js'
    ],
    alias: {
      'lib/chartjs': 'chart.js',
      'lib/chartjs-deferred': 'chartjs-plugin-deferred',
      'lib/debounce': 'debounce',
      'lib/idb': 'idb',
      'lib/chartist-axistitle': 'chartist-plugin-axistitle',
      'lib/chartist-legend': 'chartist-plugin-legend',
      'lib/mdl': 'material-design-lite',
      'lib/ramda': 'ramda',
      'lib/react': 'react',
      'lib/react-dom': 'react-dom',
      'lib/react-redux': 'react-redux',
      'lib/redux': 'redux',
      'lib/redux-thunk': 'redux-thunk',
      'lib/react-swipeable-views': 'react-swipeable-views'
    }
  },

  postcss: function() {
    return [cssnext, precss];
  }
};
