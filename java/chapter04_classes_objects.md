# 第4章：类与对象

## 类定义

```java
public class Person {
    // 字段
    private String name;
    private int age;
    
    // 构造函数
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter 方法
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // 实例方法
    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
    
    // 静态方法
    public static Person create(String name, int age) {
        return new Person(name, age);
    }
}
```

## 使用示例

```java
Person person = new Person("John", 25);
person.greet();
Person.create("Jane", 30);
```

## 嵌套类

```java
public class Outer {
    private int value = 10;
    
    class Inner {
        void display() {
            System.out.println("Value: " + value);
        }
    }
}
```

## equals 与 hashCode

```java
public class Person {
    private String name;
    private int age;
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```
