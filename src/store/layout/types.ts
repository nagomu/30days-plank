export type LayoutState = {
  isDrawerOpen: boolean;
  isNavOpen: boolean;
  isSmallScreen?: boolean;
};

export const OPEN_DRAWER = 'OPEN_DRAWER';
export type OpenDrawerAction = {
  type: typeof OPEN_DRAWER;
};

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export type CloseDrawerAction = {
  type: typeof CLOSE_DRAWER;
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
  | OpenDrawerAction
  | CloseDrawerAction
  | OpenNavAction
  | CloseNavAction
  | ChangeToVerticalNavAction
  | ChangeToDrawerNavAction;
