# 第2章：关键字

## 完整关键字列表（50 个）

Java 有 50 个关键字，按类别分组：

### 访问控制
- `public`, `private`, `protected`

### 类、方法和变量修饰符
- `abstract`, `class`, `extends`, `final`, `implements`, `interface`, `native`, `new`, `static`, `strictfp`, `synchronized`, `transient`, `volatile`

### 程序控制
- `break`, `case`, `continue`, `default`, `do`, `else`, `for`, `if`, `instanceof`, `return`, `switch`, `while`

### 错误处理
- `assert`, `catch`, `finally`, `throw`, `throws`, `try`

### 包相关
- `import`, `package`

### 基本类型
- `boolean`, `byte`, `char`, `double`, `float`, `int`, `long`, `short`

### 变量引用
- `super`, `this`, `void`

### 未使用
- `const`, `goto`

## 关键字示例

```java
// 访问控制
public class MyClass {
    private int value;
    protected String name;
    
    // 方法修饰符
    public static void main(String[] args) {
        final int x = 10;
        
        // 控制流
        if (x > 5) {
            for (int i = 0; i < 10; i++) {
                if (i == 5) break;
                continue;
            }
        }
        
        // 异常处理
        try {
            throw new Exception();
        } catch (Exception e) {
            // handle
        } finally {
            // cleanup
        }
    }
}
```

## 关键字分类总结

1. **访问控制**：`public`, `private`, `protected`
2. **类相关**：`class`, `interface`, `extends`, `implements`, `abstract`, `final`, `static`
3. **控制流**：`if`, `else`, `for`, `while`, `do`, `switch`, `case`, `break`, `continue`
4. **异常**：`try`, `catch`, `finally`, `throw`, `throws`
5. **基本类型**：`int`, `long`, `float`, `double`, `char`, `byte`, `short`, `boolean`, `void`
