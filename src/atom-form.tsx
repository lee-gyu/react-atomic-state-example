import { atom } from "./atom-context/atom.js";
import { useAtom, useAtomValue, useSetAtom } from "./atom-context/context.js";

const formAtom = {
  name: atom(""),
  age: atom("20"),
};

function NameField() {
  const [name, setName] = useAtom(formAtom.name);

  return (
    <input value={name} onChange={(ev) => setName(ev.currentTarget.value)} />
  );
}

function AgeField() {
  const [age, setAge] = useAtom(formAtom.age);

  return (
    <input
      type="number"
      value={age}
      onChange={(ev) => setAge(ev.currentTarget.value)}
    />
  );
}

function PrintNameInfo() {
  const name = useAtomValue(formAtom.name);

  return <h4>Name: {name}</h4>;
}

function PrintAgeInfo() {
  const age = useAtomValue(formAtom.age);

  return <h4>Age: {age}</h4>;
}

export function AtomForm() {
  const setName = useSetAtom(formAtom.name);
  const setAge = useSetAtom(formAtom.age);

  return (
    <form className="form">
      <h2>Atomic Form</h2>
      <NameField />
      <AgeField />
      <PrintNameInfo />
      <PrintAgeInfo />
      <button type="button" onClick={() => (setName(""), setAge(""))}>
        Reset
      </button>
    </form>
  );
}
