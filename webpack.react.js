const HtmlWebPackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");
const path = require('path');
const distPath = path.resolve('/tmp/homey-heating');
const version = require("./package.json").version;

var scriptConfig = (env, argv) => {
  const PRODUCTION = argv.mode === 'production' || process.env.FORCE_PRODUCTION == "true";
  console.log('******************* PRODUCTION?', PRODUCTION );

  const plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(argv.mode === 'production'),
      __HOMEY_DEV_URL: JSON.stringify(process.env.HOMEY_DEV_URL || "http://homey-pro.iot.home.arpa"),
      __VERSION: JSON.stringify(version),
      __HOMEY_LANG: JSON.stringify(process.env.HOMEY_LANG || "en"),
      __BUILD: JSON.stringify(process.env.GITHUB_REF_NAME),
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
    plugins.push(new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      publicPath: `https://raw.githubusercontent.com/mskg/homey-heating/release/v${version}/settings/`
    }));

    plugins.push(
      new CopyWebpackPlugin([{
        from: './index.prod.html',
        to: distPath + "/settings/index.html"
      }]));
  }

  if (PRODUCTION) {
    plugins.push(
      new LicenseCheckerWebpackPlugin({
        allow: "(GPL-3.0 OR Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR 0BSD OR MIT OR ISC)",
        // https://github.com/microsoft/license-checker-webpack-plugin/pull/37#issuecomment-1006780673
        filter: /(^.*[/\\]node_modules[/\\]((?:@[^/\\]+[/\\])?(?:[^@/\\][^/\\]*)))/,
        outputFilename: "ThirdPartyNotices.txt",
        emitError: true,
        override: {
          "create-react-context@0.2.3": { licenseName: "MIT" },
          // this is proprietary but OK here
          "homey-api@1.10.20": { licenseName: "ISC" },
          "@types/homey@0.3.4": { licenseName: "ISC" },
        }
      }));
  }

  return {
    context: path.join(__dirname, 'src/settings'),

    entry: {
      app: './index.tsx',
    },

    devtool: PRODUCTION ? 'source-map' : 'inline-source-map',

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "react": path.join(__dirname, "./node_modules/react")
      },
    },

    optimization: {
      innerGraph: true,
      mangleExports: true,
      minimize: true,
      mergeDuplicateChunks: true,
      removeEmptyChunks: true,
    },

    externals: ["Homey"],

    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader"
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              esModule: false,
            },
          },
        ],
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