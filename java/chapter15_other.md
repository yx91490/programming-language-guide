# 第15章：其他

## 显式传参与工具类

Java 中需要比较、排序等行为时，通常通过显式传参或静态工具类实现：

```java
import java.util.Comparator;

// 显式传递比较器
public class Utils {
    public static <T> T max(T a, T b, Comparator<T> comparator) {
        return comparator.compare(a, b) > 0 ? a : b;
    }
    
    public static void main(String[] args) {
        Integer result = max(5, 3, Integer::compareTo);
        System.out.println(result);
    }
}
```
