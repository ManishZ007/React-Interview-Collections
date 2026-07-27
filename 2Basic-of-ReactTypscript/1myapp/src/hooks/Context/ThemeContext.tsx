// ============================================================
// CONTEXT PATTERN — File 1 of 4: ThemeContext
// ============================================================
// WHAT  — Context lets you share data across the whole component
//          tree without passing props down through every level
//          (called "prop drilling").
// WHEN  — use Context for truly global data: current user, theme,
//          language, auth status, shopping cart.
//          Do NOT use it for data that only 1-2 components need —
//          just pass props directly in that case.
//
// HOW THE PATTERN WORKS (all 4 files together):
//   ThemeContext.tsx   → defines the context shape (this file)
//   ThemeProvider.tsx  → holds the state, wraps children
//   useTheme.tsx       → custom hook — easy way to consume context
//   ThemeButton.tsx    → consumer: calls toggleTheme
//   ShowTheme.tsx      → consumer: reads theme value
//
// WHY undefined as default — createContext(undefined) forces every
//   consumer to be inside the Provider. The useTheme hook throws
//   a clear error if someone forgets to wrap with ThemeProvider.
// ============================================================

import { createContext } from "react";

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
