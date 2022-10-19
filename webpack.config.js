const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ]
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
      templateParameters: {
        titulo: 'Fundación Las Delicias',
        encabezamiento: 'Para el desarrollo integral del hombre y su medio ambiente',
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/images', to: '../dist/assets/images' }
      ],
    })
  ],
  devtool: "inline-source-map"
};