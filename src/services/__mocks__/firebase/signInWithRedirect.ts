jest.mock('../../firebase/signInWithRedirect', () => ({
  signInWithRedirect: jest
    .fn()
    .mockResolvedValueOnce(null)
    .mockRejectedValueOnce(null),
}));
