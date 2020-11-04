---
layout: post
title:  "算法求解中常用的Java Code"
author: Xu Chi
toc: true
tags: [Tech, Algo, Java]
---

> 无他，唯手熟尔。


# Collections

## Stack

一般我们用Deque接口定义stack，可以选择LinkedList作为具体实现类。

```java
Deque<T> stack = new LinkedList<>();
stack.push(element);
stack.pop();
```

## Queue

可以使用Queue接口定义quque，并选择LinkedList作为具体实现类。

```java
Queue<T> queue = new LinkedList<>();
queue.offer(element);
queue.poll(element);
```

# Sorting