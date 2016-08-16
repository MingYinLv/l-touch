# LTouch 移动端Touch事件

### Element.onTouch(option)

#### Arguments

1.`option`  *(Object)*: `必选`，初始化参数

    `touchLeft` *(Function)*: `可选`,左滑
    `touchRight` *(Function)*: `可选`,右滑
    `touchTop` *(Function)*: `可选`,上滑
    `touchBottom` *(Function)*: `可选`,下滑
    `touchStart` *(Function)*: `可选`,手指按下
    `touchEnd` *(Function)*: `可选`,手指松开
    `touchMove` *(Function)*: `可选`,手指移动
    `offset` *(Function)*: `可选`,手指移动超过多少触发touchLeft,touchRight,touchTop,touchBottom,默认0
    
支持Element.onTouch().touchLeft(function(){})... 链式调用

