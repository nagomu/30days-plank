/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('../collections', () => ({
  archives: jest.fn().mockReturnValue({
    add: jest.fn().mockReturnValue(Promise.resolve),
    get: jest.fn().mockReturnValue(
      Promise.resolve({
        empty: false,
        forEach: (callback: any) =>
          callback({
            id: 'id',
            data: () => ({ data: 'data' }),
          }),
      }),
    ),
  }),
}));
/* eslint-enable */
