# 第7章：函数式编程

## 章节概述

Scala是函数式编程语言，函数是一等公民。本章介绍Scala的函数式编程特性，包括高阶函数、闭包、柯里化等，并与Java的Lambda表达式进行对比。

## Scala函数式编程

### 函数作为一等公民

```scala
// 函数定义
def add(x: Int, y: Int): Int = x + y

// 函数作为值
val addFunction: (Int, Int) => Int = (x, y) => x + y
val result = addFunction(5, 3)  // 8

// 方法转函数
val addMethod = add _  // 方法转函数
```

### 高阶函数

```scala
// 函数作为参数
def applyOperation(x: Int, y: Int, op: (Int, Int) => Int): Int = {
  op(x, y)
}

val sum = applyOperation(5, 3, (a, b) => a + b)
val product = applyOperation(5, 3, (a, b) => a * b)

// 函数作为返回值
def multiplyBy(factor: Int): Int => Int = {
  (x: Int) => x * factor
}

val double = multiplyBy(2)
val result = double(5)  // 10
```

### 闭包

```scala
// 闭包：函数可以访问外部变量
def makeCounter(): () => Int = {
  var count = 0
  () => {
    count += 1
    count
  }
}

val counter = makeCounter()
println(counter())  // 1
println(counter())  // 2
println(counter())  // 3
```

### 柯里化

```scala
// 普通函数
def add(x: Int, y: Int): Int = x + y

// 柯里化函数
def addCurried(x: Int)(y: Int): Int = x + y

// 使用
val add5 = addCurried(5)  // 部分应用
val result = add5(3)      // 8

// 或者直接调用
val result2 = addCurried(5)(3)  // 8
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| Lambda表达式 | Java 8+ | 原生支持 |
| 函数类型 | 函数式接口 | 一等公民 `(A, B) => C` |
| 高阶函数 | 有限支持 | 全面支持 |
| 闭包 | 支持 | 支持 |
| 柯里化 | 需要手动实现 | 原生支持 |
| 部分应用 | 不支持 | 支持 |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
object FunctionalScala {
  def main(args: Array[String]): Unit = {
    // 函数作为值（语法糖）
    val square: Int => Int = x => x * x
    println(square(5))  // 25
    
    // 高阶函数
    def applyOperation(x: Int, y: Int, op: (Int, Int) => Int): Int = {
      op(x, y)
    }
    
    val sum = applyOperation(5, 3, (a, b) => a + b)
    val product = applyOperation(5, 3, _ * _)  // 占位符语法（语法糖）
    println(s"Sum: $sum, Product: $product")
    
    // 闭包
    def makeCounter(): () => Int = {
      var count = 0
      () => {
        count += 1
        count
      }
    }
    
    val counter = makeCounter()
    println(counter())  // 1
    println(counter())  // 2
    println(counter())  // 3
    
    // 柯里化（语法糖）
    def addCurried(x: Int)(y: Int): Int = x + y
    
    val add5 = addCurried(5)  // 部分应用
    println(add5(3))  // 8
    
    // 集合操作（函数式风格）
    val numbers = List(1, 2, 3, 4, 5)
    val doubled = numbers.map(_ * 2).filter(_ > 5)
    println(doubled)  // List(6, 8, 10)
    
    // 函数组合
    val f: Int => Int = _ * 2
    val g: Int => Int = _ + 1
    val h = f andThen g  // 函数组合
    println(h(5))  // 11 (5 * 2 + 1)
  }
}
```

@tab Java
```java
import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

public class FunctionalJava {
    public static void main(String[] args) {
        // Lambda表达式
        Function<Integer, Integer> square = x -> x * x;
        System.out.println(square.apply(5));  // 25
        
        // 方法引用
        List<String> names = Arrays.asList("John", "Jane", "Bob");
        names.forEach(System.out::println);
        
        // Stream API
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> doubled = numbers.stream()
            .map(x -> x * 2)
            .filter(x -> x > 5)
            .collect(Collectors.toList());
        System.out.println(doubled);  // [6, 8, 10]
        
        // 函数式接口
        BinaryOperator<Integer> add = (a, b) -> a + b;
        System.out.println(add.apply(5, 3));  // 8
        
        // 闭包（有限支持）
        Function<Integer, Function<Integer, Integer>> makeAdder = 
            x -> y -> x + y;
        Function<Integer, Integer> add5 = makeAdder.apply(5);
        System.out.println(add5.apply(3));  // 8
    }
}
```

:::

## 高阶函数详解

### 1. 函数作为参数

```scala
// 接受函数作为参数
def processList(list: List[Int], f: Int => Int): List[Int] = {
  list.map(f)
}

val numbers = List(1, 2, 3, 4, 5)
val doubled = processList(numbers, _ * 2)
val squared = processList(numbers, x => x * x)
```

### 2. 函数作为返回值

```scala
// 返回函数
def makeMultiplier(factor: Int): Int => Int = {
  (x: Int) => x * factor
}

val double = makeMultiplier(2)
val triple = makeMultiplier(3)
println(double(5))  // 10
println(triple(5))  // 15
```

### 3. 匿名函数

```scala
// 匿名函数（Lambda）
val add = (x: Int, y: Int) => x + y

// 占位符语法（语法糖）
val add2: (Int, Int) => Int = _ + _
val square: Int => Int = _ * _
```

## 闭包详解

```scala
// 闭包示例
def makeAdder(increment: Int): Int => Int = {
  (x: Int) => x + increment  // 捕获外部变量increment
}

val add5 = makeAdder(5)
val add10 = makeAdder(10)

println(add5(3))   // 8
println(add10(3))  // 13
```

## 柯里化详解

### 1. 手动柯里化

```scala
// 普通函数
def add(x: Int, y: Int): Int = x + y

// 柯里化版本
def addCurried(x: Int)(y: Int): Int = x + y

// 使用
val add5 = addCurried(5)  // 部分应用
val result = add5(3)      // 8
```

### 2. 自动柯里化

```scala
// 使用curried方法
val add = (x: Int, y: Int) => x + y
val addCurried = add.curried

val add5 = addCurried(5)
val result = add5(3)  // 8
```

### 3. 柯里化的优势

```scala
// 柯里化使部分应用更容易
def multiply(x: Int)(y: Int): Int = x * y

// 创建专用函数
val double = multiply(2)
val triple = multiply(3)

List(1, 2, 3).map(double)  // List(2, 4, 6)
List(1, 2, 3).map(triple)  // List(3, 6, 9)
```

## 部分应用函数

```scala
// 部分应用
def add(x: Int, y: Int, z: Int): Int = x + y + z

// 固定部分参数
val add5And3 = add(5, 3, _: Int)
val result = add5And3(2)  // 10

// 或者使用占位符
val add5 = add(5, _: Int, _: Int)
val result2 = add5(3, 2)  // 10
```

## 函数组合

```scala
// 函数组合
val f: Int => Int = _ * 2
val g: Int => Int = _ + 1

// andThen: f andThen g = g(f(x))
val h1 = f andThen g
println(h1(5))  // 11 (5 * 2 + 1)

// compose: f compose g = f(g(x))
val h2 = f compose g
println(h2(5))  // 12 ((5 + 1) * 2)
```

## 总结

- **函数是一等公民**：Scala中函数可以作为值传递和返回
- **高阶函数**：函数可以接受函数作为参数或返回函数
- **闭包**：函数可以访问外部作用域的变量
- **柯里化**：支持多参数函数的柯里化，便于部分应用
- **语法糖**：占位符语法 `_` 使代码更简洁
