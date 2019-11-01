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
  challenges: jest.fn().mockReturnValue({
    doc: jest.fn().mockReturnValue({
      update: jest.fn().mockReturnValue(Promise.resolve),
    }),
    add: jest.fn().mockReturnValue(
      Promise.resolve({
        get: jest.fn().mockReturnValue(
          Promise.resolve({
            exists: true,
            id: 'id',
          }),
        ),
      }),
    ),
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
    orderBy: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
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
      }),
    }),
  }),
}));
/* eslint-enable */
