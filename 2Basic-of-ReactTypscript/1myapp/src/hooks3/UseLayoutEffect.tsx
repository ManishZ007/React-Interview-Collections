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
