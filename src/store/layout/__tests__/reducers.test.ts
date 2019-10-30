import {
  initialState,
  layoutReducer as reducer,
  toggleDrawer,
  toggleLayout,
  toggleNav,
} from '~/store/layout';

describe('layout: reducers', () => {
  it('handles OPEN_DRAWER', () => {
    const state = {
      ...initialState,
      isNavOpen: true,
    };
    const expected = {
      isDrawerOpen: true,
      isNavOpen: false,
      isSmallScreen: undefined,
    };
    const action = toggleDrawer(true);
    expect(reducer(state, action)).toEqual(expected);
  });

  it('handles CLOSE_DRAWER', () => {
    const expected = {
      isDrawerOpen: false,
      isNavOpen: false,
      isSmallScreen: undefined,
    };
    const action = toggleDrawer(false);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles OPEN_NAV', () => {
    const state = {
      ...initialState,
      isDrawerOpen: true,
    };
    const expected = {
      isDrawerOpen: false,
      isNavOpen: true,
      isSmallScreen: undefined,
    };
    const action = toggleNav(true);
    expect(reducer(state, action)).toEqual(expected);
  });

  it('handles CLOSE_NAV', () => {
    const expected = {
      isDrawerOpen: false,
      isNavOpen: false,
      isSmallScreen: undefined,
    };
    const action = toggleNav(false);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles CHANGE_TO_DRAWER_NAV', () => {
    const expected = {
      isDrawerOpen: false,
      isNavOpen: false,
      isSmallScreen: true,
    };
    const action = toggleLayout(true);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles CHANGE_TO_VERTICAL_NAV', () => {
    const state = {
      ...initialState,
      isNavOpen: true,
    };
    const expected = {
      isDrawerOpen: false,
      isNavOpen: false,
      isSmallScreen: false,
    };
    const action = toggleLayout(false);
    expect(reducer(state, action)).toEqual(expected);
  });
});
