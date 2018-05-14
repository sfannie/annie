
define([
    "app",
    "zepto",
    "underscore",
    "modules/index/services/indexService"
], function(app, $, _, indexService) {

    var Page = {
        //time: 0,
        timeOutEvent: 0,
        init:function(){
            this.slider.init('pageInit');
        },

        longPress: function(){
            this.timeOutEvent = 0; 
            //alert("长按事件触发发"); 
            $("#pageInit").off('touchmove');
            $('body').scrollTop(500).css('background-color','red');
        },


        slider: {
            time: 0,
            slider: null,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            init: function(id, callback) {
                var self = this;
                self.slider = document.getElementById(id);
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
                    event.preventDefault();
                    var self = this;
                    var touch = event.targetTouches[0];
                    this.startPos = {
                        x: touch.pageX,
                        y: touch.pageY,
                        time: +new Date()
                    };
                    this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
                    this.slider.addEventListener('touchmove', this, false);
                    this.slider.addEventListener('touchend', this, false);
                    this.time = setTimeout(self.done,300);
                },
                move: function(event) {
                    var self = this;
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
                    clearTimeout(self.time);
                    self.time = 0;
                },
                end: function(event) {
                    var self = this;
                    var duration = +new Date - this.startPos.time; //滑动的持续时间
                    if (this.isScrolling === 1) { //当为垂直滚动时

                        if (Number(duration) > 10) {
                            //判断向上划还是向下划
                            if (this.endPos.y > 10) {
                                console.log('向下划');
                                $('body').scrollTop(0);
                            } else if (this.endPos.y < -10) {
                                console.log('向上划');
                                event.preventDefault();
                            }
                        }

                    }

                    clearTimeout(self.time);
                    if(self.time !==0){
                        console.log('click event');
                    }
                    
                    //解绑事件
                    this.slider.removeEventListener('touchmove', this, false);
                    this.slider.removeEventListener('touchend', this, false);


                },
                done: function(){
                    this.time = 0;
                    $("body").css('background-color','#ff0000');
                    $('body').scrollTop(500);
                }

            }

        }
    };
    
    app.controller("indexController",function(){
       Page.init();
    });
});
