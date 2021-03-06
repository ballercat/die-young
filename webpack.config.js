const path = require('fs');

module.exports = {
  context: __dirname + '/src/',

  devtool: 'source-map',

  entry: {
    main: './main.js',
    polygonTest: './polygonTest.js',
    physicsTest: './physicsTest.js',
    workbench: './workbench.js'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },

  resolve: {
    extensions: ['.js', '.json', 'scss']
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file-loader?=name[name].[ext]'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

