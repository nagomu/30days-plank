import {
  FETCH_ALL_WORKOUTS,
  FETCH_ALL_WORKOUTS_SUCCESS,
  FETCH_WORKOUT,
  FETCH_WORKOUT_SUCCESS,
  SET_WORKOUT,
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
    case FETCH_ALL_WORKOUTS_SUCCESS:
    case FETCH_WORKOUT_SUCCESS:
    case SET_WORKOUT:
    case UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL_WORKOUTS:
    case FETCH_WORKOUT:
    case UPDATE_WORKOUT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
