import { firebase } from '~/services/firebase';
import { timestamp } from '~/utils/datetime';

type Timestamp = firebase.firestore.Timestamp;

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

type AddParams = {
  title: string;
  menu: number;
  date: Timestamp;
  isCompleted: boolean;
  isRest: boolean;
};

type UpdateParams = {
  id: string;
  isCompleted: boolean;
};

type ReturnValue = Promise<Workout | void>;

export const fetchWorkout = async (
  uid: string,
  cid: string,
  id: string,
): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges/${cid}/workouts`;
  const ref = firebase.firestore().collection(collectionPath);
  const doc = ref.doc(id);
  const snapshot = await doc.get();
  const workout = snapshot.data() as Workout | undefined;

  if (workout) return workout;
};

export const addWorkout = async (
  uid: string,
  cid: string,
  workout: AddParams,
): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges/${cid}/workouts`;
  const ref = firebase.firestore().collection(collectionPath);
  const ts = timestamp(new Date(Date.now()));
  const params = {
    ...workout,
    createdAt: ts,
    updatedAt: ts,
  };

  await ref.add(params);
  return await fetchWorkout(uid, cid, ref.doc().id);
};

export const updateWorkout = async (
  uid: string,
  cid: string,
  workout: UpdateParams,
): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges/${cid}/workouts`;
  const ref = firebase.firestore().collection(collectionPath);
  const params = {
    isCompleted: workout.isCompleted,
    updatedAt: timestamp(new Date(Date.now())),
  };

  await ref.doc(workout.id).update(params);
  return await fetchWorkout(uid, cid, workout.id);
};
