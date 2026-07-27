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
