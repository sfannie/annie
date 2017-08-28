
define([
    "app",
    "zepto",
    "js/common/common",
], function(app,$,C) {

    var Page = {
        w: $(window).width(),
        h: $(window).height(),
        init:function(){
            //this.clock();

            this.drawClock();
            setInterval(this.drawClock, 1000); 
        },
        drawImage: function(){
            var ctx = document.getElementById('baseCanvasImage').getContext('2d');
            var img = new Image();
            img.onload = function(){
                for (var i=0;i<4;i++){
                  for (var j=0;j<3;j++){
                    ctx.drawImage(img,j*50,i*38,50,38);
                  }
                }
              };
            img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

        },
        drawRangle: function(){
            var ctx = document.getElementById('rangle').getContext('2d');
              ctx.translate(75,75);

              for (var i=1;i<6;i++){ 
                ctx.save();
                ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

                for (var j=0;j<i*6;j++){
                  ctx.rotate(Math.PI*2/(i*6));
                  ctx.beginPath();
                  ctx.arc(0,i*12.5,5,0,Math.PI*2,true);
                  ctx.fill();
                }

                ctx.restore();
              }
        },
        drawClock: function(){
            var self = this; 
            var canvas = document.getElementById('baseCanvas');
            var ctx = canvas.getContext('2d');
            var h = $(window).height();
            var w = $(window).width();
            canvas.setAttribute('height',h); 
            canvas.setAttribute('width',w);

            //画背景
            ctx.save();
            ctx.clearRect(0,0,w,h);
            var bg = ctx.createLinearGradient(0, 0, 0, 600);
            bg.addColorStop(0, "#444");
            bg.addColorStop(1, '#333');
            ctx.fillStyle = bg;
            ctx.fillRect(0,0,w,h);

            //时分秒
            var now = new Date();
            var hours = now.getHours();
            var mins = now.getMinutes();
            var sec = now.getSeconds();

            hours = hours + mins/60;
            hours = hours>12?hours-12:hours;

            //圆心
            var x = w/2;
            var y = h/2;

            //表盘
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#222';
            ctx.arc(x,y,250,0,2*Math.PI, false);
            ctx.stroke();
            ctx.closePath();

            //分刻度
            for(var j=0; j<60; j++){
                ctx.save();
                ctx.translate(x,y); //重新设置圆心
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#555';
                ctx.rotate(j*6*Math.PI/180);
                ctx.beginPath();
                ctx.moveTo(0,-220);
                ctx.lineTo(0,-230);
                ctx.stroke();
                ctx.restore();
            }

            //时刻度

            for(var i=1; i<=12; i++){
                ctx.save();
                ctx.translate(x,y);
                ctx.lineWidth = 7;
                ctx.strokeStyle = '#888';
                ctx.rotate(i*30*Math.PI/180);
                ctx.beginPath();
                ctx.moveTo(0,-210);
                ctx.lineTo(0,-230);
                ctx.stroke();
                ctx.restore();
            }

            for(i=1; i<=12; i++){
                ctx.save();
                ctx.translate(x,y);
                ctx.lineWidth = 5;
                ctx.rotate(i*30*Math.PI/180);
                ctx.font = "normal 30px Verdana";
                ctx.textAlign = 'left';
                ctx.strokeStyle = '#444';
                ctx.strokeText(i, i*(-50)*Math.PI/180, -180);
                ctx.stroke();
                ctx.restore();
            }

            //画时针
            ctx.save();
            ctx.translate(x,y);
            ctx.lineWidth = 13;
            ctx.rotate(hours*30*Math.PI/180);
            ctx.beginPath();
            ctx.moveTo(0,20);
            ctx.lineTo(0,-190);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            //画分针
            ctx.save();
            ctx.translate(x,y);
            ctx.lineWidth = 9;
            ctx.rotate(mins*6*Math.PI/180);
            ctx.beginPath();
            ctx.moveTo(0,20);
            ctx.lineTo(0,-200);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.translate(x,y);
            ctx.lineWidth = 4;
            ctx.strokeStyle ='red';
            ctx.rotate(sec*6*Math.PI/180);
            ctx.beginPath();
            ctx.moveTo(0,20);
            ctx.lineTo(0,-230);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.beginPath();
            ctx.translate(x,y);
            ctx.strokeStyle = '#000';
            ctx.fillStyle = "#000";
            ctx.arc(0,0,6,0,360,false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

        },
        clock: function(){
            var self = this;
            var now = new Date();
            var ctx = document.getElementById('baseCanvas').getContext('2d');
            ctx.save();
            ctx.clearRect(0,0,150,150);
            ctx.translate(75,75);
            ctx.scale(0.4,0.4);
            ctx.rotate(-Math.PI/2);
            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.lineWidth = 8;
            ctx.lineCap = "round";

            // Hour marks
            ctx.save();
            for (var i=0;i<12;i++){
                ctx.beginPath();
                ctx.rotate(Math.PI/6);
                ctx.moveTo(100,0);
                ctx.lineTo(120,0);
                ctx.stroke();
            }
            ctx.restore();

            // Minute marks
            ctx.save();
            ctx.lineWidth = 5;
            for (i=0;i<60;i++){
            if (i%5!=0) {
              ctx.beginPath();
              ctx.moveTo(117,0);
              ctx.lineTo(120,0);
              ctx.stroke();
            }
            ctx.rotate(Math.PI/30);
            }
            ctx.restore();

            var sec = now.getSeconds();
            var min = now.getMinutes();
            var hr  = now.getHours();
            hr = hr>=12 ? hr-12 : hr;

            ctx.fillStyle = "black";

            // write Hours
            ctx.save();
            ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec);
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(80,0);
            ctx.stroke();
            ctx.restore();

            // write Minutes
            ctx.save();
            ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec);
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(-28,0);
            ctx.lineTo(112,0);
            ctx.stroke();
            ctx.restore();

            // Write seconds
            ctx.save();
            ctx.rotate(sec * Math.PI/30);
            ctx.strokeStyle = "#D40000";
            ctx.fillStyle = "#D40000";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-30,0);
            ctx.lineTo(83,0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0,0,10,0,Math.PI*2,true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(95,0,10,0,Math.PI*2,true);
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.arc(0,0,3,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.lineWidth = 14;
            ctx.strokeStyle = '#325FA2';
            ctx.arc(0,0,142,0,Math.PI*2,true);
            ctx.stroke();

            ctx.restore();
        }
    };

    app.controller("baseController",function(){
      Page.init();
    });

});
