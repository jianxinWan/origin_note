
## BFC IFC GFC FFC

### BFC的基本概念

BFC 定义："直译为会计格式化上下文"，他是一个独立的渲染区域，有着一套自己的渲染规则，只有块级元素参与，它规定了内部的块级元素如果布局，并且与这个区域外毫不相干。

** BFC 规则：**

- 内部的box会在垂直方向，一个接一个的放置。
- Box 垂直的距离有margin决定，相邻的两个box的margin会发生重叠。
- 每个元素的的margin box的左边，会与包含这个元素的左边对齐，即使浮动也会如此。
- BFC的区域不会与float发生重叠。
- BFC在页面上就是一个独立的容器，容器里面的子元素不会影响到外边的元素
- 计算BFC时，浮动元素的高度也计算在内。

### 哪些元素会产生BFC?

- 根元素
- float属性不为none
- overflow不为visible
- display为inner-block,table-cell,table-caption,inline-flex
- position 属性为absolute和fixed

### BFC的作用和原理

```html
<style>
    body {
        width: 300px;
        position: relative;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

这种出现的情况是，两个元素发生了重叠，我们知道`Bfc`的区域不会与`float`发生重叠，所以我们通过`main`设置`overflow:hidden`来触发`BFC`，这样会达到预期的效果。

** 父元素未设置高度，子元素设置浮动，父元素塌陷问题**
解决方案，父元素触发BFC，在规则中，父元素计算高度时，子浮动元素业绩算在内

** margin重叠问题**
当两个子元素垂直排列时，其的margin会重叠，解决方案是在子元素外部套一个div,是这个div触发BFC,这个BFC生成之后，与外部这个div并不会发生干扰，这样就不会发生重叠。

## IFC

### IFC布局规则

IFC直译为"内联格式上下文",IFC的高度由其包含行内元素中最高的实际高度计算而来,IFC中的line box一般左右都贴紧这个IFC但是会因为float元素发生扰乱,float元素会位于IFC和line box之间,是的line box宽度缩短,同下ifc下的多个line box 高度会不同.IFC如果插入块级元素的时候,会产生两个匿名模块与div分隔开,即产生两个IFC,每个IFC对外表现为块级元素,与div垂直排列.

根据块状容器内，每一行的多个内联元素共同生成一个行盒模型。当内联盒子的宽度超过line box,内联盒子会被分解成几个盒子，然后分布在几个line box里面，如果内联盒子不能被分解（例如：单词或者white-space:nowrap），它就会超过line-box。

IFC的作用:

- 水平居中:当一个块要在水平居中时,设置其为inline-block则会在外层产生IFC,通过text-align使其可以水平居中.
- 垂直居中:创建一个IFC,用其中的一个元素撑开父元素的高度,然后设置其vertical-align:middle,其它行内元素则可以再次父元素下垂直居中.

垂直居中

```css
.child1,.child2,.child3{
    display: inline-block;
}
.child1{
    width: 50px;
    height: 200px;
    vertical-align: middle;
}
.child2{
    width: 50px;
    height: 50px;
    background-color: yellow;
}
.child3{
    top:50px;
    width: 100px;
    height: 100px;
    background-color: cadetblue;
}
```

水平居中

```css
.parent{
    width: 300px;
    height: 200px;
    background-color: aqua;
    text-align: center;
}
.child1{
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: yellow;
}
```

### GFC

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。

GFC的作用？

首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

### FFC

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。

Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。

伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。