---
layout: post
title:  "Spring学习笔记"
author: Xu Chi
toc: true
tags: [Tech, Java, Spring]
date: 2018-02-21
---

用了Spring很久但是没有完整地理解过，这篇文章会断断续续地补充更新，尝试还原下理解的过程和整体的认识。

# 学前

  Spring作为一个著名的Java网络框架，早就听说了，在实习项目中也有所使用，但并未完全理解其核心，也没有独立完成过一个spring项目。希望通过这段学习，深入认识。也希望能够作为学习新技术的模板，展现项目学习由浅入深的过程。

  目标： 完成基于spring的简单博客系统，作为拱心石的后端能够运行起来。

# Spring

 > Spring是一个开源框架，Spring是于2003 年兴起的一个轻量级的Java 开发框架，由Rod Johnson 在其著作Expert One-On-One J2EE Development and Design中阐述的部分理念和原型衍生而来。它是为了解决企业应用开发的复杂性而创建的。Spring使用基本的JavaBean来完成以前只可能由EJB完成的事情。然而，Spring的用途不仅限于服务器端的开发。从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。 简单来说，Spring是一个轻量级的控制反转（IoC）和面向切面（AOP）的容器框架。

# 概念理解：

## JavaBean:

  [wiki]In computing based on the Java Platform, JavaBeans are classes that encapsulate many objects into a single object (the bean). They are serializable, have a zero-argument constructor, and allow access to properties using getter and setter methods. The name "Bean" was given to encompass this standard, which aims to create reusable software components for Java.

  [baidu]JavaBean 是一种JAVA语言写成的可重用组件。为写成JavaBean，类必须是具体的和公共的，并且具有无参数的构造器。JavaBean 通过提供符合一致性设计模式的公共方法将内部域暴露成员属性，set和get方法获取。众所周知，属性名称符合这种模式，其他Java 类可以通过自省机制(反射机制)发现和操作这些JavaBean 的属性。


## EJB:

  [wiki]Enterprise JavaBeans (EJB) is one of several Java APIs for modular construction of enterprise software. EJB is a server-side software component that encapsulates business logic of an application. An EJB web container provides a runtime environment for web related software components, including computer security, Java servlet lifecycle management, transaction processing, and other web services. The EJB specification is a subset of the Java EE specification.

  [baidu]EJB是sun的JavaEE服务器端组件模型，设计目标与核心应用是部署分布式应用程序。简单来说就是把已经编写好的程序（即：类）打包放在服务器上执行。凭借java跨平台的优势，用EJB技术部署的分布式系统可以不限于特定的平台。EJB (Enterprise JavaBean)是J2EE(javaEE)的一部分，定义了一个用于开发基于组件的企业多重应用程序的标准。其特点包括网络服务支持和核心开发工具(SDK)。 在J2EE里，Enterprise Java Beans(EJB)称为Java 企业Bean，是Java的核心代码，分别是会话Bean（Session Bean），实体Bean（Entity Bean）和消息驱动Bean（MessageDriven Bean）。在EJB3.0推出以后，实体Bean被单独分了出来，形成了新的规范JPA。

## JavaBean和EJB区别及小结：

  [stackoverflow]

  Java bean is just a set of conventions. EJB is a standard for J2EE business components.

  Specifically a Java bean:

    - has a public default constructor;
    - readable property methods precedes with "get";
    - writable property methods precedes with "set"; and
    - is Serializable.

  所以其实EJB也是一种JavaBean,JavaBeanJavaBean是公共Java类，需要满足至少三个条件：有一个public默认构造器（例如无参构造器,）属性使用public 的get，set方法访问，也就是说设置成private，同时get，set方法与属性名的大小也需要对应。例如属性name，get方法就要写成，public String getName(){},N大写。需要序列化。这个是框架，工具跨平台反映状态必须的最近看<Think in Java>,里面讲到JavaBean最初是为Java GUI的可视化编程实现的.你拖动IDE构建工具创建一个GUI 组件（如多选框）,其实是工具给你创建java类,并提供将类的属性暴露出来给你修改调整,将事件监听器暴露出来.《java 编程思想（第四版）》p823-824EJB在企业开发中，需要可伸缩的性能和事务、安全机制，这样能保证企业系统平滑发展，而不是发展到一种规模重新更换一套软件系统。 然后有提高了协议要求，就出现了Enterprise Bean。EJB在javabean基础上又提了一些要求，当然更复杂了。POJO有个叫Josh MacKenzie人觉得，EJB太复杂了，完全没必要每次都用，所以发明了个POJO，POJO是普通的javabean，什么是普通，就是和EJB对应的。总之，区别就是，你先判断是否满足javabean的条件，然后如果再实现一些要求，满足EJB条件就是EJB，否则就是POJO。

   作者：文朋
   链接：https://www.zhihu.com/question/19773379/answer/18307751
   来源：知乎

## IoC

控制反转（Inversion of Control，英文缩写为IoC）把创建对象的权利交给框架,是框架的重要特征，并非面向对象编程的专用术语。它包括依赖注入（Dependency Injection，简称DI）和依赖查找（Dependency Lookup）。

--------------------------------

## AOP

### 为什么要用AOP

当我们兴致勃勃地开始写代码，就像准备了一支优秀的球队参加世界杯。我们兴致勃勃地挑选、训练球员，准备首发名单，教练布置战术，上场，比赛，换人，结束比赛，赛后复盘等等，一切激动人心。

      到达球场 ---> 公布首发 ---> 布置战术 ---> 上场比赛 ---> 结束战斗

但比赛不是那么简单，会有很多“正赛”以外需要关注的事情，比如：

* 准备更衣室和球员球衣
* 准备场地、灯光等设施
* 准备球童及求等用具
* 准备观众并希望观众在合适的时间喝彩及喝倒彩

球队一定不希望需要亲力亲为地做这些琐碎的事情而更多地想关注在比赛本身。于是，就需要专业的团队管理这一套后台体系，就像写代码需要找到合适的框架来解决这一系列问题。

      球队: ---> 到达球场 ---> 公布首发 ---> 布置战术 ---> 上场比赛 ---> 被进球 ---> 逆转 ---> 结束战斗 --->
            |                                     |                       |        |            |
      球迷:  |                                   喝彩                     喝倒彩     喝彩          |
            |                                                                                   |
      球场: 准备场地                                                                            清理场地

因此，不同的体系做了不同的事情，且都是在不影响“球队”这个主要业务代码逻辑下做完的。两者互相正交，使得主体业务更加清晰，而又不会缺失任何一部分。

### 使用AOP

说起来定义和使用AOP就很简单了，跟把大象放入冰箱没有什么区别。

* 第一步：定义Aspect
* 第二步：将定义的Aspect作为bean注入Spring Configuration中

但是细分起来，还是有非常多需要注意的细节。