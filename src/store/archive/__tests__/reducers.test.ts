import timekeeper from 'timekeeper';

import { timestampFromDate } from '~/services/firestore';
import {
  addArchive,
  addArchiveSuccess,
  archiveReducer as reducer,
  fetchArchives,
  fetchArchivesSuccess,
  initialState,
  mergeArchives,
  setArchives,
} from '~/store/archive';

describe('archive: reducers', () => {
  it('handles FETCH_ARCHIVES', () => {
    const expected = {
      isLoading: true,
      archives: [],
      size: undefined,
    };
    const action = fetchArchives();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_ARCHIVES_SUCCESS', () => {
    const expected = {
      isLoading: false,
      archives: [],
      size: undefined,
    };
    const action = fetchArchivesSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_ARCHIVES', () => {
    const archives = [
      {
        id: 'xxx',
        challengeId: 'xxx',
        title: '',
        description: undefined,
        achievementRate: 80,
        createdAt: timestampFromDate(new Date()),
      },
    ];
    const expected = {
      isLoading: false,
      archives,
      size: 1,
    };
    const action = setArchives(archives);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_ARCHIVE', () => {
    const expected = {
      isLoading: true,
      archives: [],
      size: undefined,
    };
    const action = addArchive();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_ARCHIVE_SUCCESS', () => {
    const expected = {
      isLoading: false,
      archives: [],
      size: undefined,
    };
    const action = addArchiveSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });
});

describe('mergeArchives', () => {
  const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  it('correctly', () => {
    const state = [
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
      {
        achievementRate: 79,
        challengeId: '3',
        createdAt: timestampFromDate(mockToday),
        id: '3',
        title: 'title3',
      },
    ];

    const store = [
      {
        achievementRate: 79,
        challengeId: '4',
        createdAt: timestampFromDate(mockToday),
        id: '4',
        title: 'title4',
      },
      {
        achievementRate: 79,
        challengeId: '5',
        createdAt: timestampFromDate(mockToday),
        id: '5',
        title: 'title5',
      },
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
    ];

    const expected = [
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
      {
        achievementRate: 79,
        challengeId: '3',
        createdAt: timestampFromDate(mockToday),
        id: '3',
        title: 'title3',
      },
      {
        achievementRate: 79,
        challengeId: '4',
        createdAt: timestampFromDate(mockToday),
        id: '4',
        title: 'title4',
      },
      {
        achievementRate: 79,
        challengeId: '5',
        createdAt: timestampFromDate(mockToday),
        id: '5',
        title: 'title5',
      },
    ];

    expect(mergeArchives(state, store)).toEqual(expected);
  });

  timekeeper.reset();
});
