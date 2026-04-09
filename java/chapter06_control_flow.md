# 第6章：控制流

## if-else 语句

```java
int x = 10;
if (x > 5) {
    System.out.println("Greater than 5");
} else {
    System.out.println("Less than or equal to 5");
}

// 三元运算符
String result = x > 5 ? "Greater" : "Less";
```

## switch 语句

```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    default:
        System.out.println("Other day");
}

// Java 14+ switch 表达式
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Other day";
};
```

## for 循环

```java
// 传统 for 循环
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// 增强 for 循环
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
```

## while 循环

```java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}

do {
    System.out.println(i);
    i++;
} while (i < 10);
```
