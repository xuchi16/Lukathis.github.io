---
layout: post
title:  "新建React项目环境"
author: Xu Chi
toc: true
tags: [Tech, JavaScript, React, Setup]
---

新建React项目步骤，做过还是会忘，记一记。

# 新建项目

1. 确保安装了新版本的Node.js

2. 创建一个新项目`npx create-react-app my-app`
    
    * 新建一个空文件目录`my-app`
    * 在VS Code中打开该文件目录
    * 在VS Code terminal中执行新建命令
    * 这种方式会有两层相同的目录嵌套，这个看个人选择，如果不喜欢那么直接在terminal里执行新建命令，再使用VS Code打开


完成后将会出现提示：

```sh
Success! Created my-app at /Users/.../my-app
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd concept-visualize
  npm start

Happy hacking!
```

以此所示，cd进项目后，试试`npm start`，浏览器将会跳转显示localhost:3000，基本建立过程结束。

# 写代码咯

1. 删除掉新项目中src/文件夹下的所有文件

2. 在src/文件夹中创建一个名为index.css的文件

3. 在src/文件夹下创建一个名为index.js的文件

4. 写code

5. 跟之前一样，在项目文件夹下执行`npm start`命

6. 然后在浏览器中访问 http://localhost:3000 即可

# 设置Lint

TBD

# 关联Git

TBD

# Appendix

[官方网站环境配置](https://zh-hans.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)
