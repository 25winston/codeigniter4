require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env = {}) => {
  console.log('process.env: ', process.env.CI_ENVIRONMENT, '\n\n')
  return {
    mode: process.env.CI_ENVIRONMENT === 'production' ? 'production' : 'development',
    devtool: process.env.CI_ENVIRONMENT === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
    // entry: [require.resolve(`webpack-dev-server/client`), path.resolve(__dirname, './app/Views/App.js')].filter(
    //   Boolean
    // ),
    entry: [
      // `webpack-dev-server/client?http://127.0.0.0:${process.env.PORT}/`,
      path.resolve(__dirname, './app/Views/App.js'),
    ],
    output: {
      path: path.resolve(__dirname, './public/build'),
      publicPath: './public/build',
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        // this isn't technically needed, since the default `vue` entry for bundlers
        // is a simple `export * from '@vue/runtime-dom`. However having this
        // extra re-export somehow causes webpack to always invalidate the module
        // on the first HMR update and causes the page to reload.
        vue: '@vue/runtime-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.png$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        },
        {
          test: /\.(less)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        // filename: '[name].css',
        filename: 'bundle.css',
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        process.env.CI_ENVIRONMENT === 'production'
          ? new UglifyJsPlugin({
              sourceMap: true,
              extractComments: true,
              exclude: /node_modules/,
              sourceMap: true,
              uglifyOptions: {
                compress: true,
                mangle: true,
              },
            })
          : null,
      ].filter(Boolean),
      minimize: true,
    },
    // devServer: {
    //   inline: true,
    //   hot: true,
    //   stats: 'minimal',
    //   contentBase: __dirname,
    //   overlay: true,
    //   injectClient: false,
    //   disableHostCheck: true,
    // },
  }
}
