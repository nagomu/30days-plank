import timekeeper from 'timekeeper';

import { postError } from '~/services/firebase/error';
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
import { mockStore, timestamp } from '~/utils';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

const mockFetch = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();

jest.mock(
  '~/services/firebase/challenge',
  jest.fn().mockReturnValue({
    fetchChallenge: () => mockFetch(),
    addChallenge: () => mockAdd(),
    updateChallenge: () => mockUpdate(),
  }),
);

jest.mock(
  '~/services/firebase/archive',
  jest.fn().mockReturnValue({
    addArchive: jest.fn().mockResolvedValue(undefined),
  }),
);

describe('challenge: actions', () => {
  const store = mockStore({ challenge: initialState });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchChallenge', () => {
    it('should create valid action', () => {
      store.dispatch(fetchChallenge());
      const expected = [{ type: 'FETCH_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setChallenge', () => {
    it('should create valid action', () => {
      const challenge = {
        id: 'xxx',
        description: 'xxx',
        isActive: true,
        workouts: [],
        createdAt: timestamp(mockToday),
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
        createdAt: timestamp(mockToday),
      };

      const workout = {
        id: 'xxx',
        isCompleted: false,
        isRest: false,
        menu: 20,
        date: timestamp(mockToday),
        title: 'Day 1',
      };

      const store = mockStore({
        challenge: {
          isLoading: false,
          challenge,
        },
      });

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
      store.dispatch(addChallenge());
      const expected = [{ type: 'ADD_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addChallengeSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(addChallengeSuccess());
      const expected = [{ type: 'ADD_CHALLENGE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateChallenge', () => {
    it('should create valid action', () => {
      store.dispatch(updateChallenge());
      const expected = [{ type: 'UPDATE_CHALLENGE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('updateChallengeSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(updateChallengeSuccess());
      const expected = [{ type: 'UPDATE_CHALLENGE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchChallenge', () => {
    it('should create valid action', async () => {
      mockFetch.mockImplementation(jest.fn().mockResolvedValue(undefined));
      await onFetchChallenge(store.dispatch, 'uid', 'cid');

      const expected = [
        { type: 'FETCH_CHALLENGE' },
        {
          type: 'SET_CHALLENGE',
          payload: { challenge: undefined },
        },
        { type: 'FETCH_WORKOUTS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockFetch.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onFetchChallenge(store.dispatch, 'uid', 'cid');
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onAddChallenge', () => {
    it('should create valid action', async () => {
      mockAdd.mockImplementation(jest.fn().mockResolvedValue(undefined));
      await onAddChallenge(store.dispatch);

      const expected = [
        { type: 'ADD_CHALLENGE' },
        { type: 'ADD_CHALLENGE_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockAdd.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onAddChallenge(store.dispatch);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onUpdateChallenge', () => {
    const params = {
      id: 'xxx',
      description: 'xxx',
      isActive: true,
    };

    it('should create valid action', async () => {
      mockUpdate.mockImplementation(jest.fn().mockResolvedValue(undefined));
      await onUpdateChallenge(store.dispatch, params);

      const expected = [
        { type: 'UPDATE_CHALLENGE' },
        { type: 'UPDATE_CHALLENGE_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockUpdate.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onUpdateChallenge(store.dispatch, params);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onArchiveChallenge', () => {
    const params = {
      id: 'xxx',
      description: 'xxx',
      isActive: true,
      workouts: [],
      createdAt: timestamp(mockToday),
    };

    it('should create valid action', async () => {
      mockUpdate.mockImplementation(jest.fn().mockResolvedValue(undefined));
      await onArchiveChallenge(store.dispatch, params);

      const expected = [
        { type: 'UPDATE_CHALLENGE' },
        { type: 'ADD_ARCHIVE' },
        { type: 'UPDATE_CHALLENGE_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockUpdate.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onArchiveChallenge(store.dispatch, params);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });
});

timekeeper.reset();
