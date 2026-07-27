import { useReducer, type ChangeEvent } from "react";

// this is the shape of our counter state
type State = { countA: number; countB: number };

// these are all the possible actions we can dispatch, like a list of allowed instructions
type Action =
  | { type: "AIncrement" }
  | { type: "ADecrement" }
  | { type: "BIncrement" }
  | { type: "BDecrement" };

// reducer takes current state + action, and returns new state, it's like a pure function that decides what happens next
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "AIncrement":
      return { ...state, countA: state.countA + 1 }; // spread old state, only change countA
    case "ADecrement":
      return { ...state, countA: state.countA - 1 };
    case "BIncrement":
      return { ...state, countB: state.countB + 1 }; // countA stays same, only countB updates
    case "BDecrement":
      return { ...state, countB: state.countB - 1 };
  }
}

// this is the shape of our form state, separate from counter state
type ChangeState = { name: string; email: string };

// actions for form, each carries a payload (the actual typed value)
type ChangeAction =
  | { type: "Set_name"; payload: string }
  | { type: "Set_email"; payload: string };

// second reducer, completely independent from the counter reducer above
function changeReducer(state: ChangeState, action: ChangeAction): ChangeState {
  switch (action.type) {
    case "Set_name":
      return { ...state, name: action.payload }; // keep email as is, update name only
    case "Set_email":
      return {
        ...state,
        email: action.payload, // keep name as is, update email only
      };
  }
}

function UseReducer() {
  // useReducer gives us [currentState, dispatchFunction], dispatch is how we send actions to the reducer
  const [state, dispatch] = useReducer(reducer, { countA: 0, countB: 0 });

  // second independent useReducer for the form, totally separate from the counter one above
  const [inputState, inputDispatch] = useReducer(changeReducer, {
    name: "",
    email: "",
  });

  // this event handler reads the typed value and dispatches it as payload
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({ type: "Set_name", payload: e.target.value });
  };

  // same pattern here, just for email field
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    inputDispatch({ type: "Set_email", payload: e.target.value });
  };

  return (
    <>
      {/* reading current state values directly, no need for separate variables */}
      <h1>count A :- {state.countA}</h1>
      <h1>count B :- {state.countB}</h1>

      {/* each button just dispatches an action, reducer decides what actually happens */}
      <button onClick={() => dispatch({ type: "AIncrement" })}>
        A count +
      </button>
      <button onClick={() => dispatch({ type: "ADecrement" })}>
        A count -
      </button>
      <button onClick={() => dispatch({ type: "BIncrement" })}>
        B count +
      </button>
      <button onClick={() => dispatch({ type: "BDecrement" })}>
        B count -
      </button>

      {/* form values also come straight from reducer state */}
      <h1>name :- {inputState.name}</h1>
      <h1>email :- {inputState.email}</h1>
      <input type="text" onChange={handleChangeName} placeholder="Name" />
      <input type="text" onChange={handleChangeEmail} placeholder="Email" />
    </>
  );
}

export default UseReducer;
