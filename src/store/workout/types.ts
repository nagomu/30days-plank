import { Timestamp } from '~/utils/firebase';

export enum Status {
  finish,
  pause,
  restart,
  standby,
  start,
}

export type Workout = {
  id: string;
  isCompleted: boolean;
  isRest: boolean;
  menu: number;
  scheduledDate: Timestamp;
  title: string;
};

export type WorkoutState = {
  isLoading?: boolean;
};

export type UpdateWorkoutParams = {
  id: string;
  isCompleted: boolean;
};

export const FETCH_WORKOUT = 'FETCH_WORKOUT';
export type FetchWorkoutAction = {
  type: typeof FETCH_WORKOUT;
};

export const SET_WORKOUT = 'SET_WORKOUT';
export type SetWorkoutAction = {
  type: typeof SET_WORKOUT;
};

// TODO: Add error handling
// export const FETCH_WORKOUT_FAILURE = 'FETCH_WORKOUT_FAILURE';
// export type FetchWorkoutFailureAction = {
//   type: typeof FETCH_WORKOUT_FAILURE;
//   error: any;
// };

export const ADD_WORKOUT = 'ADD_WORKOUT';
export type AddWorkoutAction = {
  type: typeof ADD_WORKOUT;
};

export const ADD_WORKOUT_SUCCESS = 'ADD_WORKOUT_SUCCESS';
export type AddWorkoutSuccessAction = {
  type: typeof ADD_WORKOUT_SUCCESS;
};

// TODO: Add error handling
// export const ADD_WORKOUT_FAILURE = 'ADD_WORKOUT_FAILURE';
// export type AddWorkoutFailureAction = {
//   type: typeof ADD_WORKOUT_FAILURE;
//   error: any;
// };

export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export type UpdateWorkoutAction = {
  type: typeof UPDATE_WORKOUT;
};

export const UPDATE_WORKOUT_SUCCESS = 'UPDATE_WORKOUT_SUCCESS';
export type UpdateWorkoutSuccessAction = {
  type: typeof UPDATE_WORKOUT_SUCCESS;
};

// TODO: Add error handling
// export const UPDATE_WORKOUT_FAILURE = 'UPDATE_WORKOUT_FAILURE';
// export type UpdateWorkoutFailureAction = {
//   type: typeof UPDATE_WORKOUT_FAILURE;
//   error: any;
// };

export type WorkoutActionTypes =
  | FetchWorkoutAction
  | SetWorkoutAction
  | AddWorkoutAction
  | AddWorkoutSuccessAction
  | UpdateWorkoutAction
  | UpdateWorkoutSuccessAction;
