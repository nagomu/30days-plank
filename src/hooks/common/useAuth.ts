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

export type UseAuth = AuthState & AuthActions;

export const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    onAuthStateChanged(dispatch);
  }, []);

  return {
    user: auth.user,
    isLoading: auth.isLoading,
    onSignIn: (): void => onSignIn(dispatch),
    onSignOut: (): void => onSignOut(dispatch),
  };
};
