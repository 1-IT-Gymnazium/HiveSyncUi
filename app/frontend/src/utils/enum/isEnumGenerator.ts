const isEnumGenerator = <
  T extends Record<string, string | number>,
>(enumObj: T) => {
  const values = new Set(Object.values(enumObj));
  return (value: unknown): value is T[keyof T] => values.has(value as T[keyof T]);
};

export default isEnumGenerator;
