const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  src: path.resolve(__dirname, '../src'),
};

module.exports = {
  entry: {
    main: './src/root.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        include: paths.src,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src/css'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyWebpackPlugin([
      { from: 'manifest.json', to: 'dist' },
      { from: 'favicon.ico', to: 'dist' },
      { from: 'img/**/*', to: 'dist' },
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'osp.effai',
      filename: 'sw.js',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
  },
  devServer: {
    overlay: true,
  },
};
