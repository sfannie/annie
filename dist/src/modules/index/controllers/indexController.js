
define([
    "zepto",
    "underscore",
    "modules/index/services/indexService"
], function($, _, indexService) {

    var Page = {
        init:function(){
            console.log("helloworld");
        }
    };
    
    app.controller("indexController",function(){
      Page.init();
    });
});
