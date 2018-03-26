/*
 * =============================================================================
 * Project: boilerplate
 * Created Date: 2018-03-12, 08:49:31
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-26, 13:14:09
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */

// =============================================================================
// Loading dependencies.
// =============================================================================
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');
// =============================================================================
// Create global variables.
// =============================================================================
let _root = `${__dirname}/..`;
let _description = JSON.stringify(require(`${_root}/package.json`).description);
let _title = JSON.stringify(process.env.APP_TITLE);
let config = {
  base: '/',
  hash: true,
  inject: 'body',
  title: _title,
  template: 'src/index.ejs',
  description: _description,
  keywords: 'platform, component, react'
};

if (process.env.ENV === 'production') {
  config.filename = '../index.html';
}
// =============================================================================
// Array of plugins.
// =============================================================================
let plugins = [
  new webpack.ProvidePlugin({}),
  new HtmlWebpackPlugin(config),
  new webpack.DefinePlugin({
    __DEVELOPMENT__: process.env.ENV === 'development',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.ENV)
    }
  })
];

if (process.env.ENV === 'development') {
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  );
}
if (process.env.ENV === 'production') {
  plugins.push(new CleanWebpackPlugin(['*'], {
    dry: false,
    verbose: true,
    root: `${_root}/public/theme/`
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    sourceMap: true,
    compress: {
      unsafe: true,
      warnings: false,
      screw_ie8: true,
      pure_getters: true,
      unsafe_comps: true
    },
    output: {
      comments: false
    },
    exclude: [/\.min\.(js|css|less|sass)$/gi]
  }));
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|html|css|woff)$/,
    threshold: 10240,
    minRatio: 0.8
  }));
  plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }));
}

// =============================================================================
// Exporting plugins.
// =============================================================================
module.exports = plugins;
