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

  resolve: {
    alias: {
      jsartoolkit5: path.join(
        __dirname,
        '../node_modules/jsartoolkit5/build/artoolkit.debug'
      ),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: 'babel-loader',
          // },
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
    contentBase: [
      path.resolve(__dirname, '../vendors'),
      // path.resolve(__dirname, '../node_modules/jsartoolkit5/build'),
      // path.resolve(__dirname, '../node_modules/jsartoolkit5/js'),
    ],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    port: 8182,
  },
}
