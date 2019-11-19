import { Archive, Challenge, Next } from '~/types';

export type ArchiveState = {
  archives?: Archive[];
  detail?: Challenge;
  next?: Next;
  isLoading?: boolean;
};

export const FETCH_ARCHIVES = 'FETCH_ARCHIVES';
type FetchArchivesAction = {
  type: typeof FETCH_ARCHIVES;
};

export const SET_ARCHIVES = 'SET_ARCHIVES';
type SetArchivesAction = {
  type: typeof SET_ARCHIVES;
  payload: {
    archives: Archive[];
    next?: Next;
  };
};

export const ADD_ARCHIVE = 'ADD_ARCHIVE';
type AddArchiveAction = {
  type: typeof ADD_ARCHIVE;
};

export const ADD_ARCHIVE_SUCCESS = 'ADD_ARCHIVE_SUCCESS';
type AddArchiveSuccessAction = {
  type: typeof ADD_ARCHIVE_SUCCESS;
};

export const FETCH_ARCHIVED_CHALLENGE = 'FETCH_ARCHIVED_CHALLENGE';
type FetchArchivedChallengeAction = {
  type: typeof FETCH_ARCHIVED_CHALLENGE;
};

export const SET_ARCHIVED_CHALLENGE = 'SET_ARCHIVED_CHALLENGE';
type SetArchivedChallengeAction = {
  type: typeof SET_ARCHIVED_CHALLENGE;
  payload: {
    detail?: Challenge;
  };
};

export type ArchiveActionTypes =
  | AddArchiveAction
  | AddArchiveSuccessAction
  | FetchArchivedChallengeAction
  | FetchArchivesAction
  | SetArchivedChallengeAction
  | SetArchivesAction;
