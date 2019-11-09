import { Challenge, Timestamp, Workout } from '~/types';

export type ChallengeState = {
  challenge?: Challenge;
  isLoading?: boolean;
};

export type AddChallengeParams = {
  description?: string;
  isActive: boolean;
  createdAt: Timestamp;
  workouts: Workout[];
};

export type UpdateChallengeParams = {
  id: string;
  description?: string;
  isActive: boolean;
};

// Start db.collection('/users/{uid}/challenges').where('isActive', '==', true).get()
export const FETCH_CHALLENGE = 'FETCH_CHALLENGE';
export type FetchChallengeAction = {
  type: typeof FETCH_CHALLENGE;
};

// Set fetch result
// or Change user to `undefined`
export const SET_CHALLENGE = 'SET_CHALLENGE';
export type SetChallengeAction = {
  type: typeof SET_CHALLENGE;
  payload: {
    challenge?: Challenge;
  };
};

// Set fetch result of individual workout
export const SET_PARTIAL_WORKOUT = 'SET_PARTIAL_WORKOUT';
export type SetPartialWorkoutAction = {
  type: typeof SET_PARTIAL_WORKOUT;
  payload: {
    workout: Workout;
  };
};

// Start db.collection('/users/{uid}/challenges').doc().set()
export const ADD_CHALLENGE = 'ADD_CHALLENGE';
export type AddChallengeAction = {
  type: typeof ADD_CHALLENGE;
};

export const ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS';
export type AddChallengeSuccessAction = {
  type: typeof ADD_CHALLENGE_SUCCESS;
};

// Start db.collection('/users/{uid}/challenges').doc().set()
export const UPDATE_CHALLENGE = 'UPDATE_CHALLENGE';
export type UpdateChallengeAction = {
  type: typeof UPDATE_CHALLENGE;
};

export const UPDATE_CHALLENGE_SUCCESS = 'UPDATE_CHALLENGE_SUCCESS';
export type UpdateChallengeSuccessAction = {
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
