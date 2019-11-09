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

export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
export type FetchWorkoutsAction = {
  type: typeof FETCH_WORKOUTS;
};

export const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
export type FetchWorkoutsSuccessAction = {
  type: typeof FETCH_WORKOUTS_SUCCESS;
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
  | FetchWorkoutsAction
  | FetchWorkoutsSuccessAction
  | UpdateWorkoutAction
  | UpdateWorkoutSuccessAction;
