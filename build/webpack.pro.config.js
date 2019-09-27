const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = merge(base,{
   mode:'production',
   devtool: '#cheap-module-source-map',
   module:{
       rules:[
          {
            test: /\.css$/,
            use: MiniCssExtractPlugin.loader
          },
          {
            test: /\.less$/,
            use: MiniCssExtractPlugin.loader
         }
       ]
   },
   optimization:{
        minimizer:[
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks:{
            cacheGroups:{
                commons: {
                    chunks:'initial',
                    minChunks:2,
                    maxInitialRequests: 5,
                    minSize: 1000
                },
                vender: {
                    test: /node_modules/,
                    chunks:'initial',
                    name:'vendor',
                    priority:10,
                    enforce:true
                },
                styles: {
                    name:'style',
                    test:/\.(sa|sc|c)ss$/,
                    chunks:'all',
                    enforce: true
                }
            }
        }
   },
   plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new MiniCssExtractPlugin({
        filename:  '[name].[hash].css' ,
        chunkFilename: '[id].[hash].css'
    })
  ]
})

module.exports = config