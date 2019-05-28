
## animation 与 transition的区别

我们为页面时设置动画的时候往往需要通过`transition`和`animation`属性或者用到js来控制，但是我们一般都采用css3来实现动画效果，不管是性能上还是流畅度上，都要比我们通过js实现的效果好。所以我们今天就来了解一下css3中的这两个属性，并说一下他们两个之间的区别。

### animation来实现动画

我们现在就单纯实现一个上下无限滑动的动画，我们通过改变其竖直方向上的位置，来实现简单的动画，我们主要来看看实现代码。

```css
.move{
    position: absolute;
    top:100px;
    left:100px;
    width: 200px;
    height: 200px;
    -webkit-animation:slide .8s ease-in-out infinite;
    background-color: yellowgreen;
}
@keyframes slide{
    0%{
        opacity: 0;
        transform: translateY(0%);
    }
    66%{
        opacity: 1;
        transform: translateY(100%);
    }
    100%{
        opacity: 0;
        transform: translateY(0%);
    }
}
```

我们通过给`div`添加`animation`属性，并添加动画名称，动画运动时间，动画运动函数，以及是否循环动画。
我们在之后通过`keyframes`来实现动画的运动过程，但是浏览器对于`keyframs`有一定兼容性，这里我们不列出，对于`animation`我们可以很灵活来控制每一阶段的变化。可以完成任意我们想完成的动画，功能相对来说比较强大。

### transition 

transiton是一个或者多个属性的值发生变化时触发的变化，设置transition属性的时候，顺序为属性值，过渡时间，过渡函数，如果要接连设置多个属性，我们在设置完一组之后通过逗号分隔。
下面我们通过transition来实现一个鼠标浮动上去位置移动的动画。

```css
.move{
    position: absolute;
    top:100px;
    left:100px;
    width: 200px;
    height: 200px;
    background-color: rgb(255,49,49);
    transition: left .5s linear,top .5s linear;
}
.move:hover{
    top:150px;
    left:150px;
}

```

相比`animation`，`transition`控制动画更粗犷一些，没有`animation`好控制，其唯一的动画效果依赖`transition`中运动函数这个属性,而对于`keyframes`我们可以细微的控制每一个阶段的变化。
`transition`是从`：hover`延伸出来的，不管是动态设置的还是非动态设置的过渡效果，只要过渡效果指定的属性值发生了变化就会触发过渡效果。

而`animation`是从`flash`延伸出来的，使用关键帧的概念，如果是非动态设置的，那么页面加载完后就会触发动画效果；如果是动态设置的，那么设置完后（假设没有设置 delay）就会触发动画效果。后面再改变属性值也不会触发动画效果了，除了一种情况（这种情况不会触发`transition`定义的过渡效果），就是元素从 `display:none` 状态变成非 `display:none` 状态时，也会触发动画效果。

极端条件下，`animation`占用的资源相应的比t`ransition`多，所以如果能用`transition`实现，就尽量用`transition`来实现，如果追求复杂更自由的动画，就可以用`animation`。