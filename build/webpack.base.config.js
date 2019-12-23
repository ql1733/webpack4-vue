const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV
module.exports = {
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[hash:8].js',
        chunkFilename:'[name].[hash:8].js'
    },
    mode:'development',
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
      },
    externals: {
      // echarts: 'echarts',
      'vue': 'Vue',
      'vue-router':'VueRouter',
      'jquery': 'jQuery'
    },
    module:{
        rules:[
          {
            test: /\.(vue|js|jsx)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            enforce: 'pre',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                },
                include:[path.resolve(__dirname,'../src')],
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use:isDev?[
                {loader:'style-loader'},
                { loader: 'css-loader' },
                { loader: 'sass-loader' },
                { loader: 'postcss-loader' }
              ]: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader' },
                { loader: 'sass-loader' },
                { loader: 'postcss-loader' }
              ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    },
                  },
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                      },
                    },
                  ]
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                      },
                    },
                ]
              }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../index.html'),
            filename:'index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
    ],
    stats: 'errors-only'
}