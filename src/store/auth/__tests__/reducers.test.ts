import {
  addUser,
  addUserSuccess,
  authReducer as reducer,
  authStateChanged,
  fetchUser,
  initialState,
  observeAuthStateChanged,
  setUser,
  signIn,
  signOut,
} from '~/store/auth';

describe('auth: reducers', () => {
  it('handles OBSERVE_AUTH_STATE_CHANGED', () => {
    const expected = {
      isLoading: true,
      user: undefined,
    };
    const action = observeAuthStateChanged();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles AUTH_STATE_CHANGED', () => {
    const expected = {
      isLoading: false,
      user: undefined,
    };
    const action = authStateChanged();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_USER', () => {
    const expected = {
      isLoading: true,
      user: undefined,
    };
    const action = fetchUser();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_USER', () => {
    const user = {
      uid: 'xxx',
      name: undefined,
      photoURL: undefined,
    };
    const expected = {
      isLoading: false,
      user,
    };
    const action = setUser(user);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_USER', () => {
    const expected = {
      isLoading: true,
      user: undefined,
    };
    const action = addUser();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_USER_SUCCESS', () => {
    const expected = {
      isLoading: false,
      user: undefined,
    };
    const action = addUserSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SIGN_IN', () => {
    const expected = {
      isLoading: true,
      user: undefined,
    };
    const action = signIn();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SIGN_OUT', () => {
    const expected = {
      isLoading: true,
      user: undefined,
    };
    const action = signOut();
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
