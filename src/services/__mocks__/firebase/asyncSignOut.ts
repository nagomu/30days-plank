jest.mock('../../firebase/asyncSignOut', () => ({
  asyncSignOut: jest
    .fn()
    .mockResolvedValueOnce(null)
    .mockRejectedValueOnce(new Error()),
}));