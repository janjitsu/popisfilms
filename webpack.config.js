const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/webapp/index.js'
  },
  output: {
    path: path.join(__dirname, "build"), // the bundle output path
    filename: "static/js/bundle.[chunkhash].js", // the name of the bundle
  },
  devServer: {
    port: 3000, // you can change the port
  },
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minChunks: 5,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor.[chunkhash]',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: ["babel-loader"], // , "eslint-loader"
      },
      {
        test: /\.css$/, // styles files
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "static/media",
            name: '[name].[hash].[ext]'
          }
        }]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: "public/favicon.ico",
      template: "public/index.html", // to import index.html file inside index.js
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/robots.txt', to: 'robots.txt' },
        { from: 'public/*.png', to: '[name][ext]' }
      ]
    }),
    // Create the stylesheet under 'styles' directory
    new MiniCssExtractPlugin({
      filename: 'static/css/styles.[chunkhash].css'
    }),
  ],
  resolve: {
    modules: ["src/webapp", "node_modules"],
    extensions: ['*', '.js', '.jsx', '.json']
  }
};

