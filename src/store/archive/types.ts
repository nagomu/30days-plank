import { Archive, Timestamp } from '~/types';

export type AddArchiveParams = {
  challengeId: string;
  title: string;
  description?: string;
  achievementRate: number;
  createdAt: Timestamp;
};

export type ArchiveState = {
  archives?: Archive[];
  isLoading?: boolean;
  size?: number;
};

export const FETCH_ARCHIVES = 'FETCH_ARCHIVES';
export type FetchArchivesAction = {
  type: typeof FETCH_ARCHIVES;
};

export const FETCH_ARCHIVES_SUCCESS = 'FETCH_ARCHIVES_SUCCESS';
export type FetchArchivesSuccessAction = {
  type: typeof FETCH_ARCHIVES_SUCCESS;
};

export const SET_ARCHIVES = 'SET_ARCHIVES';
export type SetArchivesAction = {
  type: typeof SET_ARCHIVES;
  payload: {
    archives: Archive[];
    size: number;
  };
};

export const ADD_ARCHIVE = 'ADD_ARCHIVE';
export type AddArchiveAction = {
  type: typeof ADD_ARCHIVE;
};

export const ADD_ARCHIVE_SUCCESS = 'ADD_ARCHIVE_SUCCESS';
export type AddArchiveSuccessAction = {
  type: typeof ADD_ARCHIVE_SUCCESS;
};

export type ArchiveActionTypes =
  | FetchArchivesAction
  | FetchArchivesSuccessAction
  | SetArchivesAction
  | AddArchiveAction
  | AddArchiveSuccessAction;
