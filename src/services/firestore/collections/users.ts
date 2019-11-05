import { CollectionReference, firebase } from '~/services/firebase';

export const users = (): CollectionReference =>
  firebase.firestore().collection('/users');
