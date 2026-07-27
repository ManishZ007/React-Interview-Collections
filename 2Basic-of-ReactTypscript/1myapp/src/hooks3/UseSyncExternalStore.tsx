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
