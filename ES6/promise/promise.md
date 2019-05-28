# Promise

## 回调函数的缺点

### 回调地狱

当我们处理一个一系列异步请求时，往往需要一次执行一系列回调函数，需要在回调函数中嵌套回调函数，这使我们的代码很难维护，并且会出现这些问题

- 难以复用
    >回调的顺序确定下来之后，如果我们想对某些环节进行复用也很困难，牵一发而动全身。
- 堆栈信息被断开
    >异步的回调函数在执行时，会先执行同步代码，并将我们的异步任务添加的时间队列中,等待主线程执行完之后，再从异步队列中寻找我们的异步任务，这时再将我们的函数推入执行上下文栈中，此时执行上下文栈中只有一个执行上下文，如果回调报错，也无法获取调用该异步操作时的栈中的信息，不容易判定哪里出了错,由于时异步的，try catch也无法捕获错误。
- 借助外层变量
    >当多个异步同时进行，比如这里遍历读取文件的信息，由于无法预期完成顺序，必须借助外层作用域的变量，有时候容易产生误操作，被同一作用域的函数并修改，容易造成误操作。

### 控制反转

- 回调函数执行多次
    >在promise中，Promise只能resolve或者reject一次,状态一旦改变不得更改
- 回调函数没有执行
    >通过Promise.race来解决，只要一个成功，就会立即返回
- 回调函数有时候同步执行，有时候异步执行
    >promise中既可以执行同步代码，也可以执行异步代码，并且会按照顺寻执行，创建promise对象传入中的代码是同步代码。，只要调用resolve函数，then中指定的方法依然是异步执行的。

### promise的局限性

- 错误被吃掉
    >Promis内部的错误不会影响到Promise外部的代码，这种我们通常称为"吃掉错误"，正是因为错误被吃掉，Promise链中的错误很容易被忽略掉，我们一般推荐在Promise链的最后面添加一个catch错误，因为对于一个没有错误处理函数的Promise链，任何错误都会在链中传播下去。
- 单一值
    >Promise只能有一个完成态或者失败态，实际使用的时候往往需要多个值，一般做法就是构造一个对象或者数组，然后再传递，then中获得这个对象之后，通过解构赋值获取数值
- 无法取消
    >Promise中途一旦创建就无法取消，也就是无法中途取消
- 无法得知pending
    >当处于pending状态时，无法知道现在发展到哪一阶段

### 经典问题

#### 红绿灯问题

`任务按照顺序执行`

红灯三秒亮一次，绿灯两秒亮一次，，黄灯两秒亮一次，如果让三个灯不断交替，循环执
行？

```js
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

let light = (cb,timer)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            cb();
            resolve();
        },timer)
    })
}

let stop = function(){
    Promise.resolve()
    .then(()=>{
        return light(red,1000);
    }).then(()=>{
        return light(green,2000);
    }).then(()=>{
        return light(yellow,2000);
    }).then(()=>{
        stop();
    })
}

stop();
```

`async函数实现`

```js
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
function tic(cb,timer){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            cb();
            resolve();
        },timer);
    })
}
async function stop(){
    while(1){
        await tic(red,1000);
        await tic(green,2000);
        await tic(yellow,2000);
    }
}
stop();
```

`Generator函数实现`

```js
function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
function tic(cb,timer){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            cb();
            resolve();
        },timer);
    })
}
function * stop(){
    yield tic(red,1000);
    yield tic(green,2000);
    yield tic(yellow,2000);
}
var iterator = stop();
function run(stop,iterator){
    var s = iterator.next();
    if(s.done){
        //重新调用
        run(stop,stop());
    }else{
        //由于每一次返回的都是Promise对象，通过then调用下一次
        s.value.then(()=>{
            run(stop,iterator);
        })
    }
}
run(stop,iterator);

```

#### 并行发送三个网络请求请求

```js

var urlList = ['111111','222222','33333333'];
var reqList = [];
for(let i=0;i<3;i++){
    reqList[i] = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(urlList[i]);
            resolve();
        },1000);
    });
}
Promise.all(reqList);

```
