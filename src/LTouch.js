(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.LTouch = factory;
    }
})(window, function (domObj, option) {
    var params = {
        touchLeft: function () {    //左滑
        },
        touchRight: function () {   //右滑
        },
        touchUp: function () {      //上滑
        },
        touchDown: function () {    //下滑
        },
        touchMove: function () {    //移动
        },
        touchStart: function () {   //手指按下
        },
        touchEnd: function () {     //手指离开
        },
        offset: 0   //滑动距离超过多少触发方向事件
    };
    for (var obj in option) {
        params[obj] = option[obj];
    }
    var touchObj = {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
        moveX: 0,
        moveY: 0
    };
    domObj.addEventListener("touchstart", function (event) {

        touchObj.startX = event.changedTouches[0].pageX;
        touchObj.startY = event.changedTouches[0].pageY;
        params.touchStart.call(domObj,event, touchObj.startX, touchObj.startY);
    });
    domObj.addEventListener("touchmove", function (event) {
        touchObj.moveX = event.changedTouches[0].pageX - touchObj.startX;
        touchObj.moveY = touchObj.startY - event.changedTouches[0].pageY;
        params.touchMove.call(domObj,event, touchObj.moveX, touchObj.moveY);
    });
    domObj.addEventListener("touchend", function (event) {
        touchObj.endX = event.changedTouches[0].pageX;
        touchObj.endY = event.changedTouches[0].pageY;
        if (touchObj.startX - touchObj.endX > params.offset) { //left

            params.touchLeft.call(domObj,event, touchObj.endX - touchObj.startX);
        }
        if (touchObj.endX - touchObj.startX > params.offset) { //right
            params.touchRight.call(domObj,event, touchObj.endX - touchObj.startX);
        }
        if (touchObj.startY - touchObj.endY > params.offset) { //down
            params.touchDown.call(domObj,event, touchObj.startY - touchObj.endY);
        }
        if (touchObj.endY - touchObj.startY > params.offset) { //up
            params.touchUp.call(domObj,event, touchObj.startY - touchObj.endY);
        }
        params.touchEnd(event, touchObj.endX - touchObj.startX, touchObj.startY - touchObj.endY);
    });
    domObj.addEventListener("touchcancel", function () {
        if (touchObj.startX - touchObj.endX > params.offset) { //left
            params.touchLeft.call(domObj,event, touchObj.endX - touchObj.startX);
        }
        if (touchObj.endX - touchObj.startX > params.offset) { //right
            params.touchRight.call(domObj,event, touchObj.endX - touchObj.startX);
        }
        if (touchObj.startY - touchObj.endY > params.offset) { //down
            params.touchDown.call(domObj,event, touchObj.startY - touchObj.endY);
        }
        if (touchObj.endY - touchObj.startY > params.offset) { //up
            params.touchUp.call(domObj,event, touchObj.startY - touchObj.endY);
        }
        params.touchEnd.call(domObj,event, touchObj.endX - touchObj.startX, touchObj.startY - touchObj.endY);
    });

});