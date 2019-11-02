import timekeeper from 'timekeeper';

import {
  addChallenge,
  addChallengeSuccess,
  fetchChallenge,
  initialState,
  onAddChallenge,
  onArchiveChallenge,
  onFetchChallenge,
  onUpdateChallenge,
  setChallenge,
  setPartialWorkout,
  updateChallenge,
  updateChallengeSuccess,
} from '~/store/challenge';
import { timestampFromDate } from '~/utils/firebase';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore } from '~/utils/testHelpers';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

describe('challenge: actions', () => {
  describe('fetchChallenge', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      store.dispatch(fetchChallenge());

      const expected = [{ type: 'FETCH_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setChallenge', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };
      store.dispatch(setChallenge(challenge));

      const expected = [
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              createdAt: {
                nanoseconds: 0,
                seconds: 1569888000,
              },
              description: 'xxx',
              id: 'xxx',
              isActive: true,
              workouts: [],
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setPartialWorkout', () => {
    it('should create valid action', () => {
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestampFromDate(mockToday),
      };

      const store = mockStore({
        challenge: {
          isLoading: false,
          challenge,
        },
      });

      const workout = {
        id: 'xxx',
        isCompleted: false,
        isRest: false,
        menu: 20,
        scheduledDate: timestampFromDate(mockToday),
        title: 'Day 1',
      };

      store.dispatch(setPartialWorkout(workout));

      const expected = [
        {
          type: 'SET_PARTIAL_WORKOUT',
          payload: {
            workout,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addChallenge', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      store.dispatch(addChallenge());

      const expected = [{ type: 'ADD_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addChallengeSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      store.dispatch(addChallengeSuccess());

      const expected = [{ type: 'ADD_CHALLENGE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateChallenge', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      store.dispatch(updateChallenge());

      const expected = [{ type: 'UPDATE_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateChallengeSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ challenge: initialState });
      store.dispatch(updateChallengeSuccess());

      const expected = [{ type: 'UPDATE_CHALLENGE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchChallenge', () => {
    it('should create valid action', async () => {
      const store = mockStore({ challenge: initialState });
      await onFetchChallenge(store.dispatch, 'uid');

      const expected = [
        { type: 'FETCH_CHALLENGE' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              data: 'data',
              id: 'id',
            },
          },
        },
        { type: 'FETCH_ALL_WORKOUTS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onAddChallenge', () => {
    it('should create valid action', async () => {
      const store = mockStore({ challenge: initialState });
      const params = {
        description: 'xxx',
        isActive: true,
        createdAt: timestampFromDate(new Date(mockToday)),
        workouts: [],
      };
      await onAddChallenge(store.dispatch, 'uid', params);

      const expected = [
        { type: 'ADD_CHALLENGE' },
        { type: 'ADD_CHALLENGE_SUCCESS' },
        { type: 'FETCH_CHALLENGE' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              data: 'data',
              id: 'id',
            },
          },
        },
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
        { type: 'SET_WORKOUT' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              data: 'data',
              id: 'id',
              workouts: [
                {
                  data: 'data',
                  id: 'id',
                },
              ],
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onUpdateChallenge', () => {
    it('should create valid action', async () => {
      const store = mockStore({ challenge: initialState });
      const params = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
      };
      await onUpdateChallenge(store.dispatch, 'uid', params);

      const expected = [
        { type: 'UPDATE_CHALLENGE' },
        { type: 'UPDATE_CHALLENGE_SUCCESS' },
        { type: 'FETCH_CHALLENGE' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onArchiveChallenge', () => {
    it('should create valid action', async () => {
      const store = mockStore({ challenge: initialState });
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: mockWorkouts(),
        createdAt: timestampFromDate(mockToday),
      };
      await onArchiveChallenge(store.dispatch, 'uid', challenge);

      const expected = [
        { type: 'UPDATE_CHALLENGE' },
        { type: 'UPDATE_CHALLENGE_SUCCESS' },
        { type: 'FETCH_CHALLENGE' },
        { type: 'ADD_ARCHIVE' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              data: 'data',
              id: 'id',
            },
          },
        },
        { type: 'FETCH_ALL_WORKOUTS' },
        { type: 'ADD_ARCHIVE_SUCCESS' },
        { type: 'FETCH_CHALLENGE' },
        { type: 'FETCH_ALL_WORKOUTS_SUCCESS' },
        { type: 'SET_WORKOUT' },
        {
          type: 'SET_CHALLENGE',
          payload: {
            challenge: {
              data: 'data',
              id: 'id',
              workouts: [
                {
                  data: 'data',
                  id: 'id',
                },
              ],
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });
});

timekeeper.reset();
