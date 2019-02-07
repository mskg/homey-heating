const HtmlWebPackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const distPath = path.resolve(__dirname, '../homey-heating-dist');

var scriptConfig = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';

  return {
    context: path.join(__dirname, 'src/settings'),

    entry: {
      app: './index.tsx',
      // appStyles: './css/site.css',
      vendor: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
    },

    devtool: PRODUCTION ? 'cheap-module-source-map' : 'inline-source-map',

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "react": path.join(__dirname, "./node_modules/react")
      },
    },

    externals: ["Homey"],

    module: {
      rules: [{
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader?configFileName=tsconfig.react.json"
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, "css-loader"
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(argv.mode === 'production'),
        HOMEY_DEV_URL: JSON.stringify(process.env.HOMEY_DEV_URL || "http://192.168.178.117")
      }),

      !PRODUCTION ?
      new HtmlWebPackPlugin({
        template: "./index.dev.html",
        filename: "./index.html"
      }) :
      new CopyWebpackPlugin([{
        from: './index.prod.html',
        to: distPath + "/settings/index.html"
      }, ]),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],

    output: {
      filename: "[name].js",
      path: distPath + "/settings"
    },
  };
};

module.exports = scriptConfig;