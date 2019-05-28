# Generator

- 返回一个迭代器，通过next()方法进行执行，如果带有参数，将作为上一次yield表达式的返回值
- yield表达式，遍历器对象调用next方法，遇到yield会暂停后续的动作，下一次再调用的时候，再往下执行，直到遇到最后一个yield表达式，如果一直到函数结束，会将return的东西返回，如果没有return语句，就返回的对象中的value的值为undefined
- Generator函数就是遍历器生成对象，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使对象具有iterator属性。
- 可以通过for of 进行遍历
- next方法的参数，yield本身没有返回值，或者可以说总是返回undefined，next可以携带一个参数，该参数就会被当作上一个yield表达式的返回值

## Generator.prototype.throw()

Generator函数返回的遍历器对象，都会有一个throw方法，可以在函数体外抛出错误，然后在generator函数体内捕获。
