import { firebase } from '~/services/firebase';
import { timestamp } from '~/utils/datetime';

type Timestamp = firebase.firestore.Timestamp;

export type User = {
  uid: string;
  name?: string;
  photoURL?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

type FirebaseUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

type Params = {
  uid: string;
  name?: string;
  photoURL?: string;
};

type ReturnValue = Promise<User | void>;

const collectionPath = '/users';

export const fetchUser = async (uid: string): ReturnValue => {
  const ref = firebase.firestore().collection(collectionPath);
  const snapshot = await ref.doc(uid).get();
  const user = snapshot.data() as User | undefined;

  if (!user) return;
  return {
    uid: user.uid,
    name: user.name,
    photoURL: user.photoURL,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const addUser = async (firebaseUser: FirebaseUser): ReturnValue => {
  const ref = firebase.firestore().collection(collectionPath);
  const ts = timestamp(new Date(Date.now()));
  const params = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    createdAt: ts,
    updatedAt: ts,
  };

  const user = await fetchUser(firebaseUser.uid);
  if (user) return user;

  await ref.doc(firebaseUser.uid).set(params);
  return await fetchUser(firebaseUser.uid);
};

export const updateUser = async (user: Params): ReturnValue => {
  const ref = firebase.firestore().collection(collectionPath);
  const params = {
    uid: user.uid,
    name: user.name,
    photoURL: user.photoURL,
    updatedAt: timestamp(new Date(Date.now())),
  };

  await ref.doc(params.uid).update(params);
  return await fetchUser(params.uid);
};
