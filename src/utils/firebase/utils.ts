import firebase, { Timestamp } from '~/utils/firebase';

export const timestampFromDate = (date: Date): Timestamp =>
  firebase.firestore.Timestamp.fromDate(date);
