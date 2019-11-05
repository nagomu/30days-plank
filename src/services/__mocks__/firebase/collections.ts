/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('../../firestore/collections', () => ({
  archives: jest.fn().mockReturnValue({
    // TODO: The test will fail if the next line change to `mockResolvedValue`
    // Probably test is wrong 😇
    add: jest.fn().mockReturnValue(Promise.resolve),
    get: jest.fn().mockResolvedValue({
      empty: false,
      forEach: (callback: any) =>
        callback({
          id: 'id',
          data: () => ({ data: 'data' }),
        }),
    }),
  }),
  challenges: jest.fn().mockReturnValue({
    doc: jest.fn().mockReturnValue({
      update: jest.fn().mockResolvedValue(undefined),
    }),
    get: jest.fn().mockResolvedValue({
      empty: false,
      forEach: (callback: any) =>
        callback({
          id: 'id',
          data: () => ({ data: 'data' }),
        }),
    }),
    orderBy: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({
            empty: false,
            forEach: (callback: any) =>
              callback({
                id: 'id',
                data: () => ({ data: 'data' }),
              }),
          }),
        }),
      }),
    }),
  }),
  batchChallenges: jest.fn().mockReturnValue({
    batch: {
      commit: jest.fn().mockResolvedValue(undefined),
      set: jest.fn(),
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ref: { doc: () => ({ id: 'id' }) },
  }),
  workouts: jest.fn().mockReturnValue({
    add: jest.fn().mockResolvedValue(undefined),
    orderBy: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        empty: false,
        forEach: (callback: any) =>
          callback({
            id: 'id',
            data: () => ({ data: 'data' }),
          }),
      }),
    }),
    doc: () => ({
      id: 'id',
      get: jest.fn().mockReturnValue({
        data: jest.fn().mockResolvedValue(undefined),
        exists: true,
      }),
      update: jest.fn().mockResolvedValue(undefined),
    }),
  }),
  // for Errros
  errors: jest.fn().mockReturnValue({
    add: jest.fn().mockResolvedValue(undefined),
  }),
}));
/* eslint-enable */
