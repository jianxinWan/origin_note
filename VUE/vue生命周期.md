# Vue生命周期

> 生命周期：Vue实例从创建开始，初始化数据，模板编译，挂载DOM->渲染，更新->渲染，卸载等一系列过程，我们称这是Vue的生命周期，各个阶段有相对应的事件钩子。

![生命周期](https://user-gold-cdn.xitu.io/2018/5/6/16333e19beffa0f6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

生命周期钩子|组件状态|最佳实践
:---|:---|:---
beforeCreate|实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据|常用于初始化非响应式变量
create|实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，$ref属性内容未空数组|常用于简单的ajax请求，页面的初始化
beforeMount|在挂载开始之前被调用，beforeMount之前，会找到对应的tenplate，并编译成render函数|-
mounted|实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问|常用于获取node信息操作，ajax请求
beforeUpdate|响应式数据更新时调用，发生在虚拟DOM打补丁之前|适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
updated|虚拟DOM重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作|避免在这个阶段操作数据，可能陷入死循环
bedoreDestory|实例销毁之前调用，这一步，实例任然可以调用，this任然能获取到实例|常用于销毁定时器，解绑全局事件、销毁插件对象等操作
destory|实例销毁之后调用，调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
