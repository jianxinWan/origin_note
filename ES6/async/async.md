# async
---
async函数是对Generator函数的改进，其体现在以下四点
* 内置执行器(其执行与普通函数一摸一样)
* 更好的语义定义(async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果)
* 更广的适用性(await命令后面可以试promise对象和原始类型的值，数值，字符串和布尔值，但是这些就等同于同步操作)
* 返回值是promise(async函数完全可以看做多个异步操作，包装成的一个Promise对象，而await就是then的一个语法糖)

## 基本用法
```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);

```
* 使用方式
```
//函数声明
async function foo(){}
//函数表达式
const foo = async function(){};
//对象的方法
let obj = {async foo(){}};
obj.foo().then(...)
//箭头函数
const foo = asynd ()=>{}
```
