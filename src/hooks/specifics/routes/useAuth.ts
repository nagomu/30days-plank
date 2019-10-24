import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '~/store';
import {
  AuthActions,
  AuthState,
  onAuthStateChanged,
  onSignIn,
  onSignOut,
} from '~/store/auth';
import {
  getRedirectTo,
  isAuthenticatedOrWaiting,
  isAuthenticationWaiting,
  RedirectState,
  setIsRedirectingIfNeed,
} from '~/utils/redirect';

export type UseAuth = AuthState & AuthActions & RedirectState;

export const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    onAuthStateChanged(dispatch);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      setIsRedirectingIfNeed(auth.user),
    );
    return (): void =>
      window.removeEventListener('beforeunload', () =>
        setIsRedirectingIfNeed(auth.user),
      );
  });

  return {
    user: auth.user,
    isLoading: auth.isLoading,
    isAuthenticatedOrWaiting: isAuthenticatedOrWaiting(auth.user),
    isAuthenticationWaiting: isAuthenticationWaiting(
      !!auth.isLoading,
      auth.user,
    ),
    redirectTo: getRedirectTo(),
    onSignIn: (): void => onSignIn(dispatch),
    onSignOut: (): void => onSignOut(dispatch),
  };
};
