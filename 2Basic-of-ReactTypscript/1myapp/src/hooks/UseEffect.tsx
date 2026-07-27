// ============================================================
// HOOK: useEffect
// ============================================================
// WHAT  — runs a side effect AFTER the component renders.
// WHEN  — fetching data, subscribing to events, setting timers,
//          syncing with external systems (localStorage, WebSocket).
// NEVER — do not fetch data or set state during render directly,
//          always put it inside useEffect.
//
// DEPENDENCY ARRAY controls when the effect re-runs:
//   useEffect(() => { ... })        → runs after EVERY render
//   useEffect(() => { ... }, [])   → runs ONCE on mount only
//   useEffect(() => { ... }, [id]) → runs when `id` changes
//
// CLEANUP — return a function to cancel the effect when the
//   component unmount or before the next run.
//   This file uses an isCancelled flag to prevent setting state
//   on an already-unmounted component — a very common real pattern.
// ============================================================

import { useEffect, useState } from "react";

type UserInfoType = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

type ApiResponse = {
  users: UserInfoType[];
  total: number;
  skip: number;
  limit: number;
};

function UseEffect() {
  const [users, setUsers] = useState<UserInfoType[] | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((result: ApiResponse) => {
        if (!isCancelled) setUsers(result.users);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <h1>Use Effect</h1>
      {users?.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.age}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}

export default UseEffect;
