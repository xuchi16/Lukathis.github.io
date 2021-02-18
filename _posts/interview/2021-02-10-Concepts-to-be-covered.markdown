---
layout: post
title:  "Java 面试题"
author: Xu Chi
toc: true
tags: [Tech, Java]
pinned: true
---

Java常见面试题整理。

# Java


## 数据类型


### int长度，平台相关吗
32位。无论机器是32位还是64位，Java运行在JVM上，而虚拟机规定int长度为32位。


### 什么是拆箱/装箱

- 装箱：自动将基本数据类型转换为包装类，可以用`Integer.valueOf(int)`
  
- 拆箱：将包装类转换为基本类型，可以用`Integer.intVal(Integer)`
  
自动装拆箱其实是语法糖，`Intger a = 3`在编译后会变成`Integer a = Integer.valueOf(3)`，而在`valueOf()`方法中会有缓存的逻辑，`-128~127`之间的数不会重复创建新的对象，参照如下源代码：

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

自动拆装箱注意点
  - 包装类的`==`运算在不遇到算术运算的情况下不会自动装拆箱，所以此时`==`不是对比包装类中的数值是不是相等，而是对比这两个包装类的对象是不是同一个
  - 包装类的`equals()`方法不处理数据**转型**的关系，只有当两个包装类为同一类时，才会对比数值，比如Integer的equals方法如下：
  
  ```java
      public boolean equals(Object obj) {
        if (obj instanceof Integer) {
            return value == ((Integer)obj).intValue();
        }
        return false;
    }
  ```
  
根据上述规则，可以分析如下代码片段
  ```java
  public static void main(String[] args) {
    Integer a = 1;
    Integer b = 2;
    Integer c = 3;
    Integer d = 3;
    Integer e = 321;
    Integer f = 321;
    Long g = 3L;

    System.out.println(c == d);             // true
    System.out.println(e == f);             // false
    System.out.println(c.equals(3));        // true
    System.out.println(c.equals(d));        // true
    System.out.println(c == (a + b));       // true
    System.out.println(c.equals(a + b));    // true
    System.out.println(g == (a + b));       // true
    System.out.println(g.equals(a + b));    // false
  }
  ```

## Object相关概念


### == 和 equals 的区别？
在object中，==表示是引用的是完全同一个对象，而equals表示两者逻辑上等价，可以通过覆盖equals方法定义如何判断值相等。

### hashCode和equals关系

- hashCode()方法用来计算对象的hash值，可以用于基于hash值的集合，如HashMap等。
- equals()方法用于比较两个对象是不是相等。

基于此我们知道，当两个对象equals()方法返回值相等的话则hashCode()返回值必须相等，反之则不需要。

### Object有哪些常用方法
- equals()
- hashCode()
- toString()
- notify()
- clone()
- wait()
- getClass()

### 什么是克隆，如何实现克隆

