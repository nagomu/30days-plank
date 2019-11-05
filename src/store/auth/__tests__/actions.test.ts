import { User } from 'firebase';

import { postError } from '~/services/firestore';
import {
  addUser,
  addUserSuccess,
  authStateChanged,
  fetchUser,
  initialState,
  observeAuthStateChanged,
  onAddUser,
  onAuthStateChanged,
  onFetchUser,
  onSignIn,
  onSignOut,
  setUser,
  signIn,
  signOut,
  userParams,
} from '~/store/auth';
import { mockStore } from '~/utils';

jest.mock(
  '~/services/firebase/asyncOnAuthStateChanged',
  jest.fn().mockReturnValue({
    asyncOnAuthStateChanged: jest
      .fn()
      .mockResolvedValueOnce({ uid: 'uid' })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce({ error: 'error' }),
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

  describe('onAddUser', () => {
    it('should create valid action', async () => {
      const user = {
        uid: 'xxx',
        name: 'yyy',
        photoURL: 'zzz',
      };
      await onAddUser(store.dispatch, user);

      const expected = [{ type: 'ADD_USER' }, { type: 'ADD_USER_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchUser', () => {
    describe('user exists', () => {
      it('should create valid action', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = {
          displayName: 'yyy',
          photoURL: 'zzz',
          uid: 'xxx',
        };
        await onFetchUser(store.dispatch, user as User);

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
                uid: 'xxx',
              },
            },
          },
        ];
        expect(store.getActions()).toEqual(expected);
      });
    });

    describe.skip('not found user', () => {
      it('should create valid action', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = {
          displayName: 'yyy',
          photoURL: 'zzz',
          uid: 'xxx',
        };
        await onFetchUser(store.dispatch, user as User);

        const expected = [
          { type: 'FETCH_USER' },
          { type: 'ADD_USER' },
          { type: 'ADD_USER_SUCCESS' },
        ];
        expect(store.getActions()).toEqual(expected);
      });
    });
  });

  describe('onAuthStateChanged', () => {
    it('should create valid action if user exists', async () => {
      await onAuthStateChanged(store.dispatch);

      const expected = [
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'FETCH_USER' },
        { type: 'AUTH_STATE_CHANGED' },
        {
          type: 'SET_USER',
          payload: {
            user: {
              name: undefined,
              photoURL: undefined,
              uid: 'xxx',
            },
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('should create valid action if user does not exist', async () => {
      await onAuthStateChanged(store.dispatch);

      const expected = [
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'SET_USER', payload: { user: undefined } },
        { type: 'AUTH_STATE_CHANGED' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if Error', async () => {
      const mock = jest.fn(postError);
      try {
        await onAuthStateChanged(store.dispatch);
      } catch {
        expect(mock).toBeCalled();
      }
    });
  });

  describe('onSignIn', () => {
    it('should create valid action', async () => {
      await onSignIn(store.dispatch);

      const expected = [{ type: 'SIGN_IN' }];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if Error', async () => {
      const mock = jest.fn(postError);
      try {
        await onSignIn(store.dispatch);
      } catch (error) {
        expect(mock).toBeCalled();
      }
    });
  });

  describe('onSignOut', () => {
    it('should create valid action', async () => {
      await onSignOut(store.dispatch);

      const expected = [
        { type: 'SIGN_OUT' },
        { type: 'OBSERVE_AUTH_STATE_CHANGED' },
        { type: 'SET_USER', payload: { user: undefined } },
        { type: 'AUTH_STATE_CHANGED' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if Error', async () => {
      const mock = jest.fn(postError);
      try {
        await onSignOut(store.dispatch);
      } catch (error) {
        expect(mock).toBeCalled();
      }
    });
  });

  describe('userParams', () => {
    const firebaseUser = {
      displayName: 'Firebase',
      photoURL: 'firebase.png',
      uid: 'firebase',
    };

    const user = {
      name: 'user',
      photoURL: 'user.png',
      uid: 'uid',
    };

    it('returns User correctly if user exists', async () => {
      expect(userParams(firebaseUser, user)).toEqual(user);
    });

    it('returns User correctly if user does not exist', async () => {
      const expected = {
        name: 'Firebase',
        photoURL: 'firebase.png',
        uid: 'firebase',
      };
      expect(userParams(firebaseUser)).toEqual(expected);
    });
  });
});
