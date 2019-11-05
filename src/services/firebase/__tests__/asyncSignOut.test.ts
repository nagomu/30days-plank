import { asyncSignOut } from '~/services/firebase/asyncSignOut';

describe('services/firebase/asyncSignOut', () => {
  it('returns asyncSignOut correctly', async () => {
    try {
      const result = await asyncSignOut();
      expect(result).toEqual(null);

      await asyncSignOut();
    } catch (error) {
      expect(error).toEqual(null);
    }
  });
});
