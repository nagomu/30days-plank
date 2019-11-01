import firebase, { CollectionReference } from '~/utils/firebase';

export const archives = (uid: string): CollectionReference =>
  firebase.firestore().collection(`/users/${uid}/archives`);
