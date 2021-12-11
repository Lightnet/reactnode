// https://webpack.js.org/loaders/babel-loader/
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js','.mjs']
  },
  module: {
    //rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"],
            plugins:["@babel/plugin-transform-runtime"]
            //plugins:['@babel/plugin-syntax-jsx']
          }
        }
      }
    ]
  }
}