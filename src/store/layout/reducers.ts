import {
  CHANGE_TO_DRAWER_NAV,
  CHANGE_TO_VERTICAL_NAV,
  CLOSE_NAV,
  LayoutActionTypes,
  LayoutState,
  OPEN_NAV,
} from '~/store/layout';

export const initialState: LayoutState = {
  isNavOpen: false,
  isSmallScreen: undefined,
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
    case CHANGE_TO_DRAWER_NAV:
      return {
        ...state,
        isSmallScreen: true,
      };
    case CHANGE_TO_VERTICAL_NAV:
      return {
        ...state,
        isNavOpen: false,
        isSmallScreen: false,
      };
    default:
      return state;
  }
};
