import timekeeper from 'timekeeper';

import { timestampFromDate } from '~/services/firestore';
import {
  fetchAllWorkouts,
  fetchAllWorkoutsSuccess,
  fetchWorkout,
  fetchWorkoutSuccess,
  initialState,
  onFetchAllWorkouts,
  onFetchWorkout,
  onUpdateWorkout,
  setWorkout,
  updateWorkout,
  updateWorkoutSuccess,
} from '~/store/workout';
import { mockStore } from '~/utils';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

describe('workout: actions', () => {
  describe('fetchWorkout', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(fetchWorkout());

      const expected = [{ type: 'FETCH_WORKOUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetchWorkoutSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ workout: initialState });
      store.dispatch(fetchWorkoutSuccess());

      const expected = [{ type: 'FETCH_WORKOUT_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

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

  describe('onFetchWorkout', () => {
    it('should create valid action', async () => {
      const store = mockStore({ workout: initialState });
      await onFetchWorkout(store.dispatch, 'cid', 'wid');

      const expected = [
        { type: 'FETCH_WORKOUT' },
        { type: 'FETCH_WORKOUT_SUCCESS' },
        {
          type: 'SET_PARTIAL_WORKOUT',
          payload: {
            workout: {
              id: undefined,
            },
          },
        },
        { type: 'SET_WORKOUT' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchAllWorkouts', () => {
    it('should create valid action', async () => {
      const store = mockStore({ workout: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };
      await onFetchAllWorkouts(store.dispatch, challenge);

      const expected = [
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
        { type: 'SET_WORKOUT' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              createdAt: timestampFromDate(mockToday),
              description: 'xxx',
              id: 'xxx',
              isActive: true,
              workouts: [
                {
                  id: 'id',
                  data: 'data',
                },
              ],
            },
          },
        },
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
      await onUpdateWorkout(store.dispatch, challenge, workout);

      const expected = [
        { type: 'UPDATE_WORKOUT' },
        { type: 'UPDATE_WORKOUT_SUCCESS' },
        { type: 'FETCH_WORKOUT' },
        { type: 'FETCH_WORKOUT_SUCCESS' },
        {
          type: 'SET_PARTIAL_WORKOUT',
          payload: {
            workout: {
              id: undefined,
            },
          },
        },
        { type: 'SET_WORKOUT' },
        { type: 'FETCH_CHALLENGE' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });
});

timekeeper.reset();
