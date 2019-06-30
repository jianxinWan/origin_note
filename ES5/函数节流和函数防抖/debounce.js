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