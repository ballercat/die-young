const path = require('js');

module.exports = {
  context: __dirname + '/src/',

  devtool: 'source-map',

  entry: {
    javascript: './main.js'
  },

  output: {
    filename: 'bundle.js',
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
      }
    ]
  }
};

