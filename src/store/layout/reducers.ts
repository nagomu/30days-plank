import {
  CLOSE_NAV,
  LayoutActionTypes,
  LayoutState,
  OPEN_NAV,
} from '~/store/layout';

export const initialState: LayoutState = {
  isNavOpen: false,
};

export const layoutReducer = (
  state = initialState,
  action: LayoutActionTypes,
): LayoutState => {
  switch (action.type) {
    case OPEN_NAV:
      return {
        ...state,
        isNavOpen: true,
      };
    case CLOSE_NAV:
      return {
        ...state,
        isNavOpen: false,
      };
    default:
      return state;
  }
};
