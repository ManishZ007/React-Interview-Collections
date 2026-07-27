// ============================================================
// CUSTOM HOOK: useDebounce<T>
// ============================================================
// WHAT  — delays updating a value until the user STOPS changing it
//          for a specified number of milliseconds.
//
// THE PROBLEM IT SOLVES:
//   A search input fires onChange on every single keystroke.
//   If you call an API on every keystroke, you make dozens of
//   unnecessary requests as the user types "manish":
//     m → API call
//     ma → API call
//     man → API call
//     mani → API call
//     manis → API call
//     manish → API call  (only this one is needed!)
//   Debounce waits until typing stops, then fires once.
//
// WHEN  — use it when:
//          • a search input that calls an API on every keystroke
//          • a resize / scroll handler that is too expensive to run constantly
//          • any input that triggers heavy work on change
//
// HOW IT WORKS:
//   Every time `value` changes, a setTimeout is started.
//   If value changes again BEFORE the delay expires, the old timer
//   is cancelled (clearTimeout in the cleanup) and a new one starts.
//   The debounced value only updates when the timer actually fires —
//   meaning the user stopped typing for `delay` milliseconds.
//
// USAGE:
//   const [query, setQuery] = useState("")
//   const debouncedQuery = useDebounce(query, 500)
//
//   useEffect(() => {
//     if (debouncedQuery) fetchResults(debouncedQuery)
//   }, [debouncedQuery])  ← fires only 500ms after typing stops
//
// KEY INSIGHT:
//   query     → updates on every keystroke (fast, drives the input display)
//   debouncedQuery → updates only after 500ms of silence (slow, drives the API)
// ============================================================

import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // cancel previous timer on every change
  }, [value, delay]);

  return debouncedValue;
}

// ── Demo component ────────────────────────────────────────────
// Watch the console — "searching for..." only prints 500ms after you stop typing.
function DebounceDemo() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("searching for:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <>
      <h2>useDebounce Demo</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <p>Live value: {query}</p>
      <p>Debounced (500ms): {debouncedQuery}</p>
      <p style={{ fontSize: "0.85rem", color: "gray" }}>
        Open console — API call only fires when you stop typing.
      </p>
    </>
  );
}

export default DebounceDemo;
