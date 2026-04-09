# 第4章：类与对象

## 章节概述

本章介绍Scala中的类和对象定义，包括主构造函数、伴生对象等特性。Scala的类系统与Java类似，但提供了更简洁的语法和更强大的功能。

## Scala类与对象

### 类定义

```scala
// 主构造函数在类定义中
class Person(val name: String, val age: Int) {
  // 实例方法
  def greet(): Unit = {
    println(s"Hello, I'm $name")
  }
}
```

**语法糖：**
- 主构造函数参数直接写在类名后
- `val` 参数自动生成getter方法
- `var` 参数自动生成getter和setter方法

### 伴生对象（替代静态）

```scala
// 类定义
class Person(val name: String, val age: Int) {
  def greet(): Unit = println(s"Hello, I'm $name")
}

// 伴生对象（与类同名，替代静态方法）
object Person {
  def create(name: String, age: Int): Person = {
    new Person(name, age)
  }
  
  def apply(name: String, age: Int): Person = {
    new Person(name, age)
  }
}
```

**使用：**
```scala
val person = new Person("John", 25)
person.greet()
Person.create("Jane", 30)
Person("Bob", 35)  // 使用apply方法（语法糖）
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 类定义 | `public class Name { }` | `class Name { }` |
| 构造函数 | 单独定义 | 主构造函数在类定义中 |
| 字段访问 | Getter/Setter方法 | `val`/`var`自动生成 |
| 静态成员 | `static` 关键字 | `object` 伴生对象 |
| 工厂方法 | 静态方法 | `object` 中的方法 |
| 单例 | 需要手动实现 | `object` 天然单例 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
// 类定义（主构造函数）
class PersonScala(val name: String, var age: Int) {
  // val自动生成getter，var自动生成getter和setter
  
  // 实例方法
  def greet(): Unit = {
    println(s"Hello, I'm $name")
  }
  
  // 辅助构造函数
  def this(name: String) = {
    this(name, 0)
  }
  
  // toString方法
  override def toString: String = s"PersonScala(name=$name, age=$age)"
}

// 伴生对象（替代静态）
object PersonScala {
  // 工厂方法
  def create(name: String, age: Int): PersonScala = {
    new PersonScala(name, age)
  }
  
  // apply方法（语法糖：可以直接调用对象）
  def apply(name: String, age: Int): PersonScala = {
    new PersonScala(name, age)
  }
  
  def main(args: Array[String]): Unit = {
    // 使用new创建
    val person1 = new PersonScala("John", 25)
    person1.greet()
    
    // 使用工厂方法
    val person2 = PersonScala.create("Jane", 30)
    println(person2)
    
    // 使用apply方法（语法糖）
    val person3 = PersonScala("Bob", 35)
    println(person3)
    
    // 访问字段
    println(s"Name: ${person1.name}, Age: ${person1.age}")
    
    // 修改var字段
    person1.age = 26
    println(s"New age: ${person1.age}")
  }
}
```

@tab Java
```java
public class PersonJava {
    private String name;
    private int age;
    
    // 构造函数
    public PersonJava(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter方法
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter方法
    public void setName(String name) {
        this.name = name;
    }
    
    // 实例方法
    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
    
    // 静态工厂方法
    public static PersonJava create(String name, int age) {
        return new PersonJava(name, age);
    }
    
    // toString方法
    @Override
    public String toString() {
        return "PersonJava{name='" + name + "', age=" + age + "}";
    }
    
    public static void main(String[] args) {
        PersonJava person = new PersonJava("John", 25);
        person.greet();
        
        PersonJava person2 = PersonJava.create("Jane", 30);
        System.out.println(person2);
    }
}
```

:::

## 主构造函数详解

### 主构造函数参数

```scala
// val参数：只读，自动生成getter
class Person1(val name: String)

// var参数：可读写，自动生成getter和setter
class Person2(var age: Int)

// 普通参数：私有，不生成访问器
class Person3(name: String) {
  def getName: String = name
}

// 混合使用
class Person4(val name: String, var age: Int, private val id: Int)
```

### 主构造函数体

```scala
class Person(val name: String, val age: Int) {
  // 类体就是主构造函数体
  println(s"Creating person: $name, $age")
  
  // 可以包含字段和方法
  private val id = generateId()
  
  def generateId(): Int = {
    // 生成ID的逻辑
    System.currentTimeMillis().toInt
  }
}
```

## 伴生对象详解

### 单例对象

```scala
// 单例对象（不需要类）
object MathUtils {
  def add(x: Int, y: Int): Int = x + y
  def multiply(x: Int, y: Int): Int = x * y
}

// 使用
val sum = MathUtils.add(1, 2)
```

### 伴生对象与类

```scala
// 类
class Account private(val id: Int, var balance: Double) {
  def deposit(amount: Double): Unit = {
    balance += amount
  }
}

// 伴生对象（可以访问类的私有成员）
object Account {
  private var nextId = 1
  
  def apply(initialBalance: Double): Account = {
    val account = new Account(nextId, initialBalance)
    nextId += 1
    account
  }
}

// 使用
val account = Account(1000.0)  // 使用apply方法
```

## 嵌套类

```scala
class Outer {
  private val value = 10
  
  class Inner {
    def display(): Unit = {
      println(s"Value: $value")
    }
  }
}

// 使用
val outer = new Outer
val inner = new outer.Inner
inner.display()
```

## 对象相等性

```scala
class Person(val name: String, val age: Int) {
  override def equals(obj: Any): Boolean = {
    obj match {
      case p: Person => name == p.name && age == p.age
      case _ => false
    }
  }
  
  override def hashCode(): Int = {
    (name, age).hashCode()
  }
}

// 或者使用case类（自动生成equals和hashCode）
case class PersonCase(name: String, age: Int)
```

## 总结

- **主构造函数**：Scala的主构造函数在类定义中，更简洁
- **字段访问**：`val`/`var` 参数自动生成访问器方法
- **伴生对象**：使用 `object` 替代Java的 `static`，更灵活
- **apply方法**：允许直接调用对象创建实例（语法糖）
- **单例对象**：`object` 天然单例，无需手动实现
