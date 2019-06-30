# 函数节流与函数防抖

- 函数节流: 指定时间间隔内只会执行一次任务；
- 函数防抖: 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。

## 函数节流

```js
/**
 * 函数节流  指定时间间隔内只会执行一次任务
 */

function throttle(fn, wait) {
  let timer = null
  let start = new Date()
  wait = wait || 160
  return function () {
    const args = arguments
    const context = this
    const now = new Date() - 0
    clearTimeout(timer)
    if (now - start >= wait) {
      fn.apply(context, args)
      start = now
    } else {
      setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }
}
```

### throttle 应用场景

**函数节流有哪些应用场景？哪些时候我们需要间隔一定时间触发回调来控制函数调用频率？**

- DOM 元素的拖拽功能实现（mousemove）
- 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
- 计算鼠标移动的距离（mousemove）
- Canvas 模拟画板功能（mousemove）
- 搜索联想（keyup）
- 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次

## 函数防抖

```js
/***
 * 函数防抖 每一次调用都会清楚上一次的时间函数，所以他会在某个动作完成之后再执行
 */

function debounce(fn, wait) {
  let timer = null
  return function () {
    const args = arguments
    const context = this
    clearTimeout(timer)
    setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
```

### debounce 应用场景

**函数去抖有哪些应用场景？哪些时候对于连续的事件响应我们只需要执行一次回调？**

- 每次 resize/scroll 触发统计事件
- 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）