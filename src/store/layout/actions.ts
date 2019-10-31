import {
  CHANGE_TO_DRAWER_NAV,
  CHANGE_TO_VERTICAL_NAV,
  CLOSE_NAV,
  LayoutActionTypes,
  OPEN_NAV,
} from '~/store/layout';

export const toggleNav = (open: boolean): LayoutActionTypes => ({
  type: open ? OPEN_NAV : CLOSE_NAV,
});

export const toggleLayout = (isSmallScreen: boolean): LayoutActionTypes => ({
  type: isSmallScreen ? CHANGE_TO_DRAWER_NAV : CHANGE_TO_VERTICAL_NAV,
});
