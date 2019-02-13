const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const path = require('path');
const distPath = path.resolve(__dirname, '../homey-heating-dist');

const package = require("./package.json");
const appPackage = require("./src/app.json");
appPackage.version = package.version; 

const tempDir = __dirname + "/tmp";
if (!fs.existsSync(tempDir)){
  fs.mkdirSync(tempDir);
}
fs.writeFileSync(tempDir + "/app.json", JSON.stringify(appPackage, null, 4));

var appConfig = (env, argv) => ({
  target: 'node',
  entry: {
    app: './src/app/app.ts',
    api: './src/api/api.ts',
    
    model: './src/app/model/index.ts',
    helper: './src/app/helper/index.ts',
    services: './src/app/services/index.ts',
    flows: './src/app/flows/index.ts',

    tsyringe: './node_modules/tsyringe/dist/esm2015/index.js',
  },
  
  devtool: argv.mode === 'production' ? 'cheap-module-source-map' : 'inline-source-map',  
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    "athom-api": "athom-api", 
    "homey": "homey", 
    "reflect-metadata": "reflect-metadata", 
    "tsyringe": "./tsyringe",
    "lodash": "lodash",
    "@app/model": "./model", 
    "@app/helper": "./helper", 
    "@app/services": "./services", 
    "@app/flows": "./flows",
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(argv.mode === 'production'),
    }),
    new CleanWebpackPlugin(distPath),
    new CopyWebpackPlugin([
      {
        from: "./tmp/app.json",
        to: distPath
      },
      {
        from: './README.md',
        to: distPath
      },
      {
        from: './APPSTORE.md',
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
  ],
  output: {
    filename: '[name].js',
    path: distPath,

    libraryTarget: "commonjs2",
  }
});

module.exports = appConfig;