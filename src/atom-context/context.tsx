import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { type Atom } from "./atom.js";

type AtomStore = ReturnType<typeof createAtomStore>;

type AtomInstance<T> = {
  atom: Atom<T>;
  value: T;
  dispatchList: Array<AtomDispatch<T>>;
};

type AtomDispatch<T> = (nextState: T) => T;

function createAtomStore() {
  const atomMap = new Map<Atom<unknown>, AtomInstance<unknown>>();

  return {
    getAtomValue,
    dispatchAtomState,
    addDispatch,
    removeDispatch,
  };

  function getAtomInstance<T>(atom: Atom<T>) {
    let instance = atomMap.get(atom);

    if (!instance) {
      instance = {
        atom,
        value: atom.defaultValue,
        dispatchList: [],
      };

      atomMap.set(atom, instance);
    }

    return instance;
  }

  function getAtomValue<T>(atom: Atom<T>) {
    return getAtomInstance(atom).value as T;
  }

  function addDispatch<T>(atom: Atom<T>, dispatch: AtomDispatch<T>) {
    getAtomInstance(atom).dispatchList.push(dispatch);
  }

  function removeDispatch<T>(atom: Atom<T>, dispatch: AtomDispatch<T>) {
    const instance = getAtomInstance(atom);

    instance.dispatchList = instance.dispatchList.filter((d) => d !== dispatch);
  }

  function dispatchAtomState<T>(atom: Atom<T>) {
    return function setAtomState(value: T) {
      const instance = getAtomInstance(atom);

      instance.value = value;
      instance.dispatchList.forEach((dispatch) => dispatch(value));
    };
  }
}

const atomContext = createContext<AtomStore>(createAtomStore());

interface AtomContextProps {
  store?: AtomStore;
}

export function AtomContext(props: PropsWithChildren<AtomContextProps>) {
  const atomStore = useRef(props.store ?? createAtomStore());

  return (
    <atomContext.Provider value={atomStore.current}>
      {props.children}
    </atomContext.Provider>
  );
}

export function useAtom<T>(atom: Atom<T>): [T, Dispatch<T>] {
  return [useAtomValue(atom), useSetAtom(atom)];
}

function reducer<T>(_: T, nextState: T) {
  return nextState;
}

export function useAtomValue<T>(atom: Atom<T>) {
  const { getAtomValue, addDispatch, removeDispatch } = useContext(atomContext);
  const [state, dispatch] = useReducer(reducer, getAtomValue(atom));

  useEffect(function registerAtomDispatch() {
    addDispatch(atom, dispatch);

    return () => removeDispatch(atom, dispatch);
  }, []);

  return state as T;
}

export function useSetAtom<T>(atom: Atom<T>) {
  return useContext(atomContext).dispatchAtomState<T>(atom);
}
