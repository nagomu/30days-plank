import { Dispatch } from 'redux';

import * as ArchiveService from '~/services/firebase/archive';
import { postError } from '~/services/firebase/error';
import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  ArchiveActionTypes,
  FETCH_ARCHIVES,
  SET_ARCHIVES,
} from '~/store/archive';
import { Archives, Next, Workout } from '~/types';
import { formatUS } from '~/utils';

export const fetchArchives = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES,
});

export const setArchives = (archives: Archives): ArchiveActionTypes => ({
  type: SET_ARCHIVES,
  payload: {
    archives: archives.archives,
    next: archives.next,
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
  next?: Next,
): Promise<void> => {
  dispatch(fetchArchives());

  try {
    const archives = await ArchiveService.fetchArchives(uid, next);
    dispatch(setArchives(archives));
  } catch (error) {
    postError(error);
  }
};

export const calculateRate = (workouts: Workout[]): number => {
  const completed = workouts.filter(w => w.isCompleted === true);
  return Math.round((completed.length / workouts.length) * 100);
};

export const generateTitle = (workouts: Workout[]): string => {
  const firstDate = workouts[0].date;
  const lastDate = workouts[workouts.length - 1].date;
  return `${formatUS(firstDate)} - ${formatUS(lastDate)}`;
};

export const onAddArchive = async (
  dispatch: Dispatch,
  uid: string,
  cid: string,
  workouts: Workout[],
): Promise<void> => {
  dispatch(addArchive());

  const params = {
    challenge: cid,
    title: generateTitle(workouts),
    rate: calculateRate(workouts),
  };

  try {
    await ArchiveService.addArchive(uid, params);
    dispatch(addArchiveSuccess());
  } catch (error) {
    postError(error);
  }
};
