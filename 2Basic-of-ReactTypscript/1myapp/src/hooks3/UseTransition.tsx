// ============================================================
// HOOK: useTransition
// ============================================================
// WHAT  — marks a state update as LOW PRIORITY (non-urgent).
//          React handles urgent updates (typing, clicking) first,
//          then runs the transition update when the browser is free.
//          This keeps the UI responsive under heavy work.
//
// WHEN  — use it when a state update triggers slow/heavy rendering:
//          • filtering or sorting a large list
//          • switching tabs that render lots of content
//          • any update that makes the UI feel "frozen" while typing
//
// WHEN NOT TO USE — don't use it for everything.
//          Only needed when a specific update is causing visible lag.
//          Simple state changes don't need it.
//
// SYNTAX:
//   const [isPending, startTransition] = useTransition()
//   startTransition(() => { setSlowState(newValue) })
//   • isPending — true while the transition is still running
//   • startTransition — wraps the low-priority update
//
// HOW IT WORKS HERE:
//   • User types in the input — setQuery() runs instantly (urgent).
//   • The filtering of userCollection is wrapped in startTransition
//     so it runs at low priority.
//   • While filtering is in progress, isPending is true → shows "Loading..."
//   • The input stays responsive — you can keep typing even while the
//     old list result is still being computed.
//
// DIFFERENCE FROM useDeferredValue:
//   useTransition  → you OWN the state update, wrap it in startTransition
//   useDeferredValue → you receive a value as a PROP, can't wrap it
// ============================================================

import { useState, useTransition, type ChangeEvent } from "react";

const userCollection: string[] = [
  "amitkumar",
  "riyasharma",
  "rohitverma",
  "sonalipatil",
  "vikramsingh",
  "priyamehta",
  "arjunrao",
  "nehagupta",
  "karanjoshi",
  "poojaiyer",
  "manishtiwari",
  "snehareddy",
  "ravindraNaik",
  "ankitaDesai",
  "sureshpillai",
  "deepakyadav",
  "kavitanair",
  "rahulchopra",
  "meenakshiIyer",
  "vijaykhanna",
  "anjalirao",
  "harshvardhan",
  "tanviagarwal",
  "gauravmalhotra",
  "ishitajain",
  "manojpandey",
  "swatikapoor",
  "nikhilbansal",
  "ritikagoel",
  "sandeepshah",
];

function UseTransition() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    startTransition(() => {
      const filtered = userCollection.filter((item) =>
        item.includes(e.target.value),
      );
      setList(filtered);
    });
  };

  return (
    <>
      <h1>Hello</h1>
      <input type="text" value={query} onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </>
  );
}

export default UseTransition;
