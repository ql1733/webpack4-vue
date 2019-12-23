const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(base,{
    mode:'production',
    devtool: 'source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new MiniCssExtractPlugin({
            filename:  '[name].[hash].css' ,
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCSSAssetsPlugin({}),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              to: path.resolve(__dirname, '../dist/static'),
              ignore: ['.*']
            }
        ]),
        new BundleAnalyzerPlugin()
    ],
    optimization:{
        minimizer:[
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            })
        ],
        splitChunks:{
            cacheGroups:{
                commons:{
                    chunks:'initial',
                    minChunks:2,
                    maxInitialRequests:5,
                    minSize:1000
                },
                vender:{
                    test:/node_modules/,
                    chunks:'initial',
                    name:'vender',
                    priority:10,
                    enforce:true,
                }
            }
        }
    }
})