import firebase from '~/services/firebase';

export const currentUser = (): string | null => {
  const auth = firebase.auth();
  return auth.currentUser ? auth.currentUser.uid : null;
};
