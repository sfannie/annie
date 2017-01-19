
define([
    "app",
    "zepto"
], function(app,$) {

    var Page = {
        w: $(window).width(),
        init:function(){
            this.createBase();
        },
        createBase: function(){
            var canvas = document.getElementById('baseCanvas');
            var ctx = canvas.getContext('2d');
            canvas.height = 660; 
            canvas.width = this.w;
            console.log(ctx);

            //绘制线
            ctx.strokeStyle = 'blue';
            //绘制一个矩形的边框 , strokeRect(x, y, width, height)
            ctx.strokeRect(10,10,600,600);

            //填充
            ctx.fillStyle = 'rgba(200,0,0,0.8)';
            //绘制一个填充的矩形 fillRect(x, y, width, height)
            ctx.fillRect(20,20,100,100);  

            //清除指定矩形区域，让清除部分完全透明。
            ctx.clearRect(40, 40, 40, 40);

            // 填充三角形  moveTo(x, y)
            ctx.beginPath(); 
            ctx.moveTo(125,125);
            ctx.lineTo(205,125);
            ctx.lineTo(125,205);
            ctx.fill();

            // 描边三角形
            ctx.beginPath();
            ctx.moveTo(225,225);
            ctx.lineTo(225,145);
            ctx.lineTo(145,225);
            ctx.closePath();
            ctx.stroke();

            //圆弧
            //arc(x, y, radius, startAngle, endAngle, anticlockwise)
            //arcTo(x1, y1, x2, y2, radius)
            //arc()函数中的角度单位是弧度，不是度数。角度与弧度的js表达式:radians=(Math.PI/180)*degrees。

        }
    };

    app.controller("baseController",function(){
      Page.init();
    });

});
