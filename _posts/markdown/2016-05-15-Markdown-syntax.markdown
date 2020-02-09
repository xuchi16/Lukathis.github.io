---
layout: post
title:  "Markdown Quicktour"
author: Xu Chi
toc: true
tags: [Tech, Markdown]
pinned: true
date:   2016-05-15 11:00:00 +0800
---

> We believe that writing is about content, about what you want to say – not about fancy formatting.
> \-- Ulysses

# What is Markdown

> Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name.[8] Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor. As the initial description of Markdown contained ambiguities and unanswered questions, many implementations and extensions of Markdown appeared over the years to answer these issues.
-- From Wikipedia

# 1. 区块元素

## 1.1 标题 Titles

  Markdown支持两种标题语法。

+ Setext

  可以使用超过2个数量的 = 或者 - 符号均可起到效果

        This is a HEAD1
        ===
        This is a HEAD2
        ---


+ Atx

  在行首插入1到6个 #，表示1到6阶

        # This is a HEAD1
        ## This is a HEAD2
        ###### This is a HEAD6

## 1.2 区块引用 Blockquotes

+ 使用 > 符号进行引用，可以嵌套

        > This is the first level of quoting.
        >
        >> This is a nested blockquote.
        >
        > Still the first level.

  效果如下：

    > This is the first level of quoting.
    >
    >> This is a nested blockquote.
    >
    > Still the first level.

## 1.3 段落和换行

  换行可以通过 ``<br />`` 实现或者插入两个以上的空格然后回车 。

## 1.4 列表

  列表实现方法有多种，可以使用 * ， + ， - 等符号，也可以使用数字加英文句号。

    * Blue  
    * Red
    * Yellow

  效果为：

* Blue
* Red
* Yellow

特别注意，如果句首刚好为数字+英文句号+文字，需要加反斜杠转换，如：

      1986. An awesome year.

需要取得想要的效果，必须输入：

      1986.\ An awesome year.

效果方为：

1986\. An awesome year.

## 1.5 代码区块

简单地缩进4个空格或2个制表符即可，一个代码块会一直持续到没有缩进的哪一行。

    This is code field.

## 1.6 分隔线

在一行中使用三个及三个以上的 * 或者 - 来建立分隔线，如：

***

# 2. 区段元素

## 2.1 链接

Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。

不管是哪一种，链接文字都是用 [方括号] 来标记。

* 行内式：要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，
  如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：

        This is [an example](http://example.com/ "Title") inline link.

        [This link](http://example.net/) has no title attribute.

  效果如下：

  This is [an example](http://example.com/ "Title") inline link.

  [This link](http://example.net/) has no title attribute.

* 参考式： 在链接文字的方括号后再加一个方括号，填入用以标识链接的标记，如：

        This is [my blog] [blog address].

    接着在文件的任意处将标记内容定义出来：

         [blog address]: http://lukathis.github.io/ "Option title here"


  链接内容定义的形式为：

  * 方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字
  * 接着一个冒号
  * 接着一个以上的空格或制表符
  * 接着链接的网址，也可以用尖括号<>包起来
  * 选择性地接着 title 内容，可以用单引号、双引号或是括弧包着，文章中引用此单词即可有链接

## 2.2 强调

Markdown 使用星号（ * ）和底线（ _ ）作为标记强调字词的符号，被 * 或 _ 包围的字词
会被转成用 em 标签包围，用两个 \* 或 \_ 包起来的话，则会被转成 strong。

    这段文字包含了两种强调方法，如 *强调1* 和 _强调1_，
    如果使用两个则会变为粗体，如 **强调2** 和 __强调2__。


效果为：

这段文字包含了两种强调方法，如 *强调1* 和 _强调1_，
如果使用两个则会变为粗体，如 **强调2** 和 __强调2__。

## 2.3  代码

  如果需要标记一小段行内代码，可使用反引号将其表记起来（`` ` ``），如果需要在代码块内插入反引号，
  则可用多个反引号来开启及关闭代码区段。

## 2.4 图片

  图片也分为行内式和参考式两种。

  * 行内式

        ![Alt text](/path/to/img.jpg)
        ![Alt text](/path/to/img.jpg "Optional title")

    即：
    * 一个感叹号`!`
    * 一个方括号，里面放上图片的替代文字
    * 一个普通括号，里面放上图片的网址，引用括号包住，并加上选择性的title文字

  * 参考式

        ![Alt text][id]

    [id]是图片的参考名称，定义方式与链接的参考一样。

        [id]: url/to/image "Optional title attribute"

---

# 3. 其他

## 3.1 自动链接

  一般，用尖括号包起来，Markdown将自动转化成链接。

      <http://lukathis.github.io>
      <xuchi16@126.com>

  效果为：

  <http://lukathis.github.io>
  
  <xuchi16@126.com>

## 3.2 反斜杠

Markdown可以利用反斜杠来插入一些在语法中有其他意义的符号，Markdown支持以下符号：

| 符号 | 名称 |
| :-----------: |:-------------:|
| \  | 反斜线 |
|`   | 反引号 |
|\*  |  星号|
|_   | 底线|
|{}  | 花括号|
|[]  | 方括号|
|()  | 括弧 |
|\#  | 井字号 |
|\+  | 加号 |
|\-  | 减号 |
|.   | 英文句点 |
|!   | 惊叹号 |

## 推荐
推荐一个很好用的在线markdown生成公众号文章的转换利器：http://md.aclickall.com
