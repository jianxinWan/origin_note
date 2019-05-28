# websoket
---
特点：
（1）建立在TCP，ip之上，服务端的实现比较容易。
（2）与HTTP协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用Http协议，因此握手不容易屏蔽，能通过各种HTTP代理服务器。
（3）数据格式比较轻量，性能开销小，通信高效。
（4）可以发送文本，也可发送二进制数据。
（5）没有同源限制，客户端可以与任意服务器通信。
（6）协议标识符是```ws```,服务器网址就是URL
## 客户端API
* WebSocket构造函数
```
const ws = new WebSocket("ws://localhost:8080");

```
这样客户端就会与服务端进行连接
* webSocket.readyState
readyState属性返回实例对象的当前状态
    * CONNECTING：值为0，表示正在连接
    * OPEN：值为1，表示连接成功，可以通信了
    * CLOSING：值为2，表示连接正在关闭
    * CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
* webSocket.onopen
    onopen属性用于指定连接成功之后的回调函数
    ```
    ws.onopen = function () {
        ws.send('Hello Server!');
    }
    ```
* webSocket.onclose
用于指定连接关闭后的回调函数。当然也可以使用```addEventListener```
* webSocket.onmessage ```onmessage```属性，用于指定接收端哦服务器后的回掉函数
检测类型可以使用```binaryType```属性,显示指定接收到的二进制数据类型。
```
ws.binaryType = 'blob';
```

* webSocket.send() 用于向服务器发送数据
* webSocket.bufferedAmount表示还有多少字节的二进制数据没有发送出去，他可以用来判断发送是否结束。
* webSocket.onerror用于指定报错时的回掉函数
## 服务器端的实现
