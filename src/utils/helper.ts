export function oneOf(scope: Array<unknown>): Function {
  return function (value: unknown): boolean {
    return scope.includes(value);
  };
}
