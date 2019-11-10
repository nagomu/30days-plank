import timekeeper from 'timekeeper';

import {
  addChallenge,
  addChallengeSuccess,
  challengeReducer as reducer,
  fetchChallenge,
  initialState,
  setChallenge,
  setPartialWorkout,
  updateChallenge,
  updateChallengeSuccess,
} from '~/store/challenge';
import { timestamp } from '~/utils';

describe('challenge: reducers', () => {
  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  it('handles FETCH_CHALLENGE', () => {
    const expected = {
      isLoading: true,
      challenge: undefined,
    };
    const action = fetchChallenge();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_CHALLENGE', () => {
    const challenge = {
      id: 'xxx',
      description: 'xxx',
      isActive: true,
      workouts: [],
      createdAt: timestamp(mockToday),
    };
    const expected = {
      isLoading: false,
      challenge: challenge,
    };
    const action = setChallenge(challenge);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_PARTIAL_WORKOUT', () => {
    const workout = {
      id: '2',
      isCompleted: true,
      isRest: false,
      menu: 20,
      date: timestamp(mockToday),
      title: 'Day 2',
    };

    const challenge = {
      id: 'xxx',
      description: 'xxx',
      isActive: true,
      workouts: [
        {
          id: '2',
          isCompleted: false,
          isRest: false,
          menu: 20,
          date: timestamp(mockToday),
          title: 'Day 2',
        },
        {
          id: '1',
          isCompleted: true,
          isRest: false,
          menu: 20,
          date: timestamp(mockToday),
          title: 'Day 1',
        },
      ],
      createdAt: timestamp(mockToday),
    };

    const state = {
      isLoading: false,
      challenge,
    };

    const expected = {
      isLoading: false,
      challenge: {
        ...challenge,
        workouts: [
          {
            id: '2',
            isCompleted: true,
            isRest: false,
            menu: 20,
            date: timestamp(mockToday),
            title: 'Day 2',
          },
          {
            id: '1',
            isCompleted: true,
            isRest: false,
            menu: 20,
            date: timestamp(mockToday),
            title: 'Day 1',
          },
        ],
      },
    };

    const action = setPartialWorkout(workout);
    expect(reducer(state, action)).toEqual(expected);
  });

  it('handles ADD_CHALLENGE', () => {
    const expected = {
      isLoading: true,
      challenge: undefined,
    };
    const action = addChallenge();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_CHALLENGE_SUCCESS', () => {
    const expected = {
      isLoading: false,
      challenge: undefined,
    };
    const action = addChallengeSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles UPDATE_CHALLENGE', () => {
    const expected = {
      isLoading: true,
      challenge: undefined,
    };
    const action = updateChallenge();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles UPDATE_CHALLENGE_SUCCESS', () => {
    const expected = {
      isLoading: false,
      challenge: undefined,
    };
    const action = updateChallengeSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  timekeeper.reset();
});
