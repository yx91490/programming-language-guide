# 第17章：Java与Scala互操作

## 章节概述

Scala设计目标之一就是与Java无缝互操作。本章介绍如何在Java和Scala之间互相调用代码，包括类型映射、集合转换等。

## Java调用Scala代码

### 调用Scala类

```java
// Scala类
class Person(val name: String, var age: Int)

// Java中调用
Person person = new Person("John", 25);
String name = person.name();  // getter方法
person.age_$eq(26);  // setter方法（特殊命名）
```

### 调用Scala对象

```java
// Scala对象
object MathUtils {
  def add(x: Int, y: Int): Int = x + y
}

// Java中调用
int result = MathUtils$.MODULE$.add(5, 3);
```

### 调用Scala函数

```java
// Scala函数
val add: (Int, Int) => Int = (x, y) => x + y

// Java中调用（通过Function2接口）
scala.Function2<Integer, Integer, Integer> addFunc = ...;
int result = addFunc.apply(5, 3);
```

## Scala调用Java代码

### 调用Java类

```scala
// Java类
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

// Scala中调用
val calc = new Calculator
val result = calc.add(5, 3)
```

### 调用Java接口

```scala
// Java接口
public interface Runnable {
    void run();
}

// Scala中实现
val task = new Runnable {
  def run(): Unit = {
    println("Running")
  }
}
```

### 使用Java集合

```scala
import java.util.{ArrayList, HashMap}

// 使用Java集合
val javaList = new ArrayList[String]()
javaList.add("Hello")
javaList.add("World")

// 转换为Scala集合
import scala.jdk.CollectionConverters._
val scalaList = javaList.asScala.toList
```

## 类型映射

### 基本类型映射

| Java类型 | Scala类型 |
|----------|-----------|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Int` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Char` |
| `boolean` | `Boolean` |
| `void` | `Unit` |

### 引用类型映射

| Java类型 | Scala类型 |
|----------|-----------|
| `Object` | `AnyRef` |
| `String` | `String` |
| `java.lang.Integer` | `Int` |
| `java.util.List[T]` | `scala.collection.mutable.Buffer[T]` |
| `java.util.Map[K, V]` | `scala.collection.mutable.Map[K, V]` |

## 集合转换

### Java集合转Scala集合

```scala
import scala.jdk.CollectionConverters._

// Java List转Scala List
val javaList = new java.util.ArrayList[String]()
javaList.add("Hello")
val scalaList = javaList.asScala.toList

// Java Map转Scala Map
val javaMap = new java.util.HashMap[String, Int]()
javaMap.put("a", 1)
val scalaMap = javaMap.asScala.toMap
```

### Scala集合转Java集合

```scala
import scala.jdk.CollectionConverters._

// Scala List转Java List
val scalaList = List("Hello", "World")
val javaList = scalaList.asJava

// Scala Map转Java Map
val scalaMap = Map("a" -> 1, "b" -> 2)
val javaMap = scalaMap.asJava
```

## 完整代码示例

### Java调用Scala

::: code-tabs

@tab Scala
```scala
// Person.scala
class Person(val name: String, var age: Int) {
  def greet(): String = s"Hello, I'm $name"
}

object Person {
  def create(name: String, age: Int): Person = new Person(name, age)
}
```

@tab Java
```java
// PersonJava.java
public class PersonJava {
    public static void main(String[] args) {
        // 调用Scala类
        Person person = new Person("John", 25);
        String name = person.name();  // getter
        person.age_$eq(26);  // setter
        String greeting = person.greet();
        System.out.println(greeting);
        
        // 调用Scala对象
        Person person2 = Person$.MODULE$.create("Jane", 30);
        System.out.println(person2.greet());
    }
}
```

:::

### Scala调用Java

::: code-tabs

@tab Scala
```scala
// CalculatorScala.scala
object CalculatorScala {
  def main(args: Array[String]): Unit = {
    // 调用Java类
    val calc = new Calculator
    val sum = calc.add(5, 3)
    println(s"Sum: $sum")
    
    // 调用Java静态方法
    val product = Calculator.multiply(5, 3)
    println(s"Product: $product")
    
    // 使用Java集合
    import java.util.{ArrayList, HashMap}
    val javaList = new ArrayList[String]()
    javaList.add("Hello")
    javaList.add("World")
    
    // 转换为Scala集合
    import scala.jdk.CollectionConverters._
    val scalaList = javaList.asScala.toList
    println(scalaList)
  }
}
```

@tab Java
```java
// Calculator.java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
}
```

:::

## 注解互操作

### Java注解在Scala中使用

```scala
// 使用Java注解
@Deprecated
class OldClass {
  @Override
  def toString: String = "Old"
}
```

### Scala注解在Java中使用

```scala
// Scala注解
@SerialVersionUID(123L)
class SerializableClass extends Serializable
```

## 异常处理互操作

### Java异常在Scala中处理

```scala
// Java方法可能抛出checked异常
def readFile(): String = {
  try {
    scala.io.Source.fromFile("file.txt").mkString
  } catch {
    case e: java.io.IOException => 
      throw new RuntimeException(e)
  }
}
```

### Scala异常在Java中处理

```scala
// Scala方法
class ScalaService {
  def process(): String = {
    if (math.random() > 0.5) {
      throw new RuntimeException("Error")
    }
    "Success"
  }
}
```

```java
// Java中调用
ScalaService service = new ScalaService();
try {
    String result = service.process();
} catch (RuntimeException e) {
    System.out.println("Error: " + e.getMessage());
}
```

## 最佳实践

### 1. 集合转换

```scala
// 推荐：使用CollectionConverters
import scala.jdk.CollectionConverters._

val javaList = new java.util.ArrayList[String]()
val scalaList = javaList.asScala.toList
```

### 2. 类型显式声明

```scala
// 在互操作时显式声明类型
val javaList: java.util.List[String] = new java.util.ArrayList()
val scalaList: List[String] = javaList.asScala.toList
```

### 3. 避免Scala特有特性

```scala
// 如果代码需要被Java调用，避免使用：
// - 操作符重载
// - 隐式参数
// - 复杂的高阶函数
```

## 常见问题

### 1. 伴生对象访问

```java
// Java中访问Scala伴生对象
// Scala: object Person
Person$ personObject = Person$.MODULE$;
```

### 2. 默认参数

```scala
// Scala方法有默认参数
def greet(name: String, greeting: String = "Hello"): String = {
  s"$greeting, $name"
}

// Java中调用需要提供所有参数
// greet("John", "Hello")  // 必须提供greeting
```

### 3. 命名参数

```scala
// Scala支持命名参数
def create(name: String, age: Int): Person = ???

// Java中不支持命名参数，必须按顺序
```

## 总结

- **无缝互操作**：Scala和Java可以互相调用
- **类型映射**：基本类型和引用类型有对应关系
- **集合转换**：使用CollectionConverters进行转换
- **注解支持**：可以互相使用注解
- **注意事项**：避免使用Scala特有特性以确保互操作性
