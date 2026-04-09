# 第5章：接口、抽象类与特质

## 章节概述

Scala使用特质（Trait）替代Java的接口，但功能更强大。特质支持多重继承、混入组合等特性，是Scala面向对象编程的核心特性之一。

## Scala特质

### 特质定义

```scala
// 特质定义（类似Java接口，但更强大）
trait Flyable {
  // 抽象方法
  def fly(): Unit
  
  // 具体方法（类似Java的default方法）
  def takeOff(): Unit = {
    println("Taking off...")
  }
}

// 实现特质
class Bird extends Flyable {
  def fly(): Unit = {
    println("Bird is flying")
  }
}
```

### 多重继承

```scala
// 特质1
trait Flyable {
  def fly(): Unit = println("Flying")
}

// 特质2
trait Swimmable {
  def swim(): Unit = println("Swimming")
}

// 多重继承（混入）
class Duck extends Flyable with Swimmable {
  // 可以重写方法
  override def fly(): Unit = println("Duck is flying")
}

// 使用
val duck = new Duck
duck.fly()   // Duck is flying
duck.swim()  // Swimming
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 接口/特质 | `interface` | `trait` |
| 抽象方法 | 支持 | 支持 |
| 默认方法 | Java 8+ `default` | 支持（具体方法） |
| 静态方法 | Java 8+ `static` | 不支持（用object） |
| 多重继承 | 不支持（只能实现多个接口） | 支持（混入多个特质） |
| 字段 | 只能常量（Java 9+） | 支持字段 |
| 构造函数 | 不支持 | 不支持 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
// 特质1
trait Drawable {
  def draw(): Unit
  
  def erase(): Unit = {
    println("Erasing...")
  }
}

// 特质2
trait Colorable {
  def setColor(color: String): Unit
  
  def getColor: String = "Default color"
}

// 抽象类
abstract class Shape(val name: String) extends Drawable {
  def area(): Double
  
  def display(): Unit = {
    println(s"Shape: $name")
  }
}

// 具体类（可以混入多个特质）
class Circle(name: String, val radius: Double) 
    extends Shape(name) with Colorable {
  
  private var color: String = _
  
  override def area(): Double = {
    math.Pi * radius * radius
  }
  
  override def draw(): Unit = {
    println(s"Drawing circle with radius $radius")
  }
  
  override def setColor(c: String): Unit = {
    color = c
  }
  
  override def getColor: String = {
    if (color != null) color else "Default color"
  }
}

object TraitExample {
  def main(args: Array[String]): Unit = {
    val circle = new Circle("MyCircle", 5.0)
    circle.display()
    circle.draw()
    circle.setColor("Red")
    println(s"Color: ${circle.getColor}")
    println(s"Area: ${circle.area()}")
  }
}
```

@tab Java
```java
// 接口
public interface Drawable {
    void draw();
    default void erase() {
        System.out.println("Erasing...");
    }
}

public interface Colorable {
    void setColor(String color);
    default String getColor() {
        return "Default color";
    }
}

// 抽象类
public abstract class Shape implements Drawable {
    protected String name;
    
    public Shape(String name) {
        this.name = name;
    }
    
    public abstract double area();
    
    public void display() {
        System.out.println("Shape: " + name);
    }
}

// 具体类（只能单继承，但可以实现多个接口）
public class Circle extends Shape implements Colorable {
    private double radius;
    private String color;
    
    public Circle(String name, double radius) {
        super(name);
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
    }
    
    @Override
    public String getColor() {
        return color != null ? color : "Default color";
    }
    
    public static void main(String[] args) {
        Circle circle = new Circle("MyCircle", 5.0);
        circle.display();
        circle.draw();
        circle.setColor("Red");
        System.out.println("Color: " + circle.getColor());
        System.out.println("Area: " + circle.area());
    }
}
```

:::

## 特质详解

### 1. 特质中的字段

```scala
trait HasName {
  val name: String  // 抽象字段
  var age: Int = 0   // 具体字段（带默认值）
}

class Person(val name: String) extends HasName {
  // name已经在主构造函数中定义
  // age使用默认值0
}
```

### 2. 特质线性化（MRO）

```scala
trait A {
  def method(): String = "A"
}

trait B extends A {
  override def method(): String = "B -> " + super.method()
}

trait C extends A {
  override def method(): String = "C -> " + super.method()
}

class D extends B with C {
  override def method(): String = "D -> " + super.method()
}

// 线性化顺序：D -> C -> B -> A
val d = new D
println(d.method())  // D -> C -> B -> A
```

### 3. 特质作为混入

```scala
// 特质定义
trait Logging {
  def log(message: String): Unit = {
    println(s"[LOG] $message")
  }
}

trait Timestamp {
  def timestamp: Long = System.currentTimeMillis()
}

// 类可以混入多个特质
class Service extends Logging with Timestamp {
  def doWork(): Unit = {
    log(s"Work done at $timestamp")
  }
}
```

### 4. 特质与抽象类的选择

```scala
// 使用特质的情况：
// - 需要多重继承
// - 作为混入使用
// - 提供可选的接口

// 使用抽象类的情况：
// - 需要构造函数参数
// - 需要Java互操作（特质编译为接口）
// - 需要被Java类继承
```

## 自类型（Self Type）

```scala
// 自类型：要求混入该特质的类必须同时混入另一个特质
trait User {
  def name: String
}

trait Logger {
  self: User =>  // 自类型：要求混入Logger的类必须混入User
  
  def log(message: String): Unit = {
    println(s"[$name] $message")
  }
}

// 必须同时混入User和Logger
class Service(val name: String) extends User with Logger {
  def doWork(): Unit = {
    log("Doing work")
  }
}
```

## 总结

- **特质（Trait）**：Scala的特质比Java接口更强大，支持多重继承
- **多重继承**：使用 `with` 关键字混入多个特质
- **线性化**：Scala使用线性化解决多重继承的冲突
- **混入模式**：特质可以作为混入使用，提供可选功能
- **抽象类**：当需要构造函数参数或Java互操作时使用抽象类
