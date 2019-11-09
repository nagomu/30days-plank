import { Dispatch } from 'redux';

import { clearRedirectStorage, setIsAuthenticating } from '~/services/auth';
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOutWithGoogle,
} from '~/services/firebase/auth';
import { postError } from '~/services/firebase/error';
import * as UserService from '~/services/firebase/user';
import {
  ADD_USER,
  ADD_USER_SUCCESS,
  AUTH_STATE_CHANGED,
  AuthActionTypes,
  FETCH_USER,
  OBSERVE_AUTH_STATE_CHANGED,
  SET_USER,
  SIGN_IN,
  SIGN_OUT,
} from '~/store/auth';
import { FirebaseUser, User } from '~/types';

export const observeAuthStateChanged = (): AuthActionTypes => ({
  type: OBSERVE_AUTH_STATE_CHANGED,
});

export const authStateChanged = (): AuthActionTypes => ({
  type: AUTH_STATE_CHANGED,
});

export const fetchUser = (): AuthActionTypes => ({
  type: FETCH_USER,
});

export const setUser = (user?: User): AuthActionTypes => ({
  type: SET_USER,
  payload: { user },
});

export const addUser = (): AuthActionTypes => ({
  type: ADD_USER,
});

export const addUserSuccess = (): AuthActionTypes => ({
  type: ADD_USER_SUCCESS,
});

export const signIn = (): AuthActionTypes => ({
  type: SIGN_IN,
});

export const signOut = (): AuthActionTypes => ({
  type: SIGN_OUT,
});

export const onFetchUser = async (
  dispatch: Dispatch,
  user: FirebaseUser,
): Promise<void> => {
  dispatch(fetchUser());

  try {
    let result = await UserService.fetchUser(user.uid);

    if (!result) {
      dispatch(addUser());
      result = await UserService.addUser(user);
      dispatch(addUserSuccess());
    }

    dispatch(setUser(result || undefined));
    clearRedirectStorage();
  } catch (error) {
    postError(error);
  }
  return;
};

export const onObserveAuthStateChanged = async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(observeAuthStateChanged());
    const user = await onAuthStateChanged();
    if (user) {
      onFetchUser(dispatch, user);
    } else {
      dispatch(setUser(undefined));
      clearRedirectStorage();
    }
    dispatch(authStateChanged());
  } catch (error) {
    postError(error);
  }
};

export const onSignIn = async (dispatch: Dispatch): Promise<void> => {
  try {
    await signInWithGoogle();
    dispatch(signIn());
    setIsAuthenticating();
  } catch (error) {
    postError(error);
  }
};

export const onSignOut = async (dispatch: Dispatch): Promise<void> => {
  signOutWithGoogle();
  onObserveAuthStateChanged(dispatch);
  clearRedirectStorage();
  dispatch(signOut());
};
