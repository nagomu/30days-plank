import {
  addArchive,
  addArchiveSuccess,
  archiveReducer as reducer,
  fetchArchives,
  fetchArchivesSuccess,
  initialState,
  setArchives,
} from '~/store/archive';
import { timestampFromDate } from '~/utils/firebase';

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
