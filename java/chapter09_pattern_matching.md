# 第9章：模式匹配

## switch 表达式（Java 14+）

```java
// switch 表达式
int day = 3;
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Other day";
};
```

## instanceof 模式匹配（Java 16+）

```java
Object obj = "Hello";
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}
```
