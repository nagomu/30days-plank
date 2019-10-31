import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

import { firebaseConfig } from '~/config';

firebase.initializeApp(firebaseConfig);

export const timestampFromDate = (date: Date): firebase.firestore.Timestamp =>
  firebase.firestore.Timestamp.fromDate(date);

export type DocumentReference = firebase.firestore.DocumentReference;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type Timestamp = firebase.firestore.Timestamp;

export default firebase;
