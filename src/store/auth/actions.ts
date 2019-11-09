import { Dispatch } from 'redux';

import { clearRedirectStorage, setIsAuthenticating } from '~/services/auth';
import { asyncOnAuthStateChanged } from '~/services/firebase/asyncOnAuthStateChanged';
import { asyncSignOut } from '~/services/firebase/asyncSignOut';
import { signInWithRedirect } from '~/services/firebase/signInWithRedirect';
import { postError } from '~/services/firestore';
import { users } from '~/services/firestore/collections/users';
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
  UserParams,
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

export const userParams = (firebaseUser: UserParams, user?: User): User => {
  if (!user) {
    return {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };
  }

  return {
    uid: user.uid,
    name: user.name,
    photoURL: user.photoURL,
  };
};

export const onFetchUser = async (
  dispatch: Dispatch,
  user: FirebaseUser,
): Promise<void> => {
  dispatch(fetchUser());

  try {
    const ref = users().doc(user.uid);
    const snapshot = await ref.get();
    const data = snapshot.data() as User | undefined;
    const params = userParams(user, data);

    if (!data) {
      dispatch(addUser());
      await ref.set(user);
      dispatch(addUserSuccess());
    } else {
      dispatch(setUser(params));
      clearRedirectStorage();
    }
  } catch (error) {
    postError(error);
  }
  return;
};

export const onAuthStateChanged = async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(observeAuthStateChanged());
    const user = await asyncOnAuthStateChanged();
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

  return;
};

export const onSignIn = async (dispatch: Dispatch): Promise<void> => {
  try {
    await signInWithRedirect();
    dispatch(signIn());
    setIsAuthenticating();
  } catch (error) {
    postError(error);
  }

  return;
};

export const onSignOut = async (dispatch: Dispatch): Promise<void> => {
  try {
    asyncSignOut();
    onAuthStateChanged(dispatch);
    clearRedirectStorage();
    dispatch(signOut());
  } catch (error) {
    postError(error);
  }

  return;
};
