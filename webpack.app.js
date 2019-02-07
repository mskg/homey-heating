const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const path = require('path');
const distPath = path.resolve(__dirname, '../homey-heating-dist');

var appConfig = (env, argv) => ({
  target: 'node',
  entry: {
    app: './src/app/app.ts',
    api: './src/api/api.ts',
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
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: [
    "athom-api", "homey", "Homey"
  ],
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(argv.mode === 'production'),
    }),
    new CleanWebpackPlugin(distPath),
    new CopyWebpackPlugin([
      {
        from: './src/app.json',
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