// ============================================================
// HOOK: useImperativeHandle
// ============================================================
// WHAT  — lets a PARENT call specific methods on a CHILD component.
//          Normally a parent can only pass data DOWN via props.
//          With useImperativeHandle, the parent can call child.focus()
//          or child.clear() directly — like calling a function on a class.
//
// WHEN  — use it when:
//          • a parent needs to trigger an action inside a child
//            (focus an input, reset a form, play a video)
//          • you don't want to expose the raw DOM ref to the parent —
//            you control exactly which methods they can call
//
// WHEN NOT TO USE — don't use it for passing data or state up.
//          That's what callbacks / props are for. useImperativeHandle
//          is only for triggering imperative actions (focus, scroll, reset).
//
// HOW IT WORKS HERE (3-step pattern):
//   STEP 1 — define the type (InputHandle) with only the methods you allow.
//   STEP 2 — wrap CustomInput in forwardRef so it can receive a ref from parent.
//   STEP 3 — useImperativeHandle fills that ref with your chosen methods.
//             The parent gets focus() and clear() — NOT the raw <input> node.
//
//   Parent side:
//     const childRef = useRef<InputHandle>(null)
//     childRef.current?.focus()   ← calls the method you defined
//
// KEY RULE: always pair useImperativeHandle with forwardRef.
//            One does not work without the other.
// ============================================================

import { forwardRef, useImperativeHandle, useRef } from "react";

type InputHandle = {
  focus: () => void;
  clear: () => void;
};

const CustomInput = forwardRef<InputHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} />;
});

function UseImperativeHandle() {
  const childRef = useRef<InputHandle>(null);
  return (
    <>
      <h1>Hello</h1>
      <CustomInput ref={childRef} />
      <button onClick={() => childRef.current?.focus()}>Focus</button>
      <button onClick={() => childRef.current?.clear()}>Clear</button>
    </>
  );
}

export default UseImperativeHandle;
