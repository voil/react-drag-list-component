/*
 * =============================================================================
 * Project: drag-list-component-typescript
 * Created Date: 2018-03-26, 13:02:30
 * Author: Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 * =============================================================================
 * Last Modified: 2018-03-26, 14:27:46
 * Modified By: Przemysław Drzewicki
 * =============================================================================
 * Copyright (c) 2018 webonweb
 * =============================================================================
 */
let Loaders = [
  {
    test: /\.html$/,
    use: {
      loader: 'file-loader',
      query: {
        name: '[name].[ext]'
      }
    }
  },
  {
    test: /\.sass$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
];

module.exports = Loaders;