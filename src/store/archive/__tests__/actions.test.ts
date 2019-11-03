import { timestampFromDate } from '~/services/firestore';
import {
  addArchive,
  addArchiveSuccess,
  fetchArchives,
  fetchArchivesSuccess,
  initialState,
  onAddArchive,
  onFetchArchives,
  setArchives,
} from '~/store/archive';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore } from '~/utils/testHelpers';

describe('archive: actions', () => {
  describe('fetchArchives', () => {
    it('should create valid action', () => {
      const store = mockStore({ archive: initialState });
      store.dispatch(fetchArchives());

      const expected = [{ type: 'FETCH_ARCHIVES' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('fetchArchivesSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ archive: initialState });
      store.dispatch(fetchArchivesSuccess());

      const expected = [{ type: 'FETCH_ARCHIVES_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('setArchives', () => {
    it('should create valid action', () => {
      const store = mockStore({ archive: initialState });
      const archives = [
        {
          id: 'xxx',
          challengeId: 'xxx',
          title: 'xxx',
          achievementRate: 80,
          createdAt: timestampFromDate(new Date()),
        },
      ];

      store.dispatch(setArchives(archives));
      store.dispatch(setArchives(undefined));

      const expected = [
        {
          type: 'SET_ARCHIVES',
          payload: {
            archives,
            size: 1,
          },
        },
        {
          type: 'SET_ARCHIVES',
          payload: {
            archives: [],
            size: 0,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addArchive', () => {
    it('should create valid action', () => {
      const store = mockStore({ archive: initialState });
      store.dispatch(addArchive());

      const expected = [{ type: 'ADD_ARCHIVE' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('addArchiveSuccess', () => {
    it('should create valid action', () => {
      const store = mockStore({ archive: initialState });
      store.dispatch(addArchiveSuccess());

      const expected = [{ type: 'ADD_ARCHIVE_SUCCESS' }];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onFetchArchives', () => {
    it('should create valid action', async () => {
      const store = mockStore({ archive: initialState });

      await onFetchArchives(store.dispatch);

      const expected = [
        { type: 'FETCH_ARCHIVES' },
        { type: 'FETCH_ARCHIVES_SUCCESS' },
        {
          type: 'SET_ARCHIVES',
          payload: {
            archives: [
              {
                data: 'data',
                id: 'id',
              },
            ],
            size: 1,
          },
        },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });

  describe('onAddArchive', () => {
    it('should create valid action', async () => {
      const workouts = mockWorkouts();
      const challengeId = 'xxx';
      const store = mockStore({ archive: initialState });

      await onAddArchive(store.dispatch, challengeId, workouts);

      const expected = [
        { type: 'ADD_ARCHIVE' },
        { type: 'ADD_ARCHIVE_SUCCESS' },
      ];
      expect(store.getActions()).toEqual(expected);
    });
  });
});
