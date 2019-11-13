import { Archive, Next, Timestamp } from '~/types';

export type AddArchiveParams = {
  challengeId: string;
  title: string;
  description?: string;
  rate: number;
  createdAt: Timestamp;
};

export type ArchiveState = {
  archives?: Archive[];
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

export type ArchiveActionTypes =
  | FetchArchivesAction
  | SetArchivesAction
  | AddArchiveAction
  | AddArchiveSuccessAction;
