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