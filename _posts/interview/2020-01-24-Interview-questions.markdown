---
layout: post
title:  "Interview- Java"
author: Xu Chi
toc: true
tags: [Tech, Java, Spring]
date: 2018-02-21
---

整理一些常见的Java面试题。



一、Java 基础

1.JDK 和 JRE 有什么区别？

JDK是development kit而JRE是运行时的环境。JDK包含了JRE以及编译器javac、java的调试及分析工具等。如果需要运行Java程序只需要JRE，而如果需要开发则需要JDK。



2.== 和 equals 的区别是什么？

在object中，==表示是完全同一个对象，而equals表示两者逻辑上等价。



3.两个对象的 hashCode()相同，则 equals()也一定为 true，对吗？

不一定。但反之一定。

- 4.final 在 java 中有什么作用？

  final如果用来修饰成员变量，类同常量，不可改变

  如果有用来修饰方法或者类，表示不可以被继承

- 5.java 中的 Math.round(-1.5) 等于多少？

  -2

- 6.String 属于基础的数据类型吗？

  不属于，是对象类型。

- 7.java 中操作字符串都有哪些类？它们之间有什么区别？

  StringBuilder和StringBuffer，StringBuffer线程安全。（为什么）

- 8.String str="i"与 String str=new String("i")一样吗？

  不一样，前者会在堆中找到相同的字符串，而后者一定会新建一个对象。

- 9.如何将字符串反转？

  StringUtils.reverse()?

- 10.String 类的常用方法都有那些？

  equals, substring, length, charAt

- 11.抽象类必须要有抽象方法吗？

  不必须

- 12.普通类和抽象类有哪些区别？

  抽象类可以包含抽象方法，不可以被实例化。

- 13.抽象类能使用 final 修饰吗？

  不可以，因为抽象类本身不可以被实例化，如果使用final定义了没有子类，没有意义。

- 14.接口和抽象类有什么区别？

  接口只可以包含没有实现的方法接口。

- 15.java 中 IO 流分为几种？

  BIO, NIO, AIO

- 16.BIO、NIO、AIO 有什么区别？

  不知道

- 17.Files的常用方法都有哪些？

  Open, read

**二、容器**

- 18.java 容器都有哪些？

  Collection下包含Set, Map, List

- 19.Collection 和 Collections 有什么区别？

  Collections里面是一些Collection的静态方法

- 20.List、Set、Map 之间的区别是什么？

  List是元素的有序组合，Set是无重复的元素组合，Map是键值对。

- 21.HashMap 和 Hashtable 有什么区别？

  Hashtable更老，线程不安全，HashMap线程安全（未必吧）

- 22.如何决定使用 HashMap 还是 TreeMap？

  不知道。

- 23.说一下 HashMap 的实现原理？

  每个键值对放入的时候对键计算哈希值，放入对应的桶中。

  相应的知识点还有容量、动态扩容、哈希冲突。

- 24.说一下 HashSet 的实现原理？

  其实就是没有值的HashMap。

- 25.ArrayList 和 LinkedList 的区别是什么？

  ArrayList利用Array实现List，而LinkedList下面是链表。

- 26.如何实现数组和 List 之间的转换？

  List list = new ArryList(array);

- 27.ArrayList 和 Vector 的区别是什么？

- 28.Array 和 ArrayList 有何区别？

- 29.在 Queue 中 poll()和 remove()有什么区别？

  poll是从队列头，remove是从队列尾

- 30.哪些集合类是线程安全的？

  ConcurrentHashMap

- 31.迭代器 Iterator 是什么？

  用来遍历集合中的元素。

- 32.Iterator 怎么使用？有什么特点？

  hasNext来判断是不是遍历结束，next取得下一个元素的值

- 33.Iterator 和 ListIterator 有什么区别？

  不知道

- 34.怎么确保一个集合不能被修改？

  把集合定义成immutable

**三、多线程**

- 35.并行和并发有什么区别？

  并行是处理多个任务。并发是同时处理多个任务。

- 36.线程和进程的区别？

  线程与线程之间共享内存空间，而进程享有独立的内存空间。

- 37.守护线程是什么？

  在后台运行的线程

- 38.创建线程有哪几种方式？

  Runnable, Callable, Thread, ThreadPool

- 39.说一下 runnable 和 callable 有什么区别？

  Runnable有返回，Callable没有返回

- 40.线程有哪些状态？

  Running, Complete

