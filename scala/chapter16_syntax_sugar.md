# 第16章：Scala语法糖专题

## 章节概述

Scala提供了丰富的语法糖，让代码更简洁优雅。本章详细介绍Scala的各种语法糖特性。

## 语法糖列表

### 1. 中缀调用

```scala
// 标准方法调用
list.map(x => x * 2)

// 中缀调用（语法糖）
list map (x => x * 2)

// 更常见的中缀调用
1 to 10  // 等价于 1.to(10)
1 + 2    // 等价于 1.+(2)
```

### 2. apply方法

```scala
// apply方法允许直接调用对象
class Box[T](var value: T) {
  def apply(): T = value
  def apply(newValue: T): Unit = value = newValue
}

val box = new Box(42)
box()  // 调用apply()，返回42
box(100)  // 调用apply(100)，设置value为100

// 数组访问也是apply
val arr = Array(1, 2, 3)
arr(0)  // 等价于 arr.apply(0)
```

### 3. unapply方法（提取器）

```scala
// unapply用于模式匹配
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

### 4. 操作符重载

```scala
// 操作符就是方法
class Complex(val real: Double, val imag: Double) {
  def +(other: Complex): Complex = {
    new Complex(real + other.real, imag + other.imag)
  }
  
  def *(other: Complex): Complex = {
    new Complex(
      real * other.real - imag * other.imag,
      real * other.imag + imag * other.real
    )
  }
}

val c1 = new Complex(1, 2)
val c2 = new Complex(3, 4)
val sum = c1 + c2  // 操作符重载
val product = c1 * c2
```

### 5. 元组

```scala
// 元组创建
val tuple = (1, "Hello", 3.14)  // Tuple3[Int, String, Double]

// 访问元素
val first = tuple._1  // 1
val second = tuple._2  // "Hello"

// 元组解构
val (a, b, c) = tuple
```

### 6. 下划线用法

```scala
// 1. 占位符
val list = List(1, 2, 3)
list.map(_ * 2)  // 等价于 list.map(x => x * 2)

// 2. 部分应用
def add(x: Int, y: Int): Int = x + y
val add5 = add(5, _)  // 部分应用
add5(3)  // 8

// 3. 通配符
import scala.collection.mutable._
val _ = someValue  // 忽略值

// 4. 类型通配符
def process(list: List[_]): Unit = { }
```

### 7. 字符串插值

```scala
val name = "John"
val age = 25

// s插值器
val message = s"Name: $name, Age: $age"

// f插值器（格式化）
val price = 99.99
val formatted = f"Price: $$$price%.2f"

// raw插值器（不转义）
val path = raw"C:\Users\John\nfile.txt"
```

### 8. 方法调用语法糖

```scala
// 无参数方法可以省略括号
def getName: String = "John"
getName  // 等价于 getName()

// 单参数方法可以使用中缀调用
def add(x: Int, y: Int): Int = x + y
1 add 2  // 等价于 add(1, 2)
```

## 完整代码示例

### 语法糖综合示例

```scala
object SyntaxSugar {
  // 1. apply/unapply
  class Box[T](var value: T) {
    def apply(): T = value
    def apply(newValue: T): Unit = value = newValue
  }
  
  object Email {
    def unapply(str: String): Option[(String, String)] = {
      val parts = str.split("@")
      if (parts.length == 2) Some(parts(0), parts(1)) else None
    }
  }
  
  // 2. 操作符重载
  class Complex(val real: Double, val imag: Double) {
    def +(other: Complex): Complex = {
      new Complex(real + other.real, imag + other.imag)
    }
    
    override def toString: String = s"$real + ${imag}i"
  }
  
  // 3. 隐式类扩展方法
  implicit class RichInt(val x: Int) extends AnyVal {
    def times(f: => Unit): Unit = {
      for (_ <- 1 to x) f
    }
  }
  
  def main(args: Array[String]): Unit = {
    // apply方法
    val box = new Box(42)
    println(box())  // 42
    box(100)
    println(box())  // 100
    
    // unapply方法
    val email = "user@example.com"
    email match {
      case Email(user, domain) => println(s"User: $user, Domain: $domain")
      case _ => println("Invalid")
    }
    
    // 操作符重载
    val c1 = new Complex(1, 2)
    val c2 = new Complex(3, 4)
    println(c1 + c2)  // 4.0 + 6.0i
    
    // 中缀调用
    val list = List(1, 2, 3)
    val doubled = list map (_ * 2)  // 中缀调用
    println(doubled)  // List(2, 4, 6)
    
    // 下划线占位符
    val sum = list.reduce(_ + _)  // 等价于 list.reduce((a, b) => a + b)
    println(sum)  // 6
    
    // 字符串插值
    val name = "John"
    val age = 25
    println(s"Name: $name, Age: $age")
    
    // 扩展方法
    3.times {
      println("Hello")
    }
    
    // 元组
    val tuple = (1, "Hello", 3.14)
    val (a, b, c) = tuple  // 解构
    println(s"$a, $b, $c")
  }
}
```

## 语法糖详解

### 1. 中缀调用

```scala
// 任何单参数方法都可以使用中缀调用
class MyList[A] {
  def :: (head: A): MyList[A] = ???
}

val list = new MyList[Int]
1 :: list  // 中缀调用
```

### 2. apply方法

```scala
// apply方法让对象可以像函数一样调用
class FunctionLike {
  def apply(x: Int): Int = x * 2
}

val f = new FunctionLike
f(5)  // 10，等价于 f.apply(5)
```

### 3. unapply方法

```scala
// unapply用于模式匹配中的提取
object Name {
  def unapply(str: String): Option[String] = {
    if (str.nonEmpty) Some(str) else None
  }
}

"John" match {
  case Name(n) => println(n)
  case _ => println("Empty")
}
```

### 4. 操作符重载

```scala
// 操作符就是方法名
class Vector2D(x: Double, y: Double) {
  def +(other: Vector2D): Vector2D = {
    new Vector2D(x + other.x, y + other.y)
  }
  
  def *(scalar: Double): Vector2D = {
    new Vector2D(x * scalar, y * scalar)
  }
}
```

### 5. 元组语法糖

```scala
// 元组创建
val pair = 1 -> "one"  // 等价于 (1, "one")
val triple = (1, "two", 3.0)

// 元组访问
val first = triple._1
val second = triple._2

// 元组解构
val (a, b, c) = triple
```

## 总结

- **中缀调用**：单参数方法可以使用中缀语法
- **apply/unapply**：让对象可以像函数一样调用，支持模式匹配
- **操作符重载**：操作符就是方法，可以重载
- **元组**：简洁的语法创建和访问元组
- **下划线**：多种用法，包括占位符、部分应用等
- **字符串插值**：s/f/raw插值器让字符串处理更简洁
