import { Dispatch } from 'redux';

import * as ChallengeService from '~/services/firebase/challenge';
import { postError } from '~/services/firebase/error';
import { updateUser } from '~/services/firebase/user';
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
} from '~/store/challenge';
import { onFetchWorkouts } from '~/store/workout';
import { Challenge, ChallengeParams, Workout } from '~/types';

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
  id: string,
): Promise<void> => {
  dispatch(fetchChallenge());

  try {
    const results = await ChallengeService.fetchChallenge(id);
    const challenge = {
      ...results,
      id,
    } as Challenge;
    dispatch(setChallenge(results ? challenge : undefined));
    onFetchWorkouts(dispatch, challenge as Challenge);
  } catch (error) {
    postError(error);
  }
  return;
};

export const onAddChallenge = async (dispatch: Dispatch): Promise<void> => {
  dispatch(addChallenge());

  try {
    const challenge = await ChallengeService.addChallenge();
    dispatch(addChallengeSuccess());

    if (challenge) {
      await onFetchWorkouts(dispatch, challenge as Challenge);
      updateUser({ challenge: challenge.id });
    }
  } catch (error) {
    postError(error);
  }
  return;
};

export const onUpdateChallenge = async (
  dispatch: Dispatch,
  params: ChallengeParams,
): Promise<void> => {
  dispatch(updateChallenge());

  try {
    await ChallengeService.updateChallenge(params);
    dispatch(updateChallengeSuccess());
  } catch (error) {
    postError(error);
  }
};

export const onArchiveChallenge = async (
  dispatch: Dispatch,
  challenge: Challenge,
): Promise<void> => {
  const params = {
    id: challenge.id,
    isActive: false,
  };

  try {
    onUpdateChallenge(dispatch, params);
    await onAddArchive(dispatch, challenge);
    dispatch(setChallenge(undefined));
  } catch (error) {
    postError(error);
  }
};
