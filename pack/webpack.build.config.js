const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map', //把浏览器中代码与开发代码做映射，定位问题用，建议生产环境也加上sourcemap来方便定位问题，具体细查
    plugins: [
        // 只删除 build 文件夹下的 bundle 和 manifest 文件
        new CleanWebpackPlugin(['build'], {
            root:path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({//引入环境变量
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new OptimizeCSSPlugin({//压缩css
          cssProcessorOptions: {
            safe: true
          }
        })
    ]
});