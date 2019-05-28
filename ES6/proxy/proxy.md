# Proxy

**Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是`代理`，用在这里表示由它来“代理”某些操作，可以译为“代理器”**

## 使用proxy拦截属性

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  },
  set:(target,property)=>{
      return 10;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title //35
```

第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有Proxy的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个get方法，用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都得到35。
如果不设置拦截，那么proxy将直接通向原对象
我们将Proxy对象直接设置到object.proxy属性，从而可以在object对象上调用

`var object = {proxy:new Proxy(target,handler)};`

## Proxy作为其他对象的原型对象

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

### 可以将读取属性的Get操作，转变为执行某个函数，从而时先属性的链式操作

```js
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

```

### 利用get拦截实现一个生成各种DOM节点的通用函数dom

```js
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

get方法的第三个参数的例子，他总是指向原始数据操作所在的那个对象，一般情况下就是Proxy实例。

```js
const proxy = new Prosy({},{
    get:function(target,property,receiver){
        return receiver;
    }
})
proxy.getReceiver = proxy //true
```

### set()

set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
下面是一个判断设置对象age时输入的是否合法

```js
let Dloay = {
    set:(obj,prop,value)=>{
        if(prop === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError("the age is not a integer");
            }else if(value>200){
                throw new TypeError('the age is incalid');
            }
        }
        obj[prop] = value
    }
}
let person  = new Proxy({},Dloay);
person.age = 100;
console.log(person.age);
person.age = 'young' // 报错
```

我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。

```js
const handler = {
    get(target,key){
        invariant(key, 'get');
        return target[key];
    },
    set(obj,key,value){
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
}
function invariant (key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}

const target  = {};
const proxy  = new Proxy(target,handler);
proxy._prop
proxy._prop = "c";
```

### apply()

apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```js
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

### has()

has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。

### construct

construct方法用于拦截new命令，下面是拦截对象的写法

```js
const handler = {
  construct(target,args,newTarget){
    return new target(...args);
  }
}
```

construct方法可以接收两个参数
-target:目标对象
-args:构造函数的参数对象
-newTarget:创建实例对时，new命令作用的构造函数。

下面拦截一个使用new操作的构造函数

```js
const p = new Proxy(function(){},{
    construct:(target,args)=>{
        return {value:args[0]*10};
    }
});
console.log((new p(1)).value);
```

**注意：construct方法返回的必须是一个对象，否则会报错**

### deleteProperty()

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false,当前属性无法被delete属性删除
deleteProperty接收两个参数，target和key
```
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
```

### defineProperty()

defineProperty方法拦截了Object.defineProperty操作

```js
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

```

**如果目标对象不可拓展（extensible）,则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外如果目标对象的某个属性不可写，或者不可配置，则defineProperty方法不得改变着两个设置**

### getOwnPropertyDescriptor()

getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个**属性描述对象**或者undefined。

### getPropertyOf

getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作
在使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤

- 目标对象上不存在的值
- 属性名为Symbol值
- 不可遍历（enumerable）的属性

### 关于proxy中的this
