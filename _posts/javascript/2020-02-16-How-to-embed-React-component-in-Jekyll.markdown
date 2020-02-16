---
layout: post
title:  "如何在Jekyll中嵌入React"
author: Xu Chi
toc: true
react: true
categories: [technology, javascript]
tags: [Tech, JavaScript, React]
---

如果我在写React的博客的时候能够插入相应的实现效果岂不是更妙？

# 1. 在博文模板中加载React 

Jekyll的html文件是作为layout存在，并在layout中提取出可以重用的部分放在_include目录下。
在本博客结构中，一般博客使用的post layout包含于default layout，而其中用head.html加载了脚本部分。
因此，在head中使用如下代码加载React。

此外，还可以使用Liquid判断语句`if page.react==true`根据文章的头文件的'react'标签决定是否需要加载该部分。
如果进行了这个设置，不要忘了在文章开头的meta部分添加`react: true`来加载React。

```html
  <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

# 2. 在文章中添加DOM容器

这里我们类似附录中的[教程][在网站中添加React]，希望加载一个Like按钮。
Jekyll的博文都是用Markdown写的，也可以在其中插入HTML片段，因此我们可以简单地用这样的`<div>`标签添加想要的React组件位置。

```html
  <div id="like_button_container"></div>
```

# 3. 定义React组件

## 3.1 定义组件基本功能

我们需要加载Like按钮，因此新建一个`like_button.js`文件，代码来自参考[链接][Like组件示例代码]。

```js
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
```

## 3.2 链接组件和DOM容器

在上述步骤中，已经定义了组件，接下来我们需要用DOM的选择器将React组件嵌入在html文件里定义的容器中。

```js
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

# 4. 在文章中加载脚本

当前三步做完后，只需要在刚刚添加组件的位置加载`like_button.js`文件即可。

```html
  <body>
    <div id="like_button_container"></div>
    <script src="like_button.js"></script>
  </body>
```

但需要注意的是，在这里script的src直接引用了js文件的名字，但Jekyll会默认到这篇博文所在的“目录”下找这份文件。
这个“目录”并不是实际的文件路径，而是这篇文章的[Permalink][Permalink]的地址。

permalink地址的定义方式有如下几种：
  * Front Matter：在文章的开头meta部分定义
  * Global：在配置文件`_config.yml`中利用占位符定义

我们这里将Permalink定义在配置文件中，定义的表达式如下：

```yaml
permalink: /:categories/:title/
```
因此，我们js文件放置的目录应该对应于本篇博文对应的`category`层次结构，与本文的`url`结构也是一致的，这样Jekyll就能正确地找到js文件的位置。

```
.
├── Tech
    └── JavaScript
        └── How-to-embed-React-component-in-Jekyll
            └── like_button.js
```

此外，我们还可以在上述文件夹下添加样式，也可以正确地加载进来。最终文章中的代码片段如下：

```html
<div>
  <div id="like_button_container"></div>
  <link rel="stylesheet" href="like_button.css" type="text/css" />
  <script src="like_button.js"></script>
</div>
```

# 5. 效果展示

这样我们就可以在文章中拥有一个自己定义的React组件。

<div>
  <div id="like_button_container"></div>
  <link rel="stylesheet" href="like_button.css" type="text/css" />
  <script src="like_button.js"></script>
</div>

# Appendix

* [在网站中添加][在网站中添加React]
* [Like组件示例代码][Like组件示例代码]
* [Jekyll Permalinks][Permalink]

[在网站中添加React]: https://zh-hans.reactjs.org/docs/add-react-to-a-website.html

[Like组件示例代码]: https://gist.githubusercontent.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js

[Permalink]: https://jekyllrb.com/docs/permalinks/