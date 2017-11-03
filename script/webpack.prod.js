const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new MinifyPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
});
