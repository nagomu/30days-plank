import { firebase, FirebaseUser } from '~/services/firebase';

export const asyncOnAuthStateChanged = (): Promise<FirebaseUser | null> =>
  new Promise(resolve =>
    firebase
      .auth()
      .onAuthStateChanged((user: FirebaseUser | null): void => resolve(user)),
  );
