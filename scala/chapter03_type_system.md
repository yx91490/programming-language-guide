# 第3章：类型系统深入

## 章节概述

Scala的类型系统是统一且强大的，与Java的基本类型和包装类型分离不同。本章深入介绍Scala的类型系统，包括统一类型系统、类型别名、类型边界等特性。

## Scala类型系统

### 统一类型系统

Scala没有基本类型和包装类型的区别，所有类型都是对象：

```scala
// 所有类型都是对象
val x: Int = 42
val y: Double = 3.14
val z: Boolean = true

// 可以直接调用方法
val str = 42.toString
val max = 10.max(20)
```

### 类型层次结构

Scala的类型层次结构：

```
Any
├── AnyVal (值类型)
│   ├── Byte, Short, Int, Long
│   ├── Float, Double
│   ├── Char
│   └── Boolean
│   └── Unit (对应Java的void)
└── AnyRef (引用类型，对应Java的Object)
    └── String, List, Array等
    └── Null (唯一实例是null)
└── Nothing (所有类型的子类型，无实例)
```

### 类型别名

Scala支持类型别名，提高代码可读性：

```scala
// 类型别名
type UserId = Int
type UserName = String
type UserMap = Map[UserId, UserName]

// 使用
val userId: UserId = 123
val userName: UserName = "John"
val users: UserMap = Map(userId -> userName)
```

### 类型边界

Scala支持上界、下界和视图边界：

```scala
// 上界（Upper Bound）
class Container[T <: Comparable[T]] {
  def compare(a: T, b: T): Int = a.compareTo(b)
}

// 下界（Lower Bound）
class Queue[T] {
  def enqueue[U >: T](x: U): Queue[U] = new Queue[U]
}

// 上下文边界（Context Bound）
def sort[T : Ordering](list: List[T]): List[T] = 
  list.sorted
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 基本类型 | 8种基本类型 | 统一类型系统，无基本类型 |
| 类型转换 | 显式转换 `(Type)value` | 方法调用 `value.toType` |
| 类型别名 | 不支持 | `type Alias = Type` |
| 类型边界 | 通配符 `? extends/super` | 上界 `<:`, 下界 `>:`, 视图边界 `<%` |
| 类型推断 | 有限支持 | 全面支持 |
| 空值处理 | `null` | `Option[T]` 或 `null` |
| 无返回值 | `void` | `Unit` |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object TypeSystemScala {
  def main(args: Array[String]): Unit = {
    // 统一类型系统
    val x: Int = 42
    val y: Double = 3.14
    val z: Boolean = true
    
    // 所有类型都是对象，可以直接调用方法
    val str = x.toString
    val max = 10.max(20)
    val abs = (-5).abs
    
    // 类型别名（语法糖）
    type UserId = Int
    type UserName = String
    type UserMap = Map[UserId, UserName]
    
    val userId: UserId = 123
    val userName: UserName = "John"
    val users: UserMap = Map(userId -> userName)
    
    // 类型转换
    val longValue: Long = x.toLong
    val doubleValue: Double = x.toDouble
    val stringValue: String = x.toString
    
    // 类型检查（模式匹配）
    val obj: Any = "Hello"
    obj match {
      case str: String => println(str)
      case _ => println("Not a string")
    }
    
    // Option类型（避免null）
    val maybeValue: Option[Int] = Some(42)
    val noneValue: Option[Int] = None
    
    maybeValue match {
      case Some(value) => println(s"Value: $value")
      case None => println("No value")
    }
    
    // 类型边界示例
    def findMax[T : Ordering](list: List[T]): Option[T] = 
      if (list.isEmpty) None else Some(list.max)
    
    val numbers = List(3, 1, 4, 1, 5)
    println(findMax(numbers))  // Some(5)
  }
}
```

@tab Java
```java
public class TypeSystemJava {
    public static void main(String[] args) {
        // 基本类型和包装类型
        int primitive = 42;
        Integer boxed = Integer.valueOf(42);
        
        // 自动装箱拆箱
        Integer autoBoxed = 42;
        int autoUnboxed = autoBoxed;
        
        // 类型转换
        long longValue = (long) primitive;
        double doubleValue = (double) primitive;
        String stringValue = String.valueOf(primitive);
        
        // 类型检查
        Object obj = "Hello";
        if (obj instanceof String) {
            String str = (String) obj;
            System.out.println(str);
        }
        
        // 泛型类型擦除
        List<String> list = new ArrayList<>();
        // 运行时类型信息丢失
    }
}
```

:::

## 特殊类型详解

### 1. Unit类型

```scala
// Unit对应Java的void
def printMessage(msg: String): Unit = {
  println(msg)
  // 隐式返回()
}

// Unit的唯一值是()
val unitValue: Unit = ()
```

**对应Java：**
```java
void printMessage(String msg) {
    System.out.println(msg);
    // 无返回值
}
```

### 2. Nothing类型

```scala
// Nothing是所有类型的子类型，无实例
def error(message: String): Nothing = {
  throw new RuntimeException(message)
}

// 用于表示永远不会正常返回的函数
def infiniteLoop(): Nothing = {
  while (true) {
    // 无限循环
  }
}
```

### 3. Null类型

```scala
// Null是AnyRef的子类型，唯一值是null
val nullValue: Null = null

// String | Null 类型
val maybeString: String | Null = null
```

### 4. Option类型

```scala
// Option[T]用于表示可能为null的值
val someValue: Option[Int] = Some(42)
val noneValue: Option[Int] = None

// 使用方式
someValue match {
  case Some(x) => println(s"Value: $x")
  case None => println("No value")
}

// 或者使用getOrElse
val value = someValue.getOrElse(0)
```

## 类型转换

### Scala类型转换方法

```scala
// 数值类型转换
val x: Int = 42
val y: Long = x.toLong
val z: Double = x.toDouble
val b: Byte = x.toByte

// 字符串转换
val str: String = x.toString
val num: Int = "42".toInt
val double: Double = "3.14".toDouble

// 集合类型转换
val list: List[Int] = Array(1, 2, 3).toList
val array: Array[Int] = List(1, 2, 3).toArray
```

**对应Java：**
```java
int x = 42;
long y = (long) x;
double z = (double) x;
String str = String.valueOf(x);
int num = Integer.parseInt("42");
```

## 类型边界详解

### 上界（Upper Bound）

```scala
// T必须是Comparable的子类型
class SortedList[T <: Comparable[T]] {
  def sort(list: List[T]): List[T] = list.sorted
}
```

### 下界（Lower Bound）

```scala
// U必须是T的超类型
class Queue[T] {
  def enqueue[U >: T](x: U): Queue[U] = new Queue[U]
}
```

### 上下文边界（Context Bound）

```scala
// 需要隐式的Ordering[T]实例
def max[T : Ordering](a: T, b: T): T = {
  val ord = implicitly[Ordering[T]]
  if (ord.compare(a, b) > 0) a else b
}
```

## 总结

- **统一类型系统**：Scala没有基本类型和包装类型的区别，所有类型都是对象
- **类型别名**：使用 `type` 关键字创建类型别名，提高代码可读性
- **类型边界**：支持上界、下界和上下文边界，提供更灵活的类型约束
- **Option类型**：推荐使用 `Option[T]` 而不是 `null`，更安全
- **类型转换**：通过方法调用（如 `toInt`, `toDouble`）而不是强制转换
