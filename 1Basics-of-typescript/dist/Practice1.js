"use strict";
// String ->
let greeting = "Hello World"; // this is how we define string in typescript
console.log(greeting.toUpperCase()); // that convert to Upper case
console.log(greeting.toLowerCase()); // that convert to Lower case
console.log(greeting.length); // that gives the length of the string
console.log(greeting.charAt(0)); // that gives the character at a given index
console.log(greeting.indexOf("World")); // that gives the position of a substring
console.log(greeting.slice(0, 5)); // that extracts a part of the string
console.log(greeting.split(" ")); // that splits the string into an array
console.log(greeting.replace("World", "TypeScript")); // that replaces part of the string
console.log(greeting.trim()); // that removes extra spaces from both ends
console.log(greeting.includes("Hello")); // that checks if the string contains a value
console.log(greeting.concat("!")); // that joins strings together
console.log(greeting.repeat(2)); // that repeats the string
// Number ->
console.log("\nNumber Operations");
let num = -45.6789; // this is how we define number in typescript
console.log(num.toFixed(2)); // that rounds to fixed decimal places
console.log(Math.abs(num)); // that gives the absolute (positive) value
console.log(Math.round(num)); // that rounds to nearest whole number
console.log(Math.floor(num)); // that rounds down to nearest whole number
console.log(Math.ceil(num)); // that rounds up to nearest whole number
console.log(Math.max(10, 25, 3)); // that gives the largest value
console.log(Math.min(10, 25, 3)); // that gives the smallest value
console.log(Math.pow(2, 3)); // that raises a number to a power
console.log(Math.sqrt(16)); // that gives the square root
console.log(num.toString()); // that converts number to string
console.log(Number.isInteger(num)); // that checks if it's a whole number
console.log(num.toPrecision(4)); // that gives number with set total digits
// Boolean
console.log("\nBoolean");
let isActive = true; // this is how we define boolean in typescript
console.log(!isActive); // that flips the value (negation)
console.log(isActive && false); // that checks if both are true (AND)
console.log(isActive || false); // that checks if either is true (OR)
console.log(Boolean(0)); // that converts a value to boolean
console.log(isActive.toString()); // that converts boolean to string
console.log(isActive === true); // that checks strict equality
// Array
console.log("\nArray");
let numbers = [1, 2, 3, 4, 5]; // this is how we define array in typescript
console.log(numbers.push(6)); // that adds an item to the end
console.log(numbers.pop()); // that removes the last item
console.log(numbers.map((n) => n * 2)); // that transforms every item
console.log(numbers.filter((n) => n > 2)); // that keeps items matching a condition
console.log(numbers.reduce((a, b) => a + b, 0)); // that combines items into one value
console.log(numbers.find((n) => n === 3)); // that gets the first matching item
console.log(numbers.includes(3)); // that checks if a value exists
console.log(numbers.sort()); // that arranges items in order
console.log(numbers.join(", ")); // that combines items into a string
// Object
console.log("\nObject");
let person = { name: "Ravi", age: 25 }; // this is how we define object in typescript
console.log(Object.keys(person)); // that gives all the keys
console.log(Object.values(person)); // that gives all the values
console.log(Object.entries(person)); // that gives key-value pairs
console.log({ ...person, city: "Mumbai" }); // that creates a copy with extra fields
console.log(JSON.stringify(person)); // that converts object to string
// Null and Undefined
console.log("\nNull and Undefined");
let empty = null; // this is how we define null in typescript
let notAssigned = undefined; // this is how we define undefined in typescript
console.log(empty ?? "default value"); // that gives fallback if null or undefined
console.log(empty === null); // that checks specifically for null
console.log(notAssigned === undefined); // that checks specifically for undefined
// Tuple
console.log("\nTuple");
let point = [10, 20]; // this is how we define tuple in typescript
console.log(point[0]); // that accesses first element
console.log(point.length); // that gives number of elements
// Enum
console.log("\nEnum");
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {})); // this is how we define enum in typescript
console.log(Color.Green); // that gives the numeric value
console.log(Color[1]); // that gives the name from the value
// Any / Unknown
console.log("\nAny / Unknown");
let flexible = "could be anything"; // this is how we define any in typescript
let cautious = 42; // this is how we define unknown in typescript
console.log(typeof flexible); // that tells the current data type
