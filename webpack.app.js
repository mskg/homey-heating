const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

const distPath = path.resolve(__dirname, '../homey-heating-dist');

const package = require("./package.json");
const appPackage = require("./src/app.json");

if (package.version.indexOf("-") > 0) {
  appPackage.version = package.version.substring(0, package.version.indexOf("-"));
}
else {
  appPackage.version = package.version;
}

const tempDir = __dirname + "/tmp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
fs.writeFileSync(tempDir + "/app.json", JSON.stringify(appPackage, null, 4));

var appConfig = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';
  const plugins = [
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(PRODUCTION),
      __VERSION: JSON.stringify(package.version),
      __BUILD: JSON.stringify(process.env.TRAVIS_BUILD_NUMBER)
    }),

    // source-map is wrong for typescript code but better than nothing
    PRODUCTION ? new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      publicPath: `https://raw.githubusercontent.com/mskg/homey-heating/release/v${package.version}/`
    }) : null,

    new CleanWebpackPlugin(/*distPath*/),
    new CopyWebpackPlugin([
      {
        from: "./tmp/app.json",
        to: distPath
      },
      {
        from: './scripts/CI.md',
        to: distPath + "/README.md"
      },
      {
        from: './scripts/.homeyignore',
        to: distPath
      },
      {
        from: './APPSTORE.txt',
        to: distPath
      },
      {
        from: 'assets/**/*.png',
        to: distPath
      },
      {
        from: 'assets/**/*.svg',
        to: distPath
      },
      {
        from: '**/assets/**/*',
        context: "src/drivers",
        to: distPath + "/drivers"
      },
      {
        from: 'src/settings/index.remote.html',
        to: distPath + "/settings/index.html"
      },
      {
        from: 'node_modules/lodash/lodash.min.js',
        to: distPath + '/node_modules/lodash/index.js'
      },
      {
        from: 'node_modules/reflect-metadata/Reflect.js',
        to: distPath + '/node_modules/reflect-metadata/index.js'
      },
      {
        from: 'node_modules/athom-api/dist/index.js',
        to: distPath + '/node_modules/athom-api/index.js'
      },
      {
        from: 'locales/**/*',
        to: distPath
      },
    ])
  ].filter(Boolean);

  if (PRODUCTION) {
    plugins.push(
      new LicenseCheckerWebpackPlugin({
        allow: "(GPL-3.0 OR Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT)",
        outputFilename: "ThirdPartyNotices.txt",
        emitError: true,
        override: {
          "after@0.8.1": { licenseName: "MIT" },
          "component-bind@1.0.0": { licenseName: "MIT" },
          "component-emitter@1.1.2": { licenseName: "MIT" },
          "component-inherit@0.0.3": { licenseName: "MIT" },
          "debug@1.0.4": { licenseName: "MIT" },
          "engine.io-client@1.4.3": { licenseName: "MIT" },
          "engine.io-parser@1.1.0": { licenseName: "MIT" },
          "indexof@0.0.1": { licenseName: "MIT" },
          "ms@0.6.2": { licenseName: "MIT" },
          "object-component@0.0.3": { licenseName: "MIT" },
          "options@0.0.6": { licenseName: "MIT" },
          "utf8@2.0.0": { licenseName: "MIT" },
          "ws@0.4.31": { licenseName: "MIT" },
        }
      }));
  }

  return {
    target: 'node',
    entry: {
      app: './src/app/app.ts',
      api: './src/api/api.ts',

      'node_modules/@app/model/index': './src/app/model/index.ts',
      'node_modules/@app/helper/index': './src/app/helper/index.ts',
      'node_modules/@app/services/index': './src/app/services/index.ts',

      'node_modules/tsyringe/index': './node_modules/tsyringe/dist/esm2015/index.js',

      'drivers/virtual-thermostat/device': './src/drivers/virtual-thermostat/device.ts',
      'drivers/virtual-thermostat/driver': './src/drivers/virtual-thermostat/driver.ts',
    },

    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    },

    devtool: PRODUCTION ? false : "inline-source-map",

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
      "bufferutil": "bufferutil",
      "utf-8-validate": "utf-8-validate",
      "ws": "ws",
      "athom-api": "athom-api",
      "homey": "homey",
      "reflect-metadata": "reflect-metadata",
      "tsyringe": "tsyringe",
      "lodash": "lodash",
      "@app/model": "@app/model",
      "@app/helper": "@app/helper",
      "@app/services": "@app/services",
      "@app/flows": "@app/flows",
    },
    plugins: plugins,
    output: {
      filename: '[name].js',
      path: distPath,
      libraryTarget: "commonjs2",
    }
  }
};

module.exports = appConfig;