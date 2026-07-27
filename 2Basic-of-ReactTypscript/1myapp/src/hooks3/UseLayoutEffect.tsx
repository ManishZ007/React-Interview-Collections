// ============================================================
// HOOK: useLayoutEffect
// ============================================================
// WHAT  — same as useEffect BUT fires SYNCHRONOUSLY after React
//          updates the DOM and BEFORE the browser paints the screen.
//          useEffect fires AFTER the browser paints.
//
// WHEN  — use useLayoutEffect when you need to:
//          • read a DOM measurement (width, height, position)
//          • and immediately adjust something based on that measurement
//          • so the user never sees the "before" state (no flicker)
//
// WHEN NOT TO USE — don't use it by default.
//          99% of the time useEffect is fine.
//          useLayoutEffect can block the browser paint and slow things down.
//          Only switch from useEffect → useLayoutEffect when you see flicker.
//
// SYNTAX — identical to useEffect:
//   useLayoutEffect(() => { ... }, [deps])
//
// HOW IT WORKS HERE:
//   • The ref attaches to the <div>.
//   • useLayoutEffect fires after React renders the div into the DOM.
//   • It reads the div's real height using getBoundingClientRect().
//   • Sets that height into state — React re-renders with the real value.
//   • All of this happens BEFORE the browser paints, so the user only
//     ever sees the correct height, never a flash of "0px".
//
// KEY RULE:
//   useEffect  → runs after paint  (async, no flicker risk)
//   useLayoutEffect → runs before paint (sync, use for DOM reads)
// ============================================================

import { useLayoutEffect, useRef, useState } from "react";

function UseLayoutEffect() {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);
  return (
    <>
      <h1>Hello</h1>
      <div ref={ref}>Height: {height}px</div>
    </>
  );
}

export default UseLayoutEffect;
