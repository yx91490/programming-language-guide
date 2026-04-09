# 第0章：快速开始

## 环境准备

### 安装Scala

**使用sbt（推荐）**

```bash
# 安装sbt
# Windows: 下载安装包 https://www.scala-sbt.org/download.html
# macOS: brew install sbt
# Linux: 参考官方文档

# 创建新项目
sbt new scala/scala-seed.g8
```

**使用IDE**

- **IntelliJ IDEA**：安装Scala插件
- **VS Code**：安装Scala (Metals) 扩展
- **Eclipse**：安装Scala IDE

### 验证安装

```bash
scala -version
# 应该显示类似：Scala code runner version 2.13.x
```

## 第一个Scala程序

创建文件 `Hello.scala`：

```scala
object Hello {
  def main(args: Array[String]): Unit = {
    println("Hello, Scala!")
  }
}
```

编译运行：

```bash
scalac Hello.scala
scala Hello
```

或者使用sbt：

```bash
sbt run
```

## 与Java对比示例

::: code-tabs

@tab Scala
```scala
object Hello {
  def main(args: Array[String]): Unit = {
    println("Hello, Scala!")
  }
}
```

@tab Java
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

:::

**主要差异：**
- Scala使用 `object` 替代 `class` 的静态方法
- 类型声明在变量名之后：`args: Array[String]`
- `Unit` 对应Java的 `void`
- 分号通常可以省略
