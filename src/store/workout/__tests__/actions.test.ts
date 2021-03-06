import timekeeper from 'timekeeper';

import { postError } from '~/services/firebase/error';
import {
  fetchWorkouts,
  fetchWorkoutsSuccess,
  initialState,
  onFetchWorkouts,
  onUpdateWorkout,
  updateWorkout,
  updateWorkoutSuccess,
} from '~/store/workout';
import { timestamp } from '~/utils';
import { mockStore } from '~/utils/testHelpers';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

const mockFetch = jest.fn();
const mockUpdate = jest.fn();

jest.mock(
  '~/services/firebase/workout',
  jest.fn().mockReturnValue({
    fetchWorkouts: () => mockFetch(),
    updateWorkout: () => mockUpdate(),
  }),
);

describe('workout: actions', () => {
  const store = mockStore({ workout: initialState });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchWorkouts', () => {
    it('should create valid action', () => {
      store.dispatch(fetchWorkouts());
      const expected = [{ type: 'FETCH_WORKOUTS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetchWorkoutsSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(fetchWorkoutsSuccess());
      const expected = [{ type: 'FETCH_WORKOUTS_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateWorkout', () => {
    it('should create valid action', () => {
      store.dispatch(updateWorkout());
      const expected = [{ type: 'UPDATE_WORKOUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateWorkoutSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(updateWorkoutSuccess());
      const expected = [{ type: 'UPDATE_WORKOUT_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchWorkouts', () => {
    const challenge = {
      id: 'xxx',
      description: 'xxx',
      isActive: true,
      workouts: [],
      createdAt: timestamp(mockToday),
    };

    it('should create valid action', async () => {
      mockFetch.mockImplementation(jest.fn().mockResolvedValue([{ id: 'id' }]));
      const expected = [
        { type: 'FETCH_WORKOUTS' },
        { type: 'FETCH_WORKOUTS_SUCCESS' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              createdAt: timestamp(mockToday),
              description: 'xxx',
              id: 'xxx',
              isActive: true,
              workouts: [{ id: 'id' }],
            },
          },
        },
      ];

      await onFetchWorkouts(store.dispatch, challenge);
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if empty workouts', async () => {
      mockFetch.mockImplementation(jest.fn().mockResolvedValue([]));
      const expected = [
        { type: 'FETCH_WORKOUTS' },
        { type: 'FETCH_WORKOUTS_SUCCESS' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              createdAt: timestamp(mockToday),
              description: 'xxx',
              id: 'xxx',
              isActive: true,
              workouts: [],
            },
          },
        },
      ];

      await onFetchWorkouts(store.dispatch, challenge);
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if unauthenticated', async () => {
      mockFetch.mockImplementation(jest.fn().mockResolvedValue(undefined));
      const expected = [
        { type: 'FETCH_WORKOUTS' },
        { type: 'FETCH_WORKOUTS_SUCCESS' },
      ];

      await onFetchWorkouts(store.dispatch, challenge);
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockFetch.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onFetchWorkouts(store.dispatch, challenge);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onUpdateWorkout', () => {
    const workout = {
      id: 'xxx',
      isCompleted: true,
    };

    it('should create valid action', async () => {
      mockUpdate.mockImplementation(jest.fn().mockResolvedValue({ id: 'id' }));
      const expected = [
        { type: 'UPDATE_WORKOUT' },
        { type: 'UPDATE_WORKOUT_SUCCESS' },
        {
          type: 'SET_PARTIAL_WORKOUT',
          payload: {
            workout: { id: 'id' },
          },
        },
      ];

      await onUpdateWorkout(store.dispatch, 'cid', workout);
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if unauthenticated', async () => {
      mockUpdate.mockImplementation(jest.fn().mockResolvedValue(undefined));
      const expected = [
        { type: 'UPDATE_WORKOUT' },
        { type: 'UPDATE_WORKOUT_SUCCESS' },
      ];

      await onUpdateWorkout(store.dispatch, 'cid', workout);
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockUpdate.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onUpdateWorkout(store.dispatch, 'cid', workout);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });
});

timekeeper.reset();
