# 第14章：密封类与枚举

## 章节概述

密封类（Sealed Classes）和枚举用于限制类型的子类，确保模式匹配的完整性。本章对比Java 17的Sealed Classes和Scala的Sealed Traits/Classes。

## Scala密封类与枚举

### Sealed Traits/Classes

```scala
// 密封特质
sealed trait Animal {
  def makeSound(): Unit
}

// 子类必须在同一文件
case class Dog(name: String) extends Animal {
  def makeSound(): Unit = println("Woof")
}

case class Cat(name: String) extends Animal {
  def makeSound(): Unit = println("Meow")
}
```

### 枚举

```scala
// 使用object和case object
object Day extends Enumeration {
  val MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY = Value
}

val day = Day.MONDAY

// 或者使用sealed trait（推荐）
sealed trait Day
case object Monday extends Day
case object Tuesday extends Day
case object Wednesday extends Day
// ...
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 密封类 | Sealed Classes（Java 17） | Sealed Traits/Classes |
| 子类限制 | permits关键字 | 同一文件 |
| 模式匹配 | 支持 | 支持（更强大） |
| 枚举 | enum关键字 | object或sealed trait |
| 完整性检查 | 编译器检查 | 编译器检查 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
// 密封特质
sealed trait Shape {
  def area: Double
}

// 子类（必须在同一文件）
case class Circle(radius: Double) extends Shape {
  def area: Double = math.Pi * radius * radius
}

case class Rectangle(width: Double, height: Double) extends Shape {
  def area: Double = width * height
}

// 模式匹配（编译器检查完整性）
object SealedExample {
  def calculateArea(shape: Shape): Double = shape match {
    case Circle(r) => math.Pi * r * r
    case Rectangle(w, h) => w * h
    // 如果遗漏某个case，编译器会警告
  }
  
  // 枚举方式1：使用Enumeration
  object Status extends Enumeration {
    val PENDING, PROCESSING, COMPLETED, FAILED = Value
  }
  
  // 枚举方式2：使用sealed trait（推荐）
  sealed trait Status
  case object Pending extends Status
  case object Processing extends Status
  case object Completed extends Status
  case object Failed extends Status
}

object SealedScala {
  def main(args: Array[String]): Unit = {
    // 使用密封类
    val circle = Circle(5.0)
    val rectangle = Rectangle(3.0, 4.0)
    
    println(s"Circle area: ${circle.area}")
    println(s"Rectangle area: ${rectangle.area}")
    
    // 模式匹配
    def describe(shape: Shape): String = shape match {
      case Circle(r) => s"Circle with radius $r"
      case Rectangle(w, h) => s"Rectangle ${w}x$h"
    }
    
    println(describe(circle))
    println(describe(rectangle))
    
    // 枚举使用
    val status1 = SealedExample.Status.PENDING
    val status2 = SealedExample.Pending
    
    def processStatus(status: SealedExample.Status): String = status match {
      case SealedExample.Pending => "Waiting"
      case SealedExample.Processing => "In progress"
      case SealedExample.Completed => "Done"
      case SealedExample.Failed => "Error"
    }
    
    println(processStatus(status2))
  }
}
```

@tab Java
```java
// 密封接口
public sealed interface Shape permits Circle, Rectangle {
    double area();
}

// 允许的子类
public final class Circle implements Shape {
    private final double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public final class Rectangle implements Shape {
    private final double width;
    private final double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
}

// 模式匹配（Java 17+）
public class SealedExample {
    public static double calculateArea(Shape shape) {
        return switch (shape) {
            case Circle c -> Math.PI * c.radius * c.radius;
            case Rectangle r -> r.width * r.height;
            // 编译器会检查是否覆盖所有情况
        };
    }
    
    // 枚举
    public enum Status {
        PENDING, PROCESSING, COMPLETED, FAILED
    }
}
```

:::

## 密封类详解

### 1. 密封特质

```scala
sealed trait Animal {
  def name: String
}

case class Dog(name: String, breed: String) extends Animal
case class Cat(name: String, color: String) extends Animal
```

### 2. 模式匹配完整性

```scala
def describe(animal: Animal): String = animal match {
  case Dog(name, breed) => s"Dog $name of breed $breed"
  case Cat(name, color) => s"Cat $name with color $color"
  // 编译器知道所有可能的情况，如果遗漏会警告
}
```

### 3. ADT（代数数据类型）

```scala
// 使用密封类实现ADT
sealed trait List[+A]
case object Nil extends List[Nothing]
case class Cons[+A](head: A, tail: List[A]) extends List[A]

// 使用
val list = Cons(1, Cons(2, Cons(3, Nil)))
```

## 枚举详解

### 1. 使用Enumeration

```scala
object Color extends Enumeration {
  val Red, Green, Blue = Value
}

val color = Color.Red
```

### 2. 使用Sealed Trait（推荐）

```scala
sealed trait Color
case object Red extends Color
case object Green extends Color
case object Blue extends Color

val color: Color = Red
```

### 3. 带值的枚举

```scala
sealed abstract class Planet(val mass: Double, val radius: Double) {
  def surfaceGravity: Double = {
    val G = 6.67300E-11
    G * mass / (radius * radius)
  }
}

case object Earth extends Planet(5.976e24, 6.37814e6)
case object Mars extends Planet(6.421e23, 3.3972e6)
```

## 总结

- **密封类**：限制子类，确保模式匹配完整性
- **模式匹配**：编译器会检查是否覆盖所有情况
- **ADT**：使用密封类可以实现代数数据类型
- **枚举**：推荐使用sealed trait而不是Enumeration
- **完整性检查**：编译器会检查模式匹配的完整性
