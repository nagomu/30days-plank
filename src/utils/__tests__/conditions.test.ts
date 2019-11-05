import { isEmptyArray } from '~/utils';

describe('isEmptyArray', () => {
  it('returns correct value', () => {
    expect(isEmptyArray([])).toEqual(true);
    expect(isEmptyArray(['1'])).toEqual(false);
  });
});
