//es7中引入了sync函数，是的异步操作变得更加方便，其就是generator函数的语法糖
// const fs = require('fs');
// const readFile = (fileName)=>{
//   return new Promise((resolve,reject)=>{
//     fs.readFile(fileName,(err,data)=>{
//       if(err) reject(err);
//       resolve(data);
//     })
//   })
// }
// const asyncReadFile = async function(){
//   const f1 = await readFile('a.text');
//   const f2 = await readFile('b.text');
//   console.log(f1.toString());
//   console.log(f2.toString());
// }
// asyncReadFile();
//async 将generator函数中的*改成async  将yield替换成await
//async对generator函数的改进主要体现在四点

//1.Generator函数在执行的时候必须依靠执行器，所以才有了co模块，而async自带执行器，async函数的执行与普通函数的执行一样
//2.将*和yield改成async和await更好理解
//3.generator自动执行需要调用的co模块，函数里必须是promise对象 或者Thunk函数，对于async函数的await后面可以是Promise对象个原始类型的值，当其为原始类型时就相当于同步操作
//4.返回值时Promise对象，这相对于Generator函数返回的是Interator对象相对来说比较方便，我们可以通过then方法指定下一步的操作，我们可以理解成async可以看成多个异步操作，包装成的一个Promise对象
//而await命令就是其内部then命令的语法糖
function timeOut(ms){
  return new Promise((resolve)=>{
    setTimeout(resolve,ms);
  })
}
async function asyncPrint(value,ms){
  await timeOut(ms);
  console.log(value);
}
asyncPrint('Dolary',1000);
//返回Promise对象
//async中return语句返回的值，将会成为then方法回调函数的参数