# css盒模型

## 一、css盒模型的概念

CSS css盒子模型 又称框模型 (Box Model) ，包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素。如图：
![盒模型](https://images2015.cnblogs.com/blog/993105/201607/993105-20160722121801872-494280136.gif)

元素框的总宽度 = 元素（element）的width + padding的左边距和右边距的值 + margin的左边距和右边距的值 + border的左右宽度；

元素框的总高度 = 元素（element）的height + padding的上下边距的值 + margin的上下边距的值 ＋ border的上下宽度。

### 二、css外边距合并叠加

两个上下方向相邻的元素框垂直相遇时，外边距会合并，合并后的外边距的高度等于两个发生合并的外边距中较高的那个边距值，如图：
![边距合并](https://images2015.cnblogs.com/blog/993105/201607/993105-20160722171008560-1813889758.png)

我们需要注意的是:只有普通文档流的垂直外边距才会发生边距合并。行内框、浮动框或者绝对定位之间的边距不会被合并。

### 三、box-sizing属性介绍

box-sizing是用户界面里的一种，这个属性与盒模型有关，而且我们在```css reset```是会用到它：

```box-sizing:content-box|border-box|inherit```
- ```content-box```是默认值，我们设置这个值之后，设定盒子宽的时，盒子的width只包含内容。所以计算总宽的时候要将所有的都计算在内。
- ```border-box```，设置的width是除margin之外的其他值的总和。
- ```inherit```规定应从父元素继承box-sizing属性。

为什么要使用```border-box``` ?

1 一个box宽度为100%，又想要两边有内间距，这时候用就比较好

2 全局设置 border-box 很好，首先它符合直觉，其次它可以省去一次又一次的加加减减，它还有一个关键作用——让有边框的盒子正常使用百分比宽度。

### 四、实际开发中遇到的问题

#### ```margin```越界

当父元素没有border时，设置第一个元素的时候，会出现```margin-top```值加载父元素上的现象

- 给父元素加边框border （副作用）

- 给父元素设置padding值  （副作用）

- 父元素添加 overflow：hidden （副作用）

- 父元素加前置内容生成。（推荐）

```css

.parent {
    width : 500px;
    height : 500px;       
}
.parent : before {
     content : " ";
     display : table;
}
.child {
     width : 200px;
     height : 200px;
     background-color : green;
     margin-top : 50px;
}

```


### 五、浏览器的盒模型

**标准盒子模型与IE模型之间的差异：
　　标准的盒子模型就是上述介绍的那种，而IE模型更像是 box-sizing : border-box; 其内容宽度还包含了border和padding。解决办法就是：在html模板中加doctype声明。**