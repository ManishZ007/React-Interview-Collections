// ============================================================
// TOPIC: Objects, Interfaces & Type Aliases in TypeScript
// ============================================================
// TypeScript gives you several tools to describe the shape of
// an object. Interfaces and type aliases are the most important.
// ============================================================
// ── 1. Inline Object Type ────────────────────────────────────
// Annotate an object shape directly in the variable declaration.
// Fine for one-off use, but gets messy when reused.
let person = { name: "Manish", age: 25 };
console.log(person.name); // Manish
const origin = { x: 0, y: 0 };
console.log(origin); // { x: 0, y: 0 }
const user = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(user); // { id: 1, name: 'Manish', email: 'manish@email.com' }
const laptop = { id: 101, name: "Laptop" };
const phone = { id: 102, name: "Phone", discount: 10 };
console.log(laptop.discount); // undefined
console.log(phone.discount); // 10
const config = { apiUrl: "https://api.example.com", version: 1 };
// config.apiUrl = "other"; // Error: Cannot assign to 'apiUrl' — it is read only.
console.log(config);
const dog = {
    name: "Bruno",
    breed: "Labrador",
    sound: () => "Woof!",
};
console.log(`${dog.name} says ${dog.sound()}`); // Bruno says Woof!
const post = {
    id: 1,
    name: "Manish",
    email: "manish@email.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-06-01",
};
console.log(post);
const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
};
console.log(headers["Content-Type"]); // application/json
const emp = {
    name: "Manish",
    address: { city: "Mumbai", country: "India" },
};
console.log(emp.address.city); // Mumbai
const guestUser = { name: "Guest" }; // id and email are optional now
const preview = { id: 1, name: "Manish" };
const noEmail = { id: 1, name: "Manish" };
const roles = { admin: true, editor: false, viewer: true };
console.log(guestUser); // { name: 'Guest' }
console.log(preview); // { id: 1, name: 'Manish' }
console.log(noEmail); // { id: 1, name: 'Manish' }
console.log(roles); // { admin: true, editor: false, viewer: true }
// ── 11. Type Narrowing ───────────────────────────────────────
// TypeScript narrows the type inside a condition block based on runtime checks.
// This lets you safely call type-specific methods without casting.
function printId(id) {
    if (typeof id === "string") {
        console.log(`String ID: ${id.toUpperCase()}`);
    }
    else {
        console.log(`Number ID: ${id}`);
    }
}
printId(42); // Number ID: 42
printId("abc"); // String ID: ABC
// ── 12. Class with TypeScript Types ──────────────────────────
// TypeScript adds access modifiers (public, private, protected)
// and type annotations to class properties and methods.
class BankAccount {
    owner;
    balance; // only accessible inside this class
    constructor(owner, // public + readonly set in one line
    initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
    getBalance() {
        return this.balance;
    }
}
const account = new BankAccount("Manish", 1000);
account.deposit(500); // Deposited 500. New balance: 1500
console.log(account.getBalance()); // 1500
export {};
