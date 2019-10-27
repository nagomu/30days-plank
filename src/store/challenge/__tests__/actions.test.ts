import timekeeper from 'timekeeper';

import {
  addChallenge,
  addChallengeSuccess,
  fetchChallenge,
  initialState,
  onAddChallenge,
  onFetchChallenge,
  onUpdateChallenge,
  setChallenge,
  updateChallenge,
  updateChallengeSuccess,
} from '~/store/challenge';
import { timestampFromDate } from '~/utils/firebase';
import { mockStore } from '~/utils/testHelpers';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

jest.mock('~/services/firebase/addChallengeToFirestore');
// TODO: Add more better mock
jest.mock('~/services/firebase/fetchChallengeFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);
jest.mock('~/services/firebase/updateChallengeToFirestore');

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
    // TODO: Add more tests
    it('should create valid action', async () => {
      const store = mockStore({ challenge: initialState });
      await onFetchChallenge(store.dispatch, 'uid');

      const expected = [{ type: 'FETCH_CHALLENGE' }];
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
      };
      await onAddChallenge(store.dispatch, 'uid', params);

      const expected = [
        { type: 'ADD_CHALLENGE' },
        { type: 'ADD_CHALLENGE_SUCCESS' },
        { type: 'FETCH_CHALLENGE' },
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
});

timekeeper.reset();