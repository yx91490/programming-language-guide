# 第6章：表达式与控制流

## 章节概述

Scala的控制流语句与Java类似，但Scala的if-else、for循环等是表达式而不是语句，可以返回值。本章对比Java和Scala的控制流特性。

## Scala控制流

### if-else表达式

```scala
val x = 10
// if-else是表达式，可以返回值
val result = if (x > 5) {
  "Greater than 5"
} else {
  "Less than or equal to 5"
}
println(result)

// 更简洁的写法
val message = if (x > 5) "Greater" else "Less"
```

**语法糖：** if-else是表达式，不是语句，可以返回值

### match表达式

```scala
val day = 3
val dayName = day match {
  case 1 => "Monday"
  case 2 => "Tuesday"
  case 3 => "Wednesday"
  case _ => "Other day"  // 默认情况
}
println(dayName)
```

**语法糖：** match比switch更强大，支持模式匹配

### for推导式

```scala
// 基本for循环
for (i <- 1 to 10) {
  println(i)
}

// for推导式（生成器）
val squares = for (i <- 1 to 10) yield i * i
// 结果: Vector(1, 4, 9, 16, 25, 36, 49, 64, 81, 100)

// 多个生成器
val pairs = for {
  i <- 1 to 3
  j <- 1 to 3
} yield (i, j)
// 结果: Vector((1,1), (1,2), (1,3), (2,1), ...)

// 带守卫条件
val evens = for (i <- 1 to 10 if i % 2 == 0) yield i
// 结果: Vector(2, 4, 6, 8, 10)
```

**语法糖：** for推导式比Java的for循环更强大，支持生成器和守卫

### while循环

```scala
var i = 0
while (i < 10) {
  println(i)
  i += 1
}

// do-while
do {
  println(i)
  i += 1
} while (i < 10)
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| if-else | 语句 | 表达式（可返回值） |
| switch/match | switch语句/表达式 | match表达式（更强大） |
| for循环 | 传统for/增强for | for推导式（支持生成器） |
| while循环 | 支持 | 支持（但不推荐） |
| 守卫条件 | 不支持 | 支持（if条件） |
| 生成器 | 不支持 | 支持（yield） |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object ControlFlowScala {
  def main(args: Array[String]): Unit = {
    // if-else表达式（语法糖：可以返回值）
    val x = 10
    val message = if (x > 5) {
      "Greater than 5"
    } else {
      "Less than or equal to 5"
    }
    println(message)
    
    val result = if (x > 5) "Greater" else "Less"
    println(result)
    
    // match表达式（比switch更强大）
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
    
    // for推导式（语法糖：支持生成器和守卫）
    for (i <- 1 to 10) {
      print(s"$i ")
    }
    println()
    
    // for推导式生成器
    val squares = for (i <- 1 to 10) yield i * i
    println(s"Squares: $squares")
    
    // 多个生成器
    val pairs = for {
      i <- 1 to 3
      j <- 1 to 3
    } yield (i, j)
    println(s"Pairs: $pairs")
    
    // 带守卫条件
    val evens = for (i <- 1 to 10 if i % 2 == 0) yield i
    println(s"Evens: $evens")
    
    // while循环（不推荐，尽量使用for或递归）
    var i = 0
    while (i < 5) {
      print(s"$i ")
      i += 1
    }
    println()
  }
}
```

@tab Java
```java
public class ControlFlowJava {
    public static void main(String[] args) {
        // if-else
        int x = 10;
        if (x > 5) {
            System.out.println("Greater than 5");
        } else {
            System.out.println("Less than or equal to 5");
        }
        
        String result = x > 5 ? "Greater" : "Less";
        
        // switch
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            default:
                System.out.println("Other day");
        }
        
        // for循环
        for (int i = 0; i < 10; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // while循环
        int i = 0;
        while (i < 5) {
            System.out.print(i + " ");
            i++;
        }
        System.out.println();
    }
}
```

:::

## for推导式详解

### 1. 基本for循环

```scala
// 遍历范围
for (i <- 1 to 10) {
  println(i)
}

// 遍历集合
val list = List(1, 2, 3, 4, 5)
for (item <- list) {
  println(item)
}
```

### 2. for推导式生成器

```scala
// 使用yield生成新集合
val doubled = for (i <- 1 to 5) yield i * 2
// 结果: Vector(2, 4, 6, 8, 10)

// 类型推断
val strings = for (i <- 1 to 5) yield s"Number: $i"
// 结果: Vector("Number: 1", "Number: 2", ...)
```

### 3. 多个生成器

```scala
// 嵌套循环
val matrix = for {
  i <- 1 to 3
  j <- 1 to 3
} yield (i, j)
// 结果: Vector((1,1), (1,2), (1,3), (2,1), ...)
```

### 4. 守卫条件

```scala
// 过滤条件
val filtered = for {
  i <- 1 to 10
  if i % 2 == 0
  if i > 5
} yield i
// 结果: Vector(6, 8, 10)
```

### 5. for推导式与map/flatMap

```scala
// for推导式
val result1 = for {
  x <- List(1, 2, 3)
  y <- List(10, 20)
} yield x + y

// 等价于使用flatMap和map
val result2 = List(1, 2, 3).flatMap(x => 
  List(10, 20).map(y => x + y)
)
// 结果相同: List(11, 21, 12, 22, 13, 23)
```

## match表达式详解

### 1. 基本匹配

```scala
val x = 5
val result = x match {
  case 1 => "One"
  case 2 => "Two"
  case 3 => "Three"
  case _ => "Other"
}
```

### 2. 类型匹配

```scala
val obj: Any = "Hello"
val result = obj match {
  case s: String => s"String: $s"
  case i: Int => s"Int: $i"
  case _ => "Other type"
}
```

### 3. 模式匹配（详见第9章）

```scala
val list = List(1, 2, 3)
list match {
  case Nil => println("Empty list")
  case head :: tail => println(s"Head: $head, Tail: $tail")
  case _ => println("Other")
}
```

## 总结

- **if-else表达式**：Scala的if-else是表达式，可以返回值
- **match表达式**：比Java的switch更强大，支持模式匹配
- **for推导式**：支持生成器、守卫条件，可以生成新集合
- **yield关键字**：用于for推导式生成新集合
- **函数式风格**：推荐使用for推导式和match，而不是while循环
