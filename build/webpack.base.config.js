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
        filename:'[name].[hash:8]js'
    },
    mode:'development',
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
      },
    module:{
        rules:[
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
                test:/\.css$/,
                use:isDev?[
                    'style-loader','css-loader'
                ]:[MiniCssExtractPlugin.loader,css-loader]
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
        // new webpack.DefinePlugin({
        //     'process.env':{
        //         NODE_ENV:isDev?'development':'production'
        //     }
        // }),
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
    
}