// ============================================================
// HOOK: useCallback
// ============================================================
// WHAT  — caches a FUNCTION so the same function reference is
//          returned across re-renders (unless dependencies change).
//
// WHY THIS MATTERS — in JavaScript, a function defined inside a
//          component is recreated on every render:
//            const fn = () => {}  ← new object every render
//          So even if the function body is identical, React sees
//          it as a NEW prop, which breaks React.memo on the child.
//
// WHEN  — use useCallback when you pass a function as a prop to
//          a memo-wrapped child. Without it, memo is useless because
//          the child always gets a "new" function and re-renders anyway.
//
// WHEN NOT TO USE — don't wrap every function.
//          Only needed when the function is a prop to a memo child,
//          or as a dependency in another useMemo / useEffect.
//
// SYNTAX
//   const fn = useCallback(() => { ... }, [dep1, dep2])
//   dependency array: re-create the function only when deps change.
//     []   → function is created once and reused forever
//
// HOW IT WORKS HERE:
//   • Child is wrapped in memo — it skips re-renders if props match.
//   • handleClick is wrapped in useCallback with [] dependency.
//   • Parent re-renders when count changes.
//   • WITHOUT useCallback: handleClick is a new function every render
//             → memo sees a new prop → Child always re-renders.
//   • WITH    useCallback: handleClick is the same reference every
//             render → memo works → Child skips re-render.
//             Open console — "Child rendered" only prints once.
//
// DIFFERENCE FROM useMemo:
//   useCallback(() => fn, [])  ===  useMemo(() => () => fn, [])
//   useCallback → caches the FUNCTION
//   useMemo     → caches the RETURN VALUE of the function
// ============================================================

import { memo, useCallback, useState } from "react";

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Child Button</button>;
});

function UseCallBack() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("child button clicked");
  }, []);

  return (
    <>
      <h1>Hello</h1>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <Child onClick={handleClick} />
    </>
  );
}

export default UseCallBack;
