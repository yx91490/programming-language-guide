# 第3章：类型系统

## 基本类型与包装类型

Java 有 8 种基本类型和对应的包装类型：

```java
// 基本类型
int primitiveInt = 42;
double primitiveDouble = 3.14;
boolean primitiveBoolean = true;

// 包装类型
Integer boxedInt = Integer.valueOf(42);
Double boxedDouble = Double.valueOf(3.14);
Boolean boxedBoolean = Boolean.valueOf(true);

// 自动装箱拆箱
Integer autoBoxed = 42;           // 自动装箱
int autoUnboxed = autoBoxed;      // 自动拆箱
```

## 类型转换

```java
// 显式类型转换
int x = 42;
long y = (long) x;
double z = (double) x;

// 字符串转换
String str = String.valueOf(42);
int num = Integer.parseInt("42");
```

## 类型层次结构

```java
// Object 是所有类的根类
Object obj = new String("Hello");
String str = (String) obj;  // 需要强制转换

// instanceof 检查
if (obj instanceof String) {
    String s = (String) obj;
}
```
