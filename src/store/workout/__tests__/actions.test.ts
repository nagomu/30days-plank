import timekeeper from 'timekeeper';

import {
  addWorkout,
  addWorkoutSuccess,
  fetchAllWorkouts,
  fetchAllWorkoutsSuccess,
  initialState,
  onAddWorkouts,
  onFetchAllWorkouts,
  onUpdateWorkout,
  setWorkout,
  updateWorkout,
  updateWorkoutSuccess,
} from '~/store/workout';
import { timestampFromDate } from '~/utils/firebase';
import { mockStore } from '~/utils/testHelpers';

jest.mock('~/services/firebase/addWorkoutsToFirestore', () =>
  jest.fn().mockReturnValue(Promise.resolve()),
);
// TODO: Add more better mock
jest.mock('~/services/firebase/fetchAllWorkoutsFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);
jest.mock('~/services/firebase/updateWorkoutToFirestore', () =>
  jest.fn().mockReturnValue(Promise.resolve()),
);

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

describe('workout: actions', () => {
  describe('fetchAllWorkouts', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(fetchAllWorkouts());

      const expected = [{ type: 'FETCH_ALL_WORKOUTS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetchAllWorkoutsSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(fetchAllWorkoutsSuccess());

      const expected = [{ type: 'FETCH_ALL_WORKOUTS_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setWorkout', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(setWorkout());

      const expected = [{ type: 'SET_WORKOUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addWorkout', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(addWorkout());

      const expected = [{ type: 'ADD_WORKOUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addWorkoutSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(addWorkoutSuccess());

      const expected = [{ type: 'ADD_WORKOUT_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateWorkout', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(updateWorkout());

      const expected = [{ type: 'UPDATE_WORKOUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateWorkoutSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(updateWorkoutSuccess());

      const expected = [{ type: 'UPDATE_WORKOUT_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchAllWorkouts', () => {
    // TODO: Add more tests
    it('should create valid action', async () => {
      const store = mockStore({ workout: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };
      await onFetchAllWorkouts(store.dispatch, 'uid', challenge);

      const expected = [
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onAddWorkouts', () => {
    it('should create valid action', async () => {
      const store = mockStore({ workout: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };
      await onAddWorkouts(store.dispatch, 'uid', challenge);

      const expected = [
        { type: 'ADD_WORKOUT' },
        { type: 'ADD_WORKOUT_SUCCESS' },
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onUpdateWorkout', () => {
    it('should create valid action', async () => {
      const store = mockStore({ workout: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };
      const workout = {
        id: 'xxx',
        isCompleted: true,
      };
      await onUpdateWorkout(store.dispatch, 'uid', challenge, workout);

      const expected = [
        { type: 'UPDATE_WORKOUT' },
        { type: 'UPDATE_WORKOUT_SUCCESS' },
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });
});

timekeeper.reset();
