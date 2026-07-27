import { useState } from "react";

function UseState() {
  // 1. Primitive types - TypeScript infers automatically
  const [count, setCount] = useState(0); //inferred as number
  const [name, setName] = useState(""); // inferred as string
  const [isOpen, setIsOpen] = useState(false); // inferred as boolean

  // 2. Explicit type - when you want to be clear or type is different from initial value
  const [count2, setCount2] = useState<number>(0); // explicitly typed as number

  // 3. Union type - value can be number OR null
  const [age, setAge] = useState<number | null>(null);

  // 4. Array type
  const [items, setItems] = useState<string[]>([]); // empty array of strings

  // 5. Object type - using inline type
  const [user, setUser] = useState<{ id: number; name: string }>();

  // 6. Object type - using a separate type (cleaner, reusable)
  type User = { id: number; name: string };
  const [user2, setUser2] = useState<User | null>(null); // object or null

  // 7. Array of objects
  const [users, setUsers] = useState<User[]>([]); // list of User objects

  // 8. Updating state using previous value (functional update)
  // setCount((prevCount) => prevCount + 1); // safest way when new value depends on old value

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default UseState;
