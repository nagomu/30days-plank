import { useAuth } from '~/hooks/specifics/routes/useAuth';
import { mockStore, withHook } from '~/utils';

describe('useAuth', () => {
  const state = {
    auth: {
      user: {
        uid: 'xxx',
      },
      isLoading: true,
    },
  };

  const store = mockStore(state);
  const hook = withHook(useAuth, store);

  it('returns state correctly', () => {
    expect(hook.user.uid).toEqual('xxx');
    expect(hook.isLoading).toEqual(true);
  });

  it('returns isLoading correctly', () => {
    expect(hook.user.uid).toEqual('xxx');
    expect(hook.isLoading).toEqual(true);
  });

  it('returns isAuthenticationWaiting correctly', () => {
    expect(hook.isAuthenticationWaiting).toEqual(false);
  });

  it('returns getRedirectTo correctly', () => {
    const expected = '/dashboard';
    localStorage.setItem('REDIRECT_TYPE', 'isAuthenticating');
    localStorage.removeItem(expected);
    expect(hook.redirectTo).toEqual(expected);
  });

  it('returns onSignIn correctly', async () => {
    const result = await hook.onSignIn();
    expect(result).toEqual(undefined);
  });

  it('returns onSignOut correctly', async () => {
    const result = await hook.onSignOut();
    expect(result).toEqual(undefined);
  });
});
