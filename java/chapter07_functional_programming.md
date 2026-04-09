# 第7章：函数式编程

## Lambda 表达式（Java 8+）

```java
// Lambda 表达式
Function<Integer, Integer> square = x -> x * x;
int result = square.apply(5);  // 25

// 方法引用
List<String> names = Arrays.asList("John", "Jane", "Bob");
names.forEach(System.out::println);

// Stream API
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> doubled = numbers.stream()
    .map(x -> x * 2)
    .collect(Collectors.toList());
```

## 函数式接口

```java
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;
int result = add.calculate(5, 3);  // 8
```
