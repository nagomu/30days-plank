import {
  addWorkout,
  fetchWorkout,
  updateWorkout,
} from '~/services/firebase/workout';
import { Timestamp, Workout } from '~/types';

jest.mock('~/utils/datetime');

const mockGet = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();

/* eslint-disable @typescript-eslint/explicit-function-return-type */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      firestore: () => ({
        collection: () => ({
          add: mockAdd,
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

describe('workout', () => {
  const ts = {
    seconds: 1111,
    nanoseconds: 0,
  } as Timestamp;

  let fixture: Workout[];
  beforeEach(() => {
    fixture = [
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
    ];
  });

  mockGet.mockImplementation((id: string) => {
    const result = fixture.find(w => w.id === id);
    return jest.fn().mockResolvedValue({ data: () => result });
  });

  mockAdd.mockImplementation(workout => {
    fixture.push({
      id: 'new-id',
      title: workout.title,
      menu: workout.menu,
      date: workout.date,
      isCompleted: workout.isCompleted,
      isRest: workout.isRest,
      createdAt: ts,
      updatedAt: ts,
    });
    return jest.fn().mockResolvedValue(undefined);
  });

  mockUpdate.mockImplementation(workout => {
    const index = fixture.findIndex(data => data.id === 'wid');
    fixture[index] = {
      ...fixture[index],
      isCompleted: workout.isCompleted,
    };
    return jest.fn().mockResolvedValue(undefined);
  });

  describe('fetchWorkout', () => {
    it('returns the workout data correctly', async () => {
      const expected = fixture[0];
      expect(await fetchWorkout('uid', 'cid', 'wid')).toEqual(expected);
    });

    it('returns undefined if the workout data does not exist', async () => {
      const expected = undefined;
      expect(await fetchWorkout('uid', 'cid', 'id')).toEqual(expected);
    });
  });

  describe('addWorkout', () => {
    const params = {
      title: 'new',
      menu: 10,
      date: ts,
      isCompleted: true,
      isRest: true,
    };

    it('adds the workout data correctly', async () => {
      const expected = {
        ...params,
        id: 'new-id',
        createdAt: ts,
        updatedAt: ts,
      };

      expect(await addWorkout('uid', 'cid', params)).toEqual(expected);
    });
  });

  describe('updateWorkout', () => {
    const params = {
      id: 'wid',
      isCompleted: true,
    };

    it('updates the workout data correctly', async () => {
      const expected = {
        ...fixture[0],
        isCompleted: true,
      };
      expect(await updateWorkout('uid', 'cid', params)).toEqual(expected);
    });
  });
});
