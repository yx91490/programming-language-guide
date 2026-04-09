# 第10章：Record 类（Java 14+）

## Record 定义

```java
// Record 类（不可变数据类）
public record Person(String name, int age) {
    // 可以添加方法
    public String greet() {
        return "Hello, I'm " + name;
    }
}

// 使用
Person person = new Person("John", 25);
System.out.println(person.name());  // 访问字段
System.out.println(person.age());
```

## Record 特性

```java
public record Point(int x, int y) {
    // 自动生成：
    // - 构造函数
    // - getter 方法（x(), y()）
    // - equals() 和 hashCode()
    // - toString()
}

Point p1 = new Point(1, 2);
Point p2 = new Point(1, 2);
System.out.println(p1.equals(p2));  // true
System.out.println(p1);  // Point[x=1, y=2]
```
