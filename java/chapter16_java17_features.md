# 第16章：Java 17 新特性

## 1. Text Blocks（文本块，Java 15+）

```java
String html = """
    <html>
        <body>
            <p>Hello, World!</p>
        </body>
    </html>
    """;
```

## 2. Records（记录类，Java 14+）

```java
public record Person(String name, int age) {
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age must be positive");
        }
    }
}
```

## 3. Sealed Classes（密封类，Java 17）

```java
public sealed interface Shape permits Circle, Rectangle {
    double area();
}

public final class Circle implements Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}
```

## 4. Pattern Matching（模式匹配，Java 16+）

```java
// instanceof 模式匹配
Object obj = "Hello";
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}

// Switch 表达式增强（Java 17）
String result = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Unknown";
};
```

## 5. 其他特性

- **局部变量类型推断增强**：`var` 在更多场景可用
- **Stream API 增强**：更多实用方法
- **Optional 增强**：更多实用方法
