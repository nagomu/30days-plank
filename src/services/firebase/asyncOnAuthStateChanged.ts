import { AuthError, firebase, FirebaseUser } from '~/services/firebase';

export const asyncOnAuthStateChanged = (): Promise<FirebaseUser | null> =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .onAuthStateChanged(
        (user: FirebaseUser | null, error?: AuthError): void => {
          if (error) return reject(error);
          return resolve(user);
        },
      ),
  );
