const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.base.config.js')


const app = express();
const port = 1234;

webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());//热加载相关（排序输出,通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小）
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());//热加载相关
webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());//热加载相关,在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
// 热加载规定写法，向数组的开头添加一个或更多元素，并返回新的长度;reload设置为true在Webpack卡住时自动重新加载页面
webpackConfig.entry.build.unshift("webpack-hot-middleware/client?reload=true?http://localhost:" + port);

webpackConfig.node={
    color:true,
    progress:true
}
var compiler = webpack(webpackConfig);//返回一个webpack编译器
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,//将中间件绑定到服务器的路径,在大多数情况下，这等于webpack配置选项output.publicPath
    // quiet:true,
    stats: {
        colors: true,//带控制台颜色
        chunks: false//添加块信息（将此设置为false允许较少详细的输出）
    }
});
var hotMiddleware = webpackHotMiddleware(compiler);
compiler.plugin('compilation', function(compilation) {//监听事件，当webpack编译完成时，执行下列方法
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {//如果文件发生更改，就执行下列方法
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});
// express引入中间件
app.use(devMiddleware);
app.use(hotMiddleware);

//自动打开浏览器
if (process.argv.indexOf('--open')>-1) {//process.argv对应package.json scripts.dev的三个参数
    var child_process = require('child_process'),
        url = 'http://localhost:' + port,
        cmd = "";
    if (String(process.platform).toLowerCase().indexOf("darwin") >= 0) {
        cmd = 'open';
    } else if (String(process.platform).toLowerCase().indexOf("win") >= 0) {
        cmd = 'explorer';
    } else if (String(process.platform).toLowerCase().indexOf('linux') >= 0) {
        cmd = 'xdg-open';
    } else {
        cmd = 'open';
    }
    child_process.exec(`${cmd} "${url}"`);//传入 exec 函数的 command 字符串会被 shell 直接处理
}

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
})

