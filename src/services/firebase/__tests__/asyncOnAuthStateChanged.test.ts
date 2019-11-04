import { asyncOnAuthStateChanged } from '~/services/firebase/asyncOnAuthStateChanged';

jest.mock('~/services/firebase/asyncOnAuthStateChanged', () => ({
  asyncOnAuthStateChanged: jest
    .fn()
    .mockResolvedValue({ uid: 'uid' })
    .mockResolvedValueOnce(null),
}));

describe('services/firebase/asyncOnAuthStateChanged', () => {
  it('returns onAuthStateChanged correctly', async () => {
    const authenticatedUser = await asyncOnAuthStateChanged();
    expect(authenticatedUser).toEqual(null);

    const unauthenticatedUser = await asyncOnAuthStateChanged();
    expect(unauthenticatedUser).toEqual({ uid: 'uid' });
  });
});
