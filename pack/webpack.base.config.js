const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") //将 CSS 文件打包为一个单独文件
const Vendors = ['vue', 'iview', 'vue-router', 'babel-polyfill', 'qs', path.resolve(__dirname, '../src/js/util.js')] 

module.exports = {
    devtool: 'source-map',
    entry: {
        build: [path.resolve(__dirname, '../src/main.js')],
        vendors: Vendors
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "./js/[name].[hash:6].js"
    },
    devServer: {
        contentBase: "./build",
        port: 5678,
        inline: true
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': path.resolve(__dirname, '../src'),
            js: path.resolve(__dirname, '../src/js')
        }
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'autoprefixer-loader']
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader", 'autoprefixer-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                use: ['babel-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new ExtractTextPlugin("./css/[name].[hash:6].css")
    ]

}