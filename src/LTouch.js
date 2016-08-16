(function (win) {


    /**
     * 默认参数
     * @type {{offset: number}} 滑动距离超过offset像素触发 (touchLeft,touchRight,touchUp,touchDown)
     */
    var defaults = {
        offset: 0
    };


    /**
     * @description 初始化touch事件
     * @param {Object} [initial]
     * 初始化对象
     * @returns {Element}
     * 节点本身
     */
    Element.prototype.onTouch = function (initial) {
        if (this.initialStatus) {
            console.warn('已经初始化！');
            return this;
        }
        initial = initial ? initial : {};
        this.initialStatus = true;  //已经初始化
        //覆盖默认参数
        this.touchObject = {};
        for (var _initial in defaults) {
            this.touchObject[_initial] = defaults[_initial];
        }
        for (var _initial in initial) {
            this.touchObject[_initial] = initial[_initial];
        }
        var _touchObject = this.touchObject;    //临时变量
        //监听touchstart事件
        this.addEventListener('touchstart', function (event) {
            _touchObject.startX = event.changedTouches[0].pageX;    //按下的x坐标
            _touchObject.startY = event.changedTouches[0].pageY;    //按下的y坐标
            //如果监听了touchStart，则调用该函数
            typeof _touchObject.touchStart === 'function' ? _touchObject.touchStart.call(this, event, _touchObject.startX, _touchObject.startY) : '';
        }, false);

        //监听touchmove事件
        this.addEventListener('touchmove', function (event) {
            _touchObject.moveX = event.changedTouches[0].pageX - _touchObject.startX;   //计算x坐标移动的距离
            _touchObject.moveY = _touchObject.startY - event.changedTouches[0].pageY;   //计算y坐标移动的距离
            typeof _touchObject.touchMove === 'function' ? _touchObject.touchMove.call(this, event, _touchObject.moveX, _touchObject.moveY) : '';
        });

        //监听touchend事件
        this.addEventListener('touchend', function (event) {
            _touchObject.endX = event.changedTouches[0].pageX;  //手指离开时候的x坐标
            _touchObject.endY = event.changedTouches[0].pageY;  //手指离开时候的y坐标
            if (_touchObject.startX - _touchObject.endX > _touchObject.offset) { //left
                typeof _touchObject.touchLeft === 'function' ? _touchObject.touchLeft.call(this, event, _touchObject.endX - _touchObject.startX) : '';
            }
            if (_touchObject.endX - _touchObject.startX > _touchObject.offset) { //right
                typeof _touchObject.touchRight === 'function' ? _touchObject.touchRight.call(this, event, _touchObject.endX - _touchObject.startX) : '';
            }
            if (_touchObject.startY - _touchObject.endY > _touchObject.offset) { //down
                typeof _touchObject.touchDown === 'function' ? _touchObject.touchDown.call(this, event, _touchObject.startY - _touchObject.endY) : '';
            }
            if (_touchObject.endY - _touchObject.startY > _touchObject.offset) { //up
                typeof _touchObject.touchUp === 'function' ? _touchObject.touchUp.call(this, event, _touchObject.startY - _touchObject.endY) : '';
            }
            typeof _touchObject.touchEnd === 'function' ? _touchObject.touchEnd.call(this, event, _touchObject.endX - _touchObject.startX, _touchObject.startY - _touchObject.endY) : '';
        });

        this.addEventListener('touchcancel', function () {
            _touchObject.endX = event.changedTouches[0].pageX;  //手指离开时候的x坐标
            _touchObject.endY = event.changedTouches[0].pageY;  //手指离开时候的y坐标
            if (_touchObject.startX - _touchObject.endX > _touchObject.offset) { //left
                typeof _touchObject.touchLeft === 'function' ? _touchObject.touchLeft.call(this, event, _touchObject.endX - _touchObject.startX) : '';
            }
            if (_touchObject.endX - _touchObject.startX > _touchObject.offset) { //right
                typeof _touchObject.touchRight === 'function' ? _touchObject.touchRight.call(this, event, _touchObject.endX - _touchObject.startX) : '';
            }
            if (_touchObject.startY - _touchObject.endY > _touchObject.offset) { //down
                typeof _touchObject.touchDown === 'function' ? _touchObject.touchDown.call(this, event, _touchObject.startY - _touchObject.endY) : '';
            }
            if (_touchObject.endY - _touchObject.startY > _touchObject.offset) { //up
                typeof _touchObject.touchUp === 'function' ? _touchObject.touchUp.call(this, event, _touchObject.startY - _touchObject.endY) : '';
            }
            typeof _touchObject.touchEnd === 'function' ? _touchObject.touchEnd.call(this, event, _touchObject.endX - _touchObject.startX, _touchObject.startY - _touchObject.endY) : '';
        });


        /**
         *  链式调用的方法
         */
        ['touchLeft', 'touchRight', 'touchUp', 'touchDown', 'touchStart', 'touchEnd', 'touchMove'].forEach(function (item) {
            this[item] = function (cb) {
                _touchObject[item] = cb;
                return this;    //返回本身
            };
        }.bind(this));
        //返回节点
        return this;
    };

})(window);