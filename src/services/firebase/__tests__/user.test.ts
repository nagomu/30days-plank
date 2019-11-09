import { addUser, fetchUser, updateUser } from '~/services/firebase/user';
import { User } from '~/types';

jest.mock('~/utils/datetime');

const mockGet = jest.fn();
const mockSet = jest.fn();
const mockUpdate = jest.fn();

/* eslint-disable @typescript-eslint/explicit-function-return-type */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      firestore: () => ({
        collection: () => ({
          doc: (uid: string) => ({
            get: mockGet(uid),
            set: mockSet,
            update: mockUpdate,
          }),
        }),
      }),
    },
  }),
);
/* eslint-enable */

describe('user', () => {
  const ts = {
    seconds: 1111,
    nanoseconds: 0,
  } as firebase.firestore.Timestamp;

  let fixture: User[];
  beforeEach(() => {
    fixture = [
      {
        uid: 'uid',
        name: 'name',
        photoURL: 'photo.png',
        createdAt: ts,
        updatedAt: ts,
      },
    ];
  });

  mockGet.mockImplementation((uid: string) => {
    const result = fixture.find(user => user.uid === uid);
    return jest.fn().mockResolvedValue({ data: () => result });
  });

  mockSet.mockImplementation(user => {
    fixture.push({
      uid: user.uid,
      name: user.name,
      photoURL: user.photoURL,
      createdAt: ts,
      updatedAt: ts,
    });

    return jest.fn().mockResolvedValue(undefined);
  });

  mockUpdate.mockImplementation(user => {
    const index = fixture.findIndex(data => data.uid === user.uid);
    fixture[index] = {
      uid: user.uid,
      name: user.name,
      photoURL: user.photoURL,
      createdAt: ts,
      updatedAt: ts,
    };

    return jest.fn().mockResolvedValue(undefined);
  });

  describe('fetchUser', () => {
    it('returns correct data if the user exists', async () => {
      const expected = fixture[0];
      expect(await fetchUser('uid')).toEqual(expected);
    });

    it('returns undefined if the user does not exist', async () => {
      const expected = undefined;
      expect(await fetchUser('id')).toEqual(expected);
    });
  });

  describe('addUser', () => {
    const firebaseUser = {
      uid: 'firebase',
      displayName: 'firebase',
      photoURL: 'firebase.png',
    };

    it('returns correct data if the user exists', async () => {
      const params = {
        ...firebaseUser,
        uid: 'uid',
      };
      const expected = fixture[0];
      expect(await addUser(params)).toEqual(expected);
    });

    it('adds user if the user does not exist', async () => {
      const expected = {
        uid: 'firebase',
        name: 'firebase',
        photoURL: 'firebase.png',
        createdAt: ts,
        updatedAt: ts,
      };
      expect(await addUser(firebaseUser)).toEqual(expected);
    });
  });

  describe('updateUser', () => {
    const userParams = {
      uid: 'uid',
      name: 'new name',
      photoURL: 'new-photo.png',
    };

    it('updates the user data correctly', async () => {
      const expected = {
        uid: 'uid',
        name: 'new name',
        photoURL: 'new-photo.png',
        createdAt: ts,
        updatedAt: ts,
      };

      expect(await updateUser(userParams)).toEqual(expected);
    });

    it('returns undefined if the user does not exist', async () => {
      const params = {
        ...userParams,
        uid: 'new',
      };

      expect(await updateUser(params)).toEqual(undefined);
    });
  });
});
