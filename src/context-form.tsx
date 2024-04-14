import { useReducer } from "react";

type FormState = typeof DEFAULT_FORM_STATE;

const DEFAULT_FORM_STATE = {
  name: "",
  age: "20",
};

function formReducer(state, action): FormState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_AGE":
      return { ...state, age: action.value };
    case "RESET":
      return { name: "", age: "" };
    default:
      console.warn("Unhandled action type", action.type);
      return state;
  }
}

function inputChangeReducerHandler(
  type: string,
  dispatch: Parameters<typeof formReducer>[1]
) {
  return (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, value: ev.target.value });
  };
}

export function NonAtomForm() {
  const [state, dispatch] = useReducer(formReducer, DEFAULT_FORM_STATE);

  return (
    <form className="form">
      <h2>Non Atomic Form</h2>
      <input
        placeholder="Please enter your name"
        type="text"
        value={state.name}
        onChange={inputChangeReducerHandler("SET_NAME", dispatch)}
      />
      <input
        placeholder="Please enter your age"
        type="number"
        value={state.age}
        onChange={inputChangeReducerHandler("SET_AGE", dispatch)}
      />
      <h4>Name: {state.name}</h4>
      <h4>Age: {state.age}</h4>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}
