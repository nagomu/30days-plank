import { CLOSE_NAV, LayoutActionTypes, OPEN_NAV } from '~/store/layout';

export const toggleNav = (open: boolean): LayoutActionTypes => ({
  type: open ? OPEN_NAV : CLOSE_NAV,
});
