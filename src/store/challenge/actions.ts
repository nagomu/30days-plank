import { Dispatch } from 'redux';

import * as ChallengeService from '~/services/firebase/challenge';
import { postError } from '~/services/firebase/error';
import { onAddArchive } from '~/store/archive';
import {
  ADD_CHALLENGE,
  ADD_CHALLENGE_SUCCESS,
  ChallengeActionTypes,
  FETCH_CHALLENGE,
  SET_CHALLENGE,
  SET_PARTIAL_WORKOUT,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
  UpdateChallengeParams,
} from '~/store/challenge';
import { onFetchWorkouts } from '~/store/workout';
import { Challenge, Workout } from '~/types';

export const fetchChallenge = (): ChallengeActionTypes => ({
  type: FETCH_CHALLENGE,
});

export const setChallenge = (challenge?: Challenge): ChallengeActionTypes => ({
  type: SET_CHALLENGE,
  payload: { challenge },
});

export const setPartialWorkout = (workout: Workout): ChallengeActionTypes => ({
  type: SET_PARTIAL_WORKOUT,
  payload: { workout },
});

export const addChallenge = (): ChallengeActionTypes => ({
  type: ADD_CHALLENGE,
});

export const addChallengeSuccess = (): ChallengeActionTypes => ({
  type: ADD_CHALLENGE_SUCCESS,
});

export const updateChallenge = (): ChallengeActionTypes => ({
  type: UPDATE_CHALLENGE,
});

export const updateChallengeSuccess = (): ChallengeActionTypes => ({
  type: UPDATE_CHALLENGE_SUCCESS,
});

export const onFetchChallenge = async (
  dispatch: Dispatch,
  uid: string,
  id: string,
): Promise<void> => {
  dispatch(fetchChallenge());

  try {
    const challenge = await ChallengeService.fetchChallenge(uid, id);
    dispatch(setChallenge(challenge || undefined));
    onFetchWorkouts(dispatch, uid, challenge as Challenge);
  } catch (error) {
    postError(error);
  }
  return;
};

export const onAddChallenge = async (
  dispatch: Dispatch,
  uid: string,
): Promise<void> => {
  dispatch(addChallenge());

  try {
    await ChallengeService.addChallenge(uid);
    dispatch(addChallengeSuccess());
  } catch (error) {
    postError(error);
  }
  return;
};

export const onUpdateChallenge = async (
  dispatch: Dispatch,
  uid: string,
  params: UpdateChallengeParams,
): Promise<void> => {
  dispatch(updateChallenge());

  try {
    await ChallengeService.updateChallenge(uid, params);
    dispatch(updateChallengeSuccess());
  } catch (error) {
    postError(error);
  }
};

export const onArchiveChallenge = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  const params = {
    id: challenge.id,
    isActive: false,
  };

  try {
    onUpdateChallenge(dispatch, uid, params);
    await onAddArchive(dispatch, uid, challenge.id, challenge.workouts);
  } catch (error) {
    postError(error);
  }
};
