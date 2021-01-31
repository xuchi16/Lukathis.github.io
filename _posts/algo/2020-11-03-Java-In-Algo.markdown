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

```java
Stack<Integer> s = new Stack<>()
```

## Queue

可以使用Queue接口定义quque，并选择LinkedList作为具体实现类。

```java
Queue<T> queue = new LinkedList<>();
queue.offer(element);
queue.poll(element);
```

# Sorting

我们可以使用`Arrays.sort()`进行排序。

方法1是我们常用的排序写法，但是存在一个致命的问题就是可能会溢出。
因此用方法2的写法才是正确的写法。

```java
// 方法1. 注意这里的减法可能会导致溢出
Arrays.sort(nums, (n1, n2) -> (n1[0] - n2[0]));

// 方法2. 正确的比较方法
Arrays.sort(points, (n1, n2) -> (n1[0] < n2[0] ? -1 : 1));
```

# Array

## Sub-array

可以用以下函数取得sub-array，注意to位置的元素不包括在内。[JavaDoc Arrays](http://docs.oracle.com/javase/6/docs/api/java/util/Arrays.html)

```java
Arrays.copyOfRange(Object[] src, int from, int to)
```

## Contains

```java
Arrays.asList(yourArray).contains(yourValue)

or

String[] values = {"AB","BC","CD","AE"};
boolean contains = Arrays.stream(values).anyMatch("s"::equals);
```

## Fill

Fill an initialized array with `val`.

```java
int[] dp = new int[100];
Arrays.fill(dp, val);
```

## String join

```java
List<String> strings = new LinkedList<>();
strings.add("Java");strings.add("is");
strings.add("cool");
String message = String.join(" ", strings);ri
```