- 41.sleep() 和 wait() 有什么区别？

  sleep挂起一定时间后恢复，wait需要等待外部条件改变。

- 42.notify()和 notifyAll()有什么区别？

  notify通知订阅了的线程，notifyAll通知所有线程

- 43.线程的 run()和 start()有什么区别？

  不知道

- 44.创建线程池有哪几种方式？

  FixedPool

- 45.线程池都有哪些状态？

  不知道

- 46.线程池中 submit()和 execute()方法有什么区别？

  不知道

- 47.在 java 程序中怎么保证多线程的运行安全？

  不知道

- 48.多线程锁的升级原理是什么？

  不知道

- 49.什么是死锁？

  多个线程之间启动条件形成循环依赖

- 50.怎么防止死锁？

  不知道

- 51.ThreadLocal 是什么？有哪些使用场景？

  不知道

- 52.说一下 synchronized 底层实现原理？

  锁住堆中的常量

- 53.synchronized 和 volatile 的区别是什么？

  synchronized是锁定某一个方法、变量从而避免冲突。volatile是write-through，底层变量的改变会被所有线程知道。

- 54.synchronized 和 Lock 有什么区别？

  Lock种类更多。

- 55.synchronized 和 ReentrantLock 区别是什么？

  不知道

- 56.说一下 atomic 的原理？

  不知道

**四、反射**

- 57.什么是反射？

  反射就是Java程序在运行时从编译好的字节码中获取到程序信息，并加载。

- 58.什么是 java 序列化？什么情况下需要序列化？

  序列化是按照一定的规则将内存中的数据结构转化成文本，在通信交互时需要用到。

- 59.动态代理是什么？有哪些应用？

  不知道

- 60.怎么实现动态代理？

  不知道

**五、对象拷贝**

- 61.为什么要使用克隆？

  因为Java是传递引用，有时候需要对象的克隆进行操作而不改变源对象。

- 62.如何实现对象克隆？

  实现Copy接口

- 63.深拷贝和浅拷贝区别是什么？

  深拷贝是整个拷贝中所有的内嵌的对象都会被拷贝。浅拷贝只是拷贝这个对象，而不拷贝它内部的其他对象。

**六、Java Web**

- 64.jsp 和 servlet 有什么区别？

  不知道

- 65.jsp 有哪些内置对象？作用分别是什么？

  不知道

- 66.说一下 jsp 的 4 种作用域？

  不知道

- 67.session 和 cookie 有什么区别？

  都是用来保存用户状态。Session保存在服务端，Cookie保存在用户端。

- 68.说一下 session 的工作原理？

  不知道。

- 69.如果客户端禁止 cookie 能实现 session 还能用吗？

  可以。

- 70.spring mvc 和 struts 的区别是什么？

  不知道

- 71.如何避免 sql 注入？

  对sql域进行检查、转义

- 72.什么是 XSS 攻击，如何避免？

  不知道

- 73.什么是 CSRF 攻击，如何避免？

  跨站攻击，不知道如何避免。

**七、异常**

- 74.throw 和 throws 的区别？

  没啥意义的问题，在签名中用throws，在实际抛出的时候用throw

- 75.final、finally、finalize 有什么区别？

  没啥意义的问题

  final就是无法修改、无法继承

  finally是异常处理中必须被执行的块

  finallize是在GC的时候会被调用的方法

- 76.try-catch-finally 中哪个部分可以省略？

  finally

- 77.try-catch-finally 中，如果 catch 中 return 了，finally 还会执行吗？

  会

- 78.常见的异常类有哪些？

  分为免检异常和必检查异常

  免检异常包括了很多RuntimeException

  必检异常包括了IO等异常

**八、网络**

- 79.http 响应码 301 和 302 代表的是什么？有什么区别？

  不知道

- 80.forward 和 redirect 的区别？

  不知道

- 81.简述 tcp 和 udp的区别？

  tcp是可靠传输，保证做到，双向。

  udp是不可靠传输，单向。

- 82.tcp 为什么要三次握手，两次不行吗？为什么？

  不行。

- 83.说一下 tcp 粘包是怎么产生的？

  据说伪命题？

- 84.OSI 的七层模型都有哪些？

  应用层、网络层、传输层、链路层、物理层

- 85.get 和 post 请求有哪些区别？

  get幂等，没有body，post表示修改，非幂等，有body

- 86.如何实现跨域？

  先发一个options

- 87.说一下 JSONP 实现原理？

  不知道

**九、设计模式**

- 88.说一下你熟悉的设计模式？

  单例模式、策略模式、工厂模式、访问者模式。

- 89.简单工厂和抽象工厂有什么区别？

  简单工厂生产的是同一个类的实例、而抽象工厂是生成的某个较高层级的类。

**十、Spring/Spring MVC**

- 90.为什么要使用 spring？

  网络框架，总不能从头写起吧。

- 91.解释一下什么是 aop？

  面向切面的编程，将类似log或者auth这一类逻辑编写成切面，横向织进程序中。使得逻辑更为清晰。

- 92.解释一下什么是 ioc？

  控制翻转，说白了在写框架的时候不知道你具体的实现类，所以留待运行装配的时候决定。通常通过依赖注入（DI）实现。

- 93.spring 有哪些主要模块？

  security。。。

- 94.spring 常用的注入方式有哪些？

  @Autowired，@Bean

- 95.spring 中的 bean 是线程安全的吗？

  是？

- 96.spring 支持几种 bean 的作用域？

  不知道

- 97.spring 自动装配 bean 有哪些方式？

  不知道

- 98.spring 事务实现方式有哪些？

  @transaction？

- 99.说一下 spring 的事务隔离？

  不知道

- 100.说一下 spring mvc 运行流程？

  从view进来，controller解析分发，model进行处理、持久化等

- 101.spring mvc 有哪些组件？

  不知奥

- 102.@RequestMapping 的作用是什么？

  将API和方法暴露出去。

- 103.@Autowired 的作用是什么？

  动态注入bean

**十一、Spring Boot/Spring Cloud**

- 104.什么是 spring boot？

  快速搭建的spring

- 105.为什么要用 spring boot？

  快。

- 106.spring boot 核心配置文件是什么？

  application.properties

- 107.spring boot 配置文件有哪几种类型？它们有什么区别？

  不知道

- 108.spring boot 有哪些方式可以实现热部署？

  不知道

- 109.jpa 和 hibernate 有什么区别？

  hibernate是ORM，jpa呢

- 110.什么是 spring cloud？

  云解决方案？

- 111.spring cloud 断路器的作用是什么？

  防止在例如微服务架构中一个部件的失败导致系统的失败。

- 112.spring cloud 的核心组件有哪些？

  spring-cloud-gateway，断路器

**十二、Hibernate**

- 113.为什么要使用 hibernate？

  ORM方便吧，但是现在也不太用了。

- 114.什么是 ORM 框架？

  就是将对象和关系进行映射的框架。

- 115.hibernate 中如何在控制台查看打印的 sql 语句？

- 116.hibernate 有几种查询方式？

- 117.hibernate 实体类可以被定义为 final 吗？

- 118.在 hibernate 中使用 Integer 和 int 做映射有什么区别？

- 119.hibernate 是如何工作的？

- 120.get()和 load()的区别？

- 121.说一下 hibernate 的缓存机制？

- 122.hibernate 对象有哪些状态？

- 123.在 hibernate 中 getCurrentSession 和 openSession 的区别是什么？

- 124.hibernate 实体类必须要有无参构造函数吗？为什么？

**十三、Mybatis**

125.mybatis 中 #{}和 ${}的区别是什么？

126.mybatis 有几种分页方式？

127.RowBounds 是一次性查询全部结果吗？为什么？

128.mybatis 逻辑分页和物理分页的区别是什么？

129.mybatis 是否支持延迟加载？延迟加载的原理是什么？

130.说一下 mybatis 的一级缓存和二级缓存？

131.mybatis 和 hibernate 的区别有哪些？

132.mybatis 有哪些执行器（Executor）？

133.mybatis 分页插件的实现原理是什么？

134.mybatis 如何编写一个自定义插件？

**十四、RabbitMQ**

135.rabbitmq 的使用场景有哪些？

136.rabbitmq 有哪些重要的角色？

137.rabbitmq 有哪些重要的组件？

138.rabbitmq 中 vhost 的作用是什么？

139.rabbitmq 的消息是怎么发送的？

140.rabbitmq 怎么保证消息的稳定性？

141.rabbitmq 怎么避免消息丢失？

142.要保证消息持久化成功的条件有哪些？

143.rabbitmq 持久化有什么缺点？

144.rabbitmq 有几种广播类型？

145.rabbitmq 怎么实现延迟消息队列？

146.rabbitmq 集群有什么用？

