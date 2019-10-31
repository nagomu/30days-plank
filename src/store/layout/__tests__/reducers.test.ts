import {
  initialState,
  layoutReducer as reducer,
  toggleLayout,
  toggleNav,
} from '~/store/layout';

describe('layout: reducers', () => {
  it('handles OPEN_NAV', () => {
    const expected = {
      isNavOpen: true,
      isSmallScreen: undefined,
    };
    const action = toggleNav(true);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles CLOSE_NAV', () => {
    const expected = {
      isNavOpen: false,
      isSmallScreen: undefined,
    };
    const action = toggleNav(false);
    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('handles CHANGE_TO_DRAWER_NAV', () => {
    const expected = {
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
      isNavOpen: false,
      isSmallScreen: false,
    };
    const action = toggleLayout(false);
    expect(reducer(state, action)).toEqual(expected);
  });
});
