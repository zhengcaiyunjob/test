var path = require('path');
var utils = require('./utils');
var entries = utils.getEntry('./src/pages/*/*.js');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: entries,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
      alias: {
            // 重定义了vue的指向，这是vue2.0升级后引发的新的问题，vue2.0在打包之后生成了3类文件，runtime文件，compile文件和common文件，其中common文件包括了runtime文件和compile文件，而应用模板必须使用compile文件，而vue的package.json的main指向的是runtime文件。因此会产生报错问题。解决的方法有两种：
          // 1，在，通过webpack的重命名机制来改变vue的来源文件。2，修改vue引用的源文件。
          'vue$': 'vue/dist/vue.esm.js',
      }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|es)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
