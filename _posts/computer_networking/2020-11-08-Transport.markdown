---
layout: post
title:  "Transport Layer"
author: Xu Chi
toc: true
tags: [Tech, Network]
---

Transport layer.

## Concepts

五个层次: application, transport, network, link, physical

四个方面的机制

路由器只有三层协议栈：网络层以下才有

传输层：为进程提供*端到端*的*逻辑通信*机制。

逻辑通信机制：两个进程仿佛是直接连接的。

发送方：将报文分为segment交给网络层
接收方：将segment组装成消息上传给应用层

传输层协议：TCP,UDP

| 传输层 | 网络层 |
| --- | --- |
| 进程之间 | 主机之间 |