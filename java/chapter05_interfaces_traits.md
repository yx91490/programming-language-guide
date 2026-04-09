# 第5章：接口与抽象类

## 接口（Java 8+）

```java
// 接口定义
public interface Flyable {
    // 抽象方法
    void fly();
    
    // 默认方法（Java 8+）
    default void takeOff() {
        System.out.println("Taking off...");
    }
    
    // 静态方法（Java 8+）
    static void info() {
        System.out.println("This is a flyable interface");
    }
}

// 实现接口
public class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Bird is flying");
    }
}
```

## 抽象类

```java
public abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // 抽象方法
    public abstract void makeSound();
    
    // 具体方法
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " barks");
    }
}
```
