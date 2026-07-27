// ============================================================
// HOOK: useMemo
// ============================================================
// WHAT  — caches the RESULT of an expensive calculation.
//          The calculation only re-runs when its dependencies change.
//          Between re-renders it returns the cached result instantly.
//
// WHEN  — use useMemo when:
//          • a calculation is slow (sorting/filtering a big list,
//            heavy math, building a derived data structure)
//          • the component re-renders often for unrelated reasons
//            (like a sibling state change or parent re-render)
//
// WHEN NOT TO USE — don't wrap every calculation.
//          Simple additions or array lookups are fast enough.
//          Only memoize when you can measure it is actually slow.
//
// SYNTAX
//   const result = useMemo(() => expensiveWork(), [dep1, dep2])
//   dependency array works exactly like useEffect:
//     []        → compute once on mount, never again
//     [items]   → re-compute only when items changes
//     no array  → re-compute on every render (pointless — don't do this)
//
// HOW IT WORKS HERE:
//   • total = sum of all items — imagine items is a huge array.
//   • count button re-renders the component every click.
//   • WITHOUT useMemo: sum recalculates on every count click.
//   • WITH    useMemo: sum only recalculates when items changes.
//             Open console — "calculating..." only prints when
//             items changes, not when count changes.
//
// DIFFERENCE FROM useCallback:
//   useMemo    → caches a VALUE  (the result of a function)
//   useCallback → caches a FUNCTION (the function itself)
// ============================================================

import { useMemo, useState } from "react";

function UseMenoCalculate({ items }: { items: number[] }) {
  const [count, setCount] = useState(0);

  const total = useMemo(() => {
    console.log("calculatting...");
    return items.reduce((sum, n) => sum + n, 0);
  }, [items]);

  return (
    <>
      <p>Total: {total}</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count}</button>
    </>
  );
}

export default UseMenoCalculate;
