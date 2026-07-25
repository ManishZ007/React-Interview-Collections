// ============================================================
// TOPIC: Type Aliases in TypeScript
// ============================================================
// A type alias gives a name to any type expression — primitives,
// unions, tuples, objects, functions, generics, and more.
//
// Unlike an interface (which is limited to object shapes),
// a type alias can represent ANY type in TypeScript.
//
// This file covers the full power of the `type` keyword,
// including advanced features like mapped types, conditional
// types, and template literal types.
// ============================================================

// ── 1. Type Alias for Primitives ─────────────────────────────
// Name a primitive to give it domain meaning.
type UserId = number;
type Username = string;
type IsActive = boolean;

const id: UserId = 1;
const name: Username = "Manish";
const active: IsActive = true;
console.log(id, name, active); // 1 Manish true

// ── 2. Type Alias for Object Shape ──────────────────────────
// Same as an interface for simple objects. Prefer interface when
// you need extends or declaration merging, type alias otherwise.
type Point = {
  x: number;
  y: number;
};

type User = {
  id: UserId;
  name: Username;
  email: string;
};

const origin: Point = { x: 0, y: 0 };
const user: User = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(origin);
console.log(user);

// ── 3. Type Alias for Union ──────────────────────────────────
// The biggest advantage of type over interface — unions only work with type.
type StringOrNumber = string | number;
type Status = "pending" | "active" | "inactive";
type NullableString = string | null;
type ID = string | number;

function printId(id: ID): void {
  console.log(`ID: ${id}`);
}
printId(1);     // ID: 1
printId("u42"); // ID: u42

// ── 4. Type Alias for Intersection ──────────────────────────
// Combine multiple types — the result must satisfy all of them.
// This is the type-alias equivalent of interface extends.
type Timestamps = {
  createdAt: string;
  updatedAt: string;
};

type Post = User & Timestamps; // must have User fields + Timestamps fields

const post: Post = {
  id: 1,
  name: "Manish",
  email: "manish@email.com",
  createdAt: "2024-01-01",
  updatedAt: "2024-06-01",
};
console.log(post);

// ── 5. Type Alias for Functions ──────────────────────────────
// Name a function signature so it can be reused as a type.
type Predicate<T> = (value: T) => boolean;
type Transform<T, R> = (value: T) => R;
type EventHandler = (event: { type: string; payload: unknown }) => void;

const isEven: Predicate<number> = (n) => n % 2 === 0;
const toString: Transform<number, string> = (n) => `${n}`;

console.log(isEven(4)); // true
console.log(toString(42)); // "42"

// ── 6. Generic Type Aliases ──────────────────────────────────
// Write one type that works with any other type.
// <T> is filled in by the caller.
type Maybe<T> = T | null | undefined;  // value might not exist
type Pair<T, U> = [T, U];             // a two-element tuple
type Optional<T> = T & { optional?: true }; // adds an optional flag

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

const response: ApiResponse<User> = {
  data: { id: 1, name: "Manish", email: "m@e.com" },
  status: 200,
  message: "ok",
};

const nameOrNull: Maybe<string> = null; // valid
const namePair: Pair<string, number> = ["Manish", 25];
console.log(response.data.name); // Manish
console.log(namePair); // ['Manish', 25]

// ── 7. Mapped Types ──────────────────────────────────────────
// Transform every property of an existing type systematically.
// The syntax is: { [K in keyof T]: NewType }
// This is how all built-in utility types (Partial, Readonly, etc.)
// are implemented inside TypeScript itself.

// Make every property optional (this IS Partial<T>)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make every property readonly (this IS Readonly<T>)
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make every property nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type PartialUser = MyPartial<User>;
const draft: PartialUser = { name: "Manish" }; // id and email are optional now

type NullablePoint = Nullable<Point>;
const nullableOrigin: NullablePoint = { x: null, y: 0 }; // x is allowed to be null
console.log(draft);
console.log(nullableOrigin);

// ── 8. Conditional Types ─────────────────────────────────────
// A type that resolves to different types based on a condition.
// Syntax: T extends U ? TrueType : FalseType
// This is used heavily in TypeScript's own standard library.
type IsString<T> = T extends string ? "yes" : "no";

type CheckString = IsString<string>; // "yes"
type CheckNumber = IsString<number>; // "no"

// Practical: unwrap a Promise to get its resolved type
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

type ResolvedString = UnwrapPromise<Promise<string>>; // string
type ResolvedNumber = UnwrapPromise<Promise<number>>; // number
type PlainNumber    = UnwrapPromise<number>;           // number (not a Promise, stays as-is)

// ── 9. Template Literal Types ────────────────────────────────
// Build string literal types by combining other types.
// TypeScript evaluates these at compile time.
type Direction = "up" | "down" | "left" | "right";
type CSSProperty = `margin-${Direction}` | `padding-${Direction}`;
// Result: "margin-up" | "margin-down" | ... | "padding-up" | ...

const style: CSSProperty = "margin-left"; // valid
// const bad: CSSProperty = "border-left"; // Error

// Event naming pattern — very common in libraries
type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`;
// Result: "onClick" | "onFocus" | "onBlur"

const handler: HandlerName = "onClick"; // valid
console.log(handler); // onClick

// ── 10. Recursive Types ──────────────────────────────────────
// A type that refers to itself — used for tree structures,
// nested menus, JSON, and file system representations.
type TreeNode = {
  value: string;
  children?: TreeNode[]; // refers to itself
};

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]        // array of JSON values
  | { [key: string]: JSONValue }; // object with JSON values

const menu: TreeNode = {
  value: "root",
  children: [
    { value: "Home" },
    {
      value: "Products",
      children: [
        { value: "Laptops" },
        { value: "Phones" },
      ],
    },
    { value: "Contact" },
  ],
};
console.log(menu.children?.[1].value); // Products

// ── 11. ReturnType and Parameters Utility Types ──────────────
// Extract information FROM existing functions as types.
function createUser(name: string, age: number, role: string) {
  return { name, age, role, createdAt: new Date().toISOString() };
}

type NewUser = ReturnType<typeof createUser>;
// { name: string, age: number, role: string, createdAt: string }

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number, role: string]

const userArgs: CreateUserParams = ["Manish", 25, "admin"];
const newUser: NewUser = createUser(...userArgs);
console.log(newUser.name); // Manish

// ── 12. All Built-in Utility Types — Quick Reference ────────
//
//  Utility Type           What it does
//  ──────────────────     ─────────────────────────────────────────
//  Partial<T>             All properties become optional
//  Required<T>            All properties become required
//  Readonly<T>            All properties become readonly
//  Record<K, V>           Object type with keys K and value type V
//  Pick<T, K>             Keep only the keys K from T
//  Omit<T, K>             Remove the keys K from T
//  Exclude<T, U>          Remove union members assignable to U
//  Extract<T, U>          Keep only union members assignable to U
//  NonNullable<T>         Remove null and undefined from T
//  ReturnType<F>          Get the return type of a function
//  Parameters<F>          Get the parameter types as a tuple
//  InstanceType<C>        Get the instance type of a class
//  Awaited<T>             Unwrap a Promise (like UnwrapPromise above)

type PickedUser = Pick<User, "id" | "name">;
type OmittedUser = Omit<User, "email">;
type UserRecord = Record<string, User>;

const preview: PickedUser = { id: 1, name: "Manish" };
const noEmail: OmittedUser = { id: 1, name: "Manish" };
console.log(preview);  // { id: 1, name: 'Manish' }
console.log(noEmail);  // { id: 1, name: 'Manish' }

export {};
