import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getRedirectTo,
  isAuthenticationWaiting,
  RedirectState,
  setIsRedirectingIfNeed,
} from '~/services/auth';
import { AppState } from '~/store';
import {
  AuthState,
  onObserveAuthStateChanged,
  onSignIn,
  onSignOut,
} from '~/store/auth';

export type AuthActions = {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
};

export type UseAuth = AuthState & AuthActions & RedirectState;

export const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    onObserveAuthStateChanged(dispatch);
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
    isAuthenticationWaiting: isAuthenticationWaiting(
      !!auth.isLoading,
      auth.user,
    ),
    redirectTo: getRedirectTo(),
    onSignIn: (): Promise<void> => onSignIn(dispatch),
    onSignOut: (): Promise<void> => onSignOut(dispatch),
  };
};
