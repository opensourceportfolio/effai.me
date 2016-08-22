/* eslint object-shorthand: [0] */
const path = require('path');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
const webpack = require('webpack');

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'react-hot-loader/patch',
    './src/root.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    loaders: [{
      include: require.resolve('material-design-lite'),
      loader: 'exports?window.componentHandler',
    }, {
      test: /(\.js)$/,
      loaders: ['babel'],
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
    }],
  },

  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    root: path.resolve('./src'),
    extensions: ['', '.js'],
    alias: {
      'lib/chartist': 'chartist',
      'lib/chartist-axistitle': 'chartist-plugin-axistitle',
      'lib/chartist-legend': 'chartist-plugin-legend',
      'lib/mdl': 'material-design-lite',
      'lib/ramda': 'ramda',
      'lib/react': 'react',
      'lib/react-dom': 'react-dom',
      'lib/react-redux': 'react-redux',
      'lib/react-router': 'react-router',
      'lib/redux': 'redux'
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    hot: true,
    contentBase: './',
    stats: {colors: true},
  },

  postcss: function() {
    return [cssnext, precss];
  }
};
