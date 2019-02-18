const HtmlWebPackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const path = require('path');
const distPath = path.resolve(__dirname, '../homey-heating-dist');
const version = require("./package.json").version;

var scriptConfig = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';
  const plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(argv.mode === 'production'),
      __HOMEY_DEV_URL: JSON.stringify(process.env.HOMEY_DEV_URL || "http://192.168.178.117"),
      __VERSION: JSON.stringify(version),
      __HOMEY_LANG: JSON.stringify(process.env.HOMEY_LANG || "en"),
      __BUILD: JSON.stringify(process.env.TRAVIS_JOB_ID),
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ];

  if (!PRODUCTION) {
    plugins.push(
      new HtmlWebPackPlugin({
        template: "./index.dev.html",
        filename: "./index.html",
      }));
  }
  else {
    plugins.push(
      new CopyWebpackPlugin([{
        from: './index.prod.html',
        to: distPath + "/settings/index.html"
      }]));
  }

  if (PRODUCTION) {
    plugins.push(
      new LicenseCheckerWebpackPlugin({
        allow: "(GPL-3.0 OR Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT)",
        outputFilename: "ThirdPartyNotices.txt",
        emitError: true,
      }));
  }

  return {
    context: path.join(__dirname, 'src/settings'),

    entry: {
      app: './index.tsx',
    },

    devtool: PRODUCTION ? 'cheap-module-source-map' : 'inline-source-map',

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "react": path.join(__dirname, "./node_modules/react")
      },
    },

    externals: ["Homey"],

    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      }
    },

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

    plugins: plugins,

    output: {
      filename: "[name].js",
      path: distPath + "/settings"
    },
  };
};

module.exports = scriptConfig;