# 第13章：并发编程

## Thread 和 Runnable

```java
// 创建线程
Thread thread = new Thread(() -> {
    System.out.println("Running in thread");
});
thread.start();

// 使用 Runnable
Runnable task = () -> System.out.println("Task");
new Thread(task).start();
```

## ExecutorService 和 Future

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Result";
});

String result = future.get();  // 阻塞等待
```

## CompletableFuture（Java 8+）

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

future.thenApply(s -> s + " World")
      .thenAccept(System.out::println);
```

## 并发工具类

```java
// CountDownLatch
CountDownLatch latch = new CountDownLatch(3);

// Semaphore
Semaphore semaphore = new Semaphore(5);
semaphore.acquire();
// ...
semaphore.release();
```

## 并发集合

```java
import java.util.concurrent.*;

ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1);

BlockingQueue<String> queue = new LinkedBlockingQueue<>();
queue.put("item");
String item = queue.take();
```
