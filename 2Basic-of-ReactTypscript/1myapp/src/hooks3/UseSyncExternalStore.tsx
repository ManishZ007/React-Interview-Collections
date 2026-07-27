// ============================================================
// HOOK: useSyncExternalStore
// ============================================================
// WHAT  — subscribes a component to a data source that lives OUTSIDE
//          of React (browser APIs, Zustand, Redux, localStorage, etc.)
//          and re-renders the component whenever that source changes.
//
// WHEN  — use it when you need to:
//          • read from browser APIs (navigator.onLine, window.innerWidth)
//          • integrate a third-party store (Redux, Zustand, Jotai use this internally)
//          • sync with any non-React source of truth
//
// WHEN NOT TO USE — if the data lives in React state or context,
//          use useState / useContext instead. This hook is only for
//          data that lives OUTSIDE React.
//
// SYNTAX — 3 parts you must provide:
//   const value = useSyncExternalStore(subscribe, getSnapshot)
//
//   subscribe(callback)  → add listener; when store changes, call callback;
//                           return a cleanup function that removes the listener
//   getSnapshot()        → return the CURRENT value from the store right now
//
// HOW IT WORKS HERE:
//   SUBSCRIBE  — adds "online" and "offline" event listeners to window.
//                React calls the callback when either event fires.
//                The return function removes both listeners (cleanup).
//
//   SNAPSHOT   — returns navigator.onLine (true = connected, false = not).
//
//   RESULT     — isOnline updates automatically when the network changes.
//                No useState, no useEffect needed — the hook handles all of it.
//
// KEY INSIGHT:
//   Before this hook, developers did:
//     const [isOnline, setIsOnline] = useState(navigator.onLine)
//     useEffect(() => { window.addEventListener("online", handler) ... })
//   useSyncExternalStore replaces that entire pattern with one call.
// ============================================================

import { useSyncExternalStore } from "react";

// external store - just plain browser API, not React state
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine; // current value from outside React
}

function UseSyncExternalStore() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return <p>Status: {isOnline ? "Online" : "Offline"}</p>;
}

export default UseSyncExternalStore;
