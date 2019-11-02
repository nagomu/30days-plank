import firebase, { CollectionReference, WriteBatch } from '~/utils/firebase';

export const archives = (uid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/archives`);

export const challenges = (uid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/challenges`);

export type BatchChallenges = {
  batch: WriteBatch;
  ref: CollectionReference;
};

export const batchChallenges = (uid: string): BatchChallenges => {
  const db = firebase.firestore();
  const batch = db.batch();
  return {
    batch,
    ref: db.collection(`/users/${uid}/challenges`),
  };
};

export const users = (): CollectionReference =>
  firebase.firestore().collection('/users');

export const workouts = (uid: string, cid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/challenges/${cid}/workouts`);
