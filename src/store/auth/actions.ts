import { User as FirebaseUser } from 'firebase';
import { Dispatch } from 'redux';

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
import fetchUserFromFirestore from '~/store/auth/utils/fetchUserFromFirestore';
import setUserToFirestore from '~/store/auth/utils/setUserToFirestore';
import firebase from '~/utils/firebase';
import { clearRedirectStorage, setIsAuthenticating } from '~/utils/redirect';

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
    await setUserToFirestore(user);
    dispatch(addUserSuccess());
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: userRef.set()');
  }

  return;
};

export const onFetchUser = async (
  dispatch: Dispatch,
  user: FirebaseUser,
): Promise<void> => {
  dispatch(fetchUser());

  try {
    const doc = await fetchUserFromFirestore(user.uid);
    // NOTE: firebase.firestore.DocumentData
    // [field: string]: any
    // ref: https://firebase.google.com/docs/reference/js/firebase.firestore.html#document-data
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
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: userRef.get()');
  }
  return;
};

export const onAuthStateChanged = (dispatch: Dispatch): void => {
  try {
    dispatch(observeAuthStateChanged());
    firebase.auth().onAuthStateChanged((user: FirebaseUser | null) => {
      dispatch(authStateChanged());
      // TODO: Add error handling
      if (user) {
        onFetchUser(dispatch, user);
      }
    });
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: firebase.auth().onAuthStateChanged');
  }

  return;
};

export const onSignIn = (dispatch: Dispatch): void => {
  try {
    dispatch(signIn());
    setIsAuthenticating();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: firebase.auth().signInWithRedirect');
  }

  return;
};

export const onSignOut = (dispatch: Dispatch): void => {
  try {
    dispatch(signOut());
    dispatch(setUser(undefined));
    firebase.auth().signOut();
    clearRedirectStorage();
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: firebase.auth().signInWithRedirect');
  }

  return;
};
