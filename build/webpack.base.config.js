const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    entry:'../src/main.js',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js'
    },
    resolve:{
        alias:{
            '@':path.join(__dirname,'../src'),
            'vue$':'vue/dist/vue.esm.js'
        },
        extensions:['js','vue','json']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include:[path.resolve(__dirname,'../src')],
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test:/\.vue$/,
                use:[
                    {
                        loader:'vue-loader',
                        options:{
                            preserveWhitespace: false
                        }
                    }
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
                ],
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
    performance: {
        maxEntrypointSize: 400000,
        hints: isProd ? 'warning' : false
    },
    plugins:[
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        })
    ]
}