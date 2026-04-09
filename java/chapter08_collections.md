# 第8章：集合框架

## List / Set / Map

```java
// List
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");

// Set
Set<Integer> set = new HashSet<>();
set.add(1);
set.add(2);
set.add(3);

// Map
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
```

## Stream API（Java 8+）

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> doubled = numbers.stream()
    .map(x -> x * 2)
    .filter(x -> x > 5)
    .collect(Collectors.toList());
```

## Optional（Java 8+）

```java
Optional<String> maybeValue = Optional.of("Hello");
String result = maybeValue.orElse("Default");
```