克隆就是生成一个原对象的副本。
- 方法1：实现`Cloneable`接口，并且重写`clone()`方法。神奇的是其实Object里就有`clone()`方法，可以阅读文章：[Cloneable interface is broken in java](https://howtodoinjava.com/java/cloning/cloneable-interface-is-broken-in-java/)
- 方法2：通过序列化反序列化实现，但是代价较大。可以实现Serializable接口或者用SerializationUtils。

### 浅拷贝 vs. 深拷贝
- 浅拷贝：被复制的对象的所有变量（primitive type）都含有与原来的对象相同的值，但是其所引用的对象都还是指向原来的对象
- 深拷贝：被复制的对象所含有的变量都与原来的对象有相同的值，且其所引用的对象也都被深拷贝了

## String

### String vs. StringBuilder vs. StringBuffer

- String：String是不可变的，如果调用`substring()`、`replace()`等方法，不会影响原String的值。如果直接写String的相加，编译后也会变成StringBuffer的操作。
- StringBuilder和StringBuffer都是用来进行字符串操作的，但是StringBuilder是单线程场景下使用，更高效。而StringBuffer是多线程场景下使用，线程安全。

### String常用的方法
- charAt()
- indexOf()
- trim()
- split()
- getBytes()
- length()
- toUpperCase()
- toLowerCase()

String在内存中的管理方式
String 属于基础的数据类型吗？
String str="i"与 String str=new String("i")一样吗？


## OOP

接口
抽象类
抽象方法
final

---

### OOP的三大特征
封装，继承，多态

---

override vs. overload
 - override: 重写，子类方法覆写父类方法名和参数列表完全相同的方法，是一种多态的表现。子类覆盖父类方法的时候，只可以抛出比弗雷方法更少的异常，或者父类抛出异常的子异常。
 - overload: 重载，同一个方法名，参数列表不同

---

抽象类必须要有抽象方法吗？
普通类和抽象类有哪些区别？

## 容器

常用容器类型
ArrayList
LinkedList
HashMap
ConcurrentHashMap
HashSet
HashMap vs. Hashtable
ArrayList vs. Vector
TreeMap
Poll() vs. Remove() in Queue
Iterable
Iterator
怎么确保一个集合不能被修改？

## 泛型

协变、逆变、不变

泛型擦除
  - C#中，泛型在源代码、IR、CLR中都存在
  - Java中，只有源代码中有泛型，在字节码中已经不存在泛型

## IO

BIO、NIO、AIO 有什么区别？
Files常用方法

## 异常

什么是异常
必检异常/免检异常
Error/Exception的继承结构

## 多线程

volatile
分布式锁是什么，是什么实现方式
并行和并发有什么区别？
线程和进程的区别？
守护线程是什么？
创建线程有哪几种方式？
Runnable vs. Callable
sleep() vs. wait()
run() vs. start()
线程池
创建线程池有哪几种方式
什么是线程池的状态，线程池有哪些状态？
submit() vs. execute()
在 java 程序中怎么保证多线程的运行安全？
什么是ThreadLocal

锁？
多线程锁的升级是什么，原理是什么
什么是死锁
什么是race condition
latch, symophore, cyclic barrier
synchronized是什么，原理是什么
synchronized和volatile的区别
Lock
ReentrantLock
atomic是什么，原理是什么
synchronized和Lock的区别

## 反射

什么是反射
为什么要反射
应用场景
什么是序列化/反序列化
为什么需要序列化/反序列化
什么是动态代理
如何实现动态代理
什么是注解
哪几种元注解

## JVM内存结构

常量池
堆
栈
  - 栈是一种具有先进后出特点的数据结构。因为是先进后出，所以天然就具备类似于**“暂存”**的效果。如果我们放入栈中的元素是一些简单的例如整数这类元素，那么通过全部入栈再全部出栈，可以达到换整数的顺序的效果。如果我们不是全部进栈后才出栈，而是在入栈前进行判断再决定是先出栈还是先入栈，就可以取得“单调栈”的效果。但无论是如何操作，其实栈都是在帮助我们按照顺序暂时存储了一些目前不需要但后续可能需要的信息。

栈帧(stack frame)结构如何，包含了什么样的数据结构。
 - what：栈帧是用于支持虚拟机进行方法调用和方法执行的数据结构。
 - 包含：方法的局部变量表，操作数栈，动态连接和方法返回地址等信息。
    - 局部变量表
    - 操作数栈
    - 动态连接
    - 方法返回地址

多线程时候栈帧是怎么样的？多线程的内存模型如何？

虚拟机
  - 虚拟机是针对物理机来说的，两者都具备代码执行能力
  - 物理机的指令建立在处理器、硬件、指令集和操作系统层面
  - 虚拟机的执行引擎由自己实现，可以自行制定指令集和执行引擎结构体系
  - 虚拟机在物理机层面之上建立了一层间接层，从而为应用程序层面提供了一套更为统一的基础

虚拟机栈 vs. 本地方法栈
  - Java堆是被所有线程共享的一块内存区域，在虚拟机启动时创建。其唯一的目的就是存放对象实例。
  - 同时Java堆也是垃圾收集器管理的主要区域
  - 堆在物理上可以不连续，但是在逻辑上必须是连续的
方法区
  - 存放类信息、常量、静态变量、JIT编译后的代码等

jvm 的主要组成部分？及其作用？
jvm 运行时数据区？
java 中都有哪些引用类型？

类加载器结构？
  - 启动类加载器(Bootstrap ClassLoader)，加载`<JAVA_HOME>/lib`目录
  - 扩展类加载器(Extension ClassLoader)，加载`<JAVA_HOME>/lib/ext`目录
  - 应用程序类加载器(Applicatioin ClassLoader)，加载`ClassPath`上的类库
  - 自定义类加载器(User ClassLoader)

双亲委派模型？
  - 如果一个类加载器收到了一个类加载的请求，首先不会自己去尝试加载这个类，而是交给父类加载器去完成。
  只有父加载器无法加载时，子加载器才会自己加载这个类。
  每一个层次的类加载器都是如此，所以所有的类加载请求都会传到顶层的启动类加载器中。
  - 双亲委派模型让类加载器有了优先层次关系，从而保证如果要加载类似Object这样的类时，总是能够通过启动类加载器唯一加载到rt.jar里的Object类。

类加载的执行过程？

动态链接？静态链接？

怎么判断对象是否可以被回收？
jvm有哪些垃圾回收算法？
jvm有哪些垃圾回收器？
详细介绍一下 CMS 垃圾回收器？
G1垃圾回收期
新生代垃圾回收器和老生代垃圾回收器都有哪些？有什么区别？
分代垃圾回收器是怎么工作的？
serial vs. parallel GC

jvm调优的工具？
常用的 jvm 调优的参数都有哪些？

Java会存在内存泄漏吗？会。
队列和栈是什么？有什么区别？

weak reference vs. soft reference

32位JVM和64位JVM最大堆内存可以达到多少
  - 32位可以达到`2^32`，即4GB。

## 持久化

JDBC

## FP

streaming
lambda

## 其他概念

JDK vs. JRE
JIT
  - JIT代表即时编译，当代吗执行次数超过一定阈值时，会转换为本地代码，从而提高性能。



---

# Spring


## SSH
 
什么是Spring
什么是Spring MVC
什么是Struts
什么是Hibernate
什么事ORM

为什么要用spring

DI
AOP
IOC

spring有哪些主要模块
spring常用注入方式
spring支持几种bean的作用域
spring如何装配bean，有哪些方式
@Autowired的作用是什么

spring事务是什么
spring事务隔离

spring mvc运行流程
spring mvc哪些组件

@RequestMapping作用是什么，如何实现

什么是spring boot
为什么要使用spring boot
spring boot 配置文件有哪几种类型？它们有什么区别？
spring boot 有哪些方式可以实现热部署？

什么是spring cloud
spring cloud断路器的作用是什么
spring cloud有哪些核心组件

jpa 和 hibernate 有什么区别？



---

# MySql

数据库三范式
反范式
自增id
ACID
char vs. varchar
float vs double
mysql 的内连接、左连接、右连接有什么区别？
mysql索引是什么，怎么怎么实现的
怎么验证 mysql 的索引是否满足需求？
数据库的事务隔离？
什么是mysql引擎？有哪些常用的引擎？
mysql 的行锁和表锁？
乐观锁和悲观锁？
脏读、幻读等？
mysql 问题排查都有哪些手段？
如何做 mysql 的性能优化？

### 什么是数据库引擎
A database engine (or storage engine) is the underlying software component that a database management system (DBMS) uses to create, read, update and delete (CRUD) data from a database. Most database management systems include their own application programming interface (API) that allows the user to interact with their underlying engine without going through the user interface of the DBMS.

**DBMS**使用**数据库引擎**来对数据库进行增删查改。

User -> DBMS(UI/API) -> Database engine -> Database

以MySQL为例，它提供了多种数据引擎，常用的包括：MyISAM，InnoDB，Memory，MERGE。

不同的数据库引擎在存储机制、索引技术、锁的原理等实现上有所差别。

### 什么是索引
索引是用来帮助数据库更高效地获得所需数据的数据结构。



---

# 网络

## 状态

session是什么，原理
cookie是什么，原理
如果客户端禁止cookie，那么session还能用么

## 安全

什么是CORS
如何解决CORS
什么是sql注入，如何避免
什么是XSS，如何避免
什么是CSRF，如何避免
什么是SSO
什么是Kerberos

## 协议

五层/七层模型
HTTP协议
SMTP协议
DNS
    如何观察到DNS报文
    DNS使用的是UDP
    发送报文给DNS服务端的时候，是如何知道目的服务器的呢
CDN
HTTP状态码
forward和redirect区别


### tcp vs. UDP
既然TCP提供可靠数据传输，为什么还要用UDP，UDP有什么优势?
* 不需要建立连接
* 不需要维护状态
* 更好地控制发送什么数据以及何时发送数据（应用层控制更精准）
* 分组首部开销小
  
TCP的首部有多大，UDP有多大
* TCP首部20字节
* UDP首部8字节

TCP和UPD的首部的构造是怎样的
* UDP首部包含4个字段，每个字段2字节（16比特）。4个字段为
  - 源端口号
  - 目的端口号
  - 长度
  - 校验和

tcp连接建立方式，为什么
三次握手的流程，为什么需要三次握手
tcp粘包是什么，伪命题么
get, post方法的含义，还有哪些
options

浏览器输入url之后发生了什么


---

# 设计模式

简述一些设计模式
工厂模式/简单工厂/抽象工厂
单例模式
策略模式

---

# 微服务

什么是断路器
什么是gateway
为什么要gateway


# Zookeeper

zookeeper 是什么？
  一个分布式服务，可以用来维护配置信息、服务发现、分布式锁等功能。
zookeeper的基本概念和原理
zookeeper 都有哪些功能？
  维护配置信息、服务发现、分布式锁等
zookeeper 有几种部署模式？
zookeeper 怎么保证主从节点的状态同步？
集群中为什么要有主节点？
集群中有 3 台服务器，其中一个节点宕机，这个时候 zookeeper 还可以使用吗？
zookeeper 的通知机制？

--- 

# 操作系统

自旋锁
互斥锁

数的表示
反码、补码、浮点数

---

# Kafka


---

# 缓存

什么是Redis
什么是Hazelcast
他们有什么异同
行存储、列存储
为什么用Haszelcast不用redis

LRU

## Redis相关问题


---