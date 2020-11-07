---
layout: post
title:  "[CFA] Quantitative methods"
author: Xu Chi
toc: true
math: true
tags: [Finance, CFA, Quantitative]
---

数量统计中一些重点和易错概念。

---

# Time value of money

## Fischer's Effect

## EAR or EAY

## Annuity


名义利率

无风险利率

费雪方程式

Lump sum

复利计算公式

连续计息的复利计算公式

Stated annual rate

年金

后付年金（默认，容易计算）

先付年金：先计算后付年金，再滚一期

永续债的计算

# Statistical concepts 统计

## 基本统计词汇

medium, mode

当样本总量为偶数时，如何取medium

## Quantile 分位数

分位数，如thrid-quintile，即第三个五分位数，指的是有3/5的数低于此值。
注意点：
* 如果样本有n个数，如果为third-quintile，则为`(n+1)*60%`。之所以用`(n+1)`是因为其实插入分位需要考虑的是数与数之间的空当
* 如果结果不是整数，则需要在相邻的两个值之间进行线性插值

几个基本的分位数：
* quartile 四分位数
* quintile 五分位数
* deciles 十分位数
* percentile 百分位数

# 离散程度衡量

## Mean Absolute Deviation 平均绝对偏差

这个值可以从名字里直接推断出来其计算方式

$$

MAD = \frac{\sum_{i=0}^n \lvert X_i - \overline X \rvert}{n}

$$