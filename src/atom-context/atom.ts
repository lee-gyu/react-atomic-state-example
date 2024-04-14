export function atom<T>(defaultValue: T) {
  const context = {
    defaultValue,
  };

  return {
    get defaultValue() {
      return context.defaultValue;
    },
  };
}

export type Atom<T> = ReturnType<typeof atom<T>>;
