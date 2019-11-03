import { currentUser } from '~/services/firebase/currentUser';

jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    auth: jest
      .fn()
      .mockReturnValue({ currentUser: null })
      .mockReturnValueOnce({ currentUser: { uid: 'uid' } }),
  }),
);

describe('services/firebase/currentUser', () => {
  it('returns currentUser correctly', () => {
    expect(currentUser()).toEqual('uid');
    expect(currentUser()).toEqual(null);
  });
});
