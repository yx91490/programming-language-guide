# 第14章：密封类与枚举

## Sealed Classes（Java 17）

```java
// 密封接口
public sealed interface Animal permits Dog, Cat {
    void makeSound();
}

// 允许的子类
public final class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof");
    }
}

public final class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meow");
    }
}
```

## 枚举

```java
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day day = Day.MONDAY;
```
