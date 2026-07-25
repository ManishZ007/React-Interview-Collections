// ============================================================
// TOPIC: Arrays in TypeScript
// ============================================================
// TypeScript arrays are the same as JavaScript arrays with one
// addition: you declare what type of elements the array holds.
// This means TypeScript will catch a mistake like pushing a
// string into a number[] at compile time, not at runtime.
// ============================================================

// ── 1. Declaring Arrays ──────────────────────────────────────
// Two syntax styles — both are identical in behavior.
const nums: number[] = [10, 20, 30, 40, 50];
const names: Array<string> = ["Manish", "Ravi", "Sara"]; // generic style

// Readonly array — elements cannot be changed or added after creation.
// Use this when an array should never be mutated (e.g. a config list).
const fixed: ReadonlyArray<number> = [1, 2, 3];
// fixed.push(4); // Error: Property 'push' does not exist on ReadonlyArray

console.log(nums); // [10, 20, 30, 40, 50]
console.log(names); // ['Manish', 'Ravi', 'Sara']

// ── 2. Adding & Removing Elements ───────────────────────────
const fruits: string[] = ["apple", "banana"];

fruits.push("mango"); // add to the end
console.log(fruits); // ['apple', 'banana', 'mango']

fruits.pop(); // remove the last element, returns it
console.log(fruits); // ['apple', 'banana']

fruits.unshift("grape"); // add to the beginning
console.log(fruits); // ['grape', 'apple', 'banana']

fruits.shift(); // remove the first element, returns it
console.log(fruits); // ['apple', 'banana']

// ── 3. map() ─────────────────────────────────────────────────
// Creates a NEW array by transforming every element with a callback.
// The original array is never changed. This is the most used array
// method in React — it is how you render lists of JSX.
const prices: number[] = [100, 200, 300];
const discounted: number[] = prices.map((price) => price * 0.9);
console.log(prices); // [100, 200, 300]  ← unchanged
console.log(discounted); // [90, 180, 270]  ← new array

// map over objects — a very common React pattern
type User = { id: number; name: string };
const users: User[] = [
  { id: 1, name: "Manish" },
  { id: 2, name: "Ravi" },
];
const userNames: string[] = users.map((user) => user.name);
console.log(userNames); // ['Manish', 'Ravi']

// ── 4. filter() ──────────────────────────────────────────────
// Creates a NEW array containing only elements where the callback
// returns true. Elements that return false are excluded.
const scores: number[] = [45, 72, 30, 88, 60, 15];
const passing: number[] = scores.filter((score) => score >= 60);
console.log(passing); // [72, 88, 60]

// filter on objects — keep only active users
type Product = { name: string; inStock: boolean; price: number };
const products: Product[] = [
  { name: "Laptop", inStock: true, price: 80000 },
  { name: "Mouse", inStock: false, price: 1500 },
  { name: "Keyboard", inStock: true, price: 3000 },
];
const available: Product[] = products.filter((p) => p.inStock);
console.log(available.map((p) => p.name)); // ['Laptop', 'Keyboard']

// ── 5. reduce() ──────────────────────────────────────────────
// Reduces the array down to a SINGLE value by running a callback
// on each element, accumulating a result. The second argument is
// the starting value of the accumulator.
const numbers: number[] = [1, 2, 3, 4, 5];

const total: number = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0); // 0 is the initial value of accumulator
console.log(total); // 15

