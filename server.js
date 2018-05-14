
//引入
var express = require('express');
var bodyParser = require('body-parser');

var ejs = require('ejs'),
    _ = require('underscore'),
    Utils = require('./utils'),
    pkg = require('./package.json');

var path = require('path'),
    gutil = require('gulp-util');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置静态路径
app.use('/www', express.static('www'));
app.use('/annie/images', express.static('www/images'));
app.use('/annie/modules', express.static('www/modules'));

//路径
var CONTEXT_PATH = "/www",
//构建时间
    BUILD_TIMESTAMP = gutil.date(new Date(), "yyyymmddHHMMss"),
//环境
    env = "DEV";

pkg.build = BUILD_TIMESTAMP;

//设置模板路径
app.set('views',  path.join(__dirname, 'templates')); // general config

//设置自定义模板
app.engine('ejs', function() {
  ejs.renderFile(arguments[0], {
    ctx: CONTEXT_PATH,
    _build: {
        pkg: pkg,
        version: pkg.version,
        ts: BUILD_TIMESTAMP,
        env: env
    },
    Utils: new Utils(env),
    _: _,
    data: {}
  }, arguments[1], arguments[2]);
});
app.set('view engine', 'ejs');
ejs.delimiter = '@';

//本地服务模拟接口，引入各个模块路由
var huodong = require('./routes/huodong');

//本地直连FAT测试环境时，注释下行即可
app.use('/', [huodong]);
//-------------------请求转发 Start------------------//
var request = require('request');

//匹配所有html文件
app.use('/annie/*.html', function(req, res) {
  res.render(req.params[0]);
});

//活动
app.use('/huodong', function(req, res) {
  // var robotUrl = 'https://stock.stg.pingan.com/smart';
  var robotUrl = 'http://10.25.175.118:30080/niushoworderapp/smart';
  var url = robotUrl + req.url;
  console.log('-----------req.url: ' + req.url);
  console.log('-----------url: ' + url);
  request.post(url, {json: req.body}).pipe(res);
});

//-------------------请求转发 End------------------//

var server = app.listen(6699, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


