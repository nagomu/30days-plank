import { workoutTemplateFactory } from '~/factories/workoutFactory';
import { firebase } from '~/services/firebase';
import { currentUser } from '~/services/firebase/auth';
import { Challenge } from '~/types';
import { timestamp } from '~/utils';

type Params = {
  id: string;
  description?: string;
  isActive: boolean;
};

type ReturnValue = Promise<Challenge | void>;

export const fetchChallenge = async (id: string): ReturnValue => {
  const uid = currentUser();
  if (!uid) return;

  const collectionPath = `/users/${uid}/challenges`;
  const ref = firebase.firestore().collection(collectionPath);
  const snapshot = await ref.doc(id).get();
  const challenge = snapshot.data() as Challenge | undefined;

  if (challenge) return challenge;
};

export const addChallenge = async (): ReturnValue => {
  const uid = currentUser();
  if (!uid) return;

  const collectionPath = `/users/${uid}/challenges`;
  const db = firebase.firestore();
  const batch = db.batch();
  const ref = db.collection(collectionPath);
  const id = ref.doc().id;
  const now = new Date(Date.now());
  const ts = timestamp(now);
  const params = {
    id,
    isActive: true,
    createdAt: ts,
    updatedAt: ts,
  };

  batch.set(ref.doc(id), params);

  workoutTemplateFactory(now).forEach(params => {
    const collectionPath = `/users/${uid}/challenges/${id}/workouts`;
    const wref = firebase.firestore().collection(collectionPath);
    const wid = wref.doc().id;
    batch.set(wref.doc(wid), { id: wid, ...params });
  });

  await batch.commit();

  return await fetchChallenge(id);
};

export const updateChallenge = async (challenge: Params): ReturnValue => {
  const uid = currentUser();
  if (!uid) return;

  const collectionPath = `/users/${uid}/challenges`;
  const ref = firebase.firestore().collection(collectionPath);
  const params = {
    isActive: challenge.isActive,
    updatedAt: timestamp(new Date(Date.now())),
  };
  await ref.doc(challenge.id).update(params);

  return await fetchChallenge(challenge.id);
};
