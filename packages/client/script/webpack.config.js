const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: [
      path.join(__dirname, '../src/index.js'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: /\.html?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|otf|woff2|svg|gif|jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:6].[ext]',
            },
          },
        ],
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    contentBase: [path.resolve(__dirname, '../src/asset')],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    port: 8182,
  },
}
