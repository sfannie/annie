环境安装：

nodeJS + npm + gulp 

1.启动本地服务 (http://localhost:6699/annie/index.html)

npm start
或 node server.js

2.开发环境构建
npm run debug
或 gulp build -env DEV

启动开发改动监听模式： gulp watch

3.本地调试
URL加 debug=true

4. 打包

gulp build -env FAT
gulp build -env UAT
gulp build -env PRD



备注：以上命令都在项目根目录下执行


目录说明：

routes: 路由文件
templates: 模板文件
www: 开发目录
dist:  存放打包后文件
node_modules:  打包插件







