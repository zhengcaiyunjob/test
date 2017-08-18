var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionWebpackPlugin = require("compression-webpack-plugin");
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

var pages = utils.getEntry( './src/pages/*/*.html');
var webpackConfig = merge(baseWebpackConfig, {
    module: {
        //生成了less,sass,postcss,scss的loaders;
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true
        })
    },
    devtool: '#cheap-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: ''
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false, //去掉注释
            compress: {
                warnings: false //忽略警告
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                ['js', 'css'].join('|') +
                ')$'
            ),
            threshold: 0,
            minRatio: 0.8, //这个0.8暂时还不知道是为什么。
        }),
        // new BundleAnalyzerPlugin()
    ]
});
// 增加插件，提取html文件;
for (var pathname in pages) {
    // 配置生成的html文件，定义路径等;
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径;
        chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块;
        inject: true              // js插入位置;
    }
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象;
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
};

module.exports = webpackConfig;
