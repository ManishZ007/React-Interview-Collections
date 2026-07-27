# React & TypeScript Interview Collections

A structured, annotated collection for learning TypeScript and React with TypeScript — built for interview preparation and self-study.

Each file is a standalone lesson: **read the code top to bottom → run it → re-implement from memory.**

---

## Project Structure

```
.
├── 1Basics-of-typescript/          ← Phase 1: TypeScript fundamentals
│   ├── src/
│   │   ├── 1DataTypes.ts           ← string, number, boolean, array, tuple, enum, any
│   │   ├── 2Functions.ts           ← typed functions, generics, async, overloading
│   │   ├── 3Objects.ts             ← objects, interfaces, utility types, classes
│   │   ├── 4Array.ts               ← all array methods with typed examples
│   │   ├── 5Union.ts               ← union types, narrowing, discriminated unions
│   │   ├── 6Tuple.ts               ← fixed-length typed arrays, useState pattern
│   │   ├── 7Enums.ts               ← numeric, string, const enums + real use cases
│   │   ├── 8Interface.ts           ← deep dive: generics, implements, merging
│   │   └── 9Type.ts                ← mapped, conditional, template literal types
│   ├── dist/                       ← compiled JS (auto-generated, do not edit)
│   ├── compile.sh                  ← compile + run on Linux / macOS
│   ├── compile.bat                 ← compile + run on Windows
│   └── tsconfig.json
│
├── 2Basic-of-ReactTypscript/       ← Phase 2: React with TypeScript
│   └── 1myapp/                     ← Vite + React + TypeScript starter app
│       ├── src/
│       │   ├── hooks/              ← Level 1: core hooks
│       │   │   ├── UseState.tsx    ← useState — local UI state
│       │   │   ├── UseEffect.tsx   ← useEffect — API fetch with cleanup
│       │   │   ├── UseReducer.tsx  ← useReducer — complex state + form
│       │   │   ├── UserRef.tsx     ← useRef — DOM focus example
│       │   │   └── Context/        ← useContext — full theme pattern
│       │   │       ├── ThemeContext.tsx   ← shape + createContext
│       │   │       ├── ThemeProvider.tsx  ← owns state, wraps children
│       │   │       ├── useTheme.tsx       ← custom hook for consumers
│       │   │       ├── ThemeButton.tsx    ← consumer: writes
│       │   │       └── ShowTheme.tsx      ← consumer: reads
│       │   ├── hooks2/             ← Level 2: performance optimizations
│       │   │   ├── Memo.tsx        ← React.memo — skip child re-renders
│       │   │   ├── UseMemo.tsx     ← useMemo — cache expensive values
│       │   │   └── UseCallBack.tsx ← useCallback — cache function refs
│       │   ├── main.tsx            ← entry point
│       │   ├── App.tsx             ← root component
│       │   └── index.css
│       ├── public/
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── info.txt                        ← TypeScript setup notes
└── README.md                       ← this file
```

---

## How to Run — Phase 1 (TypeScript files)

### Setup (one time only)

Install Node.js: https://nodejs.org/en/download

```bash
npm install -g typescript
tsc --version
```

### Run any `.ts` file

Pass the filename **without** the `.ts` extension.

**Linux / macOS:**

```bash
cd 1Basics-of-typescript
chmod +x compile.sh        # give permission once
./compile.sh 1DataTypes
./compile.sh 2Functions
./compile.sh 9Type
```

**Windows:**

```bat
cd 1Basics-of-typescript
compile.bat 1DataTypes
compile.bat 2Functions
compile.bat 9Type
```

The script compiles `src/<name>.ts` → `dist/<name>.js` and immediately runs it. If the compile fails it stops — it never runs broken code.

**Manual (without the script):**

```bash
tsc src/2Functions.ts --ignoreConfig --outDir dist
node dist/2Functions.js
```

---

## How to Run — Phase 2 (React app)

