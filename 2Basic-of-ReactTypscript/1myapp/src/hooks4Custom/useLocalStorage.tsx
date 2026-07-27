// ============================================================
// CUSTOM HOOK: useLocalStorage<T>
// ============================================================
// WHAT  — works exactly like useState BUT also persists the value
//          to localStorage. Refresh the page — the value is still there.
//
// WHEN  — use it when you want state that survives a page reload:
//          • user preferences (theme, language, font size)
//          • a form the user might close and come back to
//          • a "remember me" type of toggle
//
// WHEN NOT TO USE — don't store large objects, sensitive data
//          (passwords, tokens), or data that should be server-side.
//          localStorage is synchronous and has a ~5MB limit.
//
// HOW IT WORKS — 3 steps:
//   1. On first call: read the existing value from localStorage.
//      If nothing is stored yet, use the initialValue you passed in.
//   2. Return [value, setValue] exactly like useState.
//   3. setValue does two things: update React state AND write to localStorage.
//
// USAGE:
//   const [theme, setTheme] = useLocalStorage<string>("theme", "light")
//   setTheme("dark")  ← persists to localStorage["theme"] automatically
//
// KEY INSIGHT: the API is identical to useState. Any component that
//   used useState can switch to useLocalStorage with zero refactor.
// ============================================================

import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  };

  return [storedValue, setValue] as const;
}

// ── Demo component ────────────────────────────────────────────
// Refresh the page — your name is still there.
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage<string>("username", "");

  return (
    <>
      <h2>useLocalStorage Demo</h2>
      <p>Stored name: {name || "(empty)"}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
      />
      <button onClick={() => setName("")}>Clear</button>
      <p style={{ fontSize: "0.85rem", color: "gray" }}>
        Refresh the page — the name is still there.
      </p>
    </>
  );
}

export default LocalStorageDemo;
