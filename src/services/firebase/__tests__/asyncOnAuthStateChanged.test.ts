import { asyncOnAuthStateChanged } from '~/services/firebase/asyncOnAuthStateChanged';

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
