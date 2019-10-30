import {
  ADD_ARCHIVE,
  ADD_ARCHIVE_SUCCESS,
  ArchiveActionTypes,
  ArchiveState,
  FETCH_ARCHIVES,
  FETCH_ARCHIVES_SUCCESS,
  SET_ARCHIVES,
} from '~/store/archive';

export const initialState: ArchiveState = {
  archives: [],
  isLoading: undefined,
  size: undefined,
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
          archives: [...state.archives, ...action.payload.archives],
          size: state.size
            ? state.size + action.payload.size
            : action.payload.size,
        };
      }
      return {
        ...state,
        isLoading: false,
      };
    case ADD_ARCHIVE_SUCCESS:
    case FETCH_ARCHIVES_SUCCESS:
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
