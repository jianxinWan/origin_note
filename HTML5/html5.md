# HTML5

## HTML5新特性有哪些

> - 用于绘画的canvas元素
> - 用于媒介回放的video和audio元素
> - 用于本地离线存储有更好的支持
> - 新的特殊内容元素，比如article、footer、header、nav、section(语义化标签)
> - 新的表单控件、例如calendar、date、time、email、url、search

## HTML声明

```html
<!DOCTYPE html>
```

## HTML5 应用

> - 本地数据存储
> - 访问本地文件
> - 本地sql数据
> - 缓存引用
> - XHTMLHttpRequest2

## HTML图形

> - canvas
> - svg
> - css3 2D、3D转换

## 语义化标签

标签|描述
---|:--:|---:
article|定义页面独立的内容区域。|
aside|定义页面的侧边栏内容。|
bdi|允许您设置一段文本，使其脱离其父元素的文本方向设置。
command|定义命令按钮，比如单选按钮、复选框或按钮
details|用于描述文档或文档某个部分的细节
dialog|定义对话框，比如提示框
summary>|标签包含 details 元素的标题
figure>|规定独立的流内容（图像、图表、照片、代码等等）。
figcaption>|定义 figure元素的标题
footer>|定义 section 或 document 的页脚。
header>|定义了文档的头部区域
mark>|定义带有记号的文本。
meter>|定义度量衡。仅用于已知最大和最小值的度量。
nav>|定义导航链接的部分。
progress>|定义任何类型的任务的进度。
ruby>|定义 ruby 注释（中文注音或字符）。
rt>|定义字符（中文注音或字符）的解释或发音。
rp>|在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容。
section|定义文档中的节（section、区段）。
time|定义日期或时间。
wbr|规定在文本中的何处适合添加换行符。

### 语义化标签的作用

- 去掉样式能够让页面呈现出清晰的结构
- 用户体验：title、alt解释图片的信息、label标签的运用。
- 有利于SEO：和搜索引擎建立良好的沟通、有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重。
- 方便与其他设备解析 以意义的方式来渲染页面
- 便于团队开发和维护

### 使用语义化标签应该注意什么

- 尽量少使用无语义的标签、`div`、`span`、使用新增的有较多语义的标签
- 不要使用样式化标签、`font`、`b`、等完全可以使用css实现样式
- 强调文本、尽量使用`strong`、`em`
- 表格书写要规范、标题要用`caption`、表头用`thead`、主体用`thead`、尾部用`tfoot`包围，表头和一般单元表格要区分开
- 表单域要用`fieldset`标签包起来、并用`lengthd`标签说明表单的用途；
- 每个`input`标签对应的说明文本都需要使用`label`标签