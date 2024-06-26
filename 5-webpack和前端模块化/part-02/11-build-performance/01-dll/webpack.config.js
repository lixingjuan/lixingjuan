const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
   },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, './dll/manifest.json')
    }),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.join(__dirname, './dll/jquery.js'),
      publicPath: './'
    })
  ],
};
