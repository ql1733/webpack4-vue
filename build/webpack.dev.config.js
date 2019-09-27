const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base,{
   mode:'development',
   devServer: {
    hot:true,
    port: 9000,
    open:true
  },
   module:{
       rules:[
          {
            test: /\.css$/,
            use: [ 'vue-style-loader','css-loader']
          },
          {
            test: /\.less$/,
            use: ['vue-style-loader','css-loader','less-loader']
         }
       ]
   },
   plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
  
})
