# 第11章：泛型

## 泛型定义

```java
// 泛型类
public class Box<T> {
    private T value;
    
    public void setValue(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
}

// 使用
Box<String> stringBox = new Box<>();
stringBox.setValue("Hello");
```

## 通配符

```java
// 上界通配符
List<? extends Number> numbers = new ArrayList<Integer>();

// 下界通配符
List<? super Integer> list = new ArrayList<Number>();

// 类型擦除：运行时类型信息丢失
```
