const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.ts',
    home: './src/home.ts',
    search: './src/search.ts',
    watch: './src/watch.ts',
    sidebar: './src/sidebar.ts',
    content: './src/content.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before building
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
         { from: 'public', to: '' }
      ]
    })
  ],
  devtool: 'source-map', // Enable source maps for better debugging
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};
