const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    globalShamming: "./src/app.js",
    partShamming: "./src/part-shamming.js",
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
   },

  plugins: [
    new webpack.ProvidePlugin({
      "_": "lodash"
    }),
    new HtmlWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: require.resolve("./src/part-shamming.js"),
        use: 'imports-loader?wrapper=window'
      },
      {
        test: require.resolve("./src/global.js"),
        use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
      },
    ]
  }
};
