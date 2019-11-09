import { firebase, provider } from '~/services/firebase';

type User = firebase.User | null;

export const currentUser = (): string | null => {
  const auth = firebase.auth();
  return auth.currentUser ? auth.currentUser.uid : null;
};

export const onAuthStateChanged = (): Promise<User> => {
  return new Promise(resolve => {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user: User): void => resolve(user));
  });
};

export const signInWithGoogle = (): Promise<void> =>
  firebase.auth().signInWithRedirect(provider);

export const signOutWithGoogle = (): Promise<void> => firebase.auth().signOut();
