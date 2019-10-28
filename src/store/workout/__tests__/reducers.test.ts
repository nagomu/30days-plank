import {
  addWorkout,
  addWorkoutSuccess,
  fetchAllWorkouts,
  fetchAllWorkoutsSuccess,
  initialState,
  setWorkout,
  updateWorkout,
  updateWorkoutSuccess,
  workoutReducer as reducer,
} from '~/store/workout';

describe('workout: reducers', () => {
  it('handles FETCH_ALL_WORKOUTS', () => {
    const expected = { isLoading: true };
    const action = fetchAllWorkouts();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_ALL_SUCCESS', () => {
    const expected = { isLoading: false };
    const action = fetchAllWorkoutsSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_WORKOUT', () => {
    const expected = { isLoading: false };
    const action = setWorkout();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_WORKOUT', () => {
    const expected = { isLoading: true };
    const action = addWorkout();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_WORKOUT_SUCCESS', () => {
    const expected = { isLoading: false };
    const action = addWorkoutSuccess();
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
