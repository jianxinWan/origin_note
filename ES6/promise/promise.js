// function timeout(ms){
//     return new Promise((resolve,reject) =>{
//         setTimeout(resolve,ms,'done');
//     })
// }
// timeout(1000).then((value)=>{
//     console.log(value);
// })


//promise新建之后就会立即执行
// let promise = new Promise((resolve,reject)=>{
//     console.log('promise');
//     resolve();
// })
// promise.then(()=>{
//     console.log('resolved');
// })
// console.log('hi');

//下面是一个异步加载图片的例子
// function loadImageAsync(url){
//     return new Promise((resolve,reject)=>{
//         const imgage = new Image();
//         image.onload = ()=>{
//             resolve(image);
//         }
//         imgage.onerror = ()=>{
//             reject(new Error("the image  is loading  faild"));
//         }
//         imgage.src = url;
//     })
// }


//实现一个Promise对象实现Ajax的例子

// const getInfo = ()=>{
//     const promise = new Promise((resolve,reject)=>{
//         const handler = ()=>{
//             if(this.readyState !==4){
//                 return ;
//             }
//             if(this.state === 200){
//                 resolve(this.response);
//             }else{
//                 reject(this.stateText);
//             }
//         };
//         const client = new XMLHttpRequest();
//         client.open("GET",url);
//         client.onreadystatechange = handler;
//         client.responseType = 'json';
//         client.setRequestHeader("Accept","application/json");
//         client.send();
//     })
//     return promise;
// }

// getInfo("/getInfo").then((res)=>{
//     console.log("请求成功！");
// },(err)=>{
//     console.log("请求失败",res);
// });

// const p1 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         //resolve();
//         console.log("哈哈哈");
//         reject("你妹的");
//         // resolve();
//     },3000);
// })
// const p2 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(p1);
//     },2000);
// })
// p2.then(()=>{
//     console.log("succeed");
// }).catch((error)=>{
//    console.log(error);
// });


//catch方法的调用

// const text = new Promise((resolve,reject)=>{
//     reject(new Error("错误"));
// })
// text.catch((error)=>{
//     console.log(error);
// })

/***
 * 
 * 并行发送三个请求
 */

// var urlList = ['111111','222222','33333333'];

// function createReq(){
//     var reqList = [];
//     for(let i=0;i<3;i++){
//         reqList[i] = new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 console.log(urlList[i]);
//                 resolve();
//             },1000);
//         });
//     }
//     return reqList;
// }
// Promise.all(createReq());


/**
 * 
 * 红绿灯问题，generator方法实现
 * 
 */


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
    return new Promise((resolve)=>{
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