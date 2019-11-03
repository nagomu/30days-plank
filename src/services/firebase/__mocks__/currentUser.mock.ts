jest.mock('../currentUser', () => ({
  currentUser: jest.fn().mockReturnValue({ uid: 'uid' }),
}));