// reduce to build an object — group items by a key
const items = ["apple", "banana", "apple", "mango", "banana", "apple"];
const count = items.reduce<Record<string, number>>((acc, item) => {
  acc[item] = (acc[item] ?? 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, mango: 1 }

// ── 6. forEach() ─────────────────────────────────────────────
// Runs a callback for every element. Unlike map(), it returns nothing
// (undefined). Use it when you only need a side effect like logging.
const tags: string[] = ["TypeScript", "React", "Node"];
tags.forEach((tag, index) => {
  console.log(`${index + 1}. ${tag}`);
});
// 1. TypeScript
// 2. React
// 3. Node

// ── 7. find() & findIndex() ──────────────────────────────────
// find() returns the FIRST element matching the condition, or undefined.
// findIndex() returns the INDEX of that element, or -1 if not found.
const members: User[] = [
  { id: 1, name: "Manish" },
  { id: 2, name: "Ravi" },
  { id: 3, name: "Sara" },
];
const found = members.find((u) => u.id === 2);
console.log(found); // { id: 2, name: 'Ravi' }

const idx = members.findIndex((u) => u.name === "Sara");
console.log(idx); // 2

// ── 8. some() & every() ──────────────────────────────────────
// some() → returns true if AT LEAST ONE element passes the test.
// every() → returns true only if ALL elements pass the test.
const ages: number[] = [18, 25, 16, 30];

const hasMinor: boolean = ages.some((age) => age < 18);
console.log(hasMinor); // true  (16 is less than 18)

const allAdults: boolean = ages.every((age) => age >= 18);
console.log(allAdults); // false  (16 is not an adult)

// ── 9. includes() & indexOf() ────────────────────────────────
// includes() → returns true if the value exists in the array.
// indexOf() → returns the first index of the value, or -1.
const colors: string[] = ["red", "green", "blue", "green"];
console.log(colors.includes("green")); // true
console.log(colors.includes("yellow")); // false
console.log(colors.indexOf("green")); // 1  (first occurrence)
console.log(colors.lastIndexOf("green")); // 3  (last occurrence)

// ── 10. slice() ──────────────────────────────────────────────
// Returns a portion of the array WITHOUT changing the original.
// slice(start, end) — end index is exclusive.
const letters: string[] = ["a", "b", "c", "d", "e"];
console.log(letters.slice(1, 4)); // ['b', 'c', 'd']
console.log(letters.slice(-2)); // ['d', 'e']  (last 2 elements)
console.log(letters); // ['a', 'b', 'c', 'd', 'e']  ← unchanged

// ── 11. splice() ─────────────────────────────────────────────
// Modifies the array IN PLACE: remove, replace, or insert elements.
// splice(start, deleteCount, ...itemsToInsert)
const days: string[] = ["Mon", "Tue", "Thu", "Fri"];
const removed = days.splice(2, 0, "Wed"); // insert 'Wed' at index 2
console.log(days); // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
console.log(removed); // []  (nothing was removed)

days.splice(4, 1); // remove 1 element at index 4
console.log(days); // ['Mon', 'Tue', 'Wed', 'Thu']

// ── 12. sort() ───────────────────────────────────────────────
// Sorts the array IN PLACE and returns the same array.
// IMPORTANT: default sort converts items to strings, so numbers sort wrong.
// Always provide a comparator for numbers.
const values: number[] = [40, 1, 5, 200, 10];
values.sort(); // wrong — sorts as strings: [1, 10, 200, 40, 5]
console.log(values);

values.sort((a, b) => a - b); // correct ascending sort
console.log(values); // [1, 5, 10, 40, 200]

values.sort((a, b) => b - a); // descending
console.log(values); // [200, 40, 10, 5, 1]

// sort objects by a property
const people: User[] = [
  { id: 3, name: "Sara" },
  { id: 1, name: "Manish" },
  { id: 2, name: "Ravi" },
];
people.sort((a, b) => a.id - b.id);
console.log(people.map((p) => p.name)); // ['Manish', 'Ravi', 'Sara']

// ── 13. concat() & Spread ────────────────────────────────────
// concat() creates a new merged array without mutating the originals.
// The spread operator (...) does the same thing and is more readable.
const arr1: number[] = [1, 2, 3];
const arr2: number[] = [4, 5, 6];

const merged1 = arr1.concat(arr2);
const merged2 = [...arr1, ...arr2]; // same result, preferred syntax
console.log(merged1); // [1, 2, 3, 4, 5, 6]
console.log(merged2); // [1, 2, 3, 4, 5, 6]

// ── 14. flat() & flatMap() ───────────────────────────────────
// flat() removes one level of nesting from an array.
// flat(depth) removes multiple levels. Use Infinity to fully flatten.
const nested: number[][] = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(nested.flat()); // [1, 2, 3, 4, 5, 6]

const deepNested = [
  [1, [2, 3]],
  [4, [5, 6]],
];
console.log(deepNested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap() is map() followed by flat(1) — useful when each element
// expands into multiple items.
const sentences: string[] = ["Hello world", "TypeScript is great"];
const words: string[] = sentences.flatMap((s) => s.split(" "));
console.log(words); // ['Hello', 'world', 'TypeScript', 'is', 'great']

// ── 15. Array.from() ─────────────────────────────────────────
// Create an array from any iterable or array-like value.
// Second argument is an optional map function.
const fromString = Array.from("hello");
console.log(fromString); // ['h', 'e', 'l', 'l', 'o']

const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]  — handy for generating number ranges

// ── 16. fill() ───────────────────────────────────────────────
// Fill a portion (or all) of an array with a fixed value IN PLACE.
// fill(value, start, end) — end is exclusive.
const template: number[] = new Array(5).fill(0);
console.log(template); // [0, 0, 0, 0, 0]

const partial = [1, 2, 3, 4, 5];
partial.fill(99, 1, 4); // replace index 1, 2, 3 with 99
console.log(partial); // [1, 99, 99, 99, 5]

// ── 17. Chaining Methods ─────────────────────────────────────
// map, filter, and reduce can be chained to process data in steps.
// Each method returns a new array, so the next method picks up from there.
// This is the most common pattern in React data handling.
type Order = { id: number; amount: number; status: string };
const orders: Order[] = [
  { id: 1, amount: 500, status: "completed" },
  { id: 2, amount: 1500, status: "pending" },
  { id: 3, amount: 300, status: "completed" },
  { id: 4, amount: 2000, status: "completed" },
];

const totalCompleted = orders
  .filter((o) => o.status === "completed") // keep only completed
  .map((o) => o.amount) // extract the amounts
  .reduce((sum, amount) => sum + amount, 0); // add them all up

console.log(totalCompleted); // 2800  (500 + 300 + 2000)

// ── 18. Array Destructuring ──────────────────────────────────
// Unpack array elements into variables. Very common with hooks in React.
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first); // 10
console.log(second); // 20
console.log(rest); // [30, 40, 50]

// Swap two variables without a temp variable
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

export {};
