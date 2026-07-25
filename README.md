# React & TypeScript Interview Collections

A structured, annotated collection for learning TypeScript and React from scratch — built for interview preparation and self-study. Each file is a standalone lesson: read the code top to bottom, run it, then try re-implementing it from memory.

---

## Project Structure

```
.
└── 1Basics-of-typescript/
    ├── src/                    ← source files you read and edit
    │   ├── 1DataTypes.ts       ← all TypeScript types with examples
    │   ├── 2Functions.ts       ← everything about typed functions
    │   └── 3Objects.ts         ← interfaces, type aliases, utility types
    ├── dist/                   ← compiled JS output (auto-generated, don't edit)
    ├── compile.sh              ← run a file on Linux / macOS
    ├── compile.bat             ← run a file on Windows
    ├── tsconfig.json           ← TypeScript compiler config
    └── info.txt                ← setup instructions
```

---

## How to Run Any File

### Step 1 — Install dependencies (one time only)

Make sure Node.js is installed: https://nodejs.org/en/download

Then install the TypeScript compiler globally:

```bash
npm install -g typescript
```

Verify it works:

```bash
tsc --version
```

---

### Step 2 — Run a file

Pass the filename **without** the `.ts` extension.

**On Linux / macOS:**

```bash
chmod +x compile.sh   # give permission once
./compile.sh 1DataTypes
./compile.sh 2Functions
./compile.sh 3Objects
```

**On Windows (Command Prompt or Git Bash):**

```bat
compile.bat 1DataTypes
compile.bat 2Functions
compile.bat 3Objects
```

The script compiles `src/<name>.ts` → `dist/<name>.js` and immediately runs it with Node.js. If compilation fails it prints the error and stops — it never runs broken code.

---

### Manual compile (without the script)

```bash
tsc src/2Functions.ts --ignoreConfig --outDir dist
node dist/2Functions.js
```

---

## Topics Covered

### `1DataTypes.ts` — TypeScript Type System

| Topic | What you learn |
|---|---|
| `string` | Common string methods: `toUpperCase`, `slice`, `split`, `replace`, `includes`, `trim` |
| `number` | Math methods: `toFixed`, `Math.abs/round/floor/ceil/max/min/pow/sqrt` |
| `boolean` | Logical operators: `!`, `&&`, `\|\|`, `Boolean()`, strict equality |
| `array` | Array methods: `push`, `pop`, `map`, `filter`, `reduce`, `find`, `includes`, `sort`, `join` |
| `object` | `Object.keys`, `Object.values`, `Object.entries`, spread, `JSON.stringify` |
| `null / undefined` | Nullish coalescing `??`, strict null checks |
| `tuple` | Fixed-length, fixed-type arrays — e.g. `[number, number]` |
| `enum` | Named numeric constants, reverse lookup |
| `any / unknown` | When to use each and why `unknown` is safer than `any` |

---

### `2Functions.ts` — Functions in TypeScript

Read this file from top to bottom. Each section builds on the one before it.

| Section | Topic | Key idea |
|---|---|---|
| 1 | Basic typed function | Parameter types + return type |
| 2 | String return | Type checking on return value |
| 3 | Arrow functions | Shorter syntax, common in React |
| 4 | `void` return | Function that performs an action, returns nothing |
| 5 | Optional parameters `?` | Parameter may be missing — will be `undefined` |
| 6 | Default parameters | Fallback value when argument is omitted |
| 7 | Rest parameters `...` | Accept unlimited arguments as a typed array |
| 8 | Function type alias | Name a function signature and reuse it as a type |
| 9 | Callbacks | Pass a function as an argument |
| 10 | Higher-order functions | A function that returns another function |
| 11 | Generic functions `<T>` | One function that works with any type safely |
| 12 | Function overloading | Same function name, different signatures |
| 13 | `never` return type | Function that throws or never terminates |
| 14 | Async functions | `async/await` with `Promise<T>` return type |

**Recommended study order:**
1 → 2 → 3 → 4 → 5 → 6 → 7 (master these first, they appear in every codebase)
8 → 9 → 10 (understand function types — needed for React props)
11 → 12 (generics — needed for reusable utilities)
13 → 14 (never + async — needed for API calls and error handling)

---

### `3Objects.ts` — Objects, Interfaces & Utility Types

| Section | Topic | Key idea |
|---|---|---|
| 1 | Inline object type | Quick annotation directly on a variable |
| 2 | Type alias | Name a shape for reuse — also works for unions and primitives |
| 3 | Interface | The standard way to describe an object's shape |
| 4 | Optional properties `?` | Field may or may not exist |
| 5 | Readonly properties | Field cannot be changed after creation |
| 6 | Extending interfaces | Build on an existing interface — like class inheritance |
| 7 | Type intersection `&` | Combine two types — object must satisfy both |
| 8 | Index signatures | Dynamic keys where you don't know all names upfront |
| 9 | Nested objects | An interface property is itself another interface |
| 10 | Utility types | `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record` |
| 11 | Type narrowing | TypeScript refines the type inside `if/typeof` blocks |
| 12 | Class with types | `public`, `private`, `readonly` access modifiers |

**Key rule to remember:**
- Use `interface` for object shapes — it can be extended and gives better error messages.
- Use `type` for everything else: unions (`string | number`), tuples, primitives, or complex combinations.

---

## How to Study Effectively

1. **Read first** — go through the file top to bottom, reading every comment.
2. **Run it** — use `compile.sh` or `compile.bat` to see the actual output.
3. **Break it** — change a type, pass a wrong argument, and read the TypeScript error. Errors teach faster than docs.
4. **Re-implement** — close the file and rewrite the section from scratch. If you get stuck, that is the exact gap to fill.
5. **Move to next file** — only after you can re-implement the current one without looking.

---

## Roadmap

### TypeScript Basics
- [x] Data Types (`string`, `number`, `boolean`, `array`, `tuple`, `enum`, `any`, `unknown`)
- [x] Functions (typed, optional, default, rest, generics, overloading, async)
- [x] Objects (interface, type alias, optional/readonly, extend, intersection, utility types)
- [ ] Union Types & Type Guards
- [ ] Generics in depth (generic interfaces, generic classes, constraints)
- [ ] Modules & Namespaces

### React with TypeScript
- [ ] React Basics (JSX, props, state)
- [ ] Functional Components with TypeScript
- [ ] Hooks (`useState`, `useEffect`, `useRef`, `useContext`)
- [ ] Custom Hooks
- [ ] Event Handling with proper types
- [ ] API Calls with `fetch` / `axios`
- [ ] Context API
- [ ] React Router
- [ ] Form Handling

---

## Prerequisites

- **Node.js** v18+ — https://nodejs.org
- **TypeScript** — `npm install -g typescript`
- Any code editor (VS Code recommended — has built-in TypeScript support)
