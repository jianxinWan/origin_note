# call apply bind的模拟实现

> call()和apply()方法用于改变this指向，就是在使用一个指定的this和若干个参数(call的参数是一个接一个，apply接受一个数组)的条件下调用某个函数和方法。

```js
var obj = {
    value:1
}
function bar(){
    console.log(this.value);
}
bar.call(obj);
```

上面这段代码实现了两个过程

- this指向了obj
- 函数bar被执行了

## 模拟步骤

- 将函数设置为对象的属性
- 执行该函数(获取从第二个到结尾的参数存进数组，通过eval执行函数)
- 删除该函数

### 注意如果制定的this为null或者undefine,this将指向为window，如果函数有返回的对象，就将函数返回,如果传入的是一个基本类型，我们就将基本类型包装之后再返回

```js
Function.prototype.call2 = function(context){
    var context =(context===null||context === undefined)? window:new Object(context);
    context.fn = this;
    var args = [];
    for(var i=1;i<arguments.length;i++){
        args.push(`arguments[`+ i +']');
    }
    var res = eval('context.fn('+ args.toString(',') +')');
    delete context.fn;
    return res;
}
var obj = {
    name:'dolary',
    age:'18'
}
function bar(){
    console.log(this);
    console.log(this.name);
    console.log(this.age);
}
bar.call2();

```

## apply

> apply方法与call方法类似，其第二个参数是一个数组

```js

Function.prototype.apply2 = function(context,arr){
    var context = (context === null || context === undefined)?window:new Object(context);
    context.fn = this;
    var res;
    if(Array.isArray(arr)){
        var args = [];
        for(var i=0;i<arr.length;i++){
            args.push('arr['+i+']');
        }
        var res = eval('context.fn('+ args +')');
    }else{
        res = context.fn();
    }
    delete context.fn;
    return res;
}
var obj = {
    name:'dolary',
    age:18
}
function bar(n1,n2,n3,n4,n5){
    console.log(this.name);
    console.log(this.age);
    console.log(n1,n2,n3,n4,n5)
}
bar.apply2(obj,[1,2,3,4,5])

```

## bind

> bind()方法会创建一个新函数。当这个新函数调用时，bind()的第一个参数将作为它运作时的this，之后的一序列参数将会在传递的实参前传入作为他的参数。

`特点`

- 返回一个函数
- 可以传入参数

## 通过apply方法实现

```js
Function.prototype.bind2 = function(context){
    var args = Array.prototype.slice.call(arguments,1);
    var that = this;
    return function(){
        var bindArgs = Array.prototype.slice.call(arguments);
        return  that.apply(context,args.concat(bindArgs));
    }
}
```

### 构造函数效果的模拟实现。

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

`简单的说就是bind绑定的this会失效，是因为其指向了构造函数创建的实例`

```js

 Function.prototype.bind2 = function(context){
    if(typeof this !== 'function'){
        throw new Error('');
    }
    var args = Array.prototype.slice.call(arguments,1);
    var that = this;
    var fnop = function(){}
    var fbond = function(){
        var bindArgs = Array.prototype.slice.call(arguments);
        //当作为构造函数时，this指向实例，此时结果为true，将绑定的this指向实例，可以让实力获得来自绑定函数的值
        //当作为普通函数时，this指向window，此时结果为false,将绑定的this指向context
        return  that.apply(this instanceof fnop ? this : context,args.concat(bindArgs));
    }
    //将构造函数中的值拿到，使用中转的原因是防止其修改绑定函数的prototype。
    fnop.prototype = this.prototype;
    fbond.prototype = new fnop();
    return fbond;
}

```

## new

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

