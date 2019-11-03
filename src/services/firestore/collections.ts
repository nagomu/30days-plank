import firebase, {
  CollectionReference,
  currentUser,
  WriteBatch,
} from '~/services/firebase';

const uid = (): string | Error =>
  currentUser() || new Error('Not found currentUser');

export const archives = (): CollectionReference =>
  firebase.firestore().collection(`/users/${uid()}/archives`);

export const challenges = (): CollectionReference =>
  firebase.firestore().collection(`/users/${uid()}/challenges`);

export type BatchChallenges = {
  batch: WriteBatch;
  ref: CollectionReference;
};

export const batchChallenges = (): BatchChallenges => {
  const db = firebase.firestore();
  const batch = db.batch();
  return {
    batch,
    ref: db.collection(`/users/${uid()}/challenges`),
  };
};

export const users = (): CollectionReference =>
  firebase.firestore().collection('/users');

export const workouts = (cid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid()}/challenges/${cid}/workouts`);
