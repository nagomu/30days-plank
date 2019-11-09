export enum Status {
  finish,
  pause,
  restart,
  standby,
  start,
}

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

export const FETCH_WORKOUT_SUCCESS = 'FETCH_WORKOUT_SUCCESS';
export type FetchWorkoutSuccessAction = {
  type: typeof FETCH_WORKOUT_SUCCESS;
};

export const FETCH_ALL_WORKOUTS = 'FETCH_ALL_WORKOUTS';
export type FetchAllWorkoutsAction = {
  type: typeof FETCH_ALL_WORKOUTS;
};

export const FETCH_ALL_WORKOUTS_SUCCESS = 'FETCH_ALL_WORKOUTS_SUCCESS';
export type FetchAllWorkoutsSuccessAction = {
  type: typeof FETCH_ALL_WORKOUTS_SUCCESS;
};

export const SET_WORKOUT = 'SET_WORKOUT';
export type SetWorkoutAction = {
  type: typeof SET_WORKOUT;
};

export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export type UpdateWorkoutAction = {
  type: typeof UPDATE_WORKOUT;
};

export const UPDATE_WORKOUT_SUCCESS = 'UPDATE_WORKOUT_SUCCESS';
export type UpdateWorkoutSuccessAction = {
  type: typeof UPDATE_WORKOUT_SUCCESS;
};

export type WorkoutActionTypes =
  | FetchWorkoutAction
  | FetchWorkoutSuccessAction
  | FetchAllWorkoutsAction
  | FetchAllWorkoutsSuccessAction
  | SetWorkoutAction
  | UpdateWorkoutAction
  | UpdateWorkoutSuccessAction;
