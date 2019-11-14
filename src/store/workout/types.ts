export type WorkoutState = {
  isLoading?: boolean;
};

export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
type FetchWorkoutsAction = {
  type: typeof FETCH_WORKOUTS;
};

export const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
type FetchWorkoutsSuccessAction = {
  type: typeof FETCH_WORKOUTS_SUCCESS;
};

export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
type UpdateWorkoutAction = {
  type: typeof UPDATE_WORKOUT;
};

export const UPDATE_WORKOUT_SUCCESS = 'UPDATE_WORKOUT_SUCCESS';
type UpdateWorkoutSuccessAction = {
  type: typeof UPDATE_WORKOUT_SUCCESS;
};

export type WorkoutActionTypes =
  | FetchWorkoutsAction
  | FetchWorkoutsSuccessAction
  | UpdateWorkoutAction
  | UpdateWorkoutSuccessAction;
