//检测当前开发环境的node和npm版本是否符合要求；
require('./check-versions')()

//控制台显示spinner效果；
var ora = require('ora');
//rm模块用于删除功能，类似于rm -rf；
var rm = require('rimraf');
//路径解析功能；
var path = require('path');
//标注字体颜色
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var spinner = ora('building for production...');
spinner.start();

//删除当前目录下的dist目录，便于重新生成打包文件;
rm(path.join(path.resolve(__dirname, '../dist')), err => {
  if (err) throw err;
  //执行打包过程
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: true,
      children: true,
      chunks: true,
      chunkModules: true
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index1.html over file:// won\'t work.\n'
    ))
  })
})
