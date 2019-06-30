//升序数组中找出连续序列

// function test(){
//     let arr = [1,2,3,4,5,7,13,15,16];
//     let item = [];
//     let res = [];
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]+1 === arr[i+1]){
//             item.push(arr[i]);
//             if(arr[i+1]+1 !== arr[i+2]){
//                 //添加连续项末尾的元素
//                 item.push(arr[i+1]);
//             }
//         }else{
//             if(arr[i]-1 !== arr[i-1] && arr[i]+1 !== arr[i+1]){
//                 res.push(arr[i]);
//             }else{
//                 console.log(item);
//                 res.push(item[0]+'->'+item[item.length-1]);
//             }
//             item.length = 0;
//         }
//     }
//     console.log(res);
// }

// test();

//设计一个简单的任务队列，要求分别在1，3，4秒后打印“1”,"2","3"

class Queue{
    constructor(){
        this.queue = [];
        this.time = 0;
    }
    task(t, fn) {
        this.time += t;
        this.queue.push([fn, this.time]);
        return this;
    }
    start() {
        this.queue.forEach((item) => {
            setTimeout(() => {
                item[0]();
            }, item[1]);
        })
    }
}

new Queue()
    .task(1000, () => {
        console.log(1)
    })
    .task(2000, () => {
        console.log(2)
    })
    .task(1000, () => {
        console.log(3)
    })
    .start(); 

//一行代码判断一个字符串是不是回文串

// let str ="1234554321";
// console.log(str.split('').reverse().join('') === str);


/**
 * promise封装ajax请求
 * 
 */

// let requestOptions = {
//     url:"#",
//     methods:'GEt',
//     data:{},
//     async:true,
//     headers:{},
//     responseType:'json',
//     xhr:null
// }

// function ajax(reqtOptions){
//     var options = {};
//     for(let k  in reqtOptions){
//         options[k] = reqtOptions[k] || requestOptions[k];
//     }
//     return new Promise((resolve,reject)=>{
//         let xhr = null;
//         if(window.XMLHttpRequest){
//             xhr = new XMLHttpRequest();
//         }else{
//             xhr = new ActiveXObject('Microsoft.XMLHTTP');
//         }
//         xhr.onReadystatechange = function(){
//             if(xhr.reayState === 4){
//                 if(xhr.status >=200 && xhr.status<300 || xhr.status===304){
//                     reject(xhr.resposeText);
//                 }else{
//                     resolve(xhr.statusText);
//                 }
//             }
//         }
//         //检测是否为post请求
//         if(options.methods === "POST"){
//             xhr.open('POST', options.url, true);
//             xhr.responseType = options.responseType;
//             for(let k in options.headers){
//                 xhr.setRequestHeader(k, options.header[k]);
//             }
//             xhr.send(obj.data);
//         }else{
//             let query = null;
//             for(let k in options.data){
//                 query+= '&' + encodeURIComponent(k) + '=' + encodeURIComponent(options.data[k]);
//             }
//             xhr.open('GET',options.url+'?'+query,true);
//             xhr.send(null);
//         }
//     })
// }


/**
 * <script>中延迟脚本和异步脚本
 * 
 */


/*
## 延迟脚本
<script></script>中如果定义了`defer`属性，这个属性的用途是，表示脚本在执行是不会影响页面的构造，也就是说，脚本会延迟到整个页面解析完毕之后再执行，
在script中设置defer属性相当于告诉浏览器立即下载，虽然我们将带有defer属性的script放在head中，但是其会等到</head>才会执行，，但是如果出现多个带
defer属性的script标签，不一定按照顺序执行，因此最好只存在一个延迟脚本，延迟脚本之间是按照他们的顺序进行执行

defer属性只适用于外部脚本文件，HTML5会忽略这个属性，因此将script脚本放在html最后面仍然是最好的选择。

## 异步脚本

这个属性与defer属性类似，但是async只适用于外部脚本文件，并告诉浏览器立即下载文件，使用了async属性，并不一定会按照他们的先后顺序执行。
异步脚本一定会在页面的load事件前执行。

## noscript

该元素可以在不支持脚本的浏览器中显示内容

*/


/***
 * 
 * 归并排序
 */
// function mergeSort(arr){
//     if(arr.length<2){
//         return arr;
//     }
//     let mid = arr.length/2;
//     let left = arr.slice(0,mid);
//     let right = arr.slice(mid,arr.length);
//     if(left === 'undefine' && right === 'undefine'){
//         return false;
//     }
//     return merge(mergeSort(left),mergeSort(right));
// }

// function merge(left,right){
//     let res = [];
//     while(left.length&& right.length){
//         if(left[0]<right[0]){
//             res.push(left.shift());
//         }else{
//             res.push(right.shift());
//         }
//     }
//     while(left.length){
//         res.push(left.shift());
//     }
//     while(right.length){
//         res.push(right.shift());
//     } 
//     return res;
// }

// console.log(mergeSort([3,4,5,6,7,2,3,4,5,9]));

/**
 * 
 * 
 */