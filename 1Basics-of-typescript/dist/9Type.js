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
const id = 1;
const name = "Manish";
const active = true;
console.log(id, name, active); // 1 Manish true
const origin = { x: 0, y: 0 };
const user = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(origin);
console.log(user);
function printId(id) {
    console.log(`ID: ${id}`);
}
printId(1); // ID: 1
printId("u42"); // ID: u42
const post = {
    id: 1,
    name: "Manish",
    email: "manish@email.com",
    createdAt: "2024-01-01",
    updatedAt: "2024-06-01",
};
console.log(post);
const isEven = (n) => n % 2 === 0;
const toString = (n) => `${n}`;
console.log(isEven(4)); // true
console.log(toString(42)); // "42"
const response = {
    data: { id: 1, name: "Manish", email: "m@e.com" },
    status: 200,
    message: "ok",
};
const nameOrNull = null; // valid
const namePair = ["Manish", 25];
console.log(response.data.name); // Manish
console.log(namePair); // ['Manish', 25]
const draft = { name: "Manish" }; // id and email are optional now
const nullableOrigin = { x: null, y: 0 }; // x is allowed to be null
console.log(draft);
console.log(nullableOrigin);
// Result: "margin-up" | "margin-down" | ... | "padding-up" | ...
const style = "margin-left"; // valid
// Result: "onClick" | "onFocus" | "onBlur"
const handler = "onClick"; // valid
console.log(handler); // onClick
const menu = {
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
function createUser(name, age, role) {
    return { name, age, role, createdAt: new Date().toISOString() };
}
// [name: string, age: number, role: string]
const userArgs = ["Manish", 25, "admin"];
const newUser = createUser(...userArgs);
console.log(newUser.name); // Manish
const preview = { id: 1, name: "Manish" };
const noEmail = { id: 1, name: "Manish" };
console.log(preview); // { id: 1, name: 'Manish' }
console.log(noEmail); // { id: 1, name: 'Manish' }
export {};
