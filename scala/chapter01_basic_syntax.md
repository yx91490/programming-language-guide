# 第1章：入门与基础语法

## 章节概述

本章介绍Scala的基础语法，包括变量声明、类型推断和字符串处理。对于Java程序员来说，这些是最先接触的Scala特性，也是理解后续内容的基础。

## Scala特性

### 变量声明

Scala使用 `var` 和 `val` 声明变量：

```scala
// Scala变量声明
var age: Int = 25          // 可变变量
val name: String = "John"   // 不可变变量（推荐）
val price = 99.99           // 类型推断
val isActive = true        // 类型推断
```

**语法糖：**
- `val` 对应Java的 `final`，但更简洁
- 类型可以省略，由编译器推断
- 统一类型系统，没有基本类型和包装类型的区别

### 类型推断

Scala支持强大的类型推断：

```scala
// 类型推断示例
val x = 42              // 推断为 Int
val y = 3.14            // 推断为 Double
val z = "Hello"         // 推断为 String
val list = List(1, 2, 3) // 推断为 List[Int]
val map = Map("a" -> 1)  // 推断为 Map[String, Int]
```

### 字符串插值

Scala提供了三种字符串插值方式：

```scala
// 1. s插值器（字符串插值）
val name = "John"
val age = 25
val greeting = s"Hello, $name!"                    // Hello, John!
val message = s"Name: $name, Age: $age"           // Name: John, Age: 25
val expr = s"2 + 2 = ${2 + 2}"                    // 2 + 2 = 4

// 2. f插值器（格式化字符串）
val price = 99.99
val formatted = f"Price: $$$price%.2f"             // Price: $99.99

// 3. raw插值器（原始字符串，不转义）
val path = raw"C:\Users\John\nfile.txt"           // 不转义\n
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 可变变量 | `int x = 10;` | `var x: Int = 10` |
| 不可变变量 | `final int x = 10;` | `val x: Int = 10` |
| 类型推断 | 有限支持（局部变量） | 全面支持 |
| 字符串拼接 | `"Hello " + name` | `s"Hello $name"` |
| 字符串格式化 | `String.format(...)` | `f"...$$price%.2f"` |
| 基本类型 | 8种基本类型 | 统一类型系统 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object BasicSyntaxScala {
  def main(args: Array[String]): Unit = {
    // 变量声明
    var age: Int = 25
    val name: String = "John"
    val price = 99.99  // 类型推断为Double
    
    // 字符串插值（语法糖）
    val greeting = s"Hello, $name!"
    val message = f"Name: $name, Age: $age, Price: $$$price%.2f"
    
    println(greeting)
    println(message)
    
    // 类型转换
    val intValue = 42
    val doubleValue = intValue.toDouble  // 方法调用方式
    val stringValue = intValue.toString
    
    println(s"Int: $intValue")
    println(s"Double: $doubleValue")
    println(s"String: $stringValue")
    
    // 更多类型推断示例
    val list = List(1, 2, 3, 4, 5)  // List[Int]
    val map = Map("a" -> 1, "b" -> 2)  // Map[String, Int]
    val tuple = (1, "hello", 3.14)  // (Int, String, Double)
    
    println(s"List: $list")
    println(s"Map: $map")
    println(s"Tuple: $tuple")
  }
}
```

@tab Java
```java
public class BasicSyntaxJava {
    public static void main(String[] args) {
        // 变量声明
        int age = 25;
        final String name = "John";
        double price = 99.99;
        
        // 字符串处理
        String greeting = "Hello, " + name + "!";
        String message = String.format("Name: %s, Age: %d, Price: $%.2f", 
                                      name, age, price);
        
        System.out.println(greeting);
        System.out.println(message);
        
        // 类型转换
        int intValue = 42;
        double doubleValue = (double) intValue;
        String stringValue = String.valueOf(intValue);
        
        System.out.println("Int: " + intValue);
        System.out.println("Double: " + doubleValue);
        System.out.println("String: " + stringValue);
    }
}
```

:::

**运行结果：**
```
Hello, John!
Name: John, Age: 25, Price: $99.99
Int: 42
Double: 42.0
String: 42
List: List(1, 2, 3, 4, 5)
Map: Map(a -> 1, b -> 2)
Tuple: (1,hello,3.14)
```

## 语法糖重点

### 1. 类型推断

Scala的类型推断让代码更简洁：

```scala
// 完整写法
val x: Int = 42

// 简化写法（语法糖）
val x = 42  // 编译器自动推断为Int
```

### 2. 字符串插值

Scala的字符串插值比Java的字符串拼接更优雅：

```scala
// Java风格（在Scala中也可用，但不推荐）
val msg = "Hello, " + name + "!"

// Scala风格（语法糖）
val msg = s"Hello, $name!"
```

### 3. 方法调用语法糖

Scala允许省略点号和括号：

```scala
// 标准写法
val str = intValue.toString()

// 语法糖
val str = intValue.toString
```

## 总结

- **变量声明**：Scala使用 `val`（不可变）和 `var`（可变），比Java的 `final` 更简洁
- **类型推断**：Scala支持强大的类型推断，减少冗余代码
- **字符串处理**：Scala的字符串插值（s/f/raw）比Java的字符串拼接更优雅
- **统一类型系统**：Scala没有基本类型和包装类型的区别，使用更一致
