---
layout: post
title:  "浅析Java 8 toMap Collector的一些特殊情形"
author: Xu Chi
toc: true
tags: [Tech, Java]
---
# Java 8  toMap Collector

## 背景

在Java Stream中，我们可以将元素收集到Map中。其中常用的方式就是使用`toMap` Collector。但其实它的行为在一些特殊情形中与通常使用Map的直觉并不相符。本文构造了一个简单场景，让我们看看在不同场景中的其行为如何。


## 场景

假设我们有一组学生数据，学生的基本数据类型定义及信息如下：

```java
@Data  
@AllArgsConstructor  
@NoArgsConstructor
class Student {
	private String id;
	private String name;
	private double height;
}

```


这组学生信息定义如下，希望获取一张键值分别为`(姓名，身高)`的Map。
```java
List<Student> students = new ArrayList<>();
students.add(new Student(2201, "Jack", 170.0));  
students.add(new Student(2202, "Paul", 180.0));  
students.add(new Student(2203, "Rose", 168.0));
```




## 一般情况

方法1. 利用循环生成Map的过程及输出结果如下：

```java
Map<String, Double> result = new HashMap<>();  
for (Student student : students) {  
    result.put(student.getName(), student.getHeight());  
}  
System.out.println(result);

// 结果：
// {Rose=168.0, Jack=170.0, Paul=180.0}
```


方法2. 利用Stream和`toMap` Collector，相同的逻辑实现过程如下：
```java
Map<String, Double> result = students.stream()  
    .collect(Collectors.toMap(Student::getName, Student::getHeight));  
System.out.println(result);

// 结果：
// {Rose=168.0, Jack=170.0, Paul=180.0}
```

两者的输出结果相同，看上去功能相同，方法2代码看上去稍微简洁一些。


## 特殊情形

在上述一般情况下，代码运行看上去一切正常。但当输出结果为Map时，有一些边界情况我们需要考虑：

- 情况1. 键冲突
- 情况2. 键为空
- 情况3. 值为空

那么在这些特殊情形下，两种方法的结果如何呢？


### 方法1. 利用循环生成

在一般的循环实现方法中，由于使用了`map.put()`方法，因此在情况1中，出现键冲突时，后一次的值会覆盖前一次的值。并且因为HashMap的键和值均可以接受空值，因此情况2和情况3应该能够正确接收空值。在三种情形下利用循环生成结果的代码行为理解起来均较为简单。使用上述**方法1**循环实现的代码逻辑进行实际验证后发现与预想的结果相同。

```java

// 情况1. 键冲突，有另一位名字同样为Jack的学生，身高更高，为175.0
students.add(new Student(2024, "Jack", 175.0));
// 结果：
// {Rose=168.0, Jack=175.0, Paul=180.0}

// 情况2. 键为空，有一位不知名的学生，身高为190.0
students.add(new Student(2024, null, 190.0));
// 结果：
// {null=190.0, Rose=168.0, Jack=170.0, Paul=180.0}

// 情况3. 值为空，有一位叫John的学生，身高未知
students.add(new Student(2024, "John", null));
// 结果：
// {John=null, Rose=168.0, Jack=170.0, Paul=180.0}

```


### 方法2. 利用Stream生成

如果使用的是上述**方法2**的Stream实现，在遇到上述三种特殊情形时表现为何呢？大家可以先猜一猜。

- 情况1.  键冲突

假设有另一位名字同样为Jack的学生，身高更高，为175.0，有如下代码：

```java
students.add(new Student(2024, "Jack", 175.0));  

Map<String, Double> result = students.stream()  
    .collect(Collectors.toMap(Student::getName, Student::getHeight));  
```

此时，我们会得到如下报错信息：

```
java.lang.IllegalStateException: Duplicate key 170.0

	at java.util.stream.Collectors.lambda$throwingMerger$0(Collectors.java:133)
	at java.util.HashMap.merge(HashMap.java:1254)
	at java.util.stream.Collectors.lambda$toMap$58(Collectors.java:1320)
	at java.util.stream.ReduceOps$3ReducingSink.accept(ReduceOps.java:169)
	at java.util.ArrayList$ArrayListSpliterator.forEachRemaining(ArrayList.java:1384)
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:482)
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472)
	at java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:708)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:566)
```

我们发现利用`toMap()`处理时，如果发生了键冲突并没有如方法1中那样，后一次值覆盖前一次值的默认处理逻辑。查看源码，我们会发现`toMap`有三个重载方法。

