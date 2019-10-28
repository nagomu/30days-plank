import {
  ADD_WORKOUT,
  ADD_WORKOUT_SUCCESS,
  FETCH_WORKOUT,
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
    case SET_WORKOUT:
    case ADD_WORKOUT_SUCCESS:
    case UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_WORKOUT:
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
