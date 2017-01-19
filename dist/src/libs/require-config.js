(function() {
	var ts = new Date().getTime();
	var map;
	try {
		// 已经由basket管理缓存了
		ts = _app.ts;
		// 开发环境下固定
		if(_app.env == "DEV") {
			ts = "dev";
		}
		var getParameter = function(param) {
			var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
			var value = reg.exec(location.search);
			return value ? value[1] : '';
		};
		var debug = getParameter("DEBUG");
		if(debug) {
			ts = "debug";
			map = {
				"*": {
					"js": "src/js",
					"modules": "src/modules"
				}
			}
		}
	} catch(e) {}
	requirejs.config({
		waitSeconds: 20,
		// iloan自带构建时间戳
		// 已经由basket管理缓存了
		urlArgs: function(moduleName) {
			// 核心库不是每次都修改就手动改版本号
			var v = {
				"zepto": "1.1.6_1",
				"touch": "1.1.6_1",
				"underscore": "1.8.3"
			}
			if(v[moduleName]) {
				return "v=" + v[moduleName];
			} else {
				return "v=" + ts;
			}
		},
		baseUrl: "",
		paths: {
			// zepto
			C: 'js/common/common',
			zepto: 'libs/zepto/zepto.min',
			touch: 'libs/zepto/touch.min',
			// angular
			app: 'modules/app',
			// underscore
			underscore: 'libs/underscore-min',
			// plugins
		},
		map: map,
		shim: {
			
			'touch': {
				deps: ['zepto']
			}
		}
	});
})();