import { Dispatch } from 'redux';

import addArchiveToFirestore from '~/services/firebase/addArchiveToFirestore';
import addErrorToFirestore from '~/services/firebase/addErrorToFirestore';
import fetchArchivesFromFirestore from '~/services/firebase/fetchArchivesFromFirestore';
import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  Archive,
  ArchiveActionTypes,
  FETCH_ARCHIVES,
  FETCH_ARCHIVES_SUCCESS,
  SET_ARCHIVES,
} from '~/store/archive';
import { calculateRate } from '~/store/archive/utils/calculateRate';
import { generateTitle } from '~/store/archive/utils/generateTitle';
import { Workout } from '~/store/workout';
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  timestampFromDate,
} from '~/utils/firebase';

export const fetchArchives = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES,
});

export const fetchArchivesSuccess = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES_SUCCESS,
});

export const setArchives = (archives?: Archive[]): ArchiveActionTypes => ({
  type: SET_ARCHIVES,
  payload: {
    archives: archives || [],
    size: archives ? archives.length : 0,
  },
});

export const addArchive = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE,
});

export const addArchiveSuccess = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE_SUCCESS,
});

export const onFetchArchives = async (
  dispatch: Dispatch,
  uid: string,
): Promise<void> => {
  dispatch(fetchArchives());

  try {
    const snapshot: QuerySnapshot = await fetchArchivesFromFirestore(uid);
    dispatch(fetchArchivesSuccess());
    if (snapshot.empty) return;

    const archives: Archive[] = [];
    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      archives.push({
        id: doc.id,
        ...doc.data(),
      } as Archive);
    });

    dispatch(setArchives(archives));
  } catch (error) {
    addErrorToFirestore(error);
  }
  return;
};

export const onAddArchive = async (
  dispatch: Dispatch,
  uid: string,
  challengeId: string,
  workouts: Workout[],
): Promise<void> => {
  dispatch(addArchive());

  try {
    const params = {
      challengeId,
      title: generateTitle(workouts),
      achievementRate: calculateRate(workouts),
      createdAt: timestampFromDate(new Date()),
    };

    await addArchiveToFirestore(uid, params);
    dispatch(addArchiveSuccess());
  } catch (error) {
    addErrorToFirestore(error);
  }
  return;
};
