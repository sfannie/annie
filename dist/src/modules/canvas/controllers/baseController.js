
define([
    "app",
    "zepto"
], function(app,$) {

    var Page = {
        init:function(){
            this.createCircle('circle');
        },
        createCircle: function(id){
            var h = 100;
            var w = 100;
            var canvas = document.getElementById(id);
            var context = canvas.getContext('2d');
            canvas.height = h; 
            canvas.width = w;
            console.log(context);
            context.strokeStyle = 'blue';
            context.strokeRect(10,10,190,100);

            context.fillStyle = 'blue';
            context.fillRect(110,110,100,100);

        }
    };
    app.controller("baseController",function(){
      Page.init();
    });

});
