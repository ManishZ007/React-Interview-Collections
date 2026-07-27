import { useId } from "react";

function UseId() {
  const id = useId(); // generates unique id like ":r0:"

  return (
    <>
      <label htmlFor={id}>Email {id}</label>
      <input id={id} type="email" />
    </>
  );
}

export default UseId;
