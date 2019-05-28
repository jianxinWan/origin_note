# Token

## 传统的认证方法

Http是一种无状态的协议，也就是我们不知道是那个用户进行的访问，但是我们平常浏览的网页却需要对用户进行身份认证，在token之前，我们通过session、cookie来实现用户身份的认证，大概是这样的一个过程，session是存在于服务器端，cookie是存在于浏览器端，我们在用户登录过程中，用户输入账号密码进行登录，服务端检测到用户输入信息合法化之后，将用户状态存储在session中，并生成一条与之对应session_Id，在返回网络请求时，我们将session_id存储在cookie中，这样我们在用户进行下一次请求中，用户的网络请求中携带我们的cookie中的session_id信息，我们通过session_id在session中找到我们的用户认证信息是否匹配，是否过期等。在将信息返回给前端，这就实现了简单的认证过程。

`对于session,我们需要在服务器端存储session，将session可以存储在内存或者数据库中，如果我们用户的访问量加大，如果将信息都存储在内存中，这样会使我们的服务器负载变大。`

## Token身份验证方法

使用基于token的验证方法，大概是下面的一个过程。

1、用户使用用户名和密码进行登录
2、服务端接收到用户名和密码进行验证
3、验证成功，服务端会生成一个token,并返回给前端
4、前端将token信息进行存储(localstroage、sessionStroage)
5、我们用户再次发送请求时，我们将token信息添加在我们的请求头中('Authorization')中，用于验证
6、浏览器接收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

## 对比

### token相对于Session的优点

- 无状态、可拓展的、不会再服务器端存储用户登陆状态，可以很容易实现服务器的增减
- 支持移动设备
- 支持跨域程序调用、各个程序之间的调用更加方便
- 安全可靠（可防止CSRF攻击）

## JWT

我们通常采用的标准是jwt（json web token），这个标准的token有三个部分：

- header(头部)
- payload(数据)
- signature(签名)

中间用点分开，并且都会使用`Base64`编码，所以真正的token看起来像这样

