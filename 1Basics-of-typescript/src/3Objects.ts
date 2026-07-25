// ============================================================
// TOPIC: Objects, Interfaces & Type Aliases in TypeScript
// ============================================================
// TypeScript gives you several tools to describe the shape of
// an object. Interfaces and type aliases are the most important.
// ============================================================

// ── 1. Inline Object Type ────────────────────────────────────
// Annotate an object shape directly in the variable declaration.
// Fine for one-off use, but gets messy when reused.
let person: { name: string; age: number } = { name: "Manish", age: 25 };
console.log(person.name); // Manish

// ── 2. Type Alias ────────────────────────────────────────────
// Give a name to any type so you can reuse it.
// Works for primitives, unions, tuples, and object shapes.
type Point = {
  x: number;
  y: number;
};
const origin: Point = { x: 0, y: 0 };
console.log(origin); // { x: 0, y: 0 }

// ── 3. Interface ─────────────────────────────────────────────
// The standard way to describe the shape of an object.
// Prefer interface over type alias for objects — it can be extended
// and gives cleaner error messages.
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(user); // { id: 1, name: 'Manish', email: 'manish@email.com' }

// ── 4. Optional Properties ───────────────────────────────────
// Add ? to a property name to make it optional.
// The value will be undefined when not provided.
interface Product {
  id: number;
  name: string;
  discount?: number; // may not exist on every product
}

const laptop: Product = { id: 101, name: "Laptop" };
const phone: Product = { id: 102, name: "Phone", discount: 10 };
console.log(laptop.discount); // undefined
console.log(phone.discount); // 10

// ── 5. Readonly Properties ───────────────────────────────────
// readonly prevents a property from being changed after the object is created.
// Think of it as const for individual object fields.
interface Config {
  readonly apiUrl: string;
  readonly version: number;
}

const config: Config = { apiUrl: "https://api.example.com", version: 1 };
// config.apiUrl = "other"; // Error: Cannot assign to 'apiUrl' — it is read only.
console.log(config);

// ── 6. Extending Interfaces ──────────────────────────────────
// Build a new interface on top of an existing one using extends.
// Avoids repeating shared fields — same idea as class inheritance.
interface Animal {
  name: string;
  sound(): string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Bruno",
  breed: "Labrador",
  sound: () => "Woof!",
};
console.log(`${dog.name} says ${dog.sound()}`); // Bruno says Woof!

// ── 7. Type Intersection ─────────────────────────────────────
// Combine multiple types into one using &.
// The resulting object must satisfy every type in the intersection.
type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

type Post = User & Timestamps; // must have all User fields + both timestamps

const post: Post = {
  id: 1,
  name: "Manish",
  email: "manish@email.com",
  createdAt: "2024-01-01",
  updatedAt: "2024-06-01",
};
console.log(post);

// ── 8. Index Signatures ──────────────────────────────────────
// Use when you don't know all the keys in advance — e.g. dynamic config,
// HTTP headers, or translation dictionaries.
interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  "Content-Type": "application/json",
  Authorization: "Bearer token123",
};
console.log(headers["Content-Type"]); // application/json

// ── 9. Nested Objects ────────────────────────────────────────
// An interface property can itself be another interface.
interface Address {
  city: string;
  country: string;
}

interface Employee {
  name: string;
  address: Address;
}

const emp: Employee = {
  name: "Manish",
  address: { city: "Mumbai", country: "India" },
};
console.log(emp.address.city); // Mumbai

// ── 10. Utility Types ────────────────────────────────────────
// TypeScript ships built-in generic types that transform existing types.
// These are very common in React — especially Partial and Readonly.

// Partial<T> — makes every property optional
type PartialUser = Partial<User>;
const guestUser: PartialUser = { name: "Guest" }; // id and email are optional now

// Required<T> — makes every property required (opposite of Partial)
type FullProduct = Required<Product>; // discount is now required

// Readonly<T> — makes every property readonly
type ImmutableUser = Readonly<User>;

// Pick<T, K> — keep only specific keys from the type
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Manish" };

// Omit<T, K> — remove specific keys from the type
type UserWithoutEmail = Omit<User, "email">;
const noEmail: UserWithoutEmail = { id: 1, name: "Manish" };

// Record<K, V> — build an object type with specific keys and a value type
type RoleMap = Record<"admin" | "editor" | "viewer", boolean>;
const roles: RoleMap = { admin: true, editor: false, viewer: true };

console.log(guestUser); // { name: 'Guest' }
console.log(preview); // { id: 1, name: 'Manish' }
console.log(noEmail); // { id: 1, name: 'Manish' }
console.log(roles); // { admin: true, editor: false, viewer: true }

// ── 11. Type Narrowing ───────────────────────────────────────
// TypeScript narrows the type inside a condition block based on runtime checks.
// This lets you safely call type-specific methods without casting.
function printId(id: number | string): void {
  if (typeof id === "string") {
    console.log(`String ID: ${id.toUpperCase()}`);
  } else {
    console.log(`Number ID: ${id}`);
  }
}
printId(42); // Number ID: 42
printId("abc"); // String ID: ABC

// ── 12. Class with TypeScript Types ──────────────────────────
// TypeScript adds access modifiers (public, private, protected)
// and type annotations to class properties and methods.
class BankAccount {
  private balance: number; // only accessible inside this class

  constructor(
    public readonly owner: string, // public + readonly set in one line
    initialBalance: number
  ) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Manish", 1000);
account.deposit(500); // Deposited 500. New balance: 1500
console.log(account.getBalance()); // 1500
// console.log(account.balance); // Error: 'balance' is private

export {};
