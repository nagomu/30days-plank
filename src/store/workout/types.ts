import firebase from '~/utils/firebase';

export enum Status {
  finish,
  pause,
  restart,
  standby,
  start,
}

// TODO
type Workout = {
  id: string;
  isCompleted: boolean;
  isRest: boolean;
  menu: number;
  pathname: string;
  scheduledDate: firebase.firestore.Timestamp;
  title: string;
};

// TODO
export type WorkoutState = {
  isLoading?: boolean;
  workout: Workout;
};

// TODO
export const MOCK = 'MOCK';
export type MockAction = {
  type: typeof MOCK;
};

// TODO
export type WorkoutActionTypes = MockAction;
