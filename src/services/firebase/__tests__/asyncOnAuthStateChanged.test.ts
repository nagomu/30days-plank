import { asyncOnAuthStateChanged } from '~/services/firebase/asyncOnAuthStateChanged';

jest.mock('~/services/firebase/asyncOnAuthStateChanged', () => ({
  asyncOnAuthStateChanged: jest
    .fn()
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({ uid: 'uid' })
    .mockRejectedValueOnce({ error: 'Error' }),
}));

describe('services/firebase/asyncOnAuthStateChanged', () => {
  it('returns onAuthStateChanged correctly', async () => {
    try {
      const unauthenticatedUser = await asyncOnAuthStateChanged();
      expect(unauthenticatedUser).toEqual(null);

      const authenticatedUser = await asyncOnAuthStateChanged();
      expect(authenticatedUser).toEqual({ uid: 'uid' });

      await asyncOnAuthStateChanged();
    } catch (error) {
      expect(error).toEqual({ error: 'Error' });
    }
  });
});
