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
const user = { id: 1, name: "Manish", email: "manish@email.com" };
console.log(user);
const calc = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};
console.log(calc.add(10, 3)); // 13
console.log(calc.subtract(10, 3)); // 7
const laptop = { id: 1, name: "Laptop", price: 80000 };
const phone = { id: 2, name: "Phone", price: 40000, discount: 10 };
// laptop.id = 99; // Error: Cannot assign to 'id' because it is read only
console.log(laptop);
console.log(phone.discount); // 10
const dog = {
    name: "Bruno",
    age: 3,
    breed: "Labrador",
    bark: () => console.log("Woof!"),
};
dog.bark(); // Woof!
console.log(dog.name); // Bruno  (inherited from Animal)
const duck = {
    name: "Donald",
    age: 2,
    maxAltitude: 100,
    maxDepth: 5,
    fly: () => console.log("Flying!"),
    swim: () => console.log("Swimming!"),
    quack: () => console.log("Quack!"),
};
duck.fly(); // Flying!
duck.swim(); // Swimming!
duck.quack(); // Quack!
class Circle {
    radius;
    color;
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle {
    width;
    height;
    color;
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    getArea() { return this.width * this.height; }
    getPerimeter() { return 2 * (this.width + this.height); }
}
const shapes = [new Circle(5, "red"), new Rectangle(4, 6, "blue")];
shapes.forEach((s) => {
    console.log(`Area: ${s.getArea().toFixed(2)}, Color: ${s.color}`);
});
const toUpper = (s) => s.toUpperCase();
const trim = (s) => s.trim();
console.log(toUpper("hello")); // HELLO
console.log(trim("  hi  ")); // hi
const httpHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer abc123",
    Accept: "application/json",
};
console.log(httpHeaders["Content-Type"]); // application/json
const errors = {
    message: "Validation failed",
    name: "Name is required",
    email: "Invalid email format",
};
console.log(errors.message); // Validation failed
console.log(errors.email); // Invalid email format
// Use with a specific type
const userResponse = {
    data: { id: 1, name: "Manish", email: "manish@email.com" },
    status: 200,
    message: "Success",
};
const usersPage = {
    data: [
        { id: 1, name: "Manish", email: "m@e.com" },
        { id: 2, name: "Ravi", email: "r@e.com" },
    ],
    total: 50,
    page: 1,
    pageSize: 2,
};
console.log(userResponse.data.name); // Manish
console.log(usersPage.total); // 50
// Both declarations are merged — Window now has both properties
const appWindow = {
    appVersion: "1.0.0",
    isDarkMode: true,
};
console.log(appWindow); // { appVersion: '1.0.0', isDarkMode: true }
const emp = {
    id: 101,
    name: "Manish",
    role: "Developer",
    address: { street: "MG Road", city: "Mumbai", country: "India" },
    contact: { phone: "9999999999", email: "manish@work.com" },
};
console.log(`${emp.name} lives in ${emp.address.city}`); // Manish lives in Mumbai
export {};
