# 第2章：关键字

## 章节概述

关键字是编程语言的基础构建块。本章对比Java和Scala的关键字，帮助Java程序员快速理解Scala的关键字体系，特别是Scala的特有关键字。

## 关键字示例

::: code-tabs

@tab Scala
```scala
// 变量声明关键字
val immutable = 10      // val: 不可变变量
var mutable = 20        // var: 可变变量

// 方法定义关键字
def method(x: Int): Int = x * 2  // def: 方法定义

// 类和对象关键字
class MyClass { }       // class: 类定义
object MyObject { }     // object: 单例对象
trait MyTrait { }       // trait: 特质（类似接口）

// 模式匹配关键字
case class Person(name: String)  // case: case类
sealed trait Animal              // sealed: 密封类型

// 控制流关键字
lazy val expensive = compute()   // lazy: 延迟初始化
for (i <- 1 to 10) yield i * 2   // yield: 生成器

// 隐式关键字
implicit val x: Int = 42         // implicit: 隐式参数
```

@tab Java
```java
// 访问控制
public class MyClass {
    private int value;
    protected String name;
    
    // 方法修饰符
    public static void main(String[] args) {
        final int x = 10;
        
        // 控制流
        if (x > 5) {
            for (int i = 0; i < 10; i++) {
                if (i == 5) break;
                continue;
            }
        }
        
        // 异常处理
        try {
            throw new Exception();
        } catch (Exception e) {
            // handle
        } finally {
            // cleanup
        }
    }
}
```

:::

## Scala关键字

### 完整关键字列表

Scala有39个关键字，包括：

#### 与Java相同的关键字
- `abstract`, `case`, `catch`, `class`, `def`, `do`, `else`, `extends`, `false`, `final`, `finally`, `for`, `forSome`, `if`, `implicit`, `import`, `lazy`, `match`, `new`, `null`, `object`, `override`, `package`, `private`, `protected`, `return`, `sealed`, `super`, `this`, `throw`, `trait`, `try`, `true`, `type`, `val`, `var`, `while`, `with`, `yield`

#### Scala特有关键字
- `val`, `var`, `def`, `trait`, `object`, `case`, `sealed`, `implicit`, `lazy`, `match`, `yield`, `forSome`, `with`

## 关键字对比表

| 类别 | Java关键字 | Scala对应 | 说明 |
|------|-----------|----------|------|
| **变量声明** | `final` | `val` | 不可变变量 |
| | - | `var` | 可变变量（Java无对应） |
| **方法定义** | - | `def` | 方法/函数定义 |
| **类相关** | `class` | `class` | 类定义 |
| | `interface` | `trait` | 接口/特质 |
| | `static` | `object` | 静态成员（Scala用object） |
| | - | `case` | case类（Java无对应） |
| | - | `sealed` | 密封类（Java 17有） |
| **控制流** | `if`, `else`, `for`, `while` | `if`, `else`, `for`, `while` | 相同 |
| | `switch` | `match` | 模式匹配 |
| | - | `yield` | for推导式生成器 |
| **异常处理** | `try`, `catch`, `finally`, `throw` | `try`, `catch`, `finally`, `throw` | 相同 |
| **访问控制** | `public`, `private`, `protected` | `private`, `protected` | Scala默认public |
| **其他** | `void` | `Unit` | 无返回值 |
| | - | `implicit` | 隐式参数/转换 |
| | - | `lazy` | 延迟初始化 |

## Scala特有关键字详解

### 1. `val` 和 `var`

::: code-tabs

@tab Scala
```scala
// val: 不可变（推荐使用）
val name = "John"
// name = "Jane"  // 编译错误：不能重新赋值

// var: 可变（尽量少用）
var age = 25
age = 26  // 可以重新赋值
```

@tab Java
```java
final String name = "John";  // Java的final对应Scala的val
String name = "John";        // Java的普通变量对应Scala的var
```

:::

### 2. `def` - 方法定义

::: code-tabs

@tab Scala
```scala
// 方法定义
def add(x: Int, y: Int): Int = x + y

// 无参数方法
def greet(): String = "Hello"

// 无返回值
def printMessage(msg: String): Unit = println(msg)
```

@tab Java
```java
int add(int x, int y) { return x + y; }
String greet() { return "Hello"; }
void printMessage(String msg) { System.out.println(msg); }
```

:::

### 3. `object` - 单例对象

::: code-tabs

@tab Scala
```scala
// 单例对象（替代Java的static）
object MathUtils {
  def add(x: Int, y: Int): Int = x + y
}

// 使用
val result = MathUtils.add(1, 2)
```

@tab Java
```java
class MathUtils {
    public static int add(int x, int y) {
        return x + y;
    }
}
```

:::

### 4. `trait` - 特质

::: code-tabs

@tab Scala
```scala
// 特质（类似Java接口，但更强大）
trait Flyable {
  def fly(): Unit
}

class Bird extends Flyable {
  def fly(): Unit = println("Flying")
}
```

@tab Java
```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    public void fly() {
        System.out.println("Flying");
    }
}
```

:::

### 5. `case` - Case类

::: code-tabs

@tab Scala
```scala
// case类（自动生成equals, hashCode, toString等）
case class Person(name: String, age: Int)

val p1 = Person("John", 25)
val p2 = Person("John", 25)
println(p1 == p2)  // true（自动实现equals）
```

