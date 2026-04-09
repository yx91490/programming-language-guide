# 第10章：数据类与记录

## 章节概述

Scala的case类与Java 14+的Record类类似，都用于表示不可变数据。本章对比case类和Record类，介绍它们的特性和使用场景。

## Scala Case类

### Case类定义

```scala
// Case类（不可变数据类）
case class Person(name: String, age: Int) {
  // 可以添加方法
  def greet: String = s"Hello, I'm $name"
}

// 使用
val person = Person("John", 25)  // 不需要new（语法糖）
println(person.name)  // 访问字段
println(person.age)
```

### Case类特性

```scala
case class Point(x: Int, y: Int)

val p1 = Point(1, 2)
val p2 = Point(1, 2)

// 自动生成的方法
println(p1 == p2)  // true（equals方法）
println(p1)  // Point(1,2)（toString方法）
println(p1.hashCode == p2.hashCode)  // true
```

## 特性对比

| 特性 | Java Record | Scala Case类 |
|------|------------|-------------|
| 不可变性 | 自动不可变 | 自动不可变 |
| 字段访问 | `record.field()` | `case.field` |
| equals/hashCode | 自动生成 | 自动生成 |
| toString | 自动生成 | 自动生成 |
| 构造函数 | 自动生成 | 自动生成 |
| 模式匹配 | 支持 | 支持（更强大） |
| 伴生对象 | 不支持 | 支持 |
| copy方法 | 不支持 | 支持 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
// Case类定义
case class PersonCase(name: String, age: Int) {
  def greet: String = s"Hello, I'm $name"
  
  // 可以添加验证
  require(age >= 0, "Age must be positive")
}

object CaseClassExample {
  def main(args: Array[String]): Unit = {
    // 创建实例（不需要new，语法糖）
    val person = PersonCase("John", 25)
    println(person.name)  // John
    println(person.age)   // 25
    println(person.greet) // Hello, I'm John
    
    // equals和hashCode
    val p1 = PersonCase("John", 25)
    val p2 = PersonCase("John", 25)
    println(p1 == p2)  // true
    println(p1)  // PersonCase(John,25)
    
    // copy方法（语法糖）
    val p3 = p1.copy(age = 26)  // 创建新实例，修改age
    println(p3)  // PersonCase(John,26)
    
    // 模式匹配（语法糖）
    person match {
      case PersonCase("John", age) => println(s"John is $age years old")
      case PersonCase(name, 25) => println(s"$name is 25 years old")
      case PersonCase(name, age) => println(s"$name is $age years old")
    }
    
    // 解构（语法糖）
    val PersonCase(name, age) = person
    println(s"Name: $name, Age: $age")
  }
}
```

@tab Java
```java
public record PersonRecord(String name, int age) {
    public String greet() {
        return "Hello, I'm " + name;
    }
    
    // 紧凑构造函数（验证）
    public PersonRecord {
        if (age < 0) {
            throw new IllegalArgumentException("Age must be positive");
        }
    }
}

public class RecordExample {
    public static void main(String[] args) {
        PersonRecord person = new PersonRecord("John", 25);
        System.out.println(person.name());  // John
        System.out.println(person.age());   // 25
        System.out.println(person.greet()); // Hello, I'm John
        
        // equals和hashCode
        PersonRecord p1 = new PersonRecord("John", 25);
        PersonRecord p2 = new PersonRecord("John", 25);
        System.out.println(p1.equals(p2));  // true
        System.out.println(p1);  // PersonRecord[name=John, age=25]
        
        // 模式匹配（Java 17+）
        Object obj = new PersonRecord("Jane", 30);
        if (obj instanceof PersonRecord(String name, int age)) {
            System.out.println(name + " is " + age + " years old");
        }
    }
}
```

:::

## Case类详解

### 1. 自动生成的方法

```scala
case class Point(x: Int, y: Int)

val p = Point(1, 2)

// 1. apply方法（伴生对象中）
val p2 = Point.apply(1, 2)  // 等价于Point(1, 2)

// 2. unapply方法（用于模式匹配）
val Point(x, y) = p  // 解构

// 3. copy方法
val p3 = p.copy(x = 3)  // Point(3, 2)
val p4 = p.copy(y = 4)  // Point(1, 4)

// 4. equals方法
val p5 = Point(1, 2)
println(p == p5)  // true

// 5. hashCode方法
println(p.hashCode == p5.hashCode)  // true

// 6. toString方法
println(p)  // Point(1,2)
```

### 2. 模式匹配

```scala
case class Person(name: String, age: Int)
case class Student(name: String, age: Int, school: String)

def describe(person: Any): String = person match {
  case Person("John", age) => s"John is $age years old"
  case Person(name, 25) => s"$name is 25 years old"
  case Student(name, age, school) => s"$name is a student at $school"
  case _ => "Unknown person"
}
```

### 3. copy方法

```scala
case class Person(name: String, age: Int, city: String)

val person = Person("John", 25, "New York")

// 修改部分字段
val older = person.copy(age = 26)
val moved = person.copy(city = "Boston")
val both = person.copy(age = 26, city = "Boston")
```

### 4. 嵌套Case类

```scala
case class Address(street: String, city: String)
case class Person(name: String, age: Int, address: Address)

val person = Person("John", 25, Address("123 Main St", "New York"))

// 嵌套模式匹配
person match {
  case Person(name, age, Address(street, city)) =>
    println(s"$name lives at $street, $city")
}
```

## Case对象

```scala
// Case对象（单例）
case object Empty extends List[Nothing]

// 使用
def isEmpty(list: List[Int]): Boolean = list match {
  case Empty => true
  case _ => false
}
```

## 总结

- **Case类**：Scala的case类比Java的Record更强大，支持copy方法和模式匹配
- **不可变性**：两者都自动生成不可变数据类
- **自动生成方法**：都自动生成equals、hashCode、toString等方法
- **模式匹配**：Case类在模式匹配中更强大，支持解构
- **copy方法**：Case类支持copy方法创建修改后的副本
