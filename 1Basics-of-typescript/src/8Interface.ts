// ============================================================
// TOPIC: Interfaces in TypeScript
// ============================================================
// An interface describes the SHAPE of an object — what properties
// it must have and what types those properties must be.
// TypeScript uses structural typing: if an object has all the
// required properties with the right types, it satisfies the
// interface, regardless of how it was created.
//
// This file is a deep dive. The basics (optional, readonly)
// were covered in 3Objects.ts. Here we focus on the advanced
// patterns you'll see in real React and Node codebases.
// ============================================================

// ── 1. Basic Interface ───────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(user);

// ── 2. Method Signatures in Interfaces ──────────────────────
// Interfaces can describe methods, not just data properties.
// Two equivalent ways to write a method signature:
interface Calculator {
  add(a: number, b: number): number;          // method shorthand
  subtract: (a: number, b: number) => number; // property with function type
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};
console.log(calc.add(10, 3));      // 13
console.log(calc.subtract(10, 3)); // 7

// ── 3. Optional and Readonly Properties ─────────────────────
interface Product {
  readonly id: number;     // can never be changed after creation
  name: string;
  price: number;
  discount?: number;       // may or may not exist
  description?: string;
}

const laptop: Product = { id: 1, name: "Laptop", price: 80000 };
const phone: Product  = { id: 2, name: "Phone",  price: 40000, discount: 10 };
// laptop.id = 99; // Error: Cannot assign to 'id' because it is read only
console.log(laptop);
console.log(phone.discount); // 10

// ── 4. Extending Interfaces (Single) ─────────────────────────
// Build a new interface on top of an existing one. All properties
// of the parent are inherited — you only add what is new.
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const dog: Dog = {
  name: "Bruno",
  age: 3,
  breed: "Labrador",
  bark: () => console.log("Woof!"),
};
dog.bark(); // Woof!
console.log(dog.name); // Bruno  (inherited from Animal)

// ── 5. Extending Multiple Interfaces ─────────────────────────
// A single interface can extend more than one parent at a time.
interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

// A duck can both fly and swim
interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  name: "Donald",
  age: 2,
  maxAltitude: 100,
  maxDepth: 5,
  fly:   () => console.log("Flying!"),
  swim:  () => console.log("Swimming!"),
  quack: () => console.log("Quack!"),
};
duck.fly();   // Flying!
duck.swim();  // Swimming!
duck.quack(); // Quack!

// ── 6. Implementing an Interface in a Class ──────────────────
// A class uses `implements` to promise it satisfies an interface.
// TypeScript will error if any required member is missing.
interface Shape {
  color: string;
  getArea(): number;
  getPerimeter(): number;
}

class Circle implements Shape {
  color: string;
  constructor(public radius: number, color: string) {
    this.color = color;
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  color: string;
  constructor(
    public width: number,
    public height: number,
    color: string
  ) {
    this.color = color;
  }
  getArea(): number      { return this.width * this.height; }
  getPerimeter(): number { return 2 * (this.width + this.height); }
}

const shapes: Shape[] = [new Circle(5, "red"), new Rectangle(4, 6, "blue")];
shapes.forEach((s) => {
  console.log(`Area: ${s.getArea().toFixed(2)}, Color: ${s.color}`);
});
// Area: 78.54, Color: red
// Area: 24.00, Color: blue

// ── 7. Interface for Function Types ─────────────────────────
// An interface can describe a callable (a function), not just an object.
interface Transformer {
  (input: string): string;
}

const toUpper: Transformer = (s) => s.toUpperCase();
const trim: Transformer    = (s) => s.trim();

console.log(toUpper("hello")); // HELLO
console.log(trim("  hi  "));   // hi

// ── 8. Index Signatures ──────────────────────────────────────
// When you don't know all the keys ahead of time — e.g. dynamic
// config objects, translation dictionaries, HTTP headers.
interface StringMap {
  [key: string]: string;
}

const httpHeaders: StringMap = {
  "Content-Type": "application/json",
  Authorization: "Bearer abc123",
  Accept: "application/json",
};
console.log(httpHeaders["Content-Type"]); // application/json

// Mixed: known properties + index signature
// All known properties must match the index signature type.
interface ErrorMap {
  message: string; // known property — must be string (matches index type)
  [field: string]: string;
}
const errors: ErrorMap = {
  message: "Validation failed",
  name: "Name is required",
  email: "Invalid email format",
};
console.log(errors.message); // Validation failed
console.log(errors.email);   // Invalid email format

// ── 9. Generic Interfaces ────────────────────────────────────
// An interface that works with any type — the caller provides T.
// Very common for API response wrappers and repository patterns.
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Use with a specific type
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Manish", email: "manish@email.com" },
  status: 200,
  message: "Success",
};

const usersPage: PaginatedResponse<User> = {
  data: [
    { id: 1, name: "Manish", email: "m@e.com" },
    { id: 2, name: "Ravi",   email: "r@e.com" },
  ],
  total: 50,
  page: 1,
  pageSize: 2,
};
console.log(userResponse.data.name); // Manish
console.log(usersPage.total);        // 50

// ── 10. Declaration Merging ──────────────────────────────────
// If you declare the same interface name twice, TypeScript merges
// them into one. This is how libraries let you "augment" their types.
// (Note: type aliases do NOT support this — only interfaces do.)
interface Window {
  appVersion: string;
}

interface Window {
  isDarkMode: boolean;
}

// Both declarations are merged — Window now has both properties
const appWindow: Window = {
  appVersion: "1.0.0",
  isDarkMode: true,
};
console.log(appWindow); // { appVersion: '1.0.0', isDarkMode: true }

// ── 11. Nested Interfaces ────────────────────────────────────
interface Address {
  street: string;
  city: string;
  country: string;
  pincode?: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  address: Address;        // nested interface
  contact: {              // inline nested object
    phone: string;
    email: string;
  };
}

const emp: Employee = {
  id: 101,
  name: "Manish",
  role: "Developer",
  address: { street: "MG Road", city: "Mumbai", country: "India" },
  contact: { phone: "9999999999", email: "manish@work.com" },
};
console.log(`${emp.name} lives in ${emp.address.city}`); // Manish lives in Mumbai

// ── 12. Interface vs Type Alias — Complete Comparison ────────
//
//  FEATURE                        interface    type alias
//  ─────────────────────────────  ─────────    ──────────
//  Object shapes                  ✅ yes        ✅ yes
//  Extend / inherit               ✅ extends    ✅ intersection &
//  Class implements               ✅ yes        ✅ yes
//  Union types  (A | B)           ❌ no         ✅ yes
//  Intersection types (A & B)     ❌ no         ✅ yes
//  Primitive aliases (string)     ❌ no         ✅ yes
//  Tuple types                    ❌ no         ✅ yes
//  Declaration merging            ✅ yes        ❌ no
//  Computed property names        ❌ no         ✅ yes
//  Conditional / mapped types     ❌ no         ✅ yes
//
//  RULE OF THUMB:
//  • Use interface for object shapes and class contracts
//  • Use type for everything else: unions, primitives, tuples,
//    mapped types, conditional types, and complex combinations

export {};
