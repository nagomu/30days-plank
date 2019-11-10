import {
  FETCH_WORKOUTS,
  FETCH_WORKOUTS_SUCCESS,
  UPDATE_WORKOUT,
  UPDATE_WORKOUT_SUCCESS,
  WorkoutActionTypes,
  WorkoutState,
} from '~/store/workout';

export const initialState: WorkoutState = {
  isLoading: undefined,
};

export const workoutReducer = (
  state = initialState,
  action: WorkoutActionTypes,
): WorkoutState => {
  switch (action.type) {
    case FETCH_WORKOUTS_SUCCESS:
    case UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_WORKOUTS:
    case UPDATE_WORKOUT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
