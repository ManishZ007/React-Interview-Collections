// ============================================================
// CONTEXT PATTERN — File 2 of 4: ThemeProvider
// ============================================================
// WHAT  — the Provider owns the state and makes it available to
//          every component inside it via the context value.
// HOW   — wrap your app (or a subtree) with <ThemeProvider>.
//          Any component inside can now call useTheme() to get
//          the theme value and toggleTheme function.
// USAGE in main.tsx or App.tsx:
//   <ThemeProvider>
//     <App />
//   </ThemeProvider>
// ============================================================

import { type ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev == "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
