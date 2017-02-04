module.exports = {
  entry: './client/main.jsx',
  output: {
    path: './client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'] 
  }
}