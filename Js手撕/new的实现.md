# new

使用`new`操作符实际上是经历了四个步骤

- 创建一个新的对象 `var obj = new Object();`
- 将构造函数的作用域赋给新对象 `obj._proto_ = Constructor.prototype`
- 执行构造函数中的代码 `var res = Constructor.apply(obj,arguments);`
- 返回新对象 `return typeof res === 'object'?ret:obj;`

通过`new`操作符创建的对象，会有一个`constructor`属性指向创建他的构造函数。

```js

function objectFactory(){
    var obj = new Object();
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var res = Constructor.apply(obj,arguments);
    return typeof res === 'object'? ret:obj;
}

```

构造函数中如果返回的是一个对象，在实例中，我们就只能访问返回这个对象，`但是如果返回的是一个基本类型的值的话，当作没有返回值处理`。

在实现过程中，我们还要判断返回值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，就将我们创建的实例返回。

## 测试代码

```js
function newFun(){
    var obj = new Object();
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var res = Constructor.apply(obj,arguments);
    return typeof res === 'object'?res:obj;
}
function Person(name,age){
    this.name = name;
    this.age = age;
    return {
        name:'origin',
        age:20
    };
}
var dolary = newFun(Person,'dolary',18);
console.log(dolary);
console.log(dolary.name);
console.log(dolary.age);
```