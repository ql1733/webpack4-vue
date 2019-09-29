const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
module.exports = merge(base,{
    mode:'development',
    devtool: 'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ],
    devServer:{
        port:3018,
        hot:true,
        open:true
    }
})