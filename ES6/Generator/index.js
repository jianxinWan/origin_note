//因为yield表达式本身没有返回值，或者说其返回值总是undefine,next方法可以带一个参数，该参数会被当作上一个yield表达式的返回值。

function* gen(x){
    let y = 2* (yield(x+1));
    console.log(y);
    let z = yield(y/3);
    return (x+y+z);
}
let a = gen(5);
console.log(a.next());
console.log(a.next(5));
console.log(a.next(5));

/************************************* */

//for  of  可以自动遍历Generator生成的iterator对象，并且此时不再需要调用next()方法；
// function* foo(){
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
// }
// for( let v of foo()){
//     console.log(v);
// }
//通过for of 实现斐波那契的列子
// function* fibonacci(){
//     let [prev,curr] = [0,1];
//     for(;;){
//         yield curr;
//         [prev,curr] = [curr,curr+prev];
//     }
// }
// for(let n of fibonacci()){
//     if(n>100000){
//         break;
//     }
//     console.log(n);
// }

/****************************************************** */
//关于Thunk函数的定义
/*
Thunk 函数相当于‘传名调用’的一种实现策略，用来替换某个表达式的。
*/
// let thunk  = ()=>{
//     return (x+5);
// }
// function f(thunk){
//     return thunk* 2;
// }
//Thunkify 模块

//Thunkify源码
// function thunkify(){
//     return function(){
//         let args = [...arguments];
//         var ctx = this;
//         return function(){
//             let called;
//             args.push(function(){
//                 if(called) return;
//                 called = true;
//                 done.apply(null,arguments);
//             });
//             try{
//                 fn.apply(ctx,args);
//             }catch(err){
//                 done(err);
//             }
//         }
//     }
// }

//Thunkify模块的使用，

// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);

// var gen = function* (){
//   var r1 = yield readFileThunk('/etc/fstab');
//   console.log(r1.toString());
//   var r2 = yield readFileThunk('/etc/shells');
//   console.log(r2.toString());
// };
//Thunk函数的自动流程管理
/**
 * 
 * 需要注意的是  每一个异步操作都必须是一个thunk函数，即每一个yield函数后面必须是一个Thunk函数 
 */
// function run (fn){
//     var gen = fn();
//     function next(err, data) {
//         var result = gen.next(data);
//         if (result.done) return;
//         result.value(next);
//     }
//     next();
// }
// let thunk1 = function(){
//     return ()=>{
//         setTimeout(()=>{
//             console.log("111111");
//         },1000);
//     };
// }
// let thunk2 = function(){
//     return function(){
//         setTimeout(()=>{
//             console.log("222222");
//         },1000);
//     }
// }
// function f(thunk){
//     return thunk();
// }
// function * g(){ 
//     let r1 = yield f(thunk1);
//     let r2 = yield f(thunk2);
// }
// run(g);

/***
 * co模块
 */
//co模块将generator函数传入co函数  就会自动执行 co函数返回的是一个promise对象，我们可以通过then方法添加回调函数
//如果需要使generator函数自动执行，其需要一种机制，就是当异步操作有了结果，能够自动交回执行权，我们有两种方法可以做到这一点
//(1)回调函数，我们将回调函数封装成Thunk函数，在回调函数中提交执行权
//(2)promise对象，我们将异步操作包装成Promise对象，我们用then方法提交执行权
// const co  = require('co');
// const fs = require('fs');
// let gen = function* (){
//     var f1 = yield fs.readFile('a.text',(data,err)=>{
//         if(err){
//             return err
//         }else{
//            return data; 
//         }
        
//     });
//     var f2 = yield fs.readFile('b.text',(data,err)=>{
//         if(err){
//             return err;
//         }else{
//            return data; 
//         }
        
//     });
//     console.log(f1.toString());
//     console.log(f2.toString());
// }
// co(gen);

//关于promise自动执行的函数
// function run(){
//     let g = gen();
//     function next(data){
//         let result  = g.next(data);
//         if(result.done) return result.value;
//         result.value.then(function(data){
//             next(data);
//         })
//     }
//     next();
// }
// run(gen);
//co模块处理并发操作
//数组的写法
// co(function* (){
//     let res = yield [
//         Promise.resolve(1),
//         Promise.resolve(2)
//     ];
// }).catch(onerror);
// //对象的写法
// co(function* (){
//     let res = yield{
//         1:Promise.resolve(1),
//         2:Promise.resolve(2)
//     }
//     console.log(res);
// })


//example  
const fs = require('fs');
const co = require('co');
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('a.text');
  const f2 = yield readFile('b.text');
  console.log(f1.toString());
  console.log(f2.toString());
};

co(gen);