```java
// 第1种
public static <T, K, U>  
Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper,  
                                Function<? super T, ? extends U> valueMapper) {  
    return toMap(keyMapper, valueMapper, throwingMerger(), HashMap::new);  
}

// 第2种
public static <T, K, U>  
Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper,  
                                Function<? super T, ? extends U> valueMapper,  
                                BinaryOperator<U> mergeFunction) {  
    return toMap(keyMapper, valueMapper, mergeFunction, HashMap::new);  
}

// 第3种
public static <T, K, U, M extends Map<K, U>>  
Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper,  
                            Function<? super T, ? extends U> valueMapper,  
                            BinaryOperator<U> mergeFunction,  
                            Supplier<M> mapSupplier)                          
```


我们先看第1种方法，这是我们常用也是上文实际调用的方法，即在将Stream中的元素输出到Map时，分别指定键值的处理函数，对每个元素分别使用这两个函数，生成我们希望的键值对并累加到结果中。但我们可以发现，如果使用方法1，对照收集过程，还有两个关键环节并没有指定：
1. 初始生成Map时，使用了何种Map
2. 累加元素时，如果出现了键冲突如何处理

因此其实无论是第1种还是第2种方法，最终都会调用第3种方法。第3种方法在3、4两个参数分别解决了键冲突和累加元素时键冲突的问题。而第1种和第2种方法使用了一些默认的设置。

针对初始Map的情形，第3种方法的最后一个入参即为初始Map的设定入口，第1种和第2种均默认使用了`HashMap::new`，我们可以根据需要调用第3种方法，指定其他Map类型。

回到键冲突的情形，我们会发现其处理方式是通过第三个参数`BinaryOperator<U> mergeFunction`指定的。这里的`BinaryOperator`是Java Function中的一种，其定义为：
```java

@FunctionalInterface  
public interface BinaryOperator<T> extends BiFunction<T,T,T>

```

可见`BinaryOperator`可以接受两个同一类型的输入，并输出一个同样类型的输出。此外由于标注了`@FunctionalInterface`，我们可以直接传入lambda表达式。在这里，两个同类型的输入即为有冲突的键对应的新旧值，也就是同样名为Jack的两位同学的不同身高：170.0和175.0。

在不指定冲突处理方式，即使用第1种`toMap`方法时，会调用默认的`throwingMerger()`：

```java

private static <T> BinaryOperator<T> throwingMerger() {  
    return (u,v) -> { throw new IllegalStateException(String.format("Duplicate key %s", u)); };  
}

```

因此我们会看到之前例子中的报错信息。有趣的是，当我们仔细查看报错信息，会发现尽管提示信息想告诉我们`Duplicate key`，但因为这个函数是用来处理值冲突的，这里的`(u, v)`实际上是新旧两个值，即`(170.0, 175.0)`，导致报出的错误为`Duplicate key 170.0`，具有一定的迷惑性。或许写成`Duplicate key, can not resolve confliction between old value 170.0 and new value 175.0`会更清晰明了。

此时，你可能会进一步问，为什么这里的默认逻辑和我们用的循环方式生成结果的**方法1**不同呢？原因在与两者在向Map中添加元素时使用的函数是不同的。我们使用了`map.put(key, value)`方式，因此自带了新覆盖旧的逻辑。而`toMap`方法中使用的是`map.merge()`方法，源码如下：

```java
public static <T, K, U, M extends Map<K, U>>  
Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper,  
                            Function<? super T, ? extends U> valueMapper,  
                            BinaryOperator<U> mergeFunction,  
                            Supplier<M> mapSupplier) {  
    BiConsumer<M, T> accumulator  
            = (map, element) -> map.merge(keyMapper.apply(element),  
                                          valueMapper.apply(element), mergeFunction);  
    return new CollectorImpl<>(mapSupplier, accumulator, mapMerger(mergeFunction), CH_ID);  
}
```

Map类型的`merge`方法签名如下：
```java

public V merge(K key, V value,  
               BiFunction<? super V, ? super V, ? extends V> remappingFunction)

```

可见，在使用`merge`方法时，除了需要提供添加元素的键值外，还需要额外提供解决键冲突的`remappingFunction`。出现冲突时，有如下逻辑，使得冲突按照调用者希望的方式解决。
```java
if (old.value != null)  
    v = remappingFunction.apply(old.value, value);  
else  
    v = value;  
if (v != null) {  
    old.value = v;  
    afterNodeAccess(old);  
}
```

