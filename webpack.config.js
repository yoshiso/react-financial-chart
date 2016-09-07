var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './examples/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: [path.resolve(__dirname, 'examples'), path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
};
