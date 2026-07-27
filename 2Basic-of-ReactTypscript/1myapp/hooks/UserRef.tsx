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
