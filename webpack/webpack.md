# webpack

---

### [webpack中文文档](https://webpack.docschina.org/configuration/dev-server/#devserver-contentbase)

### ![脚手架地址](https://github.com/sun111sunshine/react-page)

## 基本目录

```
.
├─ build/                      # Webpack构建目录
│   ├─ paths                   # 引用的路径
│   ├─ webpack.config.js       # dev模式下
│   ├─ webpack.config.base.js  # webpack基础配置，公共部分
|   ├─ webpack.config.prod.js  # 生产环境配置
├─ dist/                       # build 生成的生产环境下的项目
├─ src/                        # 源码目录
│   ├─ assets/                 # images
│   ├─ components/             # 组件（COMPONENT）
│   ├─ const/                  # 常量集中管理
│   ├─ containers/             # 容器
│   ├─ reducers/               # 函数因子
│   ├─ routers/                # 路由
│   ├─ saga/                   # 路由视图基页（VIEW）
│   ├─ server/                 # 网络请求提取
│   ├─ utils/                  # 公用方法封装提13108348693﻿取
│   ├─ index.js                # 主入口文件
├── index.html                 # 静态模板页面，开发和build产出，都依赖它
├── .babelrc                   # Babel 转码配置
├── .eslintignore              # ESLint 检查中需忽略的文件（夹）
├── .eslintrc                  # ESLint 配置
├── .gitignore                 # git忽略提交
├── .postcssrc.js              # postcss配置项，vue-cli产出
├── package.json               # 很重要的东西了
```

### 基本配置

- mode: 用来定义生产环境的配置还是开发环境的配置，对应的可选值为`development|production`
- devtool
    - source-map 是否映射到对应的源码
- module（模块）
    这些选项决定了如何处理项目中的不同类型的模块。
    - rules: 通常是一个数组
    每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。
    条件：resource|issuer
    结果：应用的 loade | Parser 选项
        - enforce  指定loader的种类，一般有两种值pre | post,。没有值则表示普通loader，pitching 阶段：loader 上的 pitch 方法，按照 后置(post)、行内(normal)、普通(inline)、前置(pre) 的顺序调用。更多详细信息，请查看 越过 loader(pitching loader)。
normal阶段：loader 上的 常规方法，按照 前置(pre)、行内(normal)、普通(inline)、后置(post) 的顺序调用。模块源码的转换，发生在这个阶段。
    - include 包含
    - exclude 不包含
    - oneof 当所有的规则都匹配时，只有第一个生效
    - test 匹配的正则
    - loader对应的loader
    - parser 解析选项的对象，所有解析的选项都将合并
    - use 可以是一个应用于模块的 UseEntries 数组。每个入口(entry)指定使用一个 loader
- plugins （插件）
    webpack插件
    - SplitChunksPlugin
    - 详情参考 [plugins](https://webpack.docschina.org/plugins)
- optimization （优化）
    - splitChunks 默认情况下只影响按需模块
    - CircularDependencyPlugin 检测循环引用的模块
- devServer （开发）
    - webpack 提供几种可选方式，帮助你在代码发生变化后自动编译代码，devServer就是其中的一种
    - webpack-dev-server 为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能
    - after 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。
    - before 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。
    - allowedHosts 添加一些白名单服务，允许一些开发服务器访问
    - contentBase 告知从哪个内容目录中提供访问
    - historyApiFallback 当使用H5的history时，如果遇到404，都可能需要替换为index.html
    - webpack-dev-server --color 启用控制台颜色功能
    - host
    - hot
    - inline（iframe|inline)
    - open 启动服务时自动打开浏览器
    - port 端口
    - proxy 设置代理
- resolve （解析），接受一个数组
   - resolve.extensions 自动解析确定的拓展
   - modules 告诉webpack解析时要搜索的目录
   - plugins 使用额外的解析插件