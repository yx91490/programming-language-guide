# 第13章：多线程与并发编程

## 章节概述

Scala提供了多种并发编程方式，包括Future/Promise、Actor模型等。本章对比Java和Scala的并发编程特性。

## Scala并发编程

### Future和Promise

```scala
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

// Future
val future: Future[String] = Future {
  Thread.sleep(1000)
  "Hello"
}

// 回调
future.onComplete {
  case Success(value) => println(value)
  case Failure(e) => println(s"Error: ${e.getMessage}")
}
```

### for推导式处理Future

```scala
val future1 = Future { 10 }
val future2 = Future { 20 }

val result = for {
  a <- future1
  b <- future2
} yield a + b  // Future[Int]
```

### Actor模型（Akka）

```scala
import akka.actor.{Actor, ActorSystem, Props}

class MyActor extends Actor {
  def receive = {
    case msg: String => println(s"Received: $msg")
    case _ => println("Unknown message")
  }
}

val system = ActorSystem("MySystem")
val actor = system.actorOf(Props[MyActor], "myActor")
actor ! "Hello"  // 发送消息
```

## 特性对比

| 特性 | Java | Scala |
|------|------|-------|
| 线程创建 | Thread/Runnable | Future/Actor |
| 异步编程 | CompletableFuture | Future |
| 消息传递 | 需要手动实现 | Actor模型 |
| 并发集合 | java.util.concurrent | scala.collection.concurrent |
| 同步原语 | synchronized/Lock | synchronized/Actor |

## 完整代码示例

::: code-tabs

@tab Scala
```scala
import scala.concurrent.{Future, Promise}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Success, Failure}

object ConcurrencyScala {
  def main(args: Array[String]): Unit = {
    // Future
    val future: Future[String] = Future {
      Thread.sleep(1000)
      "Hello from Future"
    }
    
    // 回调
    future.onComplete {
      case Success(value) => println(value)
      case Failure(e) => println(s"Error: ${e.getMessage}")
    }
    
    // for推导式处理Future（语法糖）
    val future1 = Future { 10 }
    val future2 = Future { 20 }
    
    val result = for {
      a <- future1
      b <- future2
    } yield a + b
    
    result.onComplete {
      case Success(value) => println(s"Sum: $value")
      case Failure(e) => println(s"Error: ${e.getMessage}")
    }
    
    // Promise
    val promise = Promise[String]()
    val future3 = promise.future
    
    Future {
      Thread.sleep(1000)
      promise.success("Promise completed")
    }
    
    future3.onComplete {
      case Success(value) => println(value)
      case Failure(e) => println(s"Error: ${e.getMessage}")
    }
    
    // 等待Future完成
    Thread.sleep(2000)
  }
}
```

@tab Java
```java
import java.util.concurrent.*;
import java.util.*;

public class ConcurrencyJava {
    public static void main(String[] args) throws Exception {
        // ExecutorService
        ExecutorService executor = Executors.newFixedThreadPool(10);
        
        Future<String> future = executor.submit(() -> {
            Thread.sleep(1000);
            return "Hello from thread";
        });
        
        System.out.println(future.get());
        
        // CompletableFuture
        CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
            return "Hello";
        });
        
        cf.thenApply(s -> s + " World")
          .thenAccept(System.out::println);
        
        // 并发工具类
        CountDownLatch latch = new CountDownLatch(3);
        for (int i = 0; i < 3; i++) {
            executor.submit(() -> {
                System.out.println("Task");
                latch.countDown();
            });
        }
        latch.await();
        
        executor.shutdown();
    }
}
```

:::

## Future详解

### 1. 创建Future

```scala
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

// 基本创建
val future = Future {
  // 异步执行的代码
  computeResult()
}

// 从值创建
val future2 = Future.successful(42)

// 从异常创建
val future3 = Future.failed(new Exception("Error"))
```

### 2. Future操作

```scala
val future = Future { 42 }

// map: 转换
val doubled = future.map(_ * 2)

// flatMap: 链式操作
val chained = future.flatMap(x => Future(x * 2))

// filter: 过滤
val filtered = future.filter(_ > 40)

// recover: 恢复
val recovered = future.recover {
  case e: Exception => 0
}
```

### 3. for推导式

```scala
val future1 = Future { 10 }
val future2 = Future { 20 }
val future3 = Future { 30 }

val result = for {
  a <- future1
  b <- future2
  c <- future3
} yield a + b + c
```

## Promise详解

```scala
import scala.concurrent.{Future, Promise}
import scala.concurrent.ExecutionContext.Implicits.global

// 创建Promise
val promise = Promise[String]()
val future = promise.future

// 在另一个线程中完成Promise
Future {
  Thread.sleep(1000)
  promise.success("Completed")
}

// 使用Future
future.onComplete {
  case Success(value) => println(value)
  case Failure(e) => println(e.getMessage)
}
```

## Actor模型（Akka简介）

```scala
import akka.actor.{Actor, ActorSystem, Props}

// Actor定义
class Greeter extends Actor {
  def receive = {
    case "Hello" => println("Hi there!")
    case "Goodbye" => println("See you!")
    case _ => println("Unknown message")
  }
}

// 创建Actor系统
val system = ActorSystem("MySystem")
val greeter = system.actorOf(Props[Greeter], "greeter")

// 发送消息
greeter ! "Hello"
greeter ! "Goodbye"

// 关闭系统
system.terminate()
```

## 并发集合

```scala
import scala.collection.concurrent

val map = concurrent.TrieMap[String, Int]()
map.put("key", 1)
```

## 总结

- **Future/Promise**：Scala的Future比Java的CompletableFuture更函数式
- **for推导式**：可以使用for推导式组合多个Future（语法糖）
- **Actor模型**：Akka提供了强大的Actor模型用于并发编程
- **ExecutionContext**：需要隐式的ExecutionContext来执行Future
- **异步编程**：推荐使用Future而不是直接使用Thread
