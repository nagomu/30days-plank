import { User } from '~/types';

const REDIRECT_TYPE = 'REDIRECT_TYPE';
const REDIRECT_FROM = 'REDIRECT_FROM';
const IS_AUTHENTICATING = 'isAuthenticating';
const IS_REDIRECTING = 'isRedirecting';

type RedirectState = {
  isAuthenticationWaiting: boolean;
  redirectTo: string;
};
type LocalStorageKey = typeof REDIRECT_TYPE | typeof REDIRECT_FROM;
type LocalStorage = {
  set: (key: LocalStorageKey, value: string) => void;
  get: (key: LocalStorageKey) => ReturnType<typeof localStorage.getItem>;
  remove: () => void;
};

const LocalStorage: LocalStorage = {
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  get: key => localStorage.getItem(key),
  remove: () => {
    localStorage.removeItem(REDIRECT_TYPE);
    localStorage.removeItem(REDIRECT_FROM);
  },
};

const isAuthenticating = (): boolean =>
  LocalStorage.get(REDIRECT_TYPE) === IS_AUTHENTICATING;

const isRedirecting = (): boolean =>
  LocalStorage.get(REDIRECT_TYPE) === IS_AUTHENTICATING ||
  (LocalStorage.get(REDIRECT_TYPE) === IS_REDIRECTING &&
    LocalStorage.get(REDIRECT_FROM) !== null);

const isAuthenticationWaiting = (isLoading: boolean, user?: User): boolean =>
  !user && (isLoading || isAuthenticating() || isRedirecting());

const getRedirectTo = (): string => {
  const from = LocalStorage.get(REDIRECT_FROM);
  return !from || from === '/' ? '/dashboard' : from;
};

const setIsAuthenticating = (): void => {
  LocalStorage.set(REDIRECT_TYPE, IS_AUTHENTICATING);
  return;
};

const setIsRedirectingIfNeed = (user?: User): void => {
  if (!user && isAuthenticating()) return;
  LocalStorage.set(REDIRECT_TYPE, IS_REDIRECTING);
  LocalStorage.set(REDIRECT_FROM, location.pathname);
  return;
};

const clearRedirectStorage = (): void => LocalStorage.remove();

export {
  // for hooks/specifics/routes/useAuth
  getRedirectTo,
  isAuthenticationWaiting,
  RedirectState,
  setIsRedirectingIfNeed,
  // for stores/auth/actions
  clearRedirectStorage,
  setIsAuthenticating,
};
