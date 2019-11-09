import timekeeper from 'timekeeper';

import { Workout } from '~/services/firebase/workout';
import { workouts } from '~/utils/fixtures/workouts';

import {
  addChallenge,
  Challenge,
  fetchChallenge,
  updateChallenge,
} from '../challenge';

jest.mock('~/utils/datetime');

const now = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(now);

const mockGet = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();

/* eslint-disable @typescript-eslint/explicit-function-return-type */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
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
  } as firebase.firestore.Timestamp;

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
      expect(await fetchChallenge('uid', 'cid')).toEqual(expected);
    });

    it('returns undefined if it does not exist', async () => {
      const expected = undefined;
      expect(await fetchChallenge('uid', 'id')).toEqual(expected);
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
      expect(await addChallenge('uid')).toEqual(challenge);
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

      expect(await updateChallenge('uid', 'cid', params)).toEqual(expected);
    });
  });
});

timekeeper.reset();