如果仔细观察上述`remappingFunction`的签名，可以发现与此前`BinaryOperator<U>`的签名并不相同，这里涉及到集合的[[协变，逆变和不变性]]，如果大家感兴趣我们可以后续展开。

至此，我们了解了在Stream中使用`toMap`生成Map的过程中遇到键值冲突时，为何会出现抛出异常的情况。那么解决方式也很简单，只需要自定义冲突解决方式即可。比如，如果想要跟**方法1**中的逻辑相同，总是新值覆盖旧值（有时未必合理），那么按照如下方式实现即可，结果也与**方法1**相同。

```java
students.add(new Student(2024, "Jack", 175.0));  

Map<String, Double> result = students.stream().collect(  
        Collectors.toMap(Student::getName, Student::getHeight, (oldVal, newVal) -> newVal));  
System.out.println(result);

// 结果：
// {Rose=168.0, Jack=175.0, Paul=180.0}

```


- 情况2. 键为空

假设有一位不知名的学生，身高为190.0。此时我们会发现，其结果与**方法1**生成的结果相同，空键可以正确放入Map中。
```java
students.add(new Student(2024, null, 190.0));

Map<String, Double> result = students.stream()  
    .collect(Collectors.toMap(Student::getName, Student::getHeight));  
    
// 结果
// {null=190.0, Rose=168.0, Jack=170.0, Paul=180.0}
```


- 情况3. 值为空

假设有一位叫John的学生，身高未知。

```java
students.add(new Student(2024, "John", null));  

Map<String, Double> result = students.stream()  
    .collect(Collectors.toMap(Student::getName, Student::getHeight));  
```

此时，我们会获得如下报错：
```
java.lang.NullPointerException
	at java.util.HashMap.merge(HashMap.java:1225)
	at java.util.stream.Collectors.lambda$toMap$58(Collectors.java:1320)
	at java.util.stream.ReduceOps$3ReducingSink.accept(ReduceOps.java:169)
	at java.util.ArrayList$ArrayListSpliterator.forEachRemaining(ArrayList.java:1384)
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:482)
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472)
	at java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:708)
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
	at java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:566)
```

我们会发现，这在我们意料之外，通常我们认为值为空是可以接受的，应该与键为空行为类似。而这里之所以会抛出如此错误，其原因也是因为`toMap`添加元素使用的是`map.merge()`方法。在`merge`方法中有如下逻辑，拒绝接收空值。
```java
public V merge(K key, V value,  
               BiFunction<? super V, ? super V, ? extends V> remappingFunction) {  
    if (value == null)  
        throw new NullPointerException();  
    if (remappingFunction == null)  
        throw new NullPointerException();
    ...
}

```

如果想要正常处理有空值的情形，需要给其指定默认值，可以使用下述方法处理：

```java

students.add(new Student(2024, "John", null));  

// 使用三元表达式处理
Map<String, Double> result = students.stream()  
    .collect(Collectors  
        .toMap(Student::getName,  
            (Student s) -> s.getHeight() != null ? s.getHeight() : 0.0));
            
// 使用Optional.ofNullable方法处理
Map<String, Double> result = students.stream()  
    .collect(Collectors  
        .toMap(Student::getName,  
            (Student s) -> Optional.ofNullable(s.getHeight()).orElse(0.0)));

// 结果：
// {John=0.0, Rose=168.0, Jack=170.0, Paul=180.0}

```


## 总结

可以发现，`toMap`方式并不像想象中那么简单，在特殊情况中会发生一些意料外的情形。主要原因在于实现中使用了`map.merge()`方法，因此在键冲突、值为空的情形中行为与常用的`map.put()`方法不同。另外本文分析基于Java 8，Java在之后的版本中有些特性发生了变化，后续可以进一步研究。

### Key Takeaways

两种实现方式在不同场景下的表现对比：

|               | 方法1. 使用循环和`map.put()`构造 | 方法2. 使用Stream和`toMap()`构造           |
| ------------- | -------------------------------- | ------------------------------------------ |
| 情况1. 键冲突 | 新值覆盖旧值                     | 抛出  IllegalStateException: Duplicate key |
| 情况2. 键为空 | 空键正常放入map                  | 空键正常放入map                            |
| 情况3. 值为空 | 空值正常放入map                  | 抛出NullPointerException                   |


使用`toMap` Collector生成Map时需要注意如下事项：
1. 注意键冲突的情况，建议捕获`IllegalStateException`或自己指定remapping函数作为解决键冲突方式。
2. 注意值为空的情况，建议调用者给出默认值或自己抛出兜底异常。