const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/root.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
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
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      'lib/chartjs': 'chart.js',
      'lib/chartjs-deferred': 'chartjs-plugin-deferred',
      'lib/debounce': 'debounce',
      'lib/idb': 'idb',
      'lib/react': 'react',
      'lib/react-dom': 'react-dom',
      'lib/react-redux': 'react-redux',
      'lib/redux': 'redux',
      'lib/react-swipeable-views': 'react-swipeable-views',
      'lib/scroll-into-view': 'scroll-into-view',
    },
  },
};
