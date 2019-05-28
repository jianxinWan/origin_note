# Event Loop

## 浏览器下的事件循环

![js执行机制](https://user-gold-cdn.xitu.io/2018/8/30/16589b4a4cce8b3e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

js分为同步任务和异步任务，在执行时，同步任务直接放入主线程进行执行，等同步任务执行完毕再从异步任务队列中再一次读取任务，在这个过程中，js引擎会不断检查任务队列中还有没有任务，这也就是我们所说的事件循环。

### 异步任务

#### 宏任务（task）

- setTimeout,setInterval
- I/O
- setImmediate(node)
- requestAnimationFrame(浏览器)

#### 微任务(Microtask)

- process.nextTick(node)
- MutationObserver(浏览器)
- Promise catch  finally
