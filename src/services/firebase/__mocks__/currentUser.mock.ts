jest.mock('../currentUser', () => ({
  currentUser: jest
    .fn()
    .mockReturnValue(null)
    .mockReturnValueOnce({ uid: 'uid' }),
}));
