import timekeeper from 'timekeeper';

import {
  addChallenge,
  addChallengeSuccess,
  challengeReducer as reducer,
  fetchChallenge,
  initialState,
  setChallenge,
  updateChallenge,
  updateChallengeSuccess,
} from '~/store/challenge';
import firebase from '~/utils/firebase';

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
      createdAt: firebase.firestore.Timestamp.fromDate(mockToday),
    };
    const expected = {
      isLoading: false,
      challenge,
    };
    const action = setChallenge(challenge);
    expect(reducer(initialState, action)).toEqual(expected);
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
