/**
 * 公共C模块
 */
define([
  'zepto',
  'js/common/constant',
  'js/common/utils'
], function (
  $,
  Constant,
  Utils
) {

  //zepto通用设置
  $.ajaxSettings.dataType = "json";

  var C = window.C = {
    Constant: Constant,
    Utils: Utils
  };

  return C;

});