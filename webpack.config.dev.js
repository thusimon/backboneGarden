const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: [
    //'eventsource-polyfill', // necessary for hot reloading with IE
    //'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname + 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    noInfo: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src')},
      {test: /(\.css)$/, loaders: ['style-loader','css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
    ]
  }
};
