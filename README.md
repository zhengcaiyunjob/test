# 关于搭建基于webpack的vue多页系统

1. npm install; 
2. 运行npm run start;
3.  http://127.0.0.1:3001/index1.html#/foo；
4. 打包用npm run build;
5. 关于多页的配置，在src/pages下面随便新建文件夹，作为多页模块的划分，每一个文件夹代表一个模块，类似于demo中的例子，分别有index1, index2两个模块，每一个模块就是一个页面。每个模块下面有一个.html文件和一个.js文件，分别代表每一个模块的模板和js文件，详细信息请参考demo。