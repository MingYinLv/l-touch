# LTouch 移动端Touch事件

### LTouch(domObj,option)

#### Arguments

1.`domObj` *(Element)*: `必选`,触发事件的节点。

2.`config:start` *(Number)*: `可选`,倒计时开始时间,默认值`59`.

3.`config:end` *(Number)*: `可选`,倒计时结束时间，默认值`0`.

3.`config:disabledCls` *(String)*: `可选`,倒计时过程中元素的样式，默认值`disabled`.

5.`config:inText` *(String)*: `可选`,倒计时过程中显示的文字，默认值`重发({i}s)`，会自动替换`{i}`为当前时间.

6.`config:callback` *(Function)*: `可选`,点击按钮后的回调函数，这里进行异步操作.

#### Returns `Object`

1.`destroy` *(Function)*: 销毁对象.

2.`success` *(Function)*: 开始倒计时，在`config:callback`中异步操作成功后调用.

3.`failed` *(Function)*: ajax调用失败后在`config:callback`中调用.

4.`getNum` *(Function)*: 返回当前共进行过几次倒计时，每次调用`start`方法会加1.
