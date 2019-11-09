import { Dispatch } from 'redux';

import { archives, postError, timestampFromDate } from '~/services/firestore';
import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  ArchiveActionTypes,
  FETCH_ARCHIVES,
  FETCH_ARCHIVES_SUCCESS,
  SET_ARCHIVES,
} from '~/store/archive';
import {
  Archive,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Workout,
} from '~/types';
import { formatUS } from '~/utils';

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

export const onFetchArchives = async (dispatch: Dispatch): Promise<void> => {
  dispatch(fetchArchives());

  try {
    const snapshot: QuerySnapshot = await archives().get();
    dispatch(fetchArchivesSuccess());
    if (snapshot.empty) return;

    const results: Archive[] = [];
    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      } as Archive);
    });
    dispatch(setArchives(results));
  } catch (error) {
    postError(error);
  }
  return;
};

export const calculateRate = (workouts: Workout[]): number => {
  const completed = workouts.filter(w => w.isCompleted === true);
  return Math.round((completed.length / workouts.length) * 100);
};

export const generateTitle = (workouts: Workout[]): string => {
  const firstDate = workouts[0].scheduledDate;
  const lastDate = workouts[workouts.length - 1].scheduledDate;
  return `${formatUS(firstDate)} - ${formatUS(lastDate)}`;
};

export const onAddArchive = async (
  dispatch: Dispatch,
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

    await archives().add(params);
    dispatch(addArchiveSuccess());
  } catch (error) {
    postError(error);
  }
  return;
};
