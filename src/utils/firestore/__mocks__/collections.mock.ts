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
  batchChallenges: jest.fn().mockReturnValue({
    batch: {
      commit: jest.fn().mockReturnValue(Promise.resolve),
      set: jest.fn(),
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ref: { doc: () => ({ id: 'id' }) },
  }),
  // TODO: Add 'user doesn't exist pattern'
  users: jest.fn().mockReturnValue({
    doc: () => ({
      get: jest.fn().mockReturnValue({
        data: jest.fn().mockReturnValue({ uid: 'xxx' }),
        exists: true,
      }),
      set: jest.fn().mockReturnValue(Promise.resolve),
    }),
  }),
  workouts: jest.fn().mockReturnValue({
    add: jest.fn().mockReturnValue(Promise.resolve),
    orderBy: jest.fn().mockReturnValue({
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
    doc: () => ({
      id: 'id',
      get: jest.fn().mockReturnValue({
        data: jest.fn().mockReturnValue(Promise.resolve()),
        exists: true,
      }),
      update: jest.fn().mockReturnValue(Promise.resolve),
    }),
  }),
}));
/* eslint-enable */
