// ============================================================
// HOOK: useDeferredValue
// ============================================================
// WHAT  — gives you a "stale" copy of a value that lags behind
//          the real value during heavy rendering.
//          React uses the old (deferred) value to render first,
//          then updates to the new value when the browser is free.
//
// WHEN  — use it when:
//          • you receive a value you can't control (a prop from parent,
//            or state from a context) and that value drives slow rendering
//          • you want the same benefit as useTransition but you don't
//            own the state update that produces the value
//
// WHEN NOT TO USE — if you OWN the setState call, use useTransition
//          instead. useDeferredValue is for values you RECEIVE, not set.
//
// SYNTAX:
//   const deferredValue = useDeferredValue(value)
//   • deferredValue matches value most of the time
//   • under heavy load it briefly stays on the OLD value
//     while React renders in the background with the new one
//
// HOW IT WORKS HERE:
//   • query updates instantly on every keystroke (fast, urgent).
//   • deferredQuery lags slightly behind query under load.
//   • The expensive filter runs on deferredQuery, not query.
//   • Result: the input feels instant — the list catches up separately.
//
// KEY INSIGHT:
//   deferredQuery === query   → normal render, no lag needed
//   deferredQuery !== query   → React is behind; use deferredQuery for
//                               heavy work so the fast state stays responsive
//
// DIFFERENCE FROM useTransition:
//   useTransition   → wraps a setState you OWN → gives you isPending flag
//   useDeferredValue → wraps a VALUE you receive → no isPending (infer by
//                      comparing value !== deferredValue)
// ============================================================

import { useDeferredValue, useState } from "react";

const bigDataArray: string[] = [
  "amitkumar",
  "riyasharma",
  "rohitverma",
  "sonalipatil",
  "vikramsingh",
  "priyamehta",
  "arjunrao",
  "nehagupta",
  "karanjoshi",
  "poojaiyer",
];

function UseDeferredValue() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // lags behind 'query' slightly under heavy load

  // filtering uses the deferred value, not the instant one
  const filtered = bigDataArray.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase()),
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default UseDeferredValue;
