# 写给Java程序员的Scala入门指南

## 简介

本指南面向有Java编程经验的开发者，帮助您快速掌握Scala语言。

### 本指南的特点

- ✅ 以Java特性为入口，降低学习曲线
- ✅ 每个章节包含可执行的代码示例
- ✅ 重点标注Scala的语法糖特性
- ✅ 提供特性对比表格，方便查阅
- ✅ 覆盖Java 17和Scala 2.13的主要实用特性

## 目录

### 基础篇

0. [快速开始](chapter00_quick_start.md) - 环境准备、第一个Scala程序、与Java对比示例
1. [入门与基础语法](chapter01_basic_syntax.md) - 变量声明、类型推断、字符串插值
2. [关键字](chapter02_keywords.md) - 关键字列表、关键字对比、Scala特有关键字
3. [类型系统深入](chapter03_type_system.md) - 统一类型系统、类型别名、类型边界
4. [类与对象](chapter04_classes_objects.md) - 类定义、构造函数、伴生对象
5. [接口、抽象类与特质](chapter05_interfaces_traits.md) - 接口、特质、多重继承

### 控制流与函数式编程

6. [表达式与控制流](chapter06_control_flow.md) - if-else、for推导式、match
7. [函数式编程](chapter07_functional_programming.md) - Lambda、高阶函数、闭包、柯里化
8. [集合框架](chapter08_collections.md) - List、Set、Map、Stream、Option
9. [模式匹配](chapter09_pattern_matching.md) - switch vs match、提取器

### 高级特性

10. [数据类与记录](chapter10_data_classes_records.md) - Record vs Case类、模式匹配应用
11. [泛型系统](chapter11_generics.md) - 协变、逆变、类型约束
12. [异常处理](chapter12_exception_handling.md) - try-catch、Option/Either/Try
13. [多线程与并发编程](chapter13_concurrency.md) - Thread、Future、Actor模型、并发工具类
14. [密封类与枚举](chapter14_sealed_classes_enums.md) - Sealed Classes、ADT
15. [隐式与类型类](chapter15_implicits_type_classes.md) - 隐式参数、类型类模式

### 专题与实战

16. [Scala语法糖专题](chapter16_syntax_sugar.md) - 中缀调用、apply/unapply、操作符重载
17. [Java与Scala互操作](chapter17_interoperability.md) - 双向调用、类型映射、集合转换
18. [高级特性与最佳实践](chapter18_advanced_features.md) - Java 17和Scala 2.13特性总结

## 参考资源

### 官方文档

- [Java Tutorials](https://docs.oracle.com/javase/tutorial/) - Java官方教程
- [Scala官方文档](https://docs.scala-lang.org/) - Scala官方文档
- [Scala Language Specification 2.13](https://www.scala-lang.org/files/archive/spec/2.13/) - Scala语言规范

### 在线资源

- [Scala School](https://twitter.github.io/scala_school/) - Twitter的Scala教程
- [Scala Exercises](https://www.scala-exercises.org/) - 交互式Scala练习
- [Scala API文档](https://www.scala-lang.org/api/2.13.x/) - Scala标准库API

### 社区

- [Scala中文社区](https://scala-china.org/) - 中国Scala开发者社区
- [Stack Overflow - Scala](https://stackoverflow.com/questions/tagged/scala) - Scala问答

## 版本说明

- **Java版本**：Java 17（LTS）
- **Scala版本**：Scala 2.13.x
- **最后更新**：2024年

## 贡献

如果您发现错误或有改进建议，欢迎提交Issue或Pull Request。

## 许可证

本指南采用MIT许可证。

---

**开始学习**：[第1章 - 入门与基础语法](chapter01_basic_syntax.md) →
