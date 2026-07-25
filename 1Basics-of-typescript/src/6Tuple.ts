// ============================================================
// TOPIC: Tuples in TypeScript
// ============================================================
// A tuple is a fixed-length array where each position has a
// specific, known type. Unlike a regular array where every
// element must be the same type, each slot in a tuple can
// have a different type — and TypeScript enforces that.
//
// Think of a tuple as a row in a database: position 0 is
// always the id (number), position 1 is always the name
// (string), etc.
// ============================================================

// ── 1. Basic Tuple ───────────────────────────────────────────
// Declare with [type1, type2, ...] — order and types are both enforced.
let person: [string, number] = ["Manish", 25];
console.log(person[0]); // Manish  (TypeScript knows this is string)
console.log(person[1]); // 25      (TypeScript knows this is number)

// person[0] = 42;      // Error: number is not assignable to string
// person[2] = "extra"; // Error: tuple only has 2 elements

// ── 2. Named Tuples (TypeScript 4.0+) ───────────────────────
// Give each position a label to make the tuple self-documenting.
// Labels don't affect behavior — they only help readability.
type Coordinate = [x: number, y: number, z: number];
const point: Coordinate = [10, 20, 30];
console.log(point); // [10, 20, 30]

type RGB = [red: number, green: number, blue: number];
const red: RGB = [255, 0, 0];
const green: RGB = [0, 255, 0];
console.log(red); // [255, 0, 0]

// ── 3. Tuple Destructuring ───────────────────────────────────
// Unpack tuple elements into named variables in one line.
// This is the exact pattern React's useState hook uses.
const [firstName, age] = person;
console.log(firstName); // Manish
console.log(age); // 25

// Destructure with a custom name (skip elements with _)
const [_, year, month] = [42, 2024, 7];
console.log(year); // 2024
console.log(month); // 7

// ── 4. Function Returning a Tuple ────────────────────────────
// Return multiple values from a function without wrapping in an object.
// Much cleaner than returning { value, error } for simple pairs.
function divide(a: number, b: number): [number, string] {
  if (b === 0) return [0, "Cannot divide by zero"];
  return [a / b, "ok"];
}

const [result, status] = divide(10, 2);
console.log(result); // 5
console.log(status); // ok

const [result2, error] = divide(10, 0);
console.log(result2); // 0
console.log(error); // Cannot divide by zero

// ── 5. useState-style Hook Pattern ──────────────────────────
// This is exactly how React's useState works under the hood.
// The function returns a [value, setter] tuple.
function createState<T>(initial: T): [() => T, (val: T) => void] {
  let state = initial;
  const get = () => state;
  const set = (val: T) => {
    state = val;
  };
  return [get, set]; // returns a tuple
}

const [getCount, setCount] = createState(0);
console.log(getCount()); // 0
setCount(5);
console.log(getCount()); // 5

// ── 6. Optional Elements ─────────────────────────────────────
// Add ? to make the last element(s) optional.
// Optional elements must always come at the end.
type UserRecord = [id: number, name: string, email?: string];

const userWithEmail: UserRecord = [1, "Manish", "manish@email.com"];
const userNoEmail: UserRecord = [2, "Ravi"]; // email is optional
console.log(userWithEmail); // [1, 'Manish', 'manish@email.com']
console.log(userNoEmail); // [2, 'Ravi']

// ── 7. Rest Elements in Tuples ───────────────────────────────
// A rest element (...type[]) collects zero or more trailing values.
// Useful when the tail of the tuple has variable length.
type LogEntry = [timestamp: number, level: "info" | "error", ...messages: string[]];

const log1: LogEntry = [1700000000, "info", "Server started"];
const log2: LogEntry = [1700000001, "error", "DB failed", "Retry 1", "Retry 2"];
console.log(log1); // [1700000000, 'info', 'Server started']
console.log(log2); // [1700000001, 'error', 'DB failed', 'Retry 1', 'Retry 2']

// ── 8. Readonly Tuple ─────────────────────────────────────────
// Prevent any modification after creation.
// Use this for constants like coordinates or config pairs.
const config: readonly [string, number] = ["localhost", 3000];
// config[0] = "production"; // Error: Cannot assign to '0' read-only
console.log(`${config[0]}:${config[1]}`); // localhost:3000

// ── 9. Tuple as Function Parameters (Spread) ─────────────────
// Spread a tuple into a function call — each element maps to a parameter.
function createUser(id: number, name: string, active: boolean): string {
  return `${id}: ${name} (${active ? "active" : "inactive"})`;
}

const args: [number, string, boolean] = [1, "Manish", true];
console.log(createUser(...args)); // 1: Manish (active)

// ── 10. Array of Tuples ──────────────────────────────────────
// Store structured pairs or records in a typed array.
// Common when parsing CSV rows or mapping key-value data.
const entries: [string, number][] = [
  ["apple", 3],
  ["banana", 5],
  ["mango", 2],
];

entries.forEach(([fruit, qty]) => {
  console.log(`${fruit}: ${qty}`);
});
// apple: 3
// banana: 5
// mango: 2

// Convert an object to entries (Object.entries returns [string, unknown][])
const prices: Record<string, number> = { laptop: 80000, phone: 40000 };
const priceEntries = Object.entries(prices) as [string, number][];
priceEntries.forEach(([item, price]) => {
  console.log(`${item} costs ₹${price}`);
});

export {};
