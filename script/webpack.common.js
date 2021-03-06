/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  src: path.resolve(__dirname, '../src'),
};

const config = {
  entry: './src/root.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
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
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src/css'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Effai.me',
      filename: 'index.html',
      template: path.join(__dirname, '../assets/index.ejs'),
      hash: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets/' }],
    }),
    new MiniCssExtractPlugin(),
    new GenerateSW({
      cacheId: 'osp.effai',
      swDest: 'sw.js',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    overlay: true,
  },
};

module.exports = config;
