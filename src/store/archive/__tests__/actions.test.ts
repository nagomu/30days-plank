import timekeeper from 'timekeeper';

import { workoutFactory } from '~/factories/workoutFactory';
import { postError } from '~/services/firebase/error';
import {
  addArchive,
  addArchiveSuccess,
  calculateRate,
  fetchArchives,
  generateTitle,
  initialState,
  onAddArchive,
  onFetchArchives,
  setArchives,
} from '~/store/archive';
import { mockStore, timestamp } from '~/utils';

const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

const mockFetch = jest.fn();
const mockAdd = jest.fn();

jest.mock(
  '~/services/firebase/archive',
  jest.fn().mockReturnValue({
    fetchArchives: () => mockFetch(),
    addArchive: () => mockAdd(),
  }),
);

const workouts = workoutFactory(mockToday).map((w, i) => ({
  id: `${i}`,
  ...w,
}));

describe('archive: actions', () => {
  const ts = timestamp(new Date());
  const store = mockStore({ archive: initialState });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchArchives', () => {
    it('should create valid action', () => {
      store.dispatch(fetchArchives());
      const expected = [{ type: 'FETCH_ARCHIVES' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setArchives', () => {
    it('should create valid action', () => {
      const archives = {
        archives: [
          {
            id: 'xxx',
            challenge: 'xxx',
            title: 'xxx',
            rate: 80,
            createdAt: ts,
            updatedAt: ts,
          },
        ],
        next: undefined,
      };

      store.dispatch(setArchives(archives));

      const expected = [
        {
          type: 'SET_ARCHIVES',
          payload: {
            archives: archives.archives,
            next: undefined,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addArchive', () => {
    it('should create valid action', () => {
      store.dispatch(addArchive());
      const expected = [{ type: 'ADD_ARCHIVE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addArchiveSuccess', () => {
    it('should create valid action', () => {
      store.dispatch(addArchiveSuccess());
      const expected = [{ type: 'ADD_ARCHIVE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchArchives', () => {
    it('should create valid action', async () => {
      mockFetch.mockImplementation(
        jest.fn().mockResolvedValue({ archives: [], next: undefined }),
      );
      await onFetchArchives(store.dispatch, 'uid');

      const expected = [
        { type: 'FETCH_ARCHIVES' },
        {
          type: 'SET_ARCHIVES',
          payload: {
            archives: [],
            next: undefined,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockFetch.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onFetchArchives(store.dispatch, 'uid');
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });

  describe('onAddArchive', () => {
    it('should create valid action', async () => {
      mockAdd.mockImplementation(jest.fn().mockResolvedValue(undefined));
      await onAddArchive(store.dispatch, 'uid', 'cid', workouts);

      const expected = [
        { type: 'ADD_ARCHIVE' },
        { type: 'ADD_ARCHIVE_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });

    it('calls postError if catch', async () => {
      mockAdd.mockImplementation(
        jest.fn().mockRejectedValue(new Error('Error')),
      );
      const mock = jest.fn(postError);

      try {
        await onAddArchive(store.dispatch, 'uid', 'cid', workouts);
      } catch (e) {
        expect(mock).toBeCalledTimes(1);
      }
    });
  });
});

describe('calculateRate', () => {
  it('returns rate correctly', () => {
    const _workouts = workouts.map((workout, i) => ({
      ...workout,
      isCompleted: i === 5 || i === 10 ? false : true,
    }));
    expect(calculateRate(_workouts)).toEqual(93);
  });
});

describe('generateTitle', () => {
  it('returns title correctly', () => {
    expect(generateTitle(workouts)).toEqual('Oct 1, 2019 - Oct 30, 2019');
  });
});

timekeeper.reset();
