import { firebase } from '~/services/firebase';
import { Timestamp, Workout } from '~/types';
import { timestamp } from '~/utils';

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

export const fetchWorkouts = async (
  uid: string,
  cid: string,
): Promise<Workout[]> => {
  const collectionPath = `/users/${uid}/challenges/${cid}/workouts`;
  const ref = firebase.firestore().collection(collectionPath);
  const snapshot = await ref.orderBy('date', 'asc').get();
  const workouts: Workout[] = [];
  snapshot.forEach((doc): void => {
    workouts.push({
      ...doc.data(),
      id: doc.id,
    } as Workout);
  });

  return workouts;
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
