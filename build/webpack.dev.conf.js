var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var pages = utils.getEntry('./src/pages/*/*.html');

var webpackDevConfig = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        rules: utils.styleLoaders({sourceMap: false})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        compress: true,
        host: process.env.HOST,
        inline: true,
        hot: true,
        port: 3001,
        proxy: {
            "/pc": {
                target: "/",
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"development"'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://127.0.0.1:3001/billReconciliation.html'
        })
    ],
});

// 添加htmlWebpackPlugin插件；
for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
        inject: true              // js插入位置
    }
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    webpackDevConfig.plugins.push(new HtmlWebpackPlugin(conf))
};

module.exports = webpackDevConfig;
