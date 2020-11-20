---
layout: post
title:  "算法求解中常用的Java Code"
author: Xu Chi
toc: true
tags: [Tech, Algo, Java]
---

> 无他，唯手熟尔。


# Collections


## List

List to array

```java
// int
list.stream().mapToInt(i->i).toArray();

// string
list.toArray(new String[0]);
```

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

# Array

## Sub-array

可以用以下函数取得sub-array，注意to位置的元素不包括在内。[JavaDoc Arrays](http://docs.oracle.com/javase/6/docs/api/java/util/Arrays.html)

```
Arrays.copyOfRange(Object[] src, int from, int to)
```

## Contains

```
Arrays.asList(yourArray).contains(yourValue)

or

String[] values = {"AB","BC","CD","AE"};
boolean contains = Arrays.stream(values).anyMatch("s"::equals);
```
