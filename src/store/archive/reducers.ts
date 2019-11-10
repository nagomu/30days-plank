import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  ArchiveActionTypes,
  ArchiveState,
  FETCH_ARCHIVES,
  SET_ARCHIVES,
} from '~/store/archive';
import { Archive } from '~/types';

export const initialState: ArchiveState = {
  archives: [],
  next: undefined,
  isLoading: undefined,
};

export const mergeArchives = (
  state: Archive[],
  payload: Archive[],
): Archive[] => {
  const mergedArchives: Archive[] = [];

  const isAlreadyAdded = (id: string): boolean =>
    !!mergedArchives.find(m => !!m.id && m.id === id);

  [...state, ...payload].forEach(archive => {
    if (isAlreadyAdded(archive.id)) return;
    mergedArchives.push(archive);
  });

  return mergedArchives;
};

export const archiveReducer = (
  state = initialState,
  action: ArchiveActionTypes,
): ArchiveState => {
  switch (action.type) {
    case SET_ARCHIVES:
      if (state.archives) {
        return {
          ...state,
          isLoading: false,
          archives: mergeArchives(state.archives, action.payload.archives),
          next: action.payload.next,
        };
      }
      return {
        ...state,
        isLoading: false,
      };
    case ADD_ARCHIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_ARCHIVE:
    case FETCH_ARCHIVES:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
