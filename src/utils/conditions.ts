// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyArray = (value: Array<any>): boolean =>
  !value || value.length < 1;
