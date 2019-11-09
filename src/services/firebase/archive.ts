import { firebase } from '~/services/firebase';
import { Archive, Archives, Next } from '~/types';
import { timestamp } from '~/utils';

type Params = {
  challenge: string;
  title: string;
  rate: number;
};

type ReturnValue = Promise<Archive | void>;

export const fetchArchive = async (uid: string, id: string): ReturnValue => {
  const ref = firebase.firestore().collection(`/users/${uid}/archives`);
  const snapshot = await ref.doc(id).get();
  return snapshot.data() as Archive | undefined;
};

export const fetchArchives = async (
  uid: string,
  next?: Next,
  limit?: number,
): Promise<Archives> => {
  const LIMIT = (limit || 30) + 1;

  const ref = firebase.firestore().collection(`/users/${uid}/archives`);
  let query = ref.orderBy('createdAt', 'desc').limit(LIMIT);
  if (next) query = query.startAfter(next);

  const snapshot = await query.get();
  const archives: Archive[] = [];
  snapshot.forEach((doc): void => {
    archives.push({
      ...doc.data(),
      id: doc.id,
    } as Archive);
  });

  if (snapshot.docs.length <= LIMIT - 1) return { archives };

  archives.splice(-1, 1);

  return { archives, next: archives[archives.length - 1].createdAt };
};

export const addArchive = async (uid: string, archive: Params): ReturnValue => {
  const ref = firebase.firestore().collection(`/users/${uid}/archives`);
  const ts = timestamp(new Date(Date.now()));
  const params = {
    ...archive,
    createdAt: ts,
    updatedAt: ts,
  };
  await ref.add(params);
  return await fetchArchive(uid, ref.doc().id);
};