import { workoutFactory } from '~/factories/workoutFactory';
import { firebase } from '~/services/firebase';
import { Challenge } from '~/types';
import { timestamp } from '~/utils';

type Params = {
  id: string;
  description?: string;
  isActive: boolean;
};

type ReturnValue = Promise<Challenge | void>;

export const fetchChallenge = async (uid: string, id: string): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges`;
  const ref = firebase.firestore().collection(collectionPath);
  const snapshot = await ref.doc(id).get();
  const challenge = snapshot.data() as Challenge | undefined;

  if (challenge) return challenge;
};

export const addChallenge = async (uid: string): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges`;
  const db = firebase.firestore();
  const batch = db.batch();
  const ref = db.collection(collectionPath);
  const id = ref.doc().id;
  const now = new Date(Date.now());
  const ts = timestamp(now);
  const params = {
    isActive: true,
    createdAt: ts,
    updatedAt: ts,
  };

  batch.set(ref.doc(id), params);

  workoutFactory(now).forEach(params => {
    const collectionPath = `/users/${uid}/challenges/${id}/workouts`;
    const wref = firebase.firestore().collection(collectionPath);
    const wid = wref.doc().id;
    batch.set(wref.doc(wid), params);
  });

  await batch.commit();

  return await fetchChallenge(uid, id);
};

export const updateChallenge = async (
  uid: string,
  id: string,
  challenge: Params,
): ReturnValue => {
  const collectionPath = `/users/${uid}/challenges`;
  const ref = firebase.firestore().collection(collectionPath);
  const params = {
    isActive: challenge.isActive,
    updatedAt: timestamp(new Date(Date.now())),
  };
  await ref.doc(id).update(params);

  return await fetchChallenge(uid, id);
};
