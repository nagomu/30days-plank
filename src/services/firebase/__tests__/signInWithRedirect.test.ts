import { signInWithRedirect } from '~/services/firebase/signInWithRedirect';

describe('services/firebase/signInWithRedirect', () => {
  it('returns signInWithRedirect correctly', async () => {
    try {
      const result = await signInWithRedirect();
      expect(result).toEqual(null);

      await signInWithRedirect();
    } catch (error) {
      expect(error).toEqual(new Error());
    }
  });
});
