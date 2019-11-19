import { Dispatch } from 'redux';

import * as ArchiveService from '~/services/firebase/archive';
import { fetchChallenge } from '~/services/firebase/challenge';
import { postError } from '~/services/firebase/error';
import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  ArchiveActionTypes,
  FETCH_ARCHIVED_CHALLENGE,
  FETCH_ARCHIVES,
  SET_ARCHIVED_CHALLENGE,
  SET_ARCHIVES,
} from '~/store/archive';
import { onFetchWorkouts } from '~/store/workout';
import { Archives, Challenge, Next, Workout } from '~/types';
import { generateTitle } from '~/utils';

export const fetchArchives = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES,
});

export const setArchives = (archives?: Archives): ArchiveActionTypes => ({
  type: SET_ARCHIVES,
  payload: {
    archives: archives ? archives.archives : [],
    next: archives ? archives.next : undefined,
  },
});

export const addArchive = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE,
});

export const addArchiveSuccess = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE_SUCCESS,
});

export const fetchArchivedChallenge = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVED_CHALLENGE,
});

export const setArchivedChallenge = (
  detail?: Challenge,
): ArchiveActionTypes => ({
  type: SET_ARCHIVED_CHALLENGE,
  payload: { detail },
});

export const onFetchArchives = async (
  dispatch: Dispatch,
  next?: Next,
): Promise<void> => {
  dispatch(fetchArchives());

  try {
    const archives = await ArchiveService.fetchArchives(next);
    dispatch(setArchives(archives || undefined));
  } catch (error) {
    postError(error);
  }
};

export const calculateRate = (workouts: Workout[]): number => {
  const completed = workouts.filter(w => w.isCompleted === true);
  return Math.round((completed.length / workouts.length) * 100);
};

export const onAddArchive = async (
  dispatch: Dispatch,
  challenge: Challenge,
): Promise<void> => {
  dispatch(addArchive());

  const params = {
    challenge: challenge.id,
    title: generateTitle(challenge.workouts),
    rate: calculateRate(challenge.workouts),
  };

  try {
    await ArchiveService.addArchive(params);
    dispatch(addArchiveSuccess());
  } catch (error) {
    postError(error);
  }
};

export const onFetchArchivedChallenge = async (
  dispatch: Dispatch,
  id: string,
): Promise<void> => {
  dispatch(fetchArchivedChallenge());

  try {
    const results = await fetchChallenge(id);
    if (!results) {
      dispatch(setArchivedChallenge(undefined));
      return;
    }
    const challenge = { ...results, id } as Challenge;
    await onFetchWorkouts(dispatch, challenge as Challenge);
  } catch (error) {
    postError(error);
  }
  return;
};
