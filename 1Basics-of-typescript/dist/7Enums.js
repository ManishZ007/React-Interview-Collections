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
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up); // 0
console.log(Direction.Right); // 3
// Start from a different number
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["InternalError"] = 500] = "InternalError";
})(HttpStatus || (HttpStatus = {}));
console.log(HttpStatus.Ok); // 200
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
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Editor"] = "EDITOR";
    Role["Viewer"] = "VIEWER";
})(Role || (Role = {}));
console.log(Role.Admin); // ADMIN
console.log(Role.Viewer); // VIEWER
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "PENDING";
    OrderStatus["Processing"] = "PROCESSING";
    OrderStatus["Completed"] = "COMPLETED";
    OrderStatus["Cancelled"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
console.log(OrderStatus.Pending); // PENDING
// ── 4. Enum in a Function ────────────────────────────────────
// Use the enum type as a parameter type — TypeScript only accepts
// valid enum members, nothing else.
function getStatusMessage(status) {
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
function getDirectionLabel(dir) {
    switch (dir) {
        case Direction.Up: return "Going Up ↑";
        case Direction.Down: return "Going Down ↓";
        case Direction.Left: return "Going Left ←";
        case Direction.Right: return "Going Right →";
        default:
            // Exhaustive check: if a new Direction is added, this becomes an error
            const exhausted = dir;
            return exhausted;
    }
}
console.log(getDirectionLabel(Direction.Up)); // Going Up ↑
console.log(getDirectionLabel(Direction.Left)); // Going Left ←
// ── 6. Enum as Object Key ────────────────────────────────────
// Map enum values to config objects. Very clean for lookup tables.
const rolePermissions = {
    [Role.Admin]: ["read", "write", "delete"],
    [Role.Editor]: ["read", "write"],
    [Role.Viewer]: ["read"],
};
console.log(rolePermissions[Role.Admin]); // ['read', 'write', 'delete']
console.log(rolePermissions[Role.Viewer]); // ['read']
// Compiled output will be: console.log("SUMMER") — no object at all
console.log("SUMMER" /* Season.Summer */); // SUMMER
console.log("WINTER" /* Season.Winter */); // WINTER
// ── 8. Computed Members ──────────────────────────────────────
// Numeric enum members can use expressions, not just literals.
var FilePermission;
(function (FilePermission) {
    FilePermission[FilePermission["None"] = 0] = "None";
    FilePermission[FilePermission["Read"] = 1] = "Read";
    FilePermission[FilePermission["Write"] = 2] = "Write";
    FilePermission[FilePermission["Execute"] = 4] = "Execute";
    FilePermission[FilePermission["All"] = 7] = "All";
})(FilePermission || (FilePermission = {}));
console.log(FilePermission.Read); // 1
console.log(FilePermission.Write); // 2
console.log(FilePermission.Execute); // 4
console.log(FilePermission.All); // 7
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
function getRoleByKey(key) {
    return Role[key];
}
console.log(getRoleByKey("Admin")); // ADMIN
console.log(getRoleByKey("Viewer")); // VIEWER
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["Pending"] = "pending";
    StatusEnum["Done"] = "done";
    StatusEnum["Failed"] = "failed";
})(StatusEnum || (StatusEnum = {})); // enum approach
export {};
