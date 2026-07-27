// ============================================================
// CUSTOM HOOK: useFetch<T>
// ============================================================
// WHAT IS A CUSTOM HOOK?
//   A custom hook is just a regular function that:
//     1. starts with "use" (required — React uses this to apply the rules of hooks)
//     2. calls other React hooks inside (useState, useEffect, etc.)
//   That's it. There is no special API to learn.
//
// WHY WRITE CUSTOM HOOKS?
//   When multiple components do the same stateful thing (fetch data, listen
//   to window events, read localStorage), you extract that logic into one
//   function so you never repeat it. Components stay clean — they just
//   call the hook and get back the data they need.
//
// RULE: custom hooks share LOGIC, not STATE.
//   Each component that calls useFetch gets its own independent state.
//   They do not share the same loading/data/error variables.
//
// ── THIS HOOK: useFetch<T>(url) ──────────────────────────────
// WHAT  — fetches JSON from a URL and tracks three states:
//          loading (request in flight), data (success), error (failure).
//
// GENERIC <T> — the caller decides the shape of the response:
//   useFetch<ApiResponse>("https://...") → data is ApiResponse | null
//   One hook works for every endpoint without losing type safety.
//
// CLEANUP — the isCancelled flag prevents setState after unmount.
//   If the component unmounts while a fetch is in flight, the
//   .then() still runs — but isCancelled is true, so it does nothing.
//   This avoids the "Can't perform a React state update on unmounted
//   component" warning.
//
// USAGE:
//   const { data, loading, error } = useFetch<MyType>("https://...")
//   if (loading) return <Spinner />
//   if (error)   return <ErrorMsg message={error} />
//   return <div>{data?.someField}</div>
// ============================================================

import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((result: T) => {
        if (!isCancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
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

function UserProfile() {
  const { data, loading, error } = useFetch<ApiResponse>(
    "https://dummyjson.com/users",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error {error}</p>;

  console.log(data);

  return (
    <div>
      {data?.users.map((u) => (
        <p key={u.id}>{u.username}</p>
      ))}
    </div>
  );
}

export default UserProfile;