147.rabbitmq 节点的类型有哪些？

148.rabbitmq 集群搭建需要注意哪些问题？

149.rabbitmq 每个节点是其他节点的完整拷贝吗？为什么？

150.rabbitmq 集群中唯一一个磁盘节点崩溃了会发生什么情况？

151.rabbitmq 对集群节点停止顺序有要求吗？

**十五、Kafka**

152.kafka 可以脱离 zookeeper 单独使用吗？为什么？

153.kafka 有几种数据保留的策略？

154.kafka 同时设置了 7 天和 10G 清除数据，到第五天的时候消息达到了 10G，这个时候 kafka 将如何处理？

155.什么情况会导致 kafka 运行变慢？

156.使用 kafka 集群需要注意什么？

**十六、Zookeeper**

- 157.zookeeper 是什么？

  一个分布式服务，可以用来维护配置信息、服务发现、分布式锁等功能。

- 158.zookeeper 都有哪些功能？

  维护配置信息、服务发现、分布式锁等

- 159.zookeeper 有几种部署模式？

  不知道

- 160.zookeeper 怎么保证主从节点的状态同步？

  不知道

- 161.集群中为什么要有主节点？

  要不听谁的

- 162.集群中有 3 台服务器，其中一个节点宕机，这个时候 zookeeper 还可以使用吗？

  可以

- 163.说一下 zookeeper 的通知机制？

  不知道

**十七、MySql**

- 164.数据库的三范式是什么？

  1NF 原子性，某个属性不可以是a,b,c

  2NF 唯一性，实体要唯一，如学生和成绩应该是两张表，第三张表记录两者之间的关系

  3NF 冗余性，任何字段不能由其他字段派生出来。

  反范式：有时候为了提高效率，用空间换时间。

  范式的优势是可以减少冗余，体积更小；操作更快。缺点是查询的时候需要关联，性能较差。也很难进行索引优化。

  反范式的优势是可以减少表的关联；更好进行索引优化。缺点是数据冗余且难以维护；对数据的修改需要较大的成本。

- 165.一张自增表里面总共有 7 条数据，删除了最后 2 条数据，重启 mysql 数据库，又插入了一条数据，此时 id 是几？

  不知道

- 166.如何获取当前数据库版本？

  查系统的某张表

- 167.说一下 ACID 是什么？

  Atom 原子性

  Consistency

  I

  D

- 168.char 和 varchar 的区别是什么？

- 169.float 和 double 的区别是什么？

- 170.mysql 的内连接、左连接、右连接有什么区别？

- 171.mysql 索引是怎么实现的？

- 172.怎么验证 mysql 的索引是否满足需求？

- 173.说一下数据库的事务隔离？

- 174.说一下 mysql 常用的引擎？

- 175.说一下 mysql 的行锁和表锁？

- 176.说一下乐观锁和悲观锁？

- 177.mysql 问题排查都有哪些手段？

- 178.如何做 mysql 的性能优化？

**十八、Redis**

179.redis 是什么？都有哪些使用场景？

180.redis 有哪些功能？

181.redis 和 memecache 有什么区别？

182.redis 为什么是单线程的？

183.什么是缓存穿透？怎么解决？

184.redis 支持的数据类型有哪些？

185.redis 支持的 java 客户端都有哪些？

186.jedis 和 redisson 有哪些区别？

187.怎么保证缓存和数据库数据的一致性？

188.redis 持久化有几种方式？

189.redis 怎么实现分布式锁？

190.redis 分布式锁有什么缺陷？

191.redis 如何做内存优化？

192.redis 淘汰策略有哪些？

193.redis 常见的性能问题有哪些？该如何解决？

**十九、JVM**

194.说一下 jvm 的主要组成部分？及其作用？

195.说一下 jvm 运行时数据区？

196.说一下堆栈的区别？

197.队列和栈是什么？有什么区别？

198.什么是双亲委派模型？

199.说一下类加载的执行过程？

200.怎么判断对象是否可以被回收？

201.java 中都有哪些引用类型？

202.说一下 jvm 有哪些垃圾回收算法？

203.说一下 jvm 有哪些垃圾回收器？

204.详细介绍一下 CMS 垃圾回收器？

205.新生代垃圾回收器和老生代垃圾回收器都有哪些？有什么区别？

206.简述分代垃圾回收器是怎么工作的？

207.说一下 jvm 调优的工具？

208.常用的 jvm 调优的参数都有哪些？