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

  it('returns onSignIn action correctly', () => {
    store.clearActions();

    hook.onSignIn();
    const expected = [{ type: 'SIGN_IN' }];
    expect(store.getActions()).toEqual(expected);
  });

  it('returns onSignOut action correctly', () => {
    store.clearActions();

    hook.onSignOut();
    const expected = [
      { type: 'SIGN_OUT' },
      { type: 'SET_USER', payload: { user: undefined } },
    ];
    expect(store.getActions()).toEqual(expected);
  });
});
