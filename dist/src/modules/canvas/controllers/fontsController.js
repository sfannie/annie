
define([
    "app",
    "zepto",
    "js/common/common",
], function(app,$,C) {

    var Page = {
        h: $(window).height(),
        w: $(window).width(),
        canvas: document.getElementById('canvas'),
        ctx: canvas.getContext('2d'),
        baseFontSize: parseFloat($('html').css('font-size')),
        init: function(){
          this.canvas.setAttribute('height',this.h); 
          this.canvas.setAttribute('width',this.w);
          this.draw();
        },
        draw: function(){
            var ctx = this.ctx, self = this;
            ctx.save();
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, self.w, self.h);
            ctx.font = this.baseFontSize*0.6+'px Arial bold';
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("录取通知书",self.w/2,80);
            ctx.textAlign = 'left';
            ctx.font = this.baseFontSize*0.36+'px Arial bold';
            ctx.fillText("【xxx微信昵称]同学】：", this.baseFontSize*0.2, 150);
            this.drawLongText(ctx, "恭喜您以优异成绩，被平安证券股市大学【股票讲堂】专业录取，平安证券总部投顾团队欢迎您的加入，祝好好学习，天天向上，投资顺利！", this.baseFontSize*0.2, 200);
            //ctx.fillText("恭喜您以优异成绩，被平安证券股市大学[xxxx]专业录取，平安证券总部投顾团队欢迎您的加入，祝好好学习，天天向上，投资顺利！", 20, 200, self.w-40);
            ctx.textAlign = 'right';
            ctx.fillText("xxx年xx月xx日", self.w-this.baseFontSize*0.2, 380);
            ctx.fillText("平安证券股市大学", self.w-this.baseFontSize*0.2, 430);
        },
        drawLongText: function(ctx, longTex, startX, startY){
            var len = longTex.length, i, count = 0;
            var words = longTex.split(''), text = '';
            var rowLen = parseInt((this.w - this.baseFontSize*0.4)/(this.baseFontSize*0.36));
            console.log(rowLen);

            for(i=0; i<=len; i++){
              if(count === rowLen){
                  ctx.fillText(text, startX, startY);
                  startY = startY + this.baseFontSize*0.5;
                  text = '';
                  count = 0;
              }
              if(i=== len){
                  ctx.fillText(text, startX, startY);
              }
              text = text + words[0];
              count ++;
              words.shift();
            }

        },
        print: function(ctx, text, startX, startY){
            var self = this;
            var words = text.split(''), i, len = words.length;
            var row = len/10; 
            for(i=0; i<len; i++){
                ctx.fillText(words[i], startX+30*i, startY, self.w-40);
            }

        }

    };

    app.controller("fontsController",function(){
      Page.init();
    });

});