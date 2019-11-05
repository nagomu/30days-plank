import { firebase } from '~/services/firebase';

export const signInWithRedirect = (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
};
