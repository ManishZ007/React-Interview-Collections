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
let id;
id = 101; // valid
id = "usr_42"; // also valid
// id = true;  // Error: boolean is not in the union
// Union in a function parameter
function printId(id) {
    console.log(`ID: ${id}`);
}
printId(1); // ID: 1
printId("abc"); // ID: abc
function move(direction) {
    console.log(`Moving: ${direction}`);
}
move("up"); // valid
function getStatusLabel(status) {
    if (status === "completed")
        return "Done";
    if (status === "cancelled")
        return "Cancelled";
    return "In Progress";
}
console.log(getStatusLabel("completed")); // Done
console.log(getStatusLabel("pending")); // In Progress
// ── 3. Type Narrowing with typeof ────────────────────────────
// TypeScript cannot call string methods on a number and vice versa.
// Inside an if/typeof block TypeScript NARROWS the type — it knows
// exactly which type you are working with in each branch.
function formatValue(value) {
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
function logError(error) {
    if (error instanceof Error) {
        // TypeScript knows: error is Error here
        console.log(`Error object: ${error.message}`);
    }
    else {
        // TypeScript knows: error is string here
        console.log(`String error: ${error}`);
    }
}
logError(new Error("Something broke")); // Error object: Something broke
logError("Network timeout"); // String error: Network timeout
function makeSound(animal) {
    if ("meow" in animal) {
        // TypeScript knows: animal is Cat here
        animal.meow();
    }
    else {
        // TypeScript knows: animal is Dog here
        animal.bark();
    }
}
makeSound({ meow: () => console.log("Meow!") }); // Meow!
makeSound({ bark: () => console.log("Woof!") }); // Woof!
function getArea(shape) {
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
function findUser(id) {
    const db = { 1: "Manish", 2: "Ravi" };
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
function isString(value) {
    return typeof value === "string";
}
function isUser(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj);
}
const raw = { id: 1, name: "Manish" };
if (isUser(raw)) {
    // TypeScript knows the shape here
    console.log(raw.name.toUpperCase()); // MANISH
}
// ── 9. Union in Arrays ───────────────────────────────────────
// An array where each element can be one of several types.
const mixed = [1, "two", 3, "four"];
console.log(mixed); // [1, 'two', 3, 'four']
// Process each element based on its type
mixed.forEach((item) => {
    if (typeof item === "number") {
        console.log(item * 2);
    }
    else {
        console.log(item.toUpperCase());
    }
});
const ok = { status: "success", data: "User created" };
const fail = { status: "error", data: null, errorCode: 404 };
console.log(ok);
console.log(fail);
function getAction(light) {
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
            const exhausted = light;
            return exhausted;
    }
}
console.log(getAction("red")); // Stop
console.log(getAction("green")); // Go
const clean = "hello"; // must be a string now
console.log(clean.toUpperCase()); // HELLO
export {};
