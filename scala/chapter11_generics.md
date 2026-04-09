# 第11章：泛型系统

## 章节概述

Scala的泛型系统比Java更强大，支持协变、逆变、类型约束等特性。本章详细介绍Scala的泛型系统，并与Java的泛型进行对比。

## Scala泛型

### 泛型定义

```scala
// 泛型类
class Box[T](var value: T) {
  def getValue: T = value
  def setValue(newValue: T): Unit = {
    value = newValue
  }
}

// 使用
val stringBox = new Box[String]("Hello")
println(stringBox.getValue)
```

### 协变和逆变

```scala
// 协变（+）：子类型关系保持
class Box[+T](val value: T)

val intBox: Box[Int] = new Box(42)
val numberBox: Box[Number] = intBox  // 协变允许

// 逆变（-）：子类型关系反转
class Consumer[-T] {
  def consume(value: T): Unit = println(value)
}

val numberConsumer: Consumer[Number] = new Consumer[Number]
val intConsumer: Consumer[Int] = numberConsumer  // 逆变允许
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 泛型语法 | `<T>` | `[T]` |
| 协变 | 通配符 `? extends` | `+T` |
| 逆变 | 通配符 `? super` | `-T` |
| 类型擦除 | 是 | 是（但保留更多信息） |
| 类型约束 | 有限 | 上界、下界、视图边界、上下文边界 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
// 泛型类
class Box[T](var value: T) {
  def getValue: T = value
  def setValue(newValue: T): Unit = {
    value = newValue
  }
}

// 协变（+）
class CovariantBox[+T](val value: T)

// 逆变（-）
class ContravariantBox[-T] {
  def process(value: T): Unit = println(value)
}

// 类型约束
class ConstrainedBox[T <: Number](val value: T)  // 上界

// 泛型方法
object Utils {
  def getFirst[T](list: List[T]): Option[T] = {
    list.headOption
  }
  
  def max[T : Ordering](a: T, b: T): T = {
    val ord = implicitly[Ordering[T]]
    if (ord.compare(a, b) > 0) a else b
  }
}

object GenericsScala {
  def main(args: Array[String]): Unit = {
    // 泛型类使用
    val stringBox = new Box[String]("Hello")
    println(stringBox.getValue)
    
    // 协变
    val intBox: CovariantBox[Int] = new CovariantBox(42)
    val numberBox: CovariantBox[Number] = intBox  // 协变允许
    
    // 逆变
    val numberConsumer: ContravariantBox[Number] = new ContravariantBox[Number]
    val intConsumer: ContravariantBox[Int] = numberConsumer  // 逆变允许
    
    // 类型约束
    val intBox2 = new ConstrainedBox(new java.lang.Integer(42))
    
    // 泛型方法
    val list = List(1, 2, 3)
    val first = Utils.getFirst(list)
    println(first)  // Some(1)
    
    val maxValue = Utils.max(5, 3)
    println(maxValue)  // 5
  }
}
```

@tab Java
```java
import java.util.*;

// 泛型类
public class Box<T> {
    private T value;
    
    public Box(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    public void setValue(T value) {
        this.value = value;
    }
}

// 泛型方法
class Utils {
    public static <T> T getFirst(List<T> list) {
        return list.isEmpty() ? null : list.get(0);
    }
    
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
}

public class GenericsJava {
    public static void main(String[] args) {
        // 泛型类使用
        Box<String> stringBox = new Box<>("Hello");
        System.out.println(stringBox.getValue());
        
        // 通配符
        List<? extends Number> numbers = Arrays.asList(1, 2, 3);
        // numbers.add(1);  // 编译错误
        
        List<? super Integer> list = new ArrayList<Number>();
        list.add(1);  // 可以添加
    }
}
```

:::

## 协变和逆变详解

### 1. 协变（+）

```scala
// 协变：如果A是B的子类型，则Box[A]是Box[B]的子类型
class Box[+T](val value: T)

val intBox: Box[Int] = new Box(42)
val numberBox: Box[Number] = intBox  // 允许，因为Int <: Number

// 协变限制：不能有接受T作为参数的方法
// class Box[+T] {
//   def setValue(value: T): Unit = ...  // 编译错误
// }
```

### 2. 逆变（-）

```scala
// 逆变：如果A是B的子类型，则Box[B]是Box[A]的子类型
class Consumer[-T] {
  def consume(value: T): Unit = println(value)
}

val numberConsumer: Consumer[Number] = new Consumer[Number]
val intConsumer: Consumer[Int] = numberConsumer  // 允许

// 逆变限制：不能有返回T的方法
// class Consumer[-T] {
//   def getValue: T = ...  // 编译错误
// }
```

### 3. 不变

```scala
// 不变：Box[Int]和Box[Number]没有关系
class Box[T](var value: T)

val intBox: Box[Int] = new Box(42)
// val numberBox: Box[Number] = intBox  // 编译错误
```

## 类型约束

### 1. 上界（Upper Bound）

```scala
// T必须是Comparable的子类型
class SortedList[T <: Comparable[T]] {
  def sort(list: List[T]): List[T] = list.sorted
}
```

### 2. 下界（Lower Bound）

```scala
// U必须是T的超类型
class Queue[T] {
  def enqueue[U >: T](x: U): Queue[U] = new Queue[U]
}
```

### 3. 视图边界（View Bound，已废弃）

```scala
// 视图边界：T可以隐式转换为Ordered[T]
// def max[T <% Ordered[T]](a: T, b: T): T = ...
// 已废弃，使用上下文边界替代
```

### 4. 上下文边界（Context Bound）

```scala
// 需要隐式的Ordering[T]实例
def max[T : Ordering](a: T, b: T): T = {
  val ord = implicitly[Ordering[T]]
  if (ord.compare(a, b) > 0) a else b
}
```

## 总结

- **泛型语法**：Scala使用方括号`[T]`，Java使用尖括号`<T>`
- **协变**：使用`+T`表示协变，比Java的通配符更简洁
- **逆变**：使用`-T`表示逆变，比Java的通配符更直观
- **类型约束**：支持上界、下界、上下文边界等多种约束
- **类型擦除**：与Java一样有类型擦除，但保留更多信息
