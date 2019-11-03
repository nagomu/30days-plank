import firebase, { Timestamp } from '~/services/firebase';

export const timestampFromDate = (date: Date): Timestamp =>
  firebase.firestore.Timestamp.fromDate(date);
