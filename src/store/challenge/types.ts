import { Challenge, Workout } from '~/types';

export type ChallengeState = {
  challenge?: Challenge;
  isLoading?: boolean;
};

export const FETCH_CHALLENGE = 'FETCH_CHALLENGE';
type FetchChallengeAction = {
  type: typeof FETCH_CHALLENGE;
};

export const SET_CHALLENGE = 'SET_CHALLENGE';
type SetChallengeAction = {
  type: typeof SET_CHALLENGE;
  payload: {
    challenge?: Challenge;
  };
};

export const SET_PARTIAL_WORKOUT = 'SET_PARTIAL_WORKOUT';
type SetPartialWorkoutAction = {
  type: typeof SET_PARTIAL_WORKOUT;
  payload: {
    workout: Workout;
  };
};

export const ADD_CHALLENGE = 'ADD_CHALLENGE';
type AddChallengeAction = {
  type: typeof ADD_CHALLENGE;
};

export const ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS';
type AddChallengeSuccessAction = {
  type: typeof ADD_CHALLENGE_SUCCESS;
};

export const UPDATE_CHALLENGE = 'UPDATE_CHALLENGE';
type UpdateChallengeAction = {
  type: typeof UPDATE_CHALLENGE;
};

export const UPDATE_CHALLENGE_SUCCESS = 'UPDATE_CHALLENGE_SUCCESS';
type UpdateChallengeSuccessAction = {
  type: typeof UPDATE_CHALLENGE_SUCCESS;
};

export type ChallengeActionTypes =
  | FetchChallengeAction
  | SetChallengeAction
  | SetPartialWorkoutAction
  | AddChallengeAction
  | AddChallengeSuccessAction
  | UpdateChallengeAction
  | UpdateChallengeSuccessAction;
