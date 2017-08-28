
define([
    "app",
    "zepto",
    "underscore",
    "modules/index/services/indexService"
], function(app, $, _, indexService) {

    var Page = {
        timeOut: 0,
        init:function(){
            //self.slider.init();
            document.getElementById('pageInit').addEventListener('touchstart',function(e) {  
                //
                this.timeOut = setTimeout(function(){
                    $('body').css('background','#'+Math.floor(Math.random()*256).toString(10));
                    e.preventDefault();
                },500);
            });

            document.getElementById('pageInit').addEventListener('touchmove',function(e){
                clearTimeout(this.timeOut);
                this.timeOut = 0;
            });

            document.getElementById('pageInit').addEventListener('touchend',function(e){
                clearTimeout(this.timeOut);
                if(this.timeOut != 0){
                    $('body').css('background','#fff');
                }
                return false;
            });
        },
        slider: {
            slider: document.getElementById('pageInit'),
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            init: function() {
                var self = this;
                if (!!self.touch) {
                    self.slider.addEventListener('touchstart', self.events, false);
                }
            },
            events: {
                startPos: {},
                endPos: {},
                isScrolling: undefined,
                slider: document.getElementById('pageInit'),
                handleEvent: function(event) {
                    var self = this; //this指events对象
                    if (event.type == 'touchstart') {
                        self.start(event);
                    } else if (event.type == 'touchmove') {
                        self.move(event);
                    } else if (event.type == 'touchend') {
                        self.end(event);
                    }
                },
                start: function(event) {
                    var touch = event.targetTouches[0];
                    this.startPos = {
                        x: touch.pageX,
                        y: touch.pageY,
                        time: +new Date()
                    };
                    this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
                    this.slider.addEventListener('touchmove', this, false);
                    this.slider.addEventListener('touchend', this, false);
                },
                move: function(event) {
                    if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                    var touch = event.targetTouches[0];
                    this.endPos = {
                        x: touch.pageX - this.startPos.x,
                        y: touch.pageY - this.startPos.y
                    };

                    //isScrolling为1时，表示纵向滑动，0为横向滑动
                    this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0;

                    if (this.isScrolling === 1) {
                        event.preventDefault();
                    }
                },
                end: function(event) {
                    var duration = +new Date - this.startPos.time; //滑动的持续时间
                    if (this.isScrolling === 1) { //当为水平滚动时

                        if (Number(duration) > 10) {
                            //判断向上划还是向下划
                            if (this.endPos.y > 10) {
                                console.log('向下划');
                            } else if (this.endPos.y < -10) {
                                console.log('向上划');
                                
                                $('body').scrollTop(0);
                                    
                            }
                        }

                    }
                    
                    //解绑事件
                    this.slider.removeEventListener('touchmove', this, false);
                    this.slider.removeEventListener('touchend', this, false);


                }

            }

        }
    };
    
    app.controller("indexController",function(){
      Page.init();
    });
});
