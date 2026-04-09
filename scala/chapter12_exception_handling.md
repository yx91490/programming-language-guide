# 第12章：异常处理

## 章节概述

Scala支持传统的try-catch-finally异常处理，同时提供了函数式的错误处理方式，如Option、Either和Try类型。本章对比Java和Scala的异常处理方式。

## Scala异常处理

### try-catch-finally

```scala
try {
  val result = 10 / 0
} catch {
  case e: ArithmeticException => println(s"Division by zero: ${e.getMessage}")
  case e: Exception => println(s"General exception: ${e.getMessage}")
} finally {
  println("Finally block")
}
```

### Option类型

```scala
// 使用Option避免null和异常
def divide(a: Int, b: Int): Option[Int] = {
  if (b != 0) Some(a / b) else None
}

val result = divide(10, 2)  // Some(5)
val error = divide(10, 0)    // None
```

### Either类型

```scala
// Either表示两种可能的结果
def divide(a: Int, b: Int): Either[String, Int] = {
  if (b != 0) Right(a / b) else Left("Division by zero")
}

val result = divide(10, 2)  // Right(5)
val error = divide(10, 0)    // Left("Division by zero")
```

### Try类型

```scala
import scala.util.{Try, Success, Failure}

// Try封装可能抛出异常的计算
def divide(a: Int, b: Int): Try[Int] = {
  Try(a / b)
}

val result = divide(10, 2)  // Success(5)
val error = divide(10, 0)    // Failure(java.lang.ArithmeticException)
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| try-catch-finally | 支持 | 支持 |
| try-with-resources | 支持 | 使用Loan模式 |
| Checked异常 | 强制处理 | 不强制 |
| Option | 无 | 支持 |
| Either | 无 | 支持 |
| Try | 无 | 支持 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
import scala.util.{Try, Success, Failure}
import scala.io.Source

object ExceptionHandlingScala {
  // 传统异常处理
  def divide(a: Int, b: Int): Int = {
    if (b == 0) throw new ArithmeticException("Division by zero")
    a / b
  }
  
  // Option方式
  def divideOption(a: Int, b: Int): Option[Int] = {
    if (b != 0) Some(a / b) else None
  }
  
  // Either方式
  def divideEither(a: Int, b: Int): Either[String, Int] = {
    if (b != 0) Right(a / b) else Left("Division by zero")
  }
  
  // Try方式
  def divideTry(a: Int, b: Int): Try[Int] = {
    Try(a / b)
  }
  
  def main(args: Array[String]): Unit = {
    // 传统try-catch
    try {
      val result = divide(10, 0)
      println(result)
    } catch {
      case e: ArithmeticException => println(s"Error: ${e.getMessage}")
    }
    
    // Option方式（函数式）
    val result1 = divideOption(10, 2)
    result1 match {
      case Some(value) => println(s"Result: $value")
      case None => println("Division by zero")
    }
    
    // Either方式
    val result2 = divideEither(10, 2)
    result2 match {
      case Right(value) => println(s"Result: $value")
      case Left(error) => println(s"Error: $error")
    }
    
    // Try方式
    val result3 = divideTry(10, 2)
    result3 match {
      case Success(value) => println(s"Result: $value")
      case Failure(e) => println(s"Error: ${e.getMessage}")
    }
    
    // Try链式操作
    val result4 = for {
      a <- divideTry(10, 2)
      b <- divideTry(a, 2)
    } yield b
    println(result4)  // Success(2)
  }
}
```

@tab Java
```java
import java.io.*;

public class ExceptionHandlingJava {
    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
    
    public static void readFile(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line = reader.readLine();
            System.out.println(line);
        }
    }
    
    public static void main(String[] args) {
        // try-catch
        try {
            int result = divide(10, 0);
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // try-with-resources
        try {
            readFile("file.txt");
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        }
    }
}
```

:::

## Option类型详解

### 1. 基本使用

```scala
def findUser(id: Int): Option[String] = {
  if (id > 0) Some(s"User$id") else None
}

val user = findUser(1)
user match {
  case Some(name) => println(name)
  case None => println("User not found")
}
```

### 2. Option操作

```scala
val maybeValue: Option[Int] = Some(42)

// map: 转换
val doubled = maybeValue.map(_ * 2)  // Some(84)

// flatMap: 扁平化
val nested = maybeValue.flatMap(x => Some(x * 2))  // Some(84)

// filter: 过滤
val filtered = maybeValue.filter(_ > 50)  // None

// getOrElse: 默认值
val value = maybeValue.getOrElse(0)  // 42
```

## Either类型详解

### 1. 基本使用

```scala
def divide(a: Int, b: Int): Either[String, Int] = {
  if (b != 0) Right(a / b) else Left("Division by zero")
}

val result = divide(10, 2)  // Right(5)
val error = divide(10, 0)    // Left("Division by zero")
```

### 2. Either操作

```scala
val result: Either[String, Int] = Right(42)

// map: 转换Right值
val doubled = result.map(_ * 2)  // Right(84)

// left.map: 转换Left值
val error: Either[String, Int] = Left("Error")
val upperError = error.left.map(_.toUpperCase)  // Left("ERROR")

// fold: 处理两种情况
val message = result.fold(
  error => s"Error: $error",
  value => s"Value: $value"
)
```

## Try类型详解

### 1. 基本使用

```scala
import scala.util.{Try, Success, Failure}

def riskyOperation(): Int = {
  if (math.random() > 0.5) throw new Exception("Random error")
  42
}

val result = Try(riskyOperation())
result match {
  case Success(value) => println(s"Success: $value")
  case Failure(e) => println(s"Failure: ${e.getMessage}")
}
```

### 2. Try操作

```scala
val result: Try[Int] = Try(10 / 2)

// map: 转换成功值
val doubled = result.map(_ * 2)  // Success(10)

// flatMap: 链式操作
val chained = result.flatMap(x => Try(x * 2))  // Success(10)

// recover: 恢复
val recovered = Try(10 / 0).recover {
  case e: ArithmeticException => 0
}  // Success(0)

// getOrElse: 默认值
val value = result.getOrElse(0)  // 5
```

### 3. Try链式操作

```scala
val result = for {
  a <- Try(10 / 2)
  b <- Try(a / 2)
  c <- Try(b * 3)
} yield c
// 如果任何一步失败，整个表达式返回Failure
```

## 函数式错误处理最佳实践

### 1. 使用Option处理可能为null的值

```scala
def findUser(id: Int): Option[User] = {
  // 返回Option而不是null
  if (id > 0) Some(User(id)) else None
}
```

### 2. 使用Either处理错误信息

```scala
def validateAge(age: Int): Either[String, Int] = {
  if (age < 0) Left("Age cannot be negative")
  else if (age > 150) Left("Age cannot be greater than 150")
  else Right(age)
}
```

### 3. 使用Try处理可能抛出异常的操作

```scala
def readFile(filename: String): Try[String] = {
  Try(scala.io.Source.fromFile(filename).mkString)
}
```

## 总结

- **try-catch-finally**：Scala支持传统的异常处理方式
- **Option**：用于处理可能为null的值，避免NullPointerException
- **Either**：用于返回错误信息或成功值
- **Try**：用于封装可能抛出异常的计算
- **函数式风格**：推荐使用Option/Either/Try进行函数式错误处理
