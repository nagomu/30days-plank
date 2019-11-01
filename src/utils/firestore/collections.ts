import firebase, { CollectionReference } from '~/utils/firebase';

export const archives = (uid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/archives`);

export const challenges = (uid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/challenges`);

export const users = (): CollectionReference =>
  firebase.firestore().collection('/users');
