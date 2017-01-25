
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
            canvas.height = 600; 
            canvas.width = this.w;
            console.log(ctx);

            //绘制线
            ctx.strokeStyle = 'orange';
            //绘制一个矩形的边框 , strokeRect(x, y, width, height)
            ctx.strokeRect(10,10,600,600);

            //填充
            ctx.fillStyle = 'orange';
            //绘制一个填充的矩形 fillRect(x, y, width, height) 

            //清除指定矩形区域，让清除部分完全透明。
            ctx.clearRect(40, 40, 40, 40);


            this.drawBG(ctx);

            this.drawHeart(ctx);

            this.drawImage(ctx);

            //圆弧
            //arc(x, y, radius, startAngle, endAngle, anticlockwise)
            //arcTo(x1, y1, x2, y2, radius)
            //arc()函数中的角度单位是弧度，不是度数。角度与弧度的js表达式:radians=(Math.PI/180)*degrees。

        },
        drawBG: function(ctx){
            for(var j =0; j<13; j++){
                for(var i=0; i<37; i++){
                    ctx.fillRect(20+i*16,20+j*20,6,6);
                }
            }
            
        },
        drawHeart: function(ctx){
            //二次曲线
            var t  = 100;
            ctx.beginPath();
            ctx.moveTo(t+75,t+40);
            ctx.bezierCurveTo(t+75,t+37,t+70,t+25,t+50,t+25);
            ctx.bezierCurveTo(t+20,t+25,t+20,t+62.5,t+20,t+62.5);
            ctx.bezierCurveTo(t+20,t+80,t+40,t+102,t+75,t+120);
            ctx.bezierCurveTo(t+110,t+102,t+130,t+80,t+130,t+62.5);
            ctx.bezierCurveTo(t+130,t+62.5,t+130,t+25,t+100,t+25);
            ctx.bezierCurveTo(t+85,t+25,t+75,t+37,t+75,t+40);
            ctx.fill();
        },
        drawImage: function(ctx){
            var img = new Image();
            img.onLoad = function(){
                ctx.drawImage(img,0,0);
                ctx.beginPath();
                ctx.moveTo(30,96);
                ctx.lineTo(70,66);
                ctx.lineTo(103,76);
                ctx.lineTo(170,15);
                ctx.stroke();
            };
            img.src = '../images/ico_img_1.png';

        }
    };

    app.controller("baseController",function(){
      Page.init();
    });

});
