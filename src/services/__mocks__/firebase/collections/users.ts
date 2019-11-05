/* eslint-disable */
jest.mock('~/services/firestore/collections/users', () => ({
  users: jest
    .fn()
    .mockReturnValueOnce({
      doc: () => ({
        get: jest.fn().mockResolvedValue({ data: () => ({ uid: 'uid' }) }),
        set: jest.fn().mockResolvedValue(null),
      }),
    })
    .mockReturnValueOnce({
      doc: () => ({
        get: jest.fn().mockResolvedValue({ data: () => null }),
        set: jest.fn().mockResolvedValue(null),
      }),
    })
    .mockReturnValueOnce({
      doc: () => ({
        get: jest.fn().mockRejectedValue(new Error()),
        set: jest.fn().mockResolvedValue(null),
      }),
    }),
}));
/* eslint-enable */
