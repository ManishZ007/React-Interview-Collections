// ============================================================
// TOPIC: Union Types in TypeScript
// ============================================================
// A union type means a value can be ONE OF several types.
// You write it with the pipe | symbol: string | number
// TypeScript tracks which type the value is at each point in
// the code and only allows operations valid for that type.
// ============================================================

// ── 1. Basic Union Type ──────────────────────────────────────
// A variable that can hold either a string or a number.
let id: string | number;
id = 101; // valid
id = "usr_42"; // also valid
// id = true;  // Error: boolean is not in the union

// Union in a function parameter
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}
printId(1); // ID: 1
printId("abc"); // ID: abc

// ── 2. Literal Union Types ───────────────────────────────────
// Restrict a value to a fixed set of exact strings or numbers.
// This is one of the most useful patterns in TypeScript — it
// replaces magic strings and makes intent explicit.
type Direction = "up" | "down" | "left" | "right";
type StatusCode = 200 | 201 | 400 | 404 | 500;

function move(direction: Direction): void {
  console.log(`Moving: ${direction}`);
}
move("up"); // valid
// move("diagonal"); // Error: not in the union

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

function getStatusLabel(status: OrderStatus): string {
  if (status === "completed") return "Done";
  if (status === "cancelled") return "Cancelled";
  return "In Progress";
}
console.log(getStatusLabel("completed")); // Done
console.log(getStatusLabel("pending")); // In Progress

// ── 3. Type Narrowing with typeof ────────────────────────────
// TypeScript cannot call string methods on a number and vice versa.
// Inside an if/typeof block TypeScript NARROWS the type — it knows
// exactly which type you are working with in each branch.
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows: value is string here
    return value.toUpperCase();
  }
  // TypeScript knows: value is number here
  return value.toFixed(2);
}
console.log(formatValue("hello")); // HELLO
console.log(formatValue(3.14159)); // 3.14

// ── 4. Type Narrowing with instanceof ────────────────────────
// Use instanceof to narrow when working with classes.
function logError(error: Error | string): void {
  if (error instanceof Error) {
    // TypeScript knows: error is Error here
    console.log(`Error object: ${error.message}`);
  } else {
    // TypeScript knows: error is string here
    console.log(`String error: ${error}`);
  }
}
logError(new Error("Something broke")); // Error object: Something broke
logError("Network timeout"); // String error: Network timeout

// ── 5. Narrowing with the in Operator ───────────────────────
// Use `in` to check if a property exists on an object.
// This is the standard way to narrow between two interfaces that
// share no common field.
interface Cat {
  meow(): void;
}
interface Dog {
  bark(): void;
}

function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    // TypeScript knows: animal is Cat here
    animal.meow();
  } else {
    // TypeScript knows: animal is Dog here
    animal.bark();
  }
}
makeSound({ meow: () => console.log("Meow!") }); // Meow!
makeSound({ bark: () => console.log("Woof!") }); // Woof!

// ── 6. Discriminated Unions (Tagged Unions) ──────────────────
// The most powerful union pattern. Give every member a shared
// literal field (the "discriminant") with a unique value.
// TypeScript uses that field to automatically narrow the type
// inside switch/if blocks — no casting needed.
type Circle = {
  kind: "circle"; // discriminant
  radius: number;
};
type Rectangle = {
  kind: "rectangle"; // discriminant
  width: number;
  height: number;
};
type Triangle = {
  kind: "triangle"; // discriminant
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows: shape is Circle — shape.radius is available
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // TypeScript knows: shape is Rectangle
      return shape.width * shape.height;
    case "triangle":
      // TypeScript knows: shape is Triangle
      return 0.5 * shape.base * shape.height;
  }
}
console.log(getArea({ kind: "circle", radius: 5 }).toFixed(2)); // 78.54
console.log(getArea({ kind: "rectangle", width: 4, height: 6 })); // 24
console.log(getArea({ kind: "triangle", base: 3, height: 8 })); // 12

// ── 7. Union with null and undefined ─────────────────────────
// A very common real-world union. Functions often return a value
// OR null when nothing is found. You must narrow before using it.
function findUser(id: number): string | null {
  const db: Record<number, string> = { 1: "Manish", 2: "Ravi" };
  return db[id] ?? null;
}

const result = findUser(1);
if (result !== null) {
  // Safe to use string methods here
  console.log(result.toUpperCase()); // MANISH
}

const missing = findUser(99);
console.log(missing); // null

// Optional chaining ?. safely accesses a property that might be null/undefined
console.log(missing?.toUpperCase()); // undefined (no crash)

// Nullish coalescing ?? provides a fallback for null/undefined
const display = missing ?? "Unknown User";
console.log(display); // Unknown User

// ── 8. Type Predicates (Custom Type Guards) ──────────────────
// Write your own narrowing function that tells TypeScript "if this
// returns true, the argument IS this specific type."
// The return type `value is string` is the type predicate.
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUser(obj: unknown): obj is { id: number; name: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj
  );
}

const raw: unknown = { id: 1, name: "Manish" };
if (isUser(raw)) {
  // TypeScript knows the shape here
  console.log(raw.name.toUpperCase()); // MANISH
}

// ── 9. Union in Arrays ───────────────────────────────────────
// An array where each element can be one of several types.
const mixed: (string | number)[] = [1, "two", 3, "four"];
console.log(mixed); // [1, 'two', 3, 'four']

// Process each element based on its type
mixed.forEach((item) => {
  if (typeof item === "number") {
    console.log(item * 2);
  } else {
    console.log(item.toUpperCase());
  }
});
// 2, TWO, 6, FOUR

// ── 10. Union in Interfaces ──────────────────────────────────
// A property can itself be a union — very common for API responses.
interface ApiResponse {
  status: "success" | "error";
  data: string | null;
  errorCode?: number | null;
}

const ok: ApiResponse = { status: "success", data: "User created" };
const fail: ApiResponse = { status: "error", data: null, errorCode: 404 };
console.log(ok);
console.log(fail);

// ── 11. Exhaustive Check with never ─────────────────────────
// When you add a new member to a union and forget to handle it,
// TypeScript will catch the error if you use this pattern.
// The never check makes the switch truly exhaustive.
type TrafficLight = "red" | "yellow" | "green";

function getAction(light: TrafficLight): string {
  switch (light) {
    case "red":
      return "Stop";
    case "yellow":
      return "Slow down";
    case "green":
      return "Go";
    default:
      // If you add "blue" to TrafficLight and forget to add a case,
      // TypeScript will error here — light would be type 'blue' not never.
      const exhausted: never = light;
      return exhausted;
  }
}
console.log(getAction("red")); // Stop
console.log(getAction("green")); // Go

// ── 12. Extract and Exclude Utility Types ────────────────────
// TypeScript ships two built-in helpers that transform union types.

// Extract<T, U> — keep only the members that are assignable to U
type AllTypes = string | number | boolean | null;
type OnlyPrimitives = Extract<AllTypes, string | number>; // string | number

// Exclude<T, U> — remove the members that are assignable to U
type WithoutNull = Exclude<AllTypes, null>; // string | number | boolean

// Practical example: strip null/undefined from a union
type MaybeString = string | null | undefined;
type DefiniteString = Exclude<MaybeString, null | undefined>; // string

const clean: DefiniteString = "hello"; // must be a string now
console.log(clean.toUpperCase()); // HELLO

// NonNullable<T> is a shortcut for Exclude<T, null | undefined>
type SameResult = NonNullable<MaybeString>; // string

export {};
