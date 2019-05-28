# Reflect

- 将object对象上的一些明显的语言内部的方法，放到Reflect对象上。
- 修改某些对象的返回结果，让其变得合理
- 让object的操作变成函数行为
- Reflect对象的方法和Proxy上的对象是一一对应的，只要是proxy上的方法，都可以在Reflect对象上找到对应的方法。

## Reflect静态方法

Reflect对象一共有13个静态方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

