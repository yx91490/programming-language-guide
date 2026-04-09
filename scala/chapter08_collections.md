# 第8章：集合框架

## 章节概述

Scala的集合框架与Java不同，默认使用不可变集合，提供了丰富的操作符。本章对比Java和Scala的集合框架，重点介绍Scala的集合操作和Option类型。

## Scala集合框架

### 不可变集合（默认）

```scala
// List（不可变）
val list = List("Apple", "Banana", "Cherry")
val newList = list :+ "Date"  // 创建新列表

// Set（不可变）
val set = Set(1, 2, 3)
val newSet = set + 4  // 创建新集合

// Map（不可变）
val map = Map("Apple" -> 1, "Banana" -> 2)
val newMap = map + ("Cherry" -> 3)  // 创建新Map
```

### 可变集合

```scala
import scala.collection.mutable

// 可变List
val mutableList = mutable.ListBuffer(1, 2, 3)
mutableList += 4  // 修改原列表

// 可变Set
val mutableSet = mutable.Set(1, 2, 3)
mutableSet += 4  // 修改原集合

// 可变Map
val mutableMap = mutable.Map("a" -> 1, "b" -> 2)
mutableMap += ("c" -> 3)  // 修改原Map
```

### 集合操作符

```scala
val numbers = List(1, 2, 3, 4, 5)

// map: 转换
val doubled = numbers.map(_ * 2)

// filter: 过滤
val evens = numbers.filter(_ % 2 == 0)

// reduce: 归约
val sum = numbers.reduce(_ + _)

// fold: 折叠
val product = numbers.fold(1)(_ * _)

// flatMap: 扁平化映射
val nested = List(List(1, 2), List(3, 4))
val flat = nested.flatMap(identity)
```

### Option类型

```scala
// Option替代null
val maybeValue: Option[String] = Some("Hello")
val noneValue: Option[String] = None

// 使用
val result = maybeValue.getOrElse("Default")
maybeValue.foreach(println)

// 模式匹配
maybeValue match {
  case Some(value) => println(value)
  case None => println("No value")
}
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 默认集合 | 可变 | 不可变 |
| 集合操作 | Stream API | 丰富的操作符 |
| 空值处理 | Optional | Option |
| 函数式操作 | Stream API | 原生支持 |
| 不可变集合 | 需要手动实现 | 默认不可变 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object CollectionsScala {
  def main(args: Array[String]): Unit = {
    // List（不可变，默认）
    val fruits = List("Apple", "Banana", "Cherry")
    
    // 集合操作（语法糖：链式调用）
    val upper = fruits
      .map(_.toUpperCase)
      .filter(_.length > 5)
    println(upper)  // List(BANANA, CHERRY)
    
    // 更多操作
    val numbers = List(1, 2, 3, 4, 5)
    val sum = numbers.sum
    val product = numbers.product
    val max = numbers.max
    val min = numbers.min
    
    println(s"Sum: $sum, Product: $product, Max: $max, Min: $min")
    
    // Set
    val set = Set(1, 2, 3, 3, 2, 1)  // 自动去重
    println(set)  // Set(1, 2, 3)
    
    // Map
    val map = Map("Apple" -> 1, "Banana" -> 2, "Cherry" -> 3)
    println(map("Apple"))  // 1
    println(map.getOrElse("Date", 0))  // 0（不存在时返回默认值）
    
    // Option（替代null）
    val maybeValue: Option[String] = Some("Hello")
    val noneValue: Option[String] = None
    
    val result = maybeValue.getOrElse("Default")
    println(result)  // Hello
    
    // Option操作
    maybeValue.foreach(println)  // Hello
    val length = maybeValue.map(_.length)  // Some(5)
    println(length)
    
    // 集合转换
    val nested = List(List(1, 2), List(3, 4), List(5, 6))
    val flat = nested.flatten  // List(1, 2, 3, 4, 5, 6)
    println(flat)
    
    // for推导式与集合
    val pairs = for {
      i <- 1 to 3
      j <- 1 to 3
    } yield (i, j)
    println(pairs)
  }
}
```

