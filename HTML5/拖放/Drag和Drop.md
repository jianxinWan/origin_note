# HTML5拖放 Drog 和 Drop

拖放是一种常见的特性，即抓取对象之后拖放到另一个位置，在HTML5中拖放是标准的一部分，任何元素都能够被拖放。在H5之前，我们通过鼠标的事件来实现拖放的效果，其通过js来控制目标元素的位置变化.但是我们通过`onmousemove`事件来移动目标元素的过程中，每一刻目标元素的style都在修改，浏览器相对来说负载比较大，动画容易卡顿。对于drag拖放，我们可以通过浏览器来设置可拖动元素，拖动开始、拖动过程、拖动结束、接受目标drop这些事件来更好实现拖动效果。

## drag、drap事件

|事件|产生源的对象|说明
---|---|---
|dragstart|被拖动的对象|开始拖放动作
|drag|被拖动的元素|拖放过程中
|dragenter|拖动过程中鼠标经过的元素|被拖动的元素开始进入本元素的范围内
|dragleave|拖动过程中鼠标经过的元素|被拖动的元素离开本元素的范围
|drop|接受拖放目标的元素|有其他元素拖放到了本元素中
|dragend|拖动的对象元素|拖动结束
|dragend|拖动过程中鼠标经过的元素|被拖动的元素在接受目标元素上移动(类似于mouseover，建议使用dragenter)

## 兼容性检测

drag浏览器基本都支持

```js
if(Modernizr.draganddrop){
    //supports
}else{
    //not supports
}
```

## 设定可拖动元素

```html
<img draggable="true">
```

## 拖动过程中注意点

- ondragstart 在规定元素被拖动的时候，我们通过`dataTransfer,setData("Text",ev.target.id)`来保存我们要拖动的对象，这段代码中，数据类型是"Text",值是可拖动的元素。
- 在我们使用ondragover事件规定在何处放置被拖动的元素，我们要阻止对元素的默认处理方式，通过event.preventDefault()方法
- drop中也要注意浏览器的默认事件，drop事件的默认行为是以链接形式打开，所以同样要添加`event.preventDefault()`来禁止默认事件。

## 使用drag拖动照片

我们实现一个拖动照片的效果，照片通过相互拖动来实现顺序调换

设置可拖动对象，添加事件

```html
<div class='target' draggable="true" ondragstart="handleDragStart(event)" ondragleave="handleDragLeave(event)" ondrop='handleDrog(event)' ondragover="handleDragOver(event)" ondragend='handleDragEnd(event)'>
    <img src="http://www.wvue.com.cn/wvue/static/img/authorImg.c926744.jpg" alt="1">
</div>
<div class='target' draggable="true" ondragstart="handleDragStart(event)" ondragleave="handleDragLeave(event)" ondrop='handleDrog(event)' ondragover="handleDragOver(event)">
    <img src='http://ph3k80bwz.bkt.clouddn.com/Dolary.jpg' />
</div>
```

上面代码我们设置可拖动对象，给对象添加事件，每一个对象都是可拖动的，同样也可接受拖动元素。

```js
// 拖动的目标对象
let target = ''
// 拖动的目标对象的y值
let targetOffsetTop = 0
// 当元素开始被拖动时，触发该事件，目标对象是被拖动的元素
function handleDragStart(ev) {
    target = findTarget(ev.target)
    targetOffsetTop = ev.target.offsetTop
    ev.dataTransfer.effectAllowed = 'move'
}
// 当被拖动元素在悬挂元素上移动的时候,该事件触发。目标对象是被拖动元素悬挂的那个元素。
// 必须执行event.preventDefault()，不然的话ondrop不会触发
function handleDragOver(ev) {
    ev.preventDefault();
    ev.target.classList.add('dotted')
}
// 当被拖动元素离开悬挂元素时，触发该事件。目标对象是被拖动元素悬挂的那个元素。
function handleDragLeave(ev) {
    ev.target.classList.remove('dotted')
}
// 当鼠标松开被拖动元素的时候，触发该事件。目标对象是被拖动元素悬挂的那个元素。
function handleDrog(ev) {
let resultOffsetTop = ev.target.offsetTop
    if (targetOffsetTop < resultOffsetTop) {
        insertAfter(target, findTarget(ev.target))
    }
    else {
        insertBefore(target, findTarget(ev.target))
    }
    ev.target.classList.remove('dotted')
}
// 将节点插入到另一个节点前面
function insertBefore(insertNode, node) {
    node.parentNode.insertBefore(insertNode, node)
}
// 将节点插入到另一个节点后面
function insertAfter(insertNode, node) {
    if (node.nextElementSibling) {
        insertBefore(insertNode, node.nextElementSibling)
    } else {
        node.parentNode.appendChild(insertNode)
    }
}
// 当松开鼠标的时候，触发该事件。目标对象是被拖动的对象
function handleDragEnd(ev) {
    target = null
}
// 找到类名为target的目标对象
function findTarget(node) {
    if (!node || node == document) {
        return null
    }
    if (node.classList.contains('target')) {
        return node;
    }
    return findTarget(node.parentNode)
}
```

## 实现效果

![drag](http://ph3k80bwz.bkt.clouddn.com/drag.gif)
