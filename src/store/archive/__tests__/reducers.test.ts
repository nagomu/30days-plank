import timekeeper from 'timekeeper';

import {
  addArchive,
  addArchiveSuccess,
  archiveReducer as reducer,
  fetchArchivedChallenge,
  fetchArchives,
  initialState,
  mergeArchives,
  setArchivedChallenge,
  setArchives,
} from '~/store/archive';
import { timestamp } from '~/utils';

describe('archive: reducers', () => {
  it('handles FETCH_ARCHIVES', () => {
    const expected = {
      archives: [],
      details: undefined,
      isLoading: true,
    };
    const action = fetchArchives();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_ARCHIVES', () => {
    const archives = {
      archives: [
        {
          id: 'xxx',
          challenge: 'xxx',
          title: '',
          description: undefined,
          rate: 80,
          createdAt: timestamp(new Date()),
          updatedAt: timestamp(new Date()),
        },
      ],
      next: undefined,
    };
    const expected = {
      archives: archives.archives,
      details: undefined,
      isLoading: false,
      next: archives.next,
    };
    const action = setArchives(archives);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_ARCHIVE', () => {
    const expected = {
      archives: [],
      details: undefined,
      isLoading: true,
    };
    const action = addArchive();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles ADD_ARCHIVE_SUCCESS', () => {
    const expected = {
      archives: [],
      details: undefined,
      isLoading: false,
    };
    const action = addArchiveSuccess();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles FETCH_ARCHIVED_CHALLENGE', () => {
    const expected = {
      archives: [],
      detail: undefined,
      next: undefined,
      isLoading: true,
    };
    const action = fetchArchivedChallenge();
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles SET_ARCHIVED_CHALLENGE', () => {
    const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const detail = {
      id: 'xxx',
      description: 'xxx',
      isActive: false,
      workouts: [],
      createdAt: timestamp(mockToday),
    };

    const expected = {
      archives: [],
      detail,
      isLoading: false,
      next: undefined,
    };

    const action = setArchivedChallenge(detail);
    expect(reducer(initialState, action)).toEqual(expected);

    timekeeper.reset();
  });
});

describe('mergeArchives', () => {
  const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  it('correctly', () => {
    const ts = timestamp(mockToday);
    const state = [
      {
        rate: 80,
        challenge: '1',
        id: '1',
        title: 'title1',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 100,
        challenge: '2',
        id: '2',
        title: 'title2',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 79,
        challenge: '3',
        id: '3',
        title: 'title3',
        createdAt: ts,
        updatedAt: ts,
      },
    ];

    const store = [
      {
        rate: 79,
        challenge: '4',
        id: '4',
        title: 'title4',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 79,
        challenge: '5',
        id: '5',
        title: 'title5',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 80,
        challenge: '1',
        id: '1',
        title: 'title1',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 100,
        challenge: '2',
        id: '2',
        title: 'title2',
        createdAt: ts,
        updatedAt: ts,
      },
    ];

    const expected = [
      {
        rate: 80,
        challenge: '1',
        id: '1',
        title: 'title1',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 100,
        challenge: '2',
        id: '2',
        title: 'title2',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 79,
        challenge: '3',
        id: '3',
        title: 'title3',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 79,
        challenge: '4',
        id: '4',
        title: 'title4',
        createdAt: ts,
        updatedAt: ts,
      },
      {
        rate: 79,
        challenge: '5',
        id: '5',
        title: 'title5',
        createdAt: ts,
        updatedAt: ts,
      },
    ];

    expect(mergeArchives(state, store)).toEqual(expected);
  });

  timekeeper.reset();
});
