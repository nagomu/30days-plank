import { postError } from '~/services/firebase/error';
import {
  addUser,
  addUserSuccess,
  authStateChanged,
  fetchUser,
  initialState,
  observeAuthStateChanged,
  onFetchUser,
  onObserveAuthStateChanged,
  onSignIn,
  onSignOut,
  setUser,
  signIn,
  signOut,
} from '~/store/auth';
import { FirebaseUser } from '~/types';
import { mockStore } from '~/utils';

const mockAuthStateChanged = jest.fn();
const mockSignIn = jest.fn();
const mockFetchUser = jest.fn();

jest.mock(
  '~/services/firebase/auth',
  jest.fn().mockReturnValue({
    onAuthStateChanged: () => mockAuthStateChanged(),
    signInWithGoogle: () => mockSignIn(),
    signOutWithGoogle: jest.fn(),
  }),
);
jest.mock(
  '~/services/firebase/user',
  jest.fn().mockReturnValue({
    addUser: jest.fn().mockResolvedValue({ uid: 'uid' }),
    fetchUser: () => mockFetchUser(),
  }),
);

describe('auth: actions', () => {
  const store = mockStore({ auth: initialState });

  afterEach(() => {
    store.clearActions();
  });

  describe('observeAuthStateChanged', () => {
    it('should create valid action', () => {
      store.dispatch(observeAuthStateChanged());

      const expected = [{ type: 'OBSERVE_AUTH_STATE_CHANGED' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('authStateChanged', () => {
    it('should create valid action', () => {
      store.dispatch(authStateChanged());

      const expected = [{ type: 'AUTH_STATE_CHANGED' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetchUser', () => {
    it('should create valid action', () => {
      store.dispatch(fetchUser());

      const expected = [{ type: 'FETCH_USER' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setUser', () => {
    it('should create valid action', () => {
      const user = {
        uid: 'xxx',
        name: undefined,
        photoURL: undefined,
      };

      store.dispatch(setUser(user));
      store.dispatch(setUser(undefined));

      const expected = [
        {
          type: 'SET_USER',
          payload: {
            user,
          },
        },
        {
          type: 'SET_USER',
          payload: {
            user: undefined,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addUser', () => {
    it('should create valid action', () => {
      store.dispatch(addUser());

      const expected = [{ type: 'ADD_USER' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addUserSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(addUserSuccess());

      const expected = [{ type: 'ADD_USER_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('signIn', () => {
    it('should create valid action', () => {
      store.dispatch(signIn());

      const expected = [{ type: 'SIGN_IN' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('signOut', () => {
    it('should create valid action', () => {
      store.dispatch(signOut());

      const expected = [{ type: 'SIGN_OUT' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchUser', () => {
    const user = {
      displayName: 'Firebase User',
      photoURL: 'firebase.png',
      uid: 'firebase',
    } as FirebaseUser;

    it('should create valid action if user exists', async () => {
      mockFetchUser.mockImplementation(
        jest.fn().mockResolvedValue({ uid: 'uid' }),
      );
      await onFetchUser(store.dispatch, user);

      const expected = [
        {
          type: 'FETCH_USER',
        },
        {
          type: 'SET_USER',
          payload: {
            user: {
              name: undefined,
              photoURL: undefined,
              uid: 'uid',
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if user does not exist', async () => {
      mockFetchUser.mockImplementation(jest.fn().mockResolvedValue(null));
      await onFetchUser(store.dispatch, user);

      const expected = [
        { type: 'FETCH_USER' },
        { type: 'ADD_USER' },
        { type: 'ADD_USER_SUCCESS' },
        {
          type: 'SET_USER',
          payload: {
            user: {
              name: undefined,
              photoURL: undefined,
              uid: 'uid',
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockFetchUser.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );

      const mock = jest.fn(postError);

      try {
        await onFetchUser(store.dispatch, user);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onObserveAuthStateChanged', () => {
    it('should create valid action if user exists', async () => {
      mockAuthStateChanged.mockImplementation(
        jest.fn().mockResolvedValue({ uid: 'uid' }),
      );
      await onObserveAuthStateChanged(store.dispatch);

      const expected = [
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'FETCH_USER' },
        { type: 'AUTH_STATE_CHANGED' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if user does not exist', async () => {
      mockAuthStateChanged.mockImplementation(
        jest.fn().mockResolvedValue(null),
      );
      await onObserveAuthStateChanged(store.dispatch);

      const expected = [
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'SET_USER', payload: { user: undefined } },
        { type: 'AUTH_STATE_CHANGED' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockAuthStateChanged.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );

      const mock = jest.fn(postError);

      try {
        await onObserveAuthStateChanged(store.dispatch);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onSignIn', () => {
    it('should create valid action', async () => {
      await onSignIn(store.dispatch);

      const expected = [{ type: 'SIGN_IN' }];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockSignIn.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );

      const mock = jest.fn(postError);

      try {
        await onSignIn(store.dispatch);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onSignOut', () => {
    it('should create valid action', async () => {
      mockAuthStateChanged.mockImplementation(
        jest.fn().mockResolvedValue(null),
      );
      await onSignOut(store.dispatch);

      const expected = [
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'SIGN_OUT' },
        { type: 'SET_USER', payload: { user: undefined } },
        { type: 'AUTH_STATE_CHANGED' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });
});
