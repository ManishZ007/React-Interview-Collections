// ============================================================
// OPTIMIZATION: React.memo
// ============================================================
// WHAT  — wraps a component so it only re-renders when its OWN
//          props change. Without memo, every parent re-render
//          causes every child to re-render too, even if the child's
//          props didn't change.
//
// WHEN  — use memo on a child component when ALL of these are true:
//          1. the parent re-renders frequently (e.g. has a counter)
//          2. the child's props rarely change
//          3. the child is expensive to render (big list, heavy UI)
//
// WHEN NOT TO USE — don't wrap every component by default.
//          memo has a small cost (comparing props on every render).
//          Only add it when you have a real performance problem.
//
// HOW IT WORKS HERE:
//   • <Child name="Rohan" /> receives a constant string prop.
//   • Parent has a counter that re-renders on every button click.
//   • WITHOUT memo: Child re-renders every time count changes.
//   • WITH    memo: Child skips re-render because name="Rohan"
//             never changes. Open the console to see the difference.
// ============================================================

import { memo, useState } from "react";

const Child = memo(({ name }: { name: string }) => {
  console.log("rendered");
  return <p>Name {name}</p>;
});

function Memo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count {count}</button>
      <Child name="Rohan" />
    </>
  );
}

export default Memo;
