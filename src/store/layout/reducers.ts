import {
  CHANGE_TO_DRAWER_NAV,
  CHANGE_TO_VERTICAL_NAV,
  CLOSE_DRAWER,
  CLOSE_NAV,
  LayoutActionTypes,
  LayoutState,
  OPEN_DRAWER,
  OPEN_NAV,
} from '~/store/layout';

export const initialState: LayoutState = {
  isDrawerOpen: false,
  isNavOpen: false,
  isSmallScreen: undefined,
};

export const layoutReducer = (
  state = initialState,
  action: LayoutActionTypes,
): LayoutState => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
        isNavOpen: false,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
      };
    case OPEN_NAV:
      return {
        ...state,
        isDrawerOpen: false,
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
