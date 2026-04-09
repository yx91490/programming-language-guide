# 第15章：隐式与类型类

## 章节概述

隐式（Implicits）是Scala的强大特性，包括隐式参数、隐式转换、类型类等。本章详细介绍Scala的隐式系统。

## Scala隐式系统

### 隐式参数

```scala
// 定义隐式值
implicit val defaultGreeting: String = "Hello"

// 隐式参数
def greet(name: String)(implicit greeting: String): String = {
  s"$greeting, $name!"
}

// 使用（隐式参数自动传入）
greet("John")  // "Hello, John!"
```

### 隐式转换

```scala
// 隐式转换
implicit def intToString(x: Int): String = x.toString

val str: String = 42  // 自动转换
```

### 类型类模式

```scala
// 类型类定义
trait Show[A] {
  def show(a: A): String
}

// 类型类实例
implicit val intShow: Show[Int] = new Show[Int] {
  def show(a: Int): String = a.toString
}

// 使用类型类
def print[A](a: A)(implicit show: Show[A]): Unit = {
  println(show.show(a))
}

print(42)  // 自动使用intShow
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 隐式参数 | 无 | 支持 |
| 隐式转换 | 无 | 支持 |
| 类型类 | 需要手动实现 | 原生支持 |
| 扩展方法 | 无 | 通过隐式类实现 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object ImplicitsScala {
  // 隐式参数
  implicit val defaultName: String = "World"
  
  def greet(name: String)(implicit greeting: String): String = {
    s"$greeting, $name!"
  }
  
  // 类型类
  trait Show[A] {
    def show(a: A): String
  }
  
  implicit val intShow: Show[Int] = (a: Int) => a.toString
  implicit val stringShow: Show[String] = (a: String) => a
  
  def print[A](a: A)(implicit show: Show[A]): Unit = {
    println(show.show(a))
  }
  
  // 隐式类（扩展方法）
  implicit class IntExtensions(val x: Int) extends AnyVal {
    def times(f: => Unit): Unit = {
      for (_ <- 1 to x) f
    }
  }
  
  def main(args: Array[String]): Unit = {
    // 隐式参数
    println(greet("John"))  // "Hello, World!"
    
    // 类型类
    print(42)  // 42
    print("Hello")  // Hello
    
    // 扩展方法
    3.times {
      println("Hello")
    }
  }
}
```

@tab Java
```java
import java.util.Comparator;

// 需要显式传递比较器
public class ImplicitsJava {
    public static <T> T max(T a, T b, Comparator<T> comparator) {
        return comparator.compare(a, b) > 0 ? a : b;
    }
    
    public static void main(String[] args) {
        // 必须显式传递比较器
        Integer result = max(5, 3, Integer::compareTo);
        System.out.println(result);
    }
}
```

:::

## 隐式参数详解

### 1. 基本使用

```scala
implicit val timeout: Int = 5000

def fetch(url: String)(implicit timeout: Int): String = {
  // 使用timeout
  s"Fetching $url with timeout $timeout"
}

fetch("http://example.com")  // 自动使用隐式timeout
```

### 2. 多个隐式参数

```scala
implicit val config: Config = Config.default
implicit val logger: Logger = Logger.default

def process(data: String)(implicit config: Config, logger: Logger): Unit = {
  logger.log(s"Processing with config: $config")
}

process("data")  // 自动传入config和logger
```

### 3. 上下文边界

```scala
// 上下文边界（语法糖）
def max[T : Ordering](a: T, b: T): T = {
  val ord = implicitly[Ordering[T]]
  if (ord.compare(a, b) > 0) a else b
}

// 等价于
def max2[T](a: T, b: T)(implicit ord: Ordering[T]): T = {
  if (ord.compare(a, b) > 0) a else b
}
```

## 隐式转换详解

### 1. 类型转换

```scala
implicit def intToDouble(x: Int): Double = x.toDouble

val d: Double = 42  // 自动转换
```

### 2. 扩展方法（隐式类）

```scala
implicit class StringExtensions(val s: String) extends AnyVal {
  def reverseWords: String = {
    s.split(" ").reverse.mkString(" ")
  }
}

"Hello World".reverseWords  // "World Hello"
```

### 3. 隐式类限制

```scala
// 隐式类必须是内部类或对象
object Extensions {
  implicit class RichInt(val x: Int) extends AnyVal {
    def square: Int = x * x
  }
}

import Extensions._
5.square  // 25
```

## 类型类模式详解

### 1. 定义类型类

```scala
trait JsonWriter[A] {
  def write(value: A): String
}
```

### 2. 创建类型类实例

```scala
implicit val intWriter: JsonWriter[Int] = (value: Int) => value.toString
implicit val stringWriter: JsonWriter[String] = (value: String) => s""""$value""""
```

### 3. 使用类型类

```scala
def toJson[A](value: A)(implicit writer: JsonWriter[A]): String = {
  writer.write(value)
}

toJson(42)  // "42"
toJson("Hello")  // ""Hello""
```

### 4. 类型类组合

```scala
implicit def optionWriter[A](implicit writer: JsonWriter[A]): JsonWriter[Option[A]] = {
  case Some(value) => writer.write(value)
  case None => "null"
}

toJson(Some(42))  // "42"
toJson(None)  // "null"
```

## 隐式解析规则

### 1. 隐式作用域

```scala
// 隐式在以下位置查找：
// 1. 当前作用域
// 2. 导入的作用域
// 3. 伴生对象
// 4. 类型的伴生对象
```

### 2. 隐式优先级

```scala
// 优先级从高到低：
// 1. 当前作用域的隐式
// 2. 显式导入的隐式
// 3. 通配符导入的隐式
```

## 最佳实践

### 1. 使用类型类而不是隐式转换

```scala
// 推荐：类型类
trait Show[A] {
  def show(a: A): String
}

// 不推荐：隐式转换（容易产生意外行为）
implicit def intToString(x: Int): String = x.toString
```

### 2. 使用隐式类扩展方法

```scala
implicit class RichString(val s: String) extends AnyVal {
  def toCamelCase: String = {
    s.split(" ").map(_.capitalize).mkString
  }
}
```

### 3. 使用上下文边界简化代码

```scala
def sort[T : Ordering](list: List[T]): List[T] = {
  list.sorted
}
```

## 总结

- **隐式参数**：自动传入参数，减少重复代码
- **隐式转换**：自动类型转换，但要谨慎使用
- **类型类**：实现ad-hoc多态，比继承更灵活
- **扩展方法**：通过隐式类为现有类型添加方法
- **上下文边界**：简化隐式参数的语法
