import timekeeper from 'timekeeper';

import {
  addChallenge,
  addChallengeSuccess,
  fetchChallenge,
  initialState,
  setChallenge,
  updateChallenge,
  updateChallengeSuccess,
} from '~/store/challenge';
import firebase from '~/utils/firebase';
import { mockStore } from '~/utils/testHelpers';

describe('challenge: actions', () => {
  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

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
        createdAt: firebase.firestore.Timestamp.fromDate(mockToday),
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

  timekeeper.reset();
});