```bash
cd 2Basic-of-ReactTypscript/1myapp
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser. The app hot-reloads — any change you save appears instantly.

---

## Phase 1 — TypeScript Topics

> Study order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

---

### `1DataTypes.ts` — The TypeScript Type System

| Type               | What you learn                                                               |
| ------------------ | ---------------------------------------------------------------------------- |
| `string`           | `toUpperCase`, `slice`, `split`, `replace`, `includes`, `trim`, `concat`     |
| `number`           | `toFixed`, `Math.abs/round/floor/ceil/max/min/pow/sqrt`                      |
| `boolean`          | `!`, `&&`, `\|\|`, `Boolean()`, strict equality `===`                        |
| `array`            | `push`, `pop`, `map`, `filter`, `reduce`, `find`, `includes`, `sort`, `join` |
| `object`           | `Object.keys/values/entries`, spread `{...obj}`, `JSON.stringify`            |
| `null / undefined` | Nullish coalescing `??`, strict null checks                                  |
| `tuple`            | Fixed-length, fixed-type arrays: `[number, number]`                          |
| `enum`             | Named numeric constants, reverse lookup                                      |
| `any / unknown`    | When to use each — `unknown` is safer than `any`                             |

---

### `2Functions.ts` — Functions in TypeScript

Each section builds on the one before it.

| #   | Topic                   | Key idea                                     |
| --- | ----------------------- | -------------------------------------------- |
| 1   | Basic typed function    | Annotate parameter types + return type       |
| 2   | String return           | Type checking on the return value            |
| 3   | Arrow functions         | Shorter syntax — very common in React        |
| 4   | `void` return type      | Function that acts but returns nothing       |
| 5   | Optional parameters `?` | Param may be missing — will be `undefined`   |
| 6   | Default parameters      | Fallback value when argument is omitted      |
| 7   | Rest parameters `...`   | Accept unlimited arguments as a typed array  |
| 8   | Function type alias     | Name a function signature and reuse it       |
| 9   | Callbacks               | Pass a function as an argument               |
| 10  | Higher-order functions  | A function that returns another function     |
| 11  | Generic functions `<T>` | One function that works safely with any type |
| 12  | Function overloading    | Same name, different signatures              |
| 13  | `never` return type     | Function that throws or never terminates     |
| 14  | Async / `Promise<T>`    | `async/await` with typed return value        |

> **Study tip:** Master sections 1–7 first — they appear in every React codebase. Sections 8–10 are needed for typed props. Sections 11–14 are needed for API utilities and advanced hooks.

---

### `3Objects.ts` — Objects, Interfaces & Utility Types

| #   | Topic                   | Key idea                                                    |
| --- | ----------------------- | ----------------------------------------------------------- |
| 1   | Inline object type      | Quick shape annotation on a variable                        |
| 2   | Type alias              | Name a shape for reuse                                      |
| 3   | Interface               | Standard way to describe an object's shape                  |
| 4   | Optional properties `?` | Field may or may not exist                                  |
| 5   | Readonly properties     | Field cannot change after creation                          |
| 6   | Extending interfaces    | Build on an existing interface                              |
| 7   | Type intersection `&`   | Object must satisfy both types                              |
| 8   | Index signatures        | Dynamic keys: headers, dictionaries                         |
| 9   | Nested objects          | Interface property is another interface                     |
| 10  | Utility types           | `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record` |
| 11  | Type narrowing          | TypeScript refines type inside `if/typeof`                  |
| 12  | Classes with types      | `public`, `private`, `readonly` modifiers                   |

> **Rule:** Use `interface` for object shapes. Use `type` for everything else (unions, tuples, primitives, complex combinations).

---

### `4Array.ts` — Arrays in TypeScript

| #   | Topic                        | Key idea                                                     |
| --- | ---------------------------- | ------------------------------------------------------------ |
| 1   | Declaring arrays             | `number[]` vs `Array<number>` vs `ReadonlyArray<number>`     |
| 2   | push / pop / shift / unshift | Add and remove at both ends                                  |
| 3   | `map()`                      | Transform every element → new array. Core React list pattern |
| 4   | `filter()`                   | Keep matching elements → new array                           |
| 5   | `reduce()`                   | Collapse array to a single value (sum, object, count)        |
| 6   | `forEach()`                  | Iterate for side effects — returns nothing                   |
| 7   | `find()` & `findIndex()`     | First matching element or its index                          |
| 8   | `some()` & `every()`         | Does any / do all elements satisfy a condition               |
| 9   | `includes()` & `indexOf()`   | Existence check and position lookup                          |
| 10  | `slice()`                    | Extract a portion without mutating                           |
| 11  | `splice()`                   | Insert, remove, or replace in place                          |
| 12  | `sort()`                     | Always use a comparator for numbers                          |
| 13  | `concat()` & spread `...`    | Merge arrays without mutation                                |
| 14  | `flat()` & `flatMap()`       | Flatten nested arrays                                        |
| 15  | `Array.from()`               | Create arrays from iterable or ranges                        |
| 16  | `fill()`                     | Fill a range with a fixed value                              |
| 17  | Method chaining              | `filter → map → reduce` in one pipeline                      |
| 18  | Destructuring                | Unpack into variables — used with React hooks                |

---

### `5Union.ts` — Union Types & Type Guards

| #   | Topic                         | Key idea                                              |
| --- | ----------------------------- | ----------------------------------------------------- |
| 1   | Basic union `\|`              | Value can be one of several types                     |
| 2   | Literal union types           | Restrict to exact values: `"up" \| "down"`            |
| 3   | Narrowing with `typeof`       | TypeScript knows the exact type in each branch        |
| 4   | Narrowing with `instanceof`   | Narrow between class instances                        |
| 5   | Narrowing with `in`           | Check if a property exists to tell interfaces apart   |
| 6   | **Discriminated unions**      | Shared `kind` field → automatic narrowing in `switch` |
| 7   | Union with `null / undefined` | Safe access with `?.` and fallback with `??`          |
| 8   | Type predicates               | Custom guard: `value is string`                       |
| 9   | Union in arrays               | `(string \| number)[]` — process each by its type     |
| 10  | Union in interfaces           | Properties that accept multiple types                 |
| 11  | Exhaustive check with `never` | Catch unhandled union members at compile time         |
| 12  | `Extract` & `Exclude`         | Filter union members — `NonNullable<T>` shortcut      |

> **Section 6 (Discriminated Unions) is the most important** — it appears in Redux, React state machines, and almost every large TypeScript codebase.

---

### `6Tuple.ts` — Tuples

| #   | Topic                      | Key idea                                             |
| --- | -------------------------- | ---------------------------------------------------- |
| 1   | Basic tuple `[T1, T2]`     | Fixed-length array — each position has its own type  |
| 2   | Named tuples               | Label each position: `[x: number, y: number]`        |
| 3   | Tuple Destructuring        | Unpack into variables — exactly how `useState` works |
| 4   | Function returning a tuple | Return multiple values without an object wrapper     |
| 5   | useState-style pattern     | Build the `[getter, setter]` hook pattern yourself   |
| 6   | Optional elements `?`      | Last elements can be omitted                         |
| 7   | Rest elements `...`        | Variable-length tail in a typed tuple                |
| 8   | Readonly tuple             | Elements cannot be changed after creation            |
| 9   | Spread tuple into function | Pass a tuple directly as function arguments          |
| 10  | Array of tuples            | Structured records — `Object.entries` pattern        |

---

### `7Enums.ts` — Enums

| #   | Topic                      | Key idea                                        |
| --- | -------------------------- | ----------------------------------------------- |
| 1   | Numeric enum               | Auto-incremented values (0, 1, 2, ...)          |
| 2   | Reverse mapping            | Name from value: `Direction[0]` → `"Up"`        |
| 3   | String enum                | Explicit string values — safer in logs and APIs |
| 4   | Enum in a function         | TypeScript rejects values outside the enum      |
| 5   | Enum in a switch           | Exhaustive check with `never`                   |
| 6   | Enum as object key         | `Record<Role, string[]>` permission tables      |
| 7   | Const enum                 | Inlined at compile time — zero runtime cost     |
| 8   | Computed / bitwise members | `1 << 0`, `1 << 1` — file permission flags      |
| 9   | Iterating over an enum     | `Object.values`, filtering reverse entries      |
| 10  | `keyof typeof`             | Enum member names as a string literal union     |
| 11  | Enum vs literal union      | Decision guide — when to use each               |

---

### `8Interface.ts` — Interfaces (Deep Dive)

| #   | Topic                          | Key idea                                     |
| --- | ------------------------------ | -------------------------------------------- |
| 1   | Basic interface                | Object shape                                 |
| 2   | Method signatures              | Two ways to declare methods in an interface  |
| 3   | Optional & readonly            | `?` and `readonly` modifiers                 |
| 4   | Extending one interface        | Inherit + add new properties                 |
| 5   | Extending multiple interfaces  | `extends A, B` — satisfies both contracts    |
| 6   | `implements` in a class        | Class must provide all interface members     |
| 7   | Interface for function types   | Describe a callable                          |
| 8   | Index signatures               | Dynamic keys — headers, error maps           |
| 9   | Generic interfaces             | `ApiResponse<T>`, `PaginatedResponse<T>`     |
| 10  | Declaration merging            | Two declarations of the same name are merged |
| 11  | Nested interfaces              | Interface property is another interface      |
| 12  | Interface vs type — full table | Side-by-side feature comparison              |

---

### `9Type.ts` — Type Aliases (Deep Dive)

| #   | Topic                         | Key idea                                                       |
| --- | ----------------------------- | -------------------------------------------------------------- |
| 1   | Primitive aliases             | Give domain meaning to `string`, `number`, `boolean`           |
| 2   | Object shape                  | Same as interface for simple objects                           |
| 3   | Union types                   | Only `type` can express `A \| B`                               |
| 4   | Intersection types            | `A & B` — must satisfy both                                    |
| 5   | Function types                | `Predicate<T>`, `Transform<T,R>` — reusable signatures         |
| 6   | Generic type aliases          | `Maybe<T>`, `Pair<T,U>`, `ApiResponse<T>`                      |
| 7   | Mapped types                  | `{ [K in keyof T]: ... }` — how `Partial`/`Readonly` are built |
| 8   | Conditional types             | `T extends U ? A : B` — type-level if/else                     |
| 9   | Template literal types        | `"onClick"`, `"margin-left"` — string types from unions        |
| 10  | Recursive types               | `TreeNode`, `JSONValue` — types that refer to themselves       |
| 11  | `ReturnType` & `Parameters`   | Extract types from existing functions                          |
| 12  | All utility types — reference | Full table of every built-in utility type                      |

---

## Phase 2 — React with TypeScript

> **Prerequisite:** Complete Phase 1 through at least `5Union.ts` before starting here.

All React lessons live inside `2Basic-of-ReactTypscript/1myapp/src/`. Open the project, run `npm run dev`, and edit `App.tsx` to see your changes live in the browser.

### Level 1 — Core Hooks (`hooks/`)

| Hook         | File             | Use when                                                |
| ------------ | ---------------- | ------------------------------------------------------- |
| `useState`   | `UseState.tsx`   | UI needs to react to a changing value                   |
| `useEffect`  | `UseEffect.tsx`  | fetch data, subscribe, sync with external system        |
| `useReducer` | `UseReducer.tsx` | multiple related fields or complex state transitions    |
| `useRef`     | `UserRef.tsx`    | access a DOM element or store a value without re-render |
| `useContext` | `Context/`       | share data across many components without prop drilling |

### Level 2 — Performance Optimizations (`hooks2/`)

| Tool          | File              | Use when                                                 |
| ------------- | ----------------- | -------------------------------------------------------- |
| `React.memo`  | `Memo.tsx`        | child re-renders too often despite props not changing    |
| `useMemo`     | `UseMemo.tsx`     | a calculation is slow and the component re-renders often |
| `useCallback` | `UseCallBack.tsx` | passing a function prop to a `memo`-wrapped child        |

**The golden rule for Level 2:** these three always work together.
`memo` stops re-renders → but only works if props are stable →
`useCallback` stabilizes function props → `useMemo` stabilizes object/array props.

**Do not add them by default.** Only use when you have a real render performance problem. Open the browser console and watch for unnecessary re-renders first.

### Context Pattern — Reading Order

The 5 files inside `Context/` form one complete pattern. Read them in this order:

```
ThemeContext.tsx   → defines the shape (what data exists)
ThemeProvider.tsx  → owns the state, wraps the tree
useTheme.tsx       → custom hook, the only import consumers need
ThemeButton.tsx    → consumer that WRITES (calls toggleTheme)
ShowTheme.tsx      → consumer that READS (displays theme)
```

### Roadmap

**Level 1 — Core Hooks**

- [x] `useState` — primitive, union, array, object, functional update
- [x] `useEffect` — API fetch, cleanup / cancellation flag
- [x] `useReducer` — typed State + Action, dual reducer example
- [x] `useRef` — DOM ref, focus example
- [x] `useContext` + custom hook — full theme context pattern

**Level 2 — Performance**

- [x] `React.memo` — skip child re-render when props unchanged
- [x] `useMemo` — cache expensive computed value
- [x] `useCallback` — cache function reference for memo children

**Next**

- [ ] Props typing with `interface`
- [ ] Event handling (`React.MouseEvent`, `React.ChangeEvent`)
- [ ] Conditional rendering
- [ ] Rendering lists with `.map()` and `key`
- [ ] Custom hooks
- [ ] React Router
- [ ] Form handling

---

## How to Study Effectively

1. **Read** — go through the file top to bottom, reading every comment.
2. **Run** — use the compile script to see the actual output in your terminal.
3. **Break it** — pass a wrong type, remove a required property, and read the TypeScript error. Errors teach faster than docs.
4. **Re-implement** — close the file and rewrite each section from scratch. Getting stuck tells you exactly what to revisit.
5. **Move on** — only move to the next file after you can re-implement the current one without looking.

---

## Prerequisites

| Tool       | Version | Install                                       |
| ---------- | ------- | --------------------------------------------- |
| Node.js    | v18+    | https://nodejs.org                            |
| TypeScript | latest  | `npm install -g typescript`                   |
| Editor     | any     | VS Code recommended (has built-in TS support) |