@tab Java
```java
// Java 14+ Record类
record Person(String name, int age) { }

Person p1 = new Person("John", 25);
Person p2 = new Person("John", 25);
System.out.println(p1.equals(p2));  // true
```

:::

### 6. `sealed` - 密封类型

::: code-tabs

@tab Scala
```scala
// 密封特质（所有子类必须在同一文件）
sealed trait Animal
case class Dog(name: String) extends Animal
case class Cat(name: String) extends Animal

// 模式匹配时编译器会检查完整性
def describe(a: Animal): String = a match {
  case Dog(n) => s"Dog: $n"
  case Cat(n) => s"Cat: $n"
  // 如果遗漏某个case，编译器会警告
}
```

@tab Java
```java
// Java 17 Sealed Classes
sealed interface Animal permits Dog, Cat { }
final class Dog implements Animal { }
final class Cat implements Animal { }
```

:::

### 7. `implicit` - 隐式

::: code-tabs

@tab Scala
```scala
// 隐式参数
def greet(name: String)(implicit greeting: String): String = 
  s"$greeting, $name!"

implicit val defaultGreeting = "Hello"
greet("John")  // "Hello, John!"

// 隐式转换
implicit def intToString(x: Int): String = x.toString
val str: String = 42  // 自动转换
```

@tab Java
```java
// Java无直接对应，需要通过方法重载或设计模式实现
```

:::

### 8. `lazy` - 延迟初始化

::: code-tabs

@tab Scala
```scala
// 延迟初始化（首次访问时才计算）
lazy val expensive = {
  println("Computing...")
  computeExpensiveValue()
}

// 第一次访问时才执行
val result = expensive  // 此时才打印"Computing..."
```

@tab Java
```java
// Java需要手动实现延迟初始化
private String expensive;
public String getExpensive() {
    if (expensive == null) {
        expensive = computeExpensiveValue();
    }
    return expensive;
}
```

:::

### 9. `match` - 模式匹配

::: code-tabs

@tab Scala
```scala
// 模式匹配（比Java的switch更强大）
val x = 5
val result = x match {
  case 1 => "One"
  case 2 => "Two"
  case _ => "Other"
}
```

@tab Java
```java
// Java 14+ switch表达式
int x = 5;
String result = switch (x) {
    case 1 -> "One";
    case 2 -> "Two";
    default -> "Other";
};
```

:::

### 10. `yield` - 生成器

::: code-tabs

@tab Scala
```scala
// for推导式生成器
val squares = for (i <- 1 to 10) yield i * i
// 结果: Vector(1, 4, 9, 16, 25, 36, 49, 64, 81, 100)
```

@tab Java
```java
// Java Stream API
List<Integer> squares = IntStream.rangeClosed(1, 10)
    .map(i -> i * i)
    .boxed()
    .collect(Collectors.toList());
```

:::

## 完整代码示例对比

::: code-tabs

@tab Scala
```scala
object KeywordsScala {
  // 变量声明
  private var value: Int = 0
  protected val name: String = "Scala"
  val MAX: Int = 100  // 默认public
  
  def main(args: Array[String]): Unit = {
    // 控制流
    if (args.length > 0) {
      for (i <- args.indices) {
        val result = i match {
          case 0 => s"First: ${args(i)}"
          case _ => s"Other: ${args(i)}"
        }
        println(result)
      }
    }
    
    // 异常处理
    try {
      throw new Exception("Test")
    } catch {
      case e: Exception => println(s"Caught: ${e.getMessage}")
    } finally {
      println("Finally block")
    }
    
    // Scala特有关键字示例
    val numbers = for (i <- 1 to 5) yield i * 2
    println(s"Numbers: $numbers")
    
    lazy val expensive = {
      println("Computing expensive value...")
      42
    }
    println("Before access")
    println(s"Value: $expensive")  // 此时才计算
  }
}
```

@tab Java
```java
public class KeywordsJava {
    // 访问控制
    private int value;
    protected String name;
    public static final int MAX = 100;
    
    // 类和方法
    public static void main(String[] args) {
        // 控制流
        if (args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                switch (i) {
                    case 0:
                        System.out.println("First: " + args[i]);
                        break;
                    default:
                        System.out.println("Other: " + args[i]);
                }
            }
        }
        
        // 异常处理
        try {
            throw new Exception("Test");
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally block");
        }
    }
}
```

:::

## 关键字分类总结

1. **变量**：`val`, `var`
2. **方法/函数**：`def`
3. **类相关**：`class`, `object`, `trait`, `case`, `sealed`, `extends`, `with`
4. **控制流**：`if`, `else`, `for`, `while`, `do`, `match`, `yield`
5. **异常**：`try`, `catch`, `finally`, `throw`
6. **高级特性**：`implicit`, `lazy`, `override`

## 总结

- **Java关键字**：50个，包括基本类型关键字
- **Scala关键字**：39个，更简洁，无基本类型关键字（统一类型系统）
- **Scala特有关键字**：`val`, `var`, `def`, `object`, `trait`, `case`, `sealed`, `implicit`, `lazy`, `match`, `yield`
- **对应关系**：大部分关键字有对应关系，但Scala的关键字更简洁和强大
