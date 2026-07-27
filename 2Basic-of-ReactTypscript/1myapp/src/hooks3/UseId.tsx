// ============================================================
// HOOK: useId
// ============================================================
// WHAT  — generates a UNIQUE, STABLE ID string (like ":r0:", ":r1:")
//          that is guaranteed to be the same on both server and client.
//
// WHEN  — use it to link a <label> to its <input> using htmlFor/id.
//          Every form field needs a unique id — useId handles that
//          automatically without you hardcoding "email-input-1".
//
// WHEN NOT TO USE — don't use it as a key in a list.
//          Keys need to come from your data (item.id, item.name).
//          useId generates component-level IDs, not data-level keys.
//
// SYNTAX:
//   const id = useId()
//   → returns a string like ":r0:", ":r1:", ":r2:" ...
//   → each call to useId() inside a component gives a different ID
//   → the same component always gets the same ID across renders
//
// HOW IT WORKS HERE:
//   • id is generated once for this component instance.
//   • The <label> uses htmlFor={id} and the <input> uses id={id}.
//   • They are linked — clicking the label focuses the input.
//   • If you render this component 3 times on the page, each
//     instance gets its own unique id automatically. No conflicts.
//
// KEY RULE: one useId call per form field.
//   For multiple fields, call useId multiple times or suffix:
//   const baseId = useId()
//   → use `${baseId}-email` and `${baseId}-name` for two fields
// ============================================================

import { useId } from "react";

function UseId() {
  const id = useId(); // generates unique id like ":r0:"

  return (
    <>
      <label htmlFor={id}>Email {id}</label>
      <input id={id} type="email" />
    </>
  );
}

export default UseId;
