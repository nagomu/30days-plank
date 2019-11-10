import { firebase } from '~/services/firebase';
import { currentUser } from '~/services/firebase/auth';
import { User } from '~/types';
import { timestamp } from '~/utils';

type FirebaseUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

type Params = {
  challenge?: string;
  name?: string;
  photoURL?: string;
};

type ReturnValue = Promise<User | void>;

const collectionPath = '/users';

export const fetchUser = async (uid: string): ReturnValue => {
  const ref = firebase.firestore().collection(collectionPath);
  const snapshot = await ref.doc(uid).get();
  const user = snapshot.data() as User | undefined;

  if (user) return user;
};

export const addUser = async (firebaseUser: FirebaseUser): ReturnValue => {
  const user = await fetchUser(firebaseUser.uid);
  if (user) return user;

  const ref = firebase.firestore().collection(collectionPath);
  const ts = timestamp(new Date(Date.now()));
  const params = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    createdAt: ts,
    updatedAt: ts,
  };

  await ref.doc(firebaseUser.uid).set(params);
  return await fetchUser(firebaseUser.uid);
};

export const updateUser = async (user: Params): ReturnValue => {
  const uid = currentUser();
  if (!uid) return;

  const ref = firebase.firestore().collection(collectionPath);
  const params = {
    ...user,
    updatedAt: timestamp(new Date(Date.now())),
  };

  await ref.doc(uid).update(params);
  return await fetchUser(uid);
};
