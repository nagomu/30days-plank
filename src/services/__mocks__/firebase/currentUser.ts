jest.mock('../../firebase/currentUser', () => ({
  currentUser: jest.fn().mockReturnValue({ uid: 'uid' }),
}));
