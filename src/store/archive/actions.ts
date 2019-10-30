import { Dispatch } from 'redux';

import addArchiveToFirestore from '~/services/firebase/addArchiveToFirestore';
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
import { timestampFromDate } from '~/utils/firebase';

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

export const onAddArchive = async (
  dispatch: Dispatch,
  uid: string,
  workouts: Workout[],
): Promise<void> => {
  dispatch(addArchive());

  try {
    const params = {
      title: generateTitle(workouts),
      achievementRate: calculateRate(workouts),
      createdAt: timestampFromDate(new Date()),
    };

    await addArchiveToFirestore(uid, params);
    dispatch(addArchiveSuccess());
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: addArchiveToFirestore');
  }
  return;
};
