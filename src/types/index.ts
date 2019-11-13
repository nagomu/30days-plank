import firebase from 'firebase/app';

export type FirebaseUser = firebase.User;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type Timestamp = firebase.firestore.Timestamp;

export type User = {
  uid: string;
  challenge?: string;
  name?: string;
  photoURL?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type Workout = {
  id: string;
  title: string;
  menu: number;
  date: Timestamp;
  isCompleted: boolean;
  isRest: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type WorkoutTemplate = Omit<Workout, 'id'>;

export type WorkoutParams = Pick<Workout, 'id' | 'isCompleted'>;

export enum Timer {
  finish,
  pause,
  restart,
  standby,
  start,
}

export type Challenge = {
  id: string;
  description?: string;
  isActive: boolean;
  workouts: Workout[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type ChallengeParams = Pick<
  Challenge,
  'id' | 'description' | 'isActive'
>;

export type Archive = {
  id: string;
  challenge: string;
  title: string;
  rate: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Next = {
  seconds: number;
  nanoseconds: number;
};

export type Archives = {
  archives: Archive[];
  next?: Next;
};
