// ============================================================
// TOPIC: Functions in TypeScript
// ============================================================
// TypeScript adds static type annotations to function parameters
// and return values, catching type errors at compile time instead
// of at runtime.
// ============================================================

// ── 1. Basic Typed Function ──────────────────────────────────
// Annotate the parameter type and the return type after the colon.
function addTwo(num: number): number {
  return num + 2;
}
console.log(addTwo(5)); // 7

// ── 2. String Return Function ────────────────────────────────
function getUpper(value: string): string {
  return value.toUpperCase();
}
console.log(getUpper("hello")); // HELLO

// ── 3. Arrow Functions ───────────────────────────────────────
// Shorter syntax for functions. The return type goes after the parameter list.
// Arrow functions are very common in React for event handlers and callbacks.
const login = (username: string, password: string): boolean => {
  return username === "admin" && password === "admin1234";
};
console.log(login("admin", "admin1234")); // true
console.log(login("user", "wrong")); // false

// ── 4. void Return Type ──────────────────────────────────────
// Use void when a function performs an action but returns nothing.
function logError(errorMsg: string): void {
  console.log(`Error: ${errorMsg}`);
}
logError("Something went wrong");

// ── 5. Optional Parameters ───────────────────────────────────
// Add ? after the parameter name to make it optional.
// Inside the function it will be undefined if not passed.
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}
console.log(greet("Manish")); // Hello, Manish!
console.log(greet("Manish", "Hey")); // Hey, Manish!

// ── 6. Default Parameters ────────────────────────────────────
// Provide a fallback value used when the argument is omitted.
function multiply(a: number, b: number = 2): number {
  return a * b;
}
console.log(multiply(5)); // 10  (b defaults to 2)
console.log(multiply(5, 3)); // 15

// ── 7. Rest Parameters ───────────────────────────────────────
// Collect any number of arguments into a typed array.
// The rest parameter must always be the last one.
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15
console.log(sumAll(10, 20)); // 30

// ── 8. Function Type Alias ───────────────────────────────────
// Name a function signature as a type so you can reuse it across the codebase.
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5

// ── 9. Functions as Parameters (Callbacks) ───────────────────
// Pass a function as an argument — this is how .map(), .filter() and
// event listeners work under the hood.
function applyOperation(
  a: number,
  b: number,
  operation: MathOperation,
): number {
  return operation(a, b);
}
console.log(applyOperation(10, 3, add)); // 13
console.log(applyOperation(10, 3, subtract)); // 7

// ── 10. Higher-Order Functions (Returning a Function) ────────
// A function that builds and returns another function.
// Common pattern: factory functions and currying.
function createMultiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(6)); // 12
console.log(triple(6)); // 18

// ── 11. Generic Functions ────────────────────────────────────
// Write one function that works with any type.
// <T> is a type parameter — the caller decides what T is at call time.
// TypeScript still enforces type safety throughout the body.
function identity<T>(value: T): T {
  return value;
}
console.log(identity<number>(42)); // 42
console.log(identity<string>("TypeScript")); // TypeScript

// Practical generic: get the first element of any typed array
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log(getFirst([10, 20, 30])); // 10
console.log(getFirst(["a", "b", "c"])); // a

// ── 12. Function Overloading ─────────────────────────────────
// Define multiple signatures for the same function name.
// Useful when the input type changes the return type or behavior.
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") return `"${value}"`;
  return value.toFixed(2);
}
console.log(format("hello")); // "hello"
console.log(format(3.14159)); // 3.14

// ── 13. never Return Type ────────────────────────────────────
// never means the function never finishes normally —
// it either throws an error or runs an infinite loop.
// TypeScript uses this to detect unreachable code.
function throwError(message: string): never {
  throw new Error(message);
}
// throwError("Fatal!"); // uncomment to test — stops execution

// ── 14. Async Functions ──────────────────────────────────────
// An async function always returns a Promise.
// Use Promise<T> as the return type where T is the resolved value type.
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // In a real app: const res = await fetch(`/api/users/${id}`);
  return { id, name: "Manish" };
}
fetchUser(1).then((user) => console.log(user)); // { id: 1, name: 'Manish' }

export {};
