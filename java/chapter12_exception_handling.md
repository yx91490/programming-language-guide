# 第12章：异常处理

## try-catch-finally

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Division by zero: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General exception: " + e.getMessage());
} finally {
    System.out.println("Finally block");
}
```

## try-with-resources

```java
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
} catch (IOException e) {
    System.out.println("IO error: " + e.getMessage());
}
```

## Checked vs Unchecked 异常

```java
// Checked 异常必须处理
public void readFile() throws IOException {
    // ...
}

// Unchecked 异常可以不处理
public void divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Division by zero");
    }
}
```
