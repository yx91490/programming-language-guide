# 第18章：高级特性与最佳实践

## 章节概述

本章总结Java 17和Scala 2.13的主要特性，并提供最佳实践建议。

## Scala 2.13特性总结

### 1. 集合性能优化

```scala
// 2.13集合性能优化
val list = List(1, 2, 3, 4, 5)
val result = list.map(_ * 2).filter(_ > 5)  // 更高效的实现
```

### 2. 字符串插值

```scala
// 字符串插值
val name = "John"
val age = 25
val message = s"Name: $name, Age: $age"
val formatted = f"Price: $$${99.99}%.2f"
```

### 3. 多行字符串

```scala
// 多行字符串
val html = """
    <html>
        <body>
            <p>Hello, World!</p>
        </body>
    </html>
    """
```

### 4. 集合操作增强

```scala
// 更多集合操作方法
val list = List(1, 2, 3, 4, 5)
val grouped = list.groupBy(_ % 2)
val partitioned = list.partition(_ % 2 == 0)
```

## 最佳实践

### 1. 代码风格

**Java最佳实践：**
```java
// 使用Records表示不可变数据
public record Point(int x, int y) { }

// 使用Sealed Classes限制继承
public sealed interface Animal permits Dog, Cat { }

// 使用Pattern Matching替代instanceof
if (obj instanceof String s) {
    // 使用s
}
```

**Scala最佳实践：**
```scala
// 使用val而不是var
val name = "John"  // 推荐
var age = 25       // 尽量避免

// 使用Option而不是null
def findUser(id: Int): Option[User] = {
  if (id > 0) Some(User(id)) else None
}

// 使用case类表示数据
case class Person(name: String, age: Int)

// 使用模式匹配
person match {
  case Person("John", age) => println(s"John is $age")
  case Person(name, 25) => println(s"$name is 25")
  case _ => println("Other person")
}
```

### 2. 函数式编程

**推荐：**
```scala
// 使用不可变集合
val list = List(1, 2, 3)
val doubled = list.map(_ * 2)

// 使用高阶函数
def process(list: List[Int], f: Int => Int): List[Int] = {
  list.map(f)
}

// 使用for推导式
val result = for {
  a <- Future { 10 }
  b <- Future { 20 }
} yield a + b
```

**避免：**
```scala
// 避免可变状态
var sum = 0
for (i <- 1 to 10) {
  sum += i  // 不推荐
}

// 推荐使用函数式方式
val sum = (1 to 10).sum
```

### 3. 错误处理

**推荐：**
```scala
// 使用Option/Either/Try
def divide(a: Int, b: Int): Either[String, Int] = {
  if (b != 0) Right(a / b) else Left("Division by zero")
}

// 使用Try处理异常
val result = Try(riskyOperation())
result match {
  case Success(value) => println(value)
  case Failure(e) => println(s"Error: ${e.getMessage}")
}
```

**避免：**
```scala
// 避免使用null
def findUser(id: Int): User = {
  if (id > 0) User(id) else null  // 不推荐
}

// 推荐使用Option
def findUser(id: Int): Option[User] = {
  if (id > 0) Some(User(id)) else None
}
```

### 4. 并发编程

**推荐：**
```scala
// 使用Future进行异步编程
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

val future = Future {
  computeResult()
}

future.onComplete {
  case Success(value) => println(value)
  case Failure(e) => println(e.getMessage)
}

// 使用for推导式组合Future
val result = for {
  a <- future1
  b <- future2
} yield a + b
```

### 5. 类型安全

**推荐：**
```scala
// 使用类型别名提高可读性
type UserId = Int
type UserName = String

// 使用密封类确保类型安全
sealed trait Status
case object Pending extends Status
case object Completed extends Status

// 使用类型类实现ad-hoc多态
trait Show[A] {
  def show(a: A): String
}
```

## 性能考虑

### 1. 集合选择

```scala
// 根据使用场景选择集合
val list = List(1, 2, 3)        // 不可变，适合函数式编程
val vector = Vector(1, 2, 3)   // 不可变，随机访问快
val array = Array(1, 2, 3)     // 可变，性能最好
```

### 2. 延迟计算

```scala
// 使用lazy延迟计算
lazy val expensive = {
  println("Computing...")
  computeExpensiveValue()
}

// 使用Stream进行延迟计算
val stream = Stream.from(1).take(10)
```

### 3. 尾递归优化

```scala
// 使用尾递归避免栈溢出
@annotation.tailrec
def factorial(n: Int, acc: Int = 1): Int = {
  if (n <= 1) acc
  else factorial(n - 1, n * acc)
}
```

## 总结

### Java 17主要特性
- Text Blocks：多行字符串
- Records：不可变数据类
- Sealed Classes：限制继承
- Pattern Matching：模式匹配增强

### Scala 2.13主要特性
- 集合性能优化
- 字符串插值
- 丰富的集合操作
- 函数式编程支持

### 最佳实践
- 使用不可变数据
- 避免null，使用Option
- 使用模式匹配
- 函数式编程风格
- 类型安全优先

---

## 附录：快速参考

### Java vs Scala 快速对照表

| 特性 | Java | Scala |
|------|------|-------|
| 变量声明 | `final int x = 10;` | `val x: Int = 10` |
| 方法定义 | `int add(int a, int b) { }` | `def add(a: Int, b: Int): Int = { }` |
| 字符串插值 | `String.format(...)` | `s"...$$name"` |
| 集合操作 | Stream API | 原生操作符 |
| 模式匹配 | switch表达式 | match表达式 |
| 数据类 | Record | case类 |
| 并发 | CompletableFuture | Future |
| 空值处理 | Optional | Option |

### 学习路径

1. **基础**：变量、类型、类、对象
2. **函数式**：Lambda、高阶函数、集合操作
3. **高级**：模式匹配、类型类、隐式
4. **实战**：并发编程、互操作、最佳实践