@tab Java
```java
import java.util.*;
import java.util.stream.Collectors;

public class CollectionsJava {
    public static void main(String[] args) {
        // List
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        
        // Stream操作
        List<String> upper = fruits.stream()
            .map(String::toUpperCase)
            .filter(s -> s.length() > 5)
            .collect(Collectors.toList());
        System.out.println(upper);
        
        // Set
        Set<Integer> numbers = new HashSet<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        
        // Map
        Map<String, Integer> map = new HashMap<>();
        map.put("Apple", 1);
        map.put("Banana", 2);
        
        // Optional
        Optional<String> maybe = Optional.of("Hello");
        String result = maybe.orElse("Default");
        System.out.println(result);
    }
}
```

:::

## 集合操作详解

### 1. 转换操作

```scala
val numbers = List(1, 2, 3, 4, 5)

// map: 一对一转换
val doubled = numbers.map(_ * 2)  // List(2, 4, 6, 8, 10)

// flatMap: 一对多转换并扁平化
val expanded = numbers.flatMap(n => List(n, n * 2))  // List(1, 2, 2, 4, ...)

// collect: 部分函数转换
val strings = List("1", "2", "abc", "3")
val numbers2 = strings.collect {
  case s if s.matches("\\d+") => s.toInt
}  // List(1, 2, 3)
```

### 2. 过滤操作

```scala
val numbers = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// filter: 过滤
val evens = numbers.filter(_ % 2 == 0)  // List(2, 4, 6, 8, 10)

// filterNot: 反向过滤
val odds = numbers.filterNot(_ % 2 == 0)  // List(1, 3, 5, 7, 9)

// partition: 分割
val (evens2, odds2) = numbers.partition(_ % 2 == 0)
```

### 3. 归约操作

```scala
val numbers = List(1, 2, 3, 4, 5)

// reduce: 归约（需要非空集合）
val sum = numbers.reduce(_ + _)  // 15

// fold: 折叠（提供初始值）
val product = numbers.fold(1)(_ * _)  // 120

// foldLeft/foldRight: 指定方向
val leftSum = numbers.foldLeft(0)(_ + _)  // 15
val rightSum = numbers.foldRight(0)(_ + _)  // 15
```

### 4. 查找操作

```scala
val numbers = List(1, 2, 3, 4, 5)

// find: 查找第一个
val found = numbers.find(_ > 3)  // Some(4)

// exists: 是否存在
val hasEven = numbers.exists(_ % 2 == 0)  // true

// forall: 是否全部满足
val allPositive = numbers.forall(_ > 0)  // true
```

## Option类型详解

### 1. Option基本使用

```scala
// Some: 有值
val someValue: Option[Int] = Some(42)

// None: 无值
val noneValue: Option[Int] = None

// 使用getOrElse
val value = someValue.getOrElse(0)  // 42
val defaultValue = noneValue.getOrElse(0)  // 0
```

### 2. Option操作

```scala
val maybeString: Option[String] = Some("Hello")

// map: 转换
val length: Option[Int] = maybeString.map(_.length)  // Some(5)

// flatMap: 扁平化
val maybeLength: Option[Int] = maybeString.flatMap(s => 
  if (s.length > 0) Some(s.length) else None
)

// filter: 过滤
val filtered = maybeString.filter(_.length > 3)  // Some("Hello")
val filtered2 = maybeString.filter(_.length > 10)  // None

// foreach: 副作用操作
maybeString.foreach(println)  // 打印"Hello"
```

### 3. Option与模式匹配

```scala
val maybeValue: Option[String] = Some("Hello")

maybeValue match {
  case Some(value) => println(s"Value: $value")
  case None => println("No value")
}
```

## 集合转换

### 1. 集合间转换

```scala
val list = List(1, 2, 3)
val set = list.toSet  // Set(1, 2, 3)
val array = list.toArray  // Array(1, 2, 3)
val vector = list.toVector  // Vector(1, 2, 3)
```

### 2. 可变与不可变转换

```scala
import scala.collection.mutable

val immutable = List(1, 2, 3)
val mutable = immutable.toBuffer  // mutable.Buffer

val mutableList = mutable.ListBuffer(1, 2, 3)
val immutable2 = mutableList.toList  // List(1, 2, 3)
```

## 总结

- **不可变集合**：Scala默认使用不可变集合，更安全
- **丰富的操作符**：map、filter、reduce等操作符使代码更简洁
- **Option类型**：推荐使用Option而不是null，更安全
- **函数式风格**：集合操作支持函数式编程风格
- **链式调用**：操作符可以链式调用，代码更易读
