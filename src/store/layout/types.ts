export type LayoutState = {
  isNavOpen: boolean;
};

export const OPEN_NAV = 'OPEN_NAV';
export type OpenNavAction = {
  type: typeof OPEN_NAV;
};

export const CLOSE_NAV = 'CLOSE_NAV';
export type CloseNavAction = {
  type: typeof CLOSE_NAV;
};

export type LayoutActionTypes = OpenNavAction | CloseNavAction;
