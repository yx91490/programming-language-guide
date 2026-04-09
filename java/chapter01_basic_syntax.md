# 第1章：基础语法

## 变量声明

在 Java 中，变量声明需要显式指定类型：

```java
// Java变量声明
int age = 25;
final String name = "John";
double price = 99.99;
boolean isActive = true;
```

**特点：**
- 使用 `final` 关键字声明不可变变量
- 类型必须显式声明
- 基本类型和引用类型分离

## 基本数据类型

Java 有 8 种基本类型：

```java
byte b = 127;
short s = 32767;
int i = 2147483647;
long l = 9223372036854775807L;
float f = 3.14f;
double d = 3.14159;
char c = 'A';
boolean bool = true;
```

## 字符串处理

Java 的字符串处理相对繁琐：

```java
String name = "John";
String greeting = "Hello, " + name + "!";
int age = 25;
String message = String.format("Name: %s, Age: %d", name, age);
```
