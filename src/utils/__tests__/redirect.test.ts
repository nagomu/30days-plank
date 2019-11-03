import 'jest-localstorage-mock';

import {
  clearRedirectStorage,
  getRedirectTo,
  isAuthenticationWaiting,
  setIsAuthenticating,
  setIsRedirectingIfNeed,
} from '~/utils/redirect';

describe('utils: redirect', () => {
  const REDIRECT_TYPE = 'REDIRECT_TYPE';
  const REDIRECT_FROM = 'REDIRECT_FROM';
  const IS_AUTHENTICATING = 'isAuthenticating';
  const IS_REDIRECTING = 'isRedirecting';

  const user = { uid: 'xxx' };

  const clearStorage = (): void => {
    localStorage.removeItem(REDIRECT_TYPE);
    localStorage.removeItem(REDIRECT_FROM);
  };

  afterEach(() => clearStorage());

  describe('clearRedirectStorage', () => {
    it('something', () => {
      localStorage.setItem(REDIRECT_TYPE, IS_REDIRECTING);
      localStorage.setItem(REDIRECT_FROM, '/');

      clearRedirectStorage();

      expect(localStorage.getItem(REDIRECT_TYPE)).toEqual(null);
      expect(localStorage.getItem(REDIRECT_FROM)).toEqual(null);
    });
  });

  describe('getRedirectTo', () => {
    it('returns the correct value', () => {
      const expected = '/expected';
      localStorage.setItem(REDIRECT_FROM, expected);
      expect(getRedirectTo()).toEqual(expected);
    });

    it('returns "/dashboard" if value is "/"', () => {
      const expected = '/dashboard';
      localStorage.setItem(REDIRECT_FROM, '/');
      expect(getRedirectTo()).toEqual(expected);
    });

    it('returns "/dashboard" if no value exists', () => {
      const expected = '/dashboard';
      expect(getRedirectTo()).toEqual(expected);
    });
  });

  describe('isAuthenticationWaiting', () => {
    it('returns false if authenticated', () => {
      expect(isAuthenticationWaiting(true, user)).toEqual(false);
    });

    describe('unauthenticated', () => {
      it('returns true if isLoading=true', () => {
        expect(isAuthenticationWaiting(true, undefined)).toEqual(true);
      });

      it('returns true if isAuthenticating=true', () => {
        localStorage.setItem(REDIRECT_TYPE, IS_AUTHENTICATING);
        expect(isAuthenticationWaiting(false, undefined)).toEqual(true);
      });

      it('returns true if isRedirecting=true', () => {
        localStorage.setItem(REDIRECT_TYPE, IS_REDIRECTING);
        localStorage.setItem(REDIRECT_FROM, '/dashboard');
        expect(isAuthenticationWaiting(false, undefined)).toEqual(true);
      });
    });
  });

  describe('setIsAuthenticating', () => {
    it('sets correct value', () => {
      clearStorage();
      setIsAuthenticating();
      expect(localStorage.getItem(REDIRECT_TYPE)).toEqual(IS_AUTHENTICATING);
    });
  });

  describe('setIsRedirectingIfNeed', () => {
    const pathname = '/dashboard';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalAny: any = global;
    globalAny.window = Object.create(window);
    Object.defineProperty(window, 'location', { value: { pathname } });

    it('sets correct value if "user" exists and isAuthenticating = false', () => {
      setIsRedirectingIfNeed(user);
      expect(localStorage.getItem(REDIRECT_TYPE)).toEqual(IS_REDIRECTING);
      expect(localStorage.getItem(REDIRECT_FROM)).toEqual(pathname);
    });

    it('does nothing if "user" no exists and isAuthenticating = true', () => {
      localStorage.setItem(REDIRECT_TYPE, IS_AUTHENTICATING);
      setIsRedirectingIfNeed();
      expect(localStorage.getItem(REDIRECT_TYPE)).toEqual(IS_AUTHENTICATING);
      expect(localStorage.getItem(REDIRECT_FROM)).toEqual(null);
    });
  });
});
