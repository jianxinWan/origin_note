# Ajax

## Ajax的优点

- 无刷新更新数据，通过form表单提交数据的时候，我们点击提交之后，整个页面都会进行刷新，用户体验感太差。
- 异步与服务器进行通信，不会阻塞浏览器渲染
- 减轻服务端压力，前端处理返回的数据，对页面进行渲染
- 被广泛支持
- 界面与应用分离

## Ajax缺点

- 它可能破坏浏览器的后退与前进功能
- Ajax的安全问题，可以通过模拟请求进行对服务端进行请求，有时候往往容易丢失数据
- 因为网络延迟需要给用户提供必要的提示，我们需要自己定义可视化组件来让用户知道，请求的状态。

## XMLHttpRequest介绍

### onreadystatechange

当readystate属性状态改变时调用，并且我们必须在open之前指定onreadystatechange事件处理程序，这样才能确保浏览器兼容性。

### open

```js
xhr.open('get','url',true)
```

使用xhr请求时需要调用的第一个方法，，他接受三个参数，请求方法，请求url，是否异步发送请求。

### readyState

HTTP请求的状态，当一个XMLHttpRequest初次创建时，这个属性从0开始，知道受到完整的Htpp响应，这个数值从0变到4

装态|名称|描述
---|:---:|---
0|未初始化|未初始化状态，尚未调用send()方法
1|启动|open()方法已调用，但是send()方法未调用，请求还没发送
2|发送|send()方法已经调用，HTTP请求已发送到服务器，未收到响应
3|接受|所有响应头已经接收到，响应开始接收但未完成
4|完成|收到全部响应数据，并且已经可以在客户端使用了

### responseText

目前为止，浏览器收到的响应体，如果还未接收到数据，这个值为空，在readystate为3之前都会收到空字符串，在3之后，会收到相应的数据，状态为4会收到完成的响应体

### responseXML

对请求的响应，解析为XML并作为Document对象返回

### status

由服务端返回的HTTP状态代码

### statusText

HTTP状态的说明

### XMLHttpRequest使用过程

我们通过DOM0级方法为XHR添加了事件处理程序，应为DOM2并不是所有浏览器都支持。

```js
var xhr = createXHR();//这个函数自己封装，用于解决兼容新问题
xhr.onreadystatechange = function(){
    if(xhr.readystate === 4){
        if(xhr.status >=200 && shr.status<300 || xhr.status == 304){
            alert(xhr.responseText);
        }else{
            alert("未成功！");
        }
    }
}
xhr.open('get','url',true);
xhr.send(null)
//必须指定发送主体的数据，如果时get 请求，我们则指定请求主体为null

```

### abort

我们可以通过abort()方法来取消异步请求

```js
xhr.abort();
```

## HTTP 头部信息

- Accept:浏览器能够处理的头部信息
- Accept-Charset:浏览器能够显示的字符集
- Accept-Encoding:浏览器能够处理的压缩代码
- Accept-Language:浏览器当前设置的语言
- Connection:浏览器与服务器之间连接的类型
- Cookie:当前页面设置的Cookie
- Host:发出请求的页面所在的域
- Referer:发出请求的页面的URL
- User-Agent:浏览器的用户代理字符串

### setRequestHeader()

通过这个方法设定自定义的请求头部信息，这个方法接受两个参数，头部字段的名称和头部字段的值，**setRequestHeader方法必须放在open方法之后send之前**

### getRequestHeader()

我们通过调用这个方法可以获得我们响应的头部信息，通过`getAllRequestHeader()`可以获得所有头部信息组成的一个头部字段。

## GET/POST

### get

使用get请求时，如果要向字符串尾部添加信息，查询字符串的每个值都需要通过`encodeURIComponent`进行编码，并且我们的值与之通过`&`进行拼接
我们来实现如下函数

```js
function addUrlParam(url,name,value){
    url += url.indexof('?') == -1 ? "?" : "&";
    url += encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}
```

### POST

默认情况下，服务器对post请求和表单请求并不会一视同仁，，我们需要通过`XML`来模拟表单请求，首先将`Content-type`头部信息设置为表单的内容类型`application/x-www-form-urlencodeed`，如果我们需要将表单的数据进行序列化，我们可以使用`serialize`函数来创建这个字符串。

## XMLHttpRequest2级

### FromData

```js
//通过append方法进行添加
var date = new FormDate();
data.append("name","origin_wan");
//用表单元素的数据预先添加键值对
var data = new FormData(document.forms[0]);
```

FormData的方便之处在于不必明确在XHR对象上设置请求头信息，XHR对象能够识别传入的数据类型是FormDate实例，并且配置适当的头部信息

### 超时设定 timeout

这个例子示范了如何使用timeout属性，如果浏览器在设定的时间内未响应，会调用ontimeout事件处理程序，但此时，readyState可能已经改变为4了，如果此时readystate状态已经改变为4的话，这就意味着会触发onreadystatechange事件，所以我们需要在这个函数中添加try catch来捕获错误

### overrideMimeType()

这种方法能够重写MIME类型，如果我们响应的类型是text/plain,但是数据中实际包含的是XML对象，即使数据是xml，但是responseXML却为空，因此我们需要通过这个函数来设置MIME类型

## 进度事件

- loadstart  接收到响应数据的第一个字节触发
- progress   在响应期间持续进行触发
- error      请求发生错误时触发
- abort      调用abort终止请求时触发
- load       接收到完整的响应请求进行触发
- loadend    通信完成时触发

### load  

用于代替`onreadystatechange`事件，响应接收完毕之后触发load事件,但是我们然要通过判定`status`来判断请求是否完成，是否可以继续使用。

### progress

我们可以通过progress来完成一个进度指示器的功能，应为这个事件在浏览器接收到数据期间持续触发，onprogress接受三个额外的属性`lengthComputable`进度信息是否可用的布尔值，`position`已接受的字节`totalsize`表示content-length响应头部确定的预期字节数。**为确保正常执行，这个onprogress必须放在open之前**