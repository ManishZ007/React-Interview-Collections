// ============================================================
// CUSTOM HOOK: useToggle
// ============================================================
// WHAT  — manages a boolean value that flips between true and false.
//          The simplest possible example of a custom hook.
//
// WHY THIS EXISTS AS A HOOK:
//   Without it, every component that needs a toggle writes:
//     const [isOpen, setIsOpen] = useState(false)
//     const toggle = () => setIsOpen(prev => !prev)
//   That's 2 lines repeated everywhere. useToggle collapses it to 1 line.
//
// WHEN  — use it for any boolean you need to flip:
//          • modal open/closed
//          • sidebar visible/hidden
//          • dark mode on/off
//          • password show/hide
//
// USAGE:
//   const [isOpen, toggle] = useToggle()          // starts false
//   const [isVisible, toggle] = useToggle(true)   // starts true
//
//   <button onClick={toggle}>Toggle</button>
//
// KEY INSIGHT — this hook shows the MINIMUM viable custom hook:
//   • one useState
//   • one derived callback
//   • returns them as a tuple [value, action]
//   That's all a custom hook needs to be.
//
// ALSO NOTICE: it returns [value, toggle, setValue]
//   toggle → flips the value (most common use)
//   setValue → set to an explicit true/false (e.g. force-close a modal)
// ============================================================

import { useCallback, useState } from "react";

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue] as const;
}

// ── Demo component ────────────────────────────────────────────
function ToggleDemo() {
  const [isOpen, toggleModal] = useToggle();
  const [isDark, toggleTheme] = useToggle();
  const [showPassword, togglePassword] = useToggle();

  return (
    <>
      <h2>useToggle Demo</h2>

      <div>
        <button onClick={toggleModal}>{isOpen ? "Close Modal" : "Open Modal"}</button>
        {isOpen && <p>Modal is open!</p>}
      </div>

      <div>
        <button onClick={toggleTheme}>
          Theme: {isDark ? "Dark" : "Light"}
        </button>
      </div>

      <div>
        <input type={showPassword ? "text" : "password"} defaultValue="secret123" />
        <button onClick={togglePassword}>{showPassword ? "Hide" : "Show"}</button>
      </div>
    </>
  );
}

export default ToggleDemo;
