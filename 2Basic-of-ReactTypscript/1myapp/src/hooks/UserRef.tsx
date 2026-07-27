// ============================================================
// HOOK: useRef
// ============================================================
// WHAT  — holds a mutable value that persists across renders
//          WITHOUT causing a re-render when it changes.
// TWO USE CASES:
//   1. DOM ref   — attach to a JSX element to directly access it
//                  (focus, scroll, read dimensions, play/pause video)
//      const ref = useRef<HTMLInputElement>(null)
//      <input ref={ref} />
//      ref.current?.focus()
//
//   2. Mutable box — store a value (timer id, previous value, flag)
//                    that you need to read/write but must NOT trigger
//                    a re-render when it changes.
//      const timerRef = useRef<number | null>(null)
//
// KEY RULE — reading or writing ref.current never re-renders.
//             if you need the UI to update, use useState instead.
//
// THIS FILE shows use case 1: clicking a button focuses the input.
// ============================================================

import { useRef } from "react";

function UseRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleClick = () => {
    focusInput();
  };

  return (
    <>
      <h1>Hello Ref</h1>
      <input ref={inputRef} type="text" placeholder="email" />

      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default UseRef;
