---
layout: post
title:  "Digital Ocean部署Django"
---



# 【PREFACE】

  暌违已久啦！学校最近项目太忙啦，终于腾出手继续做下去了！


# 【关于Digital Ocean】

  利用github的教育优惠申请到了DigitalOcean的免费VPS，放在新加坡啦。

  配置部署django使用比较常用的nginx+uwsgi完成

# 【使用过程】

  * 安装nginx

        $ sudo apt-get install nginx

    ngix常用操作：

        $ etc/init.d/nginx start
        $ etc/init.d/nginx stop
        $ etc/init.d/nginx restart

  * 修改端口号

    将端口从110改为8080


# 安装vnc使用图形界面

 * vnc常用命令

      $ vncserver


 * 为ubuntu设置图形界面

  DigitalOcean预装ubuntu系统无图形界面，需要自己安装，步骤如下：

  (1) 安装x-windows的基础

      sudo apt-get install x-window-system-core

  (2) 安装登陆管理器

      sudo apt-get install gdm (还可以安装kdm/xdm)

  (3) 安装Ubuntu的桌面

      sudo apt-get install ubuntu-desktop


# 【使用tips】

  如果需要远程SSH连接服务器，只要terminal用ssh root@xxx.xxx.xxx.xxx 即可


# 【参考内容】

  [通过nginx部署Django](http://www.cnblogs.com/fnng/p/5268633.html)
  
  [ubuntu远程桌面连接](http://blog.csdn.net/lanxuezaipiao/article/details/25552675)
