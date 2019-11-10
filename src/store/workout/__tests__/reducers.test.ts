import {
  fetchWorkouts,
  fetchWorkoutsSuccess,
  initialState,
  updateWorkout,
  updateWorkoutSuccess,
  workoutReducer as reducer,
} from '~/store/workout';

describe('workout: reducers', () => {
  it('handles FETCH_WORKOUTS', () => {
    const expected = { isLoading: true };
    const action = fetchWorkouts();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_WORKOUTS_SUCCESS', () => {
    const expected = { isLoading: false };
    const action = fetchWorkoutsSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles UPDATE_WORKOUT', () => {
    const expected = { isLoading: true };
    const action = updateWorkout();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles UPDATE_WORKOUT_SUCCESS', () => {
    const expected = { isLoading: false };
    const action = updateWorkoutSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
