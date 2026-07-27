// ============================================================
// CONTEXT PATTERN — File 3 of 4: useTheme (custom hook)
// ============================================================
// WHAT  — a custom hook that wraps useContext(ThemeContext).
// WHY   — instead of calling useContext(ThemeContext) in every
//          component, you call useTheme() — one import, cleaner code.
//          The null-check + throw gives a clear error message if
//          someone uses this hook outside of ThemeProvider.
// WHEN TO WRITE A CUSTOM HOOK — anytime you find yourself repeating
//          the same useContext / useRef / useEffect logic in multiple
//          components. Extract it into a useXxx() function.
// ============================================================

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
