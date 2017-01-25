/**
 * 常量
 */
define(function() {

  _app = _app || {};

  var ENV = _app.env || 'PRD';

  if (location.href.indexOf('stock.stg.pingan.com') !== -1) {
    ENV = 'UAT';
  }

  var FAT_MAIN = 'http://localhost:6699', 
      UAT_MAIN = 'http://localhost:6699',
      PRD_MAIN = 'http://localhost:6699';

  var CONSTANT = {
    ENV: ENV,

    SUCCESS_ERR_CODE: 0,
    SUCCESS_STATUS_CODE: 0,
    FAT_MAIN: FAT_MAIN,
    UAT_MAIN: UAT_MAIN,
    PRD_MAIN: PRD_MAIN
  };

  return CONSTANT;

});