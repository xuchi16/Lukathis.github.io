---
layout: post
title:  "Quantitative methods"
author: Xu Chi
toc: true
math: true
tags: [Finance, Quantitative]
---

数量统计中一些重点和概念。

---

# Statistical concepts 统计

## 基本统计量

四个维度
* Mean 平均数
* Variance 方差
* Skewness 偏度
* Kurtosis 峰度

## 统计学分类

统计学分为Descriptive statistics和Inferential statistics。

### Population vs. Sample

| Name | Definition | Name of feature |
| :--- | :--- | :--- |
| Population | defined as all members of a specific group | Parameter: describe the features of a population |
| Sampe | subset of a population | Statistic: describes the features of a sample | 

### Measurement scales

| Scale name | Definition | Sample |
| :--- | :--- | :--- |
| Nominal | 离散 | 男女 |
| Ordinal | 顺序 | 排名 |
| Interval | 间隔 | 温度 |
| Ratio | 比例 | 钱 |

## 数据特征
* Medium 中位数，注意的是如果总量是偶数个，则取中间两个值除以二
* Mode 众数
* Mean 平均数

### 平均数
平均数包含以下几种
* 算术平均(The Arithmetic Mean)
* 加权平均(The Weighted Mean)
* 几何平均(The Geometric Mean)：适用于复利的计算
* 调和平均(The Harmonic Mean)：又称为倒数平均数。适用于如购买了总价相同的若干支股票，求平均价格。

需要注意的是有如下结论：*调和平均<集合平均<算术平均*

## 频率分布

* Absolute frequency
* Relative frequency
* Cumulative absolutee frequency
* Cumulative relative frequency

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

## 记号

在计算总体指标时，采取的记号亦不同

|       |  样本  |  总体 |
| :---: | :---: | :---: |
| 均值 | $\overline X$| $\mu$ |
| 方差 | $S^2$ | $\sigma^2$ |
| 标准差 | $S$ | $\sigma$ |
| 总量 | $n$ | $N$ |

## Mean Absolute Deviation 平均绝对偏差

这个值可以从名字里直接推断出来其计算方式

$$

MAD = \frac{\sum_{i=0}^n \lvert X_i - \overline X \rvert}{n}

$$

## 方差及标准差

方差一般称为variance。标准差一般称为standard deviation。

### 样本方差及总体方差

$$

样本方差\     
s^2=\frac{\sum_{i=1}^n (X_i - \overline X)^2 }{ n-1 }

\\

总体方差\ 
\sigma^2=\frac{\sum_{i=0}^{N} (X_i - \mu)^2}{N}

$$

注意为什么样本方差的分母是`(n-1)`，原因在于其实在求均值的时候已经用了`n`个数的平均值来做估计。因此在求方差的时候，只有`(n-1)`个数和均值信息是不相关的。所以在计算方差的时候使用`(n-1)`。

### 半方差(Semivariance)和目标半方差(Target Semivariance)

半方差只计算低于平均值的部分，如用来估计风险损失部分。

目标半方差是自定义一个benchmark并据此计算低于其值部分的方差。

$$

Semivariance = \frac{\sum_{for \ all \ X_i \leqslant \overline X}^{N} (X_i - \mu)^2}{N}
\\
Target\ Semivariance = \frac{\sum_{for \ all \ X_i \leqslant B}^{N} (X_i - B)^2}{N} 
\\
(B: customized\ benchmark)

$$

### 金融计算器计算方差

遵循以下流程

```
1 -> DATA (2ND + 7)
2 -> CLR WORK (2ND + CE|C)
3 -> X01: number1 + ENTER + Down arrow
4 -> Y01: Down arrow
5 -> REPEAT 3->4
6 -> STAT (2ND + 8)
7 -> Switch mode with (2ND + 8)
8 -> Check result with Down arrow
```

| 模式 | 意义 |
| --- | --- |
| 1-V | 计算一组数据的统计量，此时Y01,Y02等作为频数使用 |
| LIN | 计算两组数据标准差，此时Y01,Y02等作为第二组数据，LIN表示线性回归 |
| Ln | 计算两组数据标准差，此时Y01,Y02等作为第二组数据，Ln表示指数回归 |
| EXP | 计算两组数据标准差，此时Y01,Y02等作为第二组数据，EXP表示乘方回归 |

## Chebyshev's inequality


# Probability Concepts

## 名词解释

Exhaustive events: 完备事件

The odds: 比如说A公司今年销售超过去年的概率是0.167，我们可以说"The odds for exceeding sales is 1 to 5"，即超过的可能是1，不超过是5，总的来说超过的概率为`1/(1+5)=0.167`。

standard diviation: 标准差，注意在做题的时候区分方差(variance)和标准差。


## 协方差 Covariance

含义：衡量两个变量变化的方向性。同向变化协方差大于0，反向变化协方差小于0
相比于variance，covariance主要是体现多个变量：
* varicance表示单个随机变量的变化情况
* covariance表示两个随机变量之间的变化情况

基本的计算方法如下，方差可以看做协方差的一种特殊情况

$$

Var(X)=E[(X_i - \overline X)]
\\
Cov(X, Y) = E[(X_i - \overline X)(Y_i - \overline Y)]

$$
	
## 相关系数 Correlatioin

相关系数也是衡量两个随机变量之间的变化情况。我们可以直观地感受到，协方差虽然可以表示两个变量的变化关系，但因为随机变量的值可大可小，并未标准化，其数值的大小除了受到相关性的影响，还受到随机变量值大小的影响，所以很难用来比较不同变量之间相关性的强弱。

因此在此基础上，我们将其进行标准化，从而得到相关系数$\rho$，即将两个变量的协方差除以他们的标准差，计算方式如下

$$

\rho_{XY} = \frac {Cov(X,Y)} {\sqrt{Var(X)Var(Y)}} 

$$

## n个含权随机变量组合的方差

n个含权随机变量组合的方差类似于二项式的展开式。

$$

\sigma_p^2 = \sum_{i=1}^n \sum_{j=1}^n w_i w_j cov(R_i, R_j)

$$

当两个变量的时候，得到如下的方程，注意其中当两者标准差相乘时，需要乘以$\rho_{1,2}$

$$

\sigma_p^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2 w_1 \sigma_1 w_2 \sigma_2 \rho_{1,2}

$$

## 贝叶斯公式