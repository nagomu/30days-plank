import timekeeper from 'timekeeper';

import {
  addChallenge,
  fetchChallenge,
  updateChallenge,
} from '~/services/firebase/challenge';
import { Challenge, Timestamp, Workout } from '~/types';
import { workouts } from '~/utils/fixtures/workouts';

jest.mock('~/utils/datetime');

const now = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(now);

const mockCurrentUser = jest.fn();
const mockGet = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();

/* eslint-disable @typescript-eslint/explicit-function-return-type */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      auth: () => mockCurrentUser(),
      firestore: () => ({
        batch: () => ({
          commit: mockAdd,
          set: jest.fn(),
        }),
        collection: () => ({
          doc: (id?: string) => ({
            get: mockGet(id || 'new-id'),
            update: mockUpdate,
          }),
        }),
      }),
    },
  }),
);
/* eslint-enable */

describe('challenge', () => {
  const ts = {
    seconds: 1569855600,
    nanoseconds: 0,
  } as Timestamp;

  let fixture: Challenge[];
  beforeEach(() => {
    fixture = [
      {
        id: 'cid',
        description: 'description',
        isActive: true,
        workouts: [
          {
            id: 'wid',
            title: 'title',
            menu: 20,
            date: ts,
            isCompleted: false,
            isRest: false,
            createdAt: ts,
            updatedAt: ts,
          },
        ],
        createdAt: ts,
        updatedAt: ts,
      },
    ];
    mockCurrentUser.mockImplementation(() => ({ currentUser: { uid: 'uid' } }));
  });

  mockGet.mockImplementation((id: string) => {
    const result = fixture.find(c => c.id === id);
    return jest.fn().mockResolvedValue({ data: () => result });
  });

  mockUpdate.mockImplementation(challenge => {
    const index = fixture.findIndex(data => data.id === 'cid');
    fixture[index] = {
      ...fixture[index],
      isActive: challenge.isActive,
    };
    return jest.fn().mockResolvedValue(undefined);
  });

  describe('fetchChallenge', () => {
    it('returns correct ChallengeData if it exists', async () => {
      const expected = fixture[0];
      expect(await fetchChallenge('cid')).toEqual(expected);
    });

    it('returns undefined if it does not exist', async () => {
      const expected = undefined;
      expect(await fetchChallenge('id')).toEqual(expected);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      expect(await fetchChallenge('id')).toEqual(expected);
    });
  });

  describe('addChallenge', () => {
    const challenge = {
      id: 'new-id',
      description: undefined,
      isActive: true,
      workouts: workouts as Workout[],
      createdAt: ts,
      updatedAt: ts,
    };

    it('add ChallengeData correctly', async () => {
      mockAdd.mockImplementation(() => {
        fixture.push(challenge);
        return jest.fn().mockResolvedValue(undefined);
      });
      expect(await addChallenge()).toEqual(challenge);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      expect(await addChallenge()).toEqual(expected);
    });
  });

  describe('updateChallenge', () => {
    const params = {
      id: 'cid',
      isActive: false,
    };

    it('updates ChallengeData correctly', async () => {
      const expected = {
        ...fixture[0],
        isActive: false,
      };

      expect(await updateChallenge(params)).toEqual(expected);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      expect(await updateChallenge(params)).toEqual(expected);
    });
  });
});

timekeeper.reset();
