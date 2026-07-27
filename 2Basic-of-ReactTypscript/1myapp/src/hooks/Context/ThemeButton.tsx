// ============================================================
// CONTEXT PATTERN — File 4a of 4: ThemeButton (context consumer)
// ============================================================
// WHAT  — a component that WRITES to context by calling toggleTheme.
// NOTE  — this component does not need to know about ThemeProvider
//          or how theme is stored. It just calls the hook and uses
//          what it gets. That is the power of Context + custom hooks.
// ============================================================

import { useTheme } from "./useTheme";

function ThemeButton() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>click</button>;
}

export default ThemeButton;
