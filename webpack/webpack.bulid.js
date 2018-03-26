/*
 * =============================================================================
 * Project: boilerplate
 * Created Date: 2018-03-12, 08:53:49
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-26, 13:07:54
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */

// =============================================================================
// Loading dependencies.
// =============================================================================
let path = require('path');
let loaders = require('./loaders');
let plugins = require('./plugins');
// =============================================================================
// Create global variables.
// =============================================================================
let _root = `${__dirname}/..`;
const sourcePath = path.join(_root, '/src');

// =============================================================================
// Main settings.
// =============================================================================
module.exports = {
  devtool: process.env.ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
  entry: {
    app: [
      'index'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(_root, '/public/theme/'),
    publicPath: process.env.ENV === 'production' ? 'theme/' : '/'
  },
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ],
    alias: {
      app: path.resolve(_root, 'src/rcapp/'),
      components: path.resolve(_root, 'src/rcapp/components/')
    }
  },
  plugins,
  devServer: {
    hot: true,
    port: parseInt(process.env.HOST_PORT, 0),
    stats: {
      colors: true
    },
    contentBase: './src',
    historyApiFallback: true,
    compress: process.env.ENV === 'production'
  }
};
