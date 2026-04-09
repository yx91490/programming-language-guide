# 第9章：模式匹配

## 章节概述

Scala的模式匹配比Java的switch表达式更强大，支持类型匹配、case类匹配、守卫条件等。本章详细介绍Scala的模式匹配特性。

## Scala模式匹配

### match表达式

```scala
// 基本匹配
val day = 3
val dayName = day match {
  case 1 => "Monday"
  case 2 => "Tuesday"
  case 3 => "Wednesday"
  case _ => "Other day"
}

// 类型匹配
val obj: Any = "Hello"
val result = obj match {
  case s: String => s.toUpperCase
  case i: Int => i * 2
  case _ => "Unknown"
}
```

### case类匹配

```scala
// case类定义
case class Person(name: String, age: Int)

// 模式匹配
val person = Person("John", 25)
person match {
  case Person("John", age) => println(s"John is $age years old")
  case Person(name, 25) => println(s"$name is 25 years old")
  case Person(name, age) => println(s"$name is $age years old")
}
```

### 守卫条件

```scala
val x = 10
val result = x match {
  case n if n > 0 && n < 10 => "Small positive"
  case n if n >= 10 => "Large positive"
  case n if n < 0 => "Negative"
  case _ => "Zero"
}
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 基本匹配 | switch表达式 | match表达式 |
| 类型匹配 | instanceof模式匹配 | 原生支持 |
| case类匹配 | 不支持 | 支持 |
| 守卫条件 | 不支持 | 支持 |
| 提取器 | 不支持 | 支持（unapply） |
| 模式变量 | 有限支持 | 全面支持 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object PatternMatchingScala {
  def main(args: Array[String]): Unit = {
    // 基本匹配
    val day = 3
    val dayName = day match {
      case 1 => "Monday"
      case 2 => "Tuesday"
      case 3 => "Wednesday"
      case 4 => "Thursday"
      case 5 => "Friday"
      case _ => "Weekend"
    }
    println(dayName)
    
    // 类型匹配
    val obj: Any = "Hello"
    val result = obj match {
      case s: String => s.toUpperCase
      case i: Int => i * 2
      case d: Double => d.toInt
      case _ => "Unknown"
    }
    println(result)
    
    // case类匹配
    case class Person(name: String, age: Int)
    val person = Person("John", 25)
    
    person match {
      case Person("John", age) => println(s"John is $age years old")
      case Person(name, 25) => println(s"$name is 25 years old")
      case Person(name, age) => println(s"$name is $age years old")
    }
    
    // 守卫条件
    val x = 10
    val message = x match {
      case n if n > 0 && n < 10 => "Small positive"
      case n if n >= 10 => "Large positive"
      case n if n < 0 => "Negative"
      case _ => "Zero"
    }
    println(message)
    
    // 列表模式匹配
    val list = List(1, 2, 3)
    list match {
      case Nil => println("Empty list")
      case head :: tail => println(s"Head: $head, Tail: $tail")
      case _ => println("Other")
    }
    
    // Option模式匹配
    val maybeValue: Option[Int] = Some(42)
    maybeValue match {
      case Some(value) => println(s"Value: $value")
      case None => println("No value")
    }
  }
}
```

@tab Java
```java
public class PatternMatchingJava {
    public static void main(String[] args) {
        // switch表达式
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other day";
        };
        System.out.println(dayName);
        
        // instanceof模式匹配
        Object obj = "Hello";
        if (obj instanceof String s) {
            System.out.println(s.toUpperCase());
        }
        
        // 传统switch
        int x = 10;
        switch (x) {
            case 1:
            case 2:
            case 3:
                System.out.println("Small");
                break;
            case 10:
                System.out.println("Ten");
                break;
            default:
                System.out.println("Other");
        }
    }
}
```

:::

## 模式匹配详解

### 1. 常量匹配

```scala
val x = 5
x match {
  case 1 => "One"
  case 2 => "Two"
  case 5 => "Five"
  case _ => "Other"
}
```

### 2. 变量匹配

```scala
val x = 10
x match {
  case n => println(s"Value is $n")  // 匹配任何值
}
```

### 3. 类型匹配

```scala
val obj: Any = "Hello"
obj match {
  case s: String => s.length
  case i: Int => i
  case _ => 0
}
```

### 4. 序列模式匹配

```scala
val list = List(1, 2, 3)
list match {
  case Nil => "Empty"
  case head :: Nil => s"Single: $head"
  case head :: tail => s"Head: $head, Tail: $tail"
  case _ => "Other"
}
```

### 5. 元组模式匹配

```scala
val tuple = (1, "Hello", 3.14)
tuple match {
  case (a, b, c) => println(s"$a, $b, $c")
  case (a, _, c) => println(s"$a, $c")  // 忽略中间元素
}
```

### 6. 提取器（unapply）

```scala
// 自定义提取器
object Email {
  def unapply(str: String): Option[(String, String)] = {
    val parts = str.split("@")
    if (parts.length == 2) Some(parts(0), parts(1)) else None
  }
}

val email = "user@example.com"
email match {
  case Email(user, domain) => println(s"User: $user, Domain: $domain")
  case _ => println("Invalid email")
}
```

## 模式匹配最佳实践

### 1. 密封类与模式匹配

```scala
sealed trait Animal
case class Dog(name: String) extends Animal
case class Cat(name: String) extends Animal

def describe(animal: Animal): String = animal match {
  case Dog(name) => s"Dog: $name"
  case Cat(name) => s"Cat: $name"
  // 编译器会检查是否覆盖所有情况
}
```

### 2. Option模式匹配

```scala
def processOption(maybe: Option[Int]): String = maybe match {
  case Some(value) => s"Value: $value"
  case None => "No value"
}
```

### 3. 列表模式匹配

```scala
def sum(list: List[Int]): Int = list match {
  case Nil => 0
  case head :: tail => head + sum(tail)
}
```

## 总结

- **match表达式**：比Java的switch更强大，是表达式可以返回值
- **类型匹配**：支持类型匹配，比instanceof更简洁
- **case类匹配**：可以匹配case类的字段
- **守卫条件**：支持if条件进行更精确的匹配
- **提取器**：通过unapply方法实现自定义模式匹配
