import { User as FirebaseUser } from 'firebase';
import { Dispatch } from 'redux';

import { clearRedirectStorage, setIsAuthenticating } from '~/services/auth';
import firebase from '~/services/firebase';
import { postError, users } from '~/services/firestore';
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
  User,
} from '~/store/auth';

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

export const onAddUser = async (
  dispatch: Dispatch,
  user: User,
): Promise<void> => {
  dispatch(addUser());

  try {
    await users()
      .doc()
      .set(user);

    dispatch(addUserSuccess());
  } catch (error) {
    postError(error);
  }

  return;
};

export const onFetchUser = async (
  dispatch: Dispatch,
  user: FirebaseUser,
): Promise<void> => {
  dispatch(fetchUser());

  try {
    const doc = await users()
      .doc(user.uid)
      .get();

    const data = doc.data();

    if (!doc.exists || !data) {
      const params: User = {
        uid: user.uid,
        name: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
      };
      onAddUser(dispatch, params);
    } else {
      const params: User = {
        uid: data.uid,
        name: data.name,
        photoURL: data.photoURL,
      };
      dispatch(setUser(params));
      clearRedirectStorage();
    }
  } catch (error) {
    postError(error);
  }
  return;
};

export const onAuthStateChanged = (dispatch: Dispatch): void => {
  try {
    dispatch(observeAuthStateChanged());
    firebase.auth().onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        onFetchUser(dispatch, user);
      } else {
        clearRedirectStorage();
      }
      dispatch(authStateChanged());
    });
  } catch (error) {
    postError(error);
  }

  return;
};

export const onSignIn = (dispatch: Dispatch): void => {
  try {
    dispatch(signIn());
    setIsAuthenticating();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  } catch (error) {
    postError(error);
  }

  return;
};

export const onSignOut = (dispatch: Dispatch): void => {
  try {
    dispatch(signOut());
    dispatch(setUser(undefined));
    firebase.auth().signOut();
    clearRedirectStorage();
  } catch (error) {
    postError(error);
  }

  return;
};
