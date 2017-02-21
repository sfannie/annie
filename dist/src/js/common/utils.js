  define([
  'js/common/constant'
], function(
  Constant
) {
  // 核心对象定义
  var utils = {
    /*
    *验证手机号码正则表达式
    *@param param 手机号码
    */
    checkPhone: function(param) {
      return /^1[34578]\d{9}$/.test(param);
    },
    //对象合并成字符串
    paramsConcat: function(opt){
        var params = '';
        for( var i in opt){
            params += i + '=' + opt[i] + '&';
        }
        return params.substring(0,params.length-1);
    },
    /**
     * 查询当前页面URL参数
     * @param param 字段名
     * @returns 字段值
     */
    getParameter: function(param) {
      var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i');
      var value = reg.exec(location.search);
      return value ? value[1] : '';
    },
    /**
     * 修改url的某个参数值
     * @param url 需要处理的url
     * @param arg 字段名
     * @param arg_val 修改值
     * @returns 修改后的url
     */
    changeParameter: function(url, arg, arg_val) {
      var pattern = arg + '=([^&]*)';
      var replaceText = arg + '=' + arg_val;
      if(url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
      } else {
        if(url.match('[\?]')) {
          return url + '&' + replaceText;
        } else {
          return url + '?' + replaceText;
        }
      }
      return url + '\n' + arg + '\n' + arg_val;
    },
    /**
     * 查询URL参数
     * @param name
     * @param [url]
     * @returns {*}
     */
    getQueryString: function(name, url) {
      var reg = new RegExp('[&,?]' + name + '=([^\\&]*)', 'i');
      var value = reg.exec(url || location.href);
      return value ? value[1] : '';
    },
    /**
     * 获取URL参数对象
     * @param queryString
     * @returns {{}}
     */
    getQueryMap: function(queryString) {
      var paramObj = {},
        paramList,
        oneQueryMatch,
        regGlobal = /[\?\&][^\?\&]+=[^\?\&#]+/g,
        regOne = /[\?\&]([^=\?]+)=([^\?\&#]+)/;

      queryString = queryString || location.href;
      paramList = queryString.match(regGlobal);

      if(!paramList) {
        return paramObj;
      }

      for(var i = 0, len = paramList.length; i < len; i++) {
        oneQueryMatch = paramList[i].match(regOne);
        if(null === oneQueryMatch) {
          continue;
        }
        paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
      }

      return paramObj;
    },
    /**
     * Cookie操作
     */
    Cookie: function(key, value, options) {
      if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = options || {};
        if(value === null || value === undefined) {
          options.expires = -1;
        }
        if(typeof options.expires === 'number') {
          var days = options.expires,
            t = options.expires = new Date();
          // expires以时间天为单位、接受小数
          t.setTime(t.getTime() + parseInt(days * 24 * 60 * 60 * 1000));
        }
        value = String(value);

        return(document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
      }
      options = value || {};
      var decode = options.raw ? function(s) {
        return s;
      } : decodeURIComponent;
      var pairs = document.cookie.split('; ');
      for(var i = 0; i < pairs.length; i++) {
        var pair = pairs[i],
          index = pair ? pair.indexOf('=') : -1,
          k, v;
        //cookie值中可能带有=号
        if(index != -1) {
          k = pair.substring(0, index);
          v = pair.substring(index + 1, pair ? pair.length : 0);

          if(decode(k) === key) {
            return decode(v || '');
          }
        }
      }
      return null;
    },
    /**
     * 本地数据操作
     * getter C.Utils.data(C.Constant.DataKey.KEY);
     * setter C.Utils.data(C.Constant.DataKey.KEY,"data");
     * @param key
     * @param value
     */
    data: function(key, value) {
      return _data(key, value);
    },
    /**
     * 会话级本地数据操作
     */
    sessionData: function(key, value) {
      return _data(key, value, 'session');
    },
    /**
     * 清除所有本地数据
     */
    clearData: function() {
      try {
        localStorage.clear();
      } catch(e) {
        console.error(e.message);
      }
    },
    /**
     * 清除所有会话级本地数据
     */
    clearSessionData: function(notClearArray) {
      try {
        var i, key;
        if(!notClearArray) {
          sessionStorage.clear();
        } else {
          for(i = sessionStorage.length - 1; i >= 0; i--) {
            key = sessionStorage.key(i);
            if(notClearArray.indexOf(key) !== -1) {
              continue;
            }
            this.sessionData(key, null);
          }
        }
      } catch(e) {
        console.error(e.message);
      }

    },
    docCookies: {
      getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if(!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
          return false;
        }
        var sExpires = "";
        if(vEnd) {
          switch(vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
            case String:
              sExpires = "; expires=" + vEnd;
              break;
            case Date:
              sExpires = "; expires=" + vEnd.toUTCString();
              break;
          }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
      },
      removeItem: function(sKey, sPath, sDomain) {
        if(!sKey || !this.hasItem(sKey)) {
          return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
      },
      hasItem: function(sKey) {
        return(new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      },
      keys: /* optional method: you can safely remove it! */ function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for(var nIdx = 0; nIdx < aKeys.length; nIdx++) {
          aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
      }
    },
    removeWechatParams: function(url) {
      url = url || '';
      var params = this.getQueryMap(url);
      var exceptparams = ['openid', 'subscribe', 'picurl', 'sex', 'signature', 'nonce', 'timestamp', 'headimgurl', 'nickname'];
      var i, len, key;
      var urlArr = url.split('?'),
        urlPath = urlArr[0],
        urlSearch = '',
        urlHash = (urlArr[1] || '').split('#')[1] || '';
      for (i = 0, len = exceptparams.length; i < len; i++) {
        delete params[exceptparams[i]];
      }
      for (key in params) {
        urlSearch += '&' + key + '=' + params[key];
      }
      urlSearch = urlSearch ? '?' + urlSearch.substring(1) : '';
      urlHash = urlHash ? '#' + urlHash : '';
      return urlPath + urlSearch + urlHash;
    },
    /** 
     * @param {String} url 跳转的页面
     * @param {String} autoFunName 跳转后自动执行的方法
     * @param {Object} autoFunData 跳转后自动执行的方法的参数
     */
    setPageAutoFun: function(url, autoFunName, autoFunData) {
      var tgAutoFunData;
      if (autoFunName) {
        tgAutoFunData = this.sessionData(Constant.DataKey.TG_AUTO_FUN) || {};
        tgAutoFunData[autoFunName] = $.extend({autoFunCreateTime: +new Date}, autoFunData);
        this.sessionData(Constant.DataKey.TG_AUTO_FUN, tgAutoFunData);
        url = this.changeParameter(url, 'autoFunName', autoFunName);
      }
      return url;
    }
  };

  /**
   * 本地缓存
   *
   * 暫時用try﹣catch包裹起操作storage的操作塊，防止app禁用localstorage
   * 或者safari在無痕模式下瀏覽等情況時導致未捕獲的異常
   * @private
   */
  function _data(key, value, type) {
    var storage = type == 'session' ? sessionStorage : localStorage;
    var getItemValue = function() {
      var data;
      try {
        data = storage.getItem(key);
      } catch(e) {
        console.log(e.message);
        return;
      }
      try {
        data = JSON.parse(data);
      } catch(e) {
        console.log(e.message);
      }
      return data;
    };
    if(key && value === undefined) {
      return getItemValue();
    } else if(key && value === null) {
      try {
        storage.removeItem(key);
      } catch(e) {
        console.log(e.message)
      }
    } else {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch(e) {
        console.log(e.message);
      }
    }
  }

  return utils;
});