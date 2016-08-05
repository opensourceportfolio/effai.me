const path = require('path');

module.exports = {

  entry: './src/root.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    loaders: [{
      test: /(\.js)$/,
      loader: 'babel',
    }, {
      test: /\.css$/,
      loader: 'style!css',
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
};
