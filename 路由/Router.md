# 前端路由

为什么需要前端路由？

因为每一次返回一个新页面都会进行页面刷新，在单页面应用中，大部分页面结构不变，只改变部分内容的使用，我们可以通过前端路由改变页面内容，后台只需要提供`Ajax`数据即可。因此在框架开发的过程中，前端路由使用的就比较多。

`核心：改变路由的同时不会向后端发送请求`

## vue-router中的hash模式和history模式

- `hash`：hash虽然在URL中，但是不会包含在http请求中，对后端完全没有影响，因此改变hash不会重新加载页面。
- `history`，这个使HTML5新出API，这个API主要提供了两种方法`pushState`和`replaceState`，这两个方法用于浏览器记录栈，在当前页面已有back、forword、go的基础上他们提供了对历史记录修改的功能，只是当他们执行修改时，虽然改变了当前页面的URL，但是浏览器不会立即发送请求。

## hash模式和history两种模式的实现方式

- `hash`模式的原理是`onhashchange`事件，可以在`window`对象上监听这个事件。每当`url`变化时，就会出发这个事件。
- `history`；history提供给前端的`api(pushState、replaceState、go、back、forword)`，前端相对来说非常自由，我们通过在window上监听onpopState事件监听路由变化

`pushState、replace这两个方法接三个参数(stateObj,title，url)`

- `stateObj`一个与指定网址相关的状态对象，popState事件触发的时候，该对象会传入回调函数，如果不需要这个对象，此除可以填null
- `title`新页面的标题，但是浏览器目前都忽略这个值，我们一般设置为null。
- `url`新地址，必须与当前页面处于同一个域，浏览器的地址栏将显示这个值。

`replaceState与pushState`

```js
history.pushState({color:"red"},"red","red");
window.onpopstate = function(event){
    console.log(event.state);
    if(event.state&&event.state.color ==="red"){
        document.body.style.backgroundColor = "red";
    }
}
history.back();
history.forward();
```

`注意：仅仅调用pushState方法或者replaceState方法，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back()、forword()、go()方法时会触发`

## 应用场景

通过`pushState`把页面的状态保存在state对象中，当页面的url再跳到这个url时，可以通过event.state取到这个state对象，从而可以对页面状态进行还原，如页面的滚动条的位置，阅读进度，开关状态等。

## 两个的对比

### history相对于hash的优势

- `history`可以设置同源下任意的`url`，但是`hash`只能修改#之后的部分，因此只能设置url下同文档的url
- `pushState`可以将与当前值一样的ur推入到栈中，但是通过`hash`设置同样的值时，不会发生效果
- `pushState`通过state这个对象来存储任何属性的值，但是`hash`只能存储短字符串
- `pushState`可以提供额外的title以供之后使用

### history相对于hash的劣势

- `history`在刷新页面的时候，如果服务器中没有返回响应的响应和资源，就会出现404,如果匹配不到我们就应该返回同一个`index.html`页面，这个页面就是我们`app`的依赖页面。
- `hash`模式下，仅`#`之前的内容包含在`http`请求之中，对后端来说，及时没有做到路由全覆盖也不会报错。
- `history`需要服务器支持，但是`hash`不需要我们的服务器支持，通过框架打包之后，我们可以直接打开打包后的文件。