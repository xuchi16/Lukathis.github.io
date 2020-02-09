---
layout: post
title:  "Python2/3共存安装——使用pyenv"
author: Xu Chi
toc: true
tags: [Tech, Python, env setup]
date:   2016-05-30 11:22:34 +0800
---

无论关于pthon2和python3谁更优秀的争论结果为何，终归还是要学Python3

## pyenv

**【作用】**  pyenv是一个用于维护不同版本python的插件，详情可见其Github首页：[pyenv Github](https://github.com/yyuu/pyenv#homebrew-on-mac-os-x)

**【理解】**  pyenv 的美好之处在于，他并没有使用将不同的 $PATH 植入不同的 shell 这种高耦合的工作方式，而是简单地在 $PATH 的最前面插入了一个垫片路径（shims）：~/.pyenv/shims:/usr/local/bin:/usr/bin:/bin。所有对 Python 可执行文件的查找都会首先被这个 shims 路径截获，从而架空了后面的系统路径。


<br />

### 基本操作

**【安装/卸载不同版本Python】**

      $ pyenv install -v 3.4.3
      $ pyenv uninstall 3.4.3

**【为所有已安装的可执行文件创建shims】**每次增删了Python版本或其他可执行文件的包后均应执行

      $ pyenv rehash

**【设置全局/本地Python版本】**

      $ pyenv global 3.4.3
      $ pyenv local 2.7.3

<br />

---

<br />

## 【使用pyenv的virtualenv插件搭建多版本虚拟环境】

详情可见github主页:[pyenv-virtual Github](https://github.com/yyuu/pyenv-virtualenv)


# 在现在的pyenv环境下配置虚拟环境

      $ pyenv version
      3.4.3 (set by ~/.pyenv/version)
      $ pyenv virtualenv venv34

# 创建特定版本的虚拟环境

      $ pyenv virtualenv 2.7.10 my-virtual-env-2.7.10

后部分即命名，存储位置统一在~/.pyenv/verions下

# 使用虚拟环境

      $ pyenv activate <name>
      $ pyenv deactivate

<br />

---

<br />

### 使用pip安装第三方模块注意点

注意理解，pyenv实际上是在PATH中加入了“垫片”(Shims)从而使得可以优先控制使用pyenv下安装的Python版本从而达到多版本控制的目的，故而：

* 如果使用sudo pip时，会安装在系统自带的Python版本下，Mac系统为2.7

* 若想要安装在自己配置的新Python环境中，需到~/.pyenv/versions下看该环境的pip版本，如3.4.3，则使用命令 pip3.4 install Pillow即可

<br />

### 几个比较好的博文链接

* 【一个理解较为全面的博文】[lionets](http://my.oschina.net/lionets/blog/267469)

* 【一个关于Mac下错误解释较全面的博文】[Anonymous](http://www.codeweblog.com/%E8%AE%B0%E5%BD%95mac%E4%B8%8B%E5%AE%89%E8%A3%85pyenv%E6%97%B6%E6%89%80%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98/)
