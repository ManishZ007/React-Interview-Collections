// ============================================================
// CONTEXT PATTERN — File 4b of 4: ShowTheme (context consumer)
// ============================================================
// WHAT  — a component that READS from context.
// NOTE  — when ThemeButton calls toggleTheme, this component
//          automatically re-renders with the new theme value
//          because they share the same context. No props needed.
// ============================================================

import { useTheme } from "./useTheme";

function ShowTheme() {
  const { theme } = useTheme();
  return <h1>theme is {theme}</h1>;
}

export default ShowTheme;
