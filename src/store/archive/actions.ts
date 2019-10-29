import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  Archive,
  ArchiveActionTypes,
  FETCH_ARCHIVES,
  FETCH_ARCHIVES_SUCCESS,
  SET_ARCHIVES,
} from '~/store/archive';

export const fetchArchives = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES,
});

export const fetchArchivesSuccess = (): ArchiveActionTypes => ({
  type: FETCH_ARCHIVES_SUCCESS,
});

export const setArchives = (archives?: Archive[]): ArchiveActionTypes => ({
  type: SET_ARCHIVES,
  payload: {
    archives: archives || [],
    size: archives ? archives.length : 0,
  },
});

export const addArchive = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE,
});

export const addArchiveSuccess = (): ArchiveActionTypes => ({
  type: ADD_ARCHIVE_SUCCESS,
});
