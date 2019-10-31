export type LayoutState = {
  isNavOpen: boolean;
  isSmallScreen?: boolean;
};

export const OPEN_NAV = 'OPEN_NAV';
export type OpenNavAction = {
  type: typeof OPEN_NAV;
};

export const CLOSE_NAV = 'CLOSE_NAV';
export type CloseNavAction = {
  type: typeof CLOSE_NAV;
};

export const CHANGE_TO_VERTICAL_NAV = 'CHANGE_TO_VERTICAL_NAV';
export type ChangeToVerticalNavAction = {
  type: typeof CHANGE_TO_VERTICAL_NAV;
};

export const CHANGE_TO_DRAWER_NAV = 'CHANGE_TO_DRAWER_NAV';
export type ChangeToDrawerNavAction = {
  type: typeof CHANGE_TO_DRAWER_NAV;
};

export type LayoutActionTypes =
  | OpenNavAction
  | CloseNavAction
  | ChangeToVerticalNavAction
  | ChangeToDrawerNavAction;
