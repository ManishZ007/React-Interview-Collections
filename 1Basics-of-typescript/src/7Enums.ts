// ============================================================
// TOPIC: Enums in TypeScript
// ============================================================
// An enum (short for enumeration) is a named set of constants.
// Instead of magic strings like "ADMIN" or magic numbers like 2
// scattered through your code, you define them once in one place
// and refer to them by name everywhere else.
//
// TypeScript has three kinds of enums:
//   1. Numeric enum   (default — values are 0, 1, 2, ...)
//   2. String enum    (values are explicit strings)
//   3. Const enum     (completely inlined at compile time)
// ============================================================

// ── 1. Numeric Enum ──────────────────────────────────────────
// Members get auto-incremented numbers starting from 0.
// You can change the starting number by assigning the first member.
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
console.log(Direction.Up);    // 0
console.log(Direction.Right); // 3

// Start from a different number
enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalError = 500,
}
console.log(HttpStatus.Ok);       // 200
console.log(HttpStatus.NotFound); // 404

// ── 2. Reverse Mapping (Numeric Enums Only) ──────────────────
// Numeric enums let you look up the NAME from the VALUE.
// This does NOT work with string enums.
console.log(Direction[0]); // "Up"
console.log(Direction[3]); // "Right"

console.log(HttpStatus[200]); // "Ok"
console.log(HttpStatus[404]); // "NotFound"

// ── 3. String Enum ───────────────────────────────────────────
// Every member must be assigned an explicit string value.
// String enums are safer and more readable in logs and APIs
// because you see "ADMIN" instead of just 1.
enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}
console.log(Role.Admin);  // ADMIN
console.log(Role.Viewer); // VIEWER

enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}
console.log(OrderStatus.Pending); // PENDING

// ── 4. Enum in a Function ────────────────────────────────────
// Use the enum type as a parameter type — TypeScript only accepts
// valid enum members, nothing else.
function getStatusMessage(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "Your order is waiting to be processed.";
    case OrderStatus.Processing:
      return "Your order is being prepared.";
    case OrderStatus.Completed:
      return "Your order has been delivered!";
    case OrderStatus.Cancelled:
      return "Your order was cancelled.";
  }
}
console.log(getStatusMessage(OrderStatus.Completed));
// Your order has been delivered!

// ── 5. Enum in a Switch Statement ────────────────────────────
// A switch over an enum is exhaustive when combined with never —
// TypeScript will error if you add a member and forget a case.
function getDirectionLabel(dir: Direction): string {
  switch (dir) {
    case Direction.Up:    return "Going Up ↑";
    case Direction.Down:  return "Going Down ↓";
    case Direction.Left:  return "Going Left ←";
    case Direction.Right: return "Going Right →";
    default:
      // Exhaustive check: if a new Direction is added, this becomes an error
      const exhausted: never = dir;
      return exhausted;
  }
}
console.log(getDirectionLabel(Direction.Up));   // Going Up ↑
console.log(getDirectionLabel(Direction.Left)); // Going Left ←

// ── 6. Enum as Object Key ────────────────────────────────────
// Map enum values to config objects. Very clean for lookup tables.
const rolePermissions: Record<Role, string[]> = {
  [Role.Admin]:  ["read", "write", "delete"],
  [Role.Editor]: ["read", "write"],
  [Role.Viewer]: ["read"],
};
console.log(rolePermissions[Role.Admin]);  // ['read', 'write', 'delete']
console.log(rolePermissions[Role.Viewer]); // ['read']

// ── 7. Const Enum ────────────────────────────────────────────
// const enums are completely erased at compile time — the compiler
// replaces every usage with the raw literal value. This produces
// smaller and faster JavaScript, but you can't iterate over them.
const enum Season {
  Spring = "SPRING",
  Summer = "SUMMER",
  Autumn = "AUTUMN",
  Winter = "WINTER",
}

// Compiled output will be: console.log("SUMMER") — no object at all
console.log(Season.Summer); // SUMMER
console.log(Season.Winter); // WINTER

// ── 8. Computed Members ──────────────────────────────────────
// Numeric enum members can use expressions, not just literals.
enum FilePermission {
  None    = 0,
  Read    = 1 << 0, // 1   (bitwise shift: binary 0001)
  Write   = 1 << 1, // 2   (binary 0010)
  Execute = 1 << 2, // 4   (binary 0100)
  All     = Read | Write | Execute, // 7 (binary 0111)
}
console.log(FilePermission.Read);    // 1
console.log(FilePermission.Write);   // 2
console.log(FilePermission.Execute); // 4
console.log(FilePermission.All);     // 7

// Check if a permission is set using bitwise AND
const userPermission = FilePermission.Read | FilePermission.Write; // 3
const canWrite = (userPermission & FilePermission.Write) !== 0;
console.log(canWrite); // true

// ── 9. Iterating Over an Enum ────────────────────────────────
// Object.keys / Object.values work on regular (non-const) enums.
// For numeric enums, filter out the reverse-mapping entries.
console.log(Object.values(Role)); // ['ADMIN', 'EDITOR', 'VIEWER']

// For numeric enums, Object.keys includes both names and numbers
const directionKeys = Object.keys(Direction).filter((k) => isNaN(Number(k)));
console.log(directionKeys); // ['Up', 'Down', 'Left', 'Right']

// ── 10. keyof typeof — Enum Key as Type ─────────────────────
// Get the union of enum member NAMES as a string literal type.
type RoleKey = keyof typeof Role; // "Admin" | "Editor" | "Viewer"

function getRoleByKey(key: RoleKey): Role {
  return Role[key];
}
console.log(getRoleByKey("Admin"));  // ADMIN
console.log(getRoleByKey("Viewer")); // VIEWER

// ── 11. Enum vs Literal Union — When to Use Which ────────────
// These two are often interchangeable. Here is the rule of thumb:
//
// Use ENUM when:
//   • The set of values is fixed and named in one central place
//   • You need reverse mapping (number → name)
//   • You iterate over all values at runtime (roles list, dropdown)
//   • You use const enum for zero-cost compile-time constants
//
// Use LITERAL UNION when:
//   • The values are simple and self-documenting ("pending" | "done")
//   • You don't need to iterate at runtime
//   • You want slightly simpler compiled output
//   • You're writing library types meant to be used externally
//
// Both options:
type StatusLiteral = "pending" | "done" | "failed"; // union approach
enum StatusEnum { Pending = "pending", Done = "done", Failed = "failed" } // enum approach

export {};