![token](http://ph3k80bwz.bkt.clouddn.com/authorization.png)

## Header

每个`jwt`中都有一个`header`,也就是头部信息，这个里面包含了使用的算法，这个`jwt`是不是带签名的或者加密的，主要就是说明一下怎么处理这个`JWT token`。

头部里包含的东西可能会根据`JWT`的类型有所变化，比如一个加密的`JWT`里面要包含使用的加密的算法。唯一在头部里面要包含的是`alg`这个属性，如果是加密的`JWT`，这个属性值就是使用的签名或者解密使用的算法。如果是未加密的`JWT`，这个属性值需要改成`none`.

```js
{
    "alg":"HS256"
}
```

这个意思就是我们使用`HS256`来加密，通过base64形式编码一下，就会变成这样。

```js
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

## Payload

这一部分是用来存储token中的具体内容，这个里面有一些标准内容，我们也可添加自己的内容,我们来看看基本的标准字段

- iss:发行者
- sub:主题
- aud:观众
- exp:过期时间
- nbf:Not before
- iat:发行时间
- jti:JWT ID

payload部分也是采用`base64`进行编码，我们通过编码之后大概是这样的

```js
eyJlbWFpbCI6IjExNTg4MTA0NTlAcXEuY29tIiwiaWF0IjoxNTQxNTgwNTY5LCJleHAiOjE1NDE2NjY5Njl9
```

## Signature

这个是`JWT`的最后一部分，这部分内容又有三部分，先是通过base64编码的`header.payload`,然后再通过加密算法加密一下，加密的时候主要加入一个`secret`，这相当于一个私钥，这部分主要存储在服务器端。

大概会是这样一个过程

```js
const encodeString = base64UrlEncode(header)+"."+base64UrlEncode(payload);
HMACSHA256(encodedString, 'secret');
```

处理完之后看起来像这样

```js
9STvi-YvXDProaKgBOhiToGwL2DcL5QXCMaOvsZRlKA
```

等`signature`处理完之后，我们将之前处理过之后字符串，通过`.`进行连接，这样就实现了一个基于`jwt`标准的`token`

```js
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExNTg4MTA0NTlAcXEuY29tIiwiaWF0IjoxNTQxNTgwNTY5LCJleHAiOjE1NDE2NjY5Njl9.9STvi-YvXDProaKgBOhiToGwL2DcL5QXCMaOvsZRlKA
```

## 实际项目中使用token进行验证

### 服务端实现

我们通过`Koa2`来实现我们的服务端,在`Koa`中有实现好的中间来处理，我们一般使用的是`koa-jwt`这个中间件，这个中间件可以实现一个拦截器的效果，我们可以传入私钥，以及我们不需要认证的接口，代码如下

#### token认证拦截器

```js
const jwtKoa = require('koa-jwt');
const secret = "dknjasndkj";
//.....部分代码省略
//secret代表我们服务端的私钥
//path是一个数组，数组中是我们不需要认证的接口，服务端会对除这些接口之外的接口进行验证，主要是查看token是否在我们的请求头中的Authorization中，认证成功，进入对应接口，否则会返回401状态码，表示认证失败
app.use(jwtKoa({secret:secret}).unless({
    path:[/^\/user\/signIn$/,/^\/user\/signUp$/,/^\/user\/getSvgCode$/,/^\/user\/getEmailVerify$/]
}))
```

#### 登录

```js
const jwt = require('jsonwebtoken');
const secret = "dknjasndkj";

/**
* 登录操作  
* @param {object}上下文对象
* 
* */
async signIn(ctx){
    let formData = ctx.request.body;
    let result = {
        success:false,
        message:'',
        data:null,
        code:''
    }
    let userResult = await signInService.signIn(formData);
    if(userResult){
        result.success = true;
        result.message ="登录成功";
        const userToken = {
            email:formData.email
        }
        const token = jwt.sign(userToken,secret,{expiresIn:'24h'})
        //token签名，设置有效时长
        ctx.body = {
            result,
            token
        };
    }else{
        result.message = '登录失败';
        ctx.body = {
            result
        }
    }
}
```

在登录中我们使用的私钥`secret`要与我们之前的私钥一致，`sign`中我们可以添加我们自定义的内容,这里我们设置我们的时长为24h,设置完成之后，我们将我们签名之后的`token`返回给前端。

#### 获取用户信息

```js
const jwt = require('jsonwebtoken');
const secret = "dknjasndkj";
module.exports = {
    /**
     * 获取用户信息
     *
     */
    async getUserInfo(ctx){
        const token = ctx.request.header.authorization.slice(7);
        if(token){
            jwt.verify(token,jwtSecret.secret,(error,decoded)=>{
                if(error){
                    ctx.body = {
                        code:-1,
                        msg:error.message
                    }
                }else{
                    ctx.body = {
                        email:decoded.email,
                        msg:"token is ok!"
                    }
                }
            })
        }else{
            ctx.body = {
                msg:"token is error or null"
            }
        }
    }
}
```

注意获取用户信息函数中的第一行代码，很重要，我们在实际开发过程中，我们后端拿到请求头中的`Authorization`的值其实是这样的

```js
Bearer
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExNTg4MTA0NTlAcXEuY29tIiwiaWF0IjoxNTQxNTgwNTY5LCJleHAiOjE1NDE2NjY5Njl9.9STvi-YvXDProaKgBOhiToGwL2DcL5QXCMaOvsZRlKA
```

所以我们将其进行裁剪,去除之前的部分，这样我们才能正常通过`jwt.verify`来进行解析，解析成功之后，我们会的得到我们签名之前的东西，如果信息正确，我们就认为这个`token`是有效的。

### 前端实现

前端实现，我们将后台返回的`token`存在我们的浏览器中(`localStroage`或者`sessionStroage`),然后在需要认证的接口中添加`token`信息进行验证。

```js
 getUserInfo(){
        const token = localStorage.getItem('token');
        axios.get(URL.getUserInfo,{
            //注意写法，否则服务端会认为这是一个无效的令牌
            headers: {Authorization:`Bearer ${token}`}
        }).then((res)=>{
            //后续处理
        }).catch((err)=>{
            //后续处理
        })
    }
```

### 参考

- [基于 Token 的身份验证：JSON Web Token]<https://ninghao.net/blog/2834>

### 项目地址

[NBA](https://github.com/sun111sunshine)