const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // { test: /\.css$/, loader: "style-loader" },
      // {
      //   test: /\.css$/i,
      //   loader: "css-loader",
      //   options: {
      //     modules: true,
      //   },
      // },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "../public/index.html",
    }),
  ],
  node: {
    fs: "empty",
  },
};
