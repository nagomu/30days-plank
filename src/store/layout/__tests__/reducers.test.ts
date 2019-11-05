import {
  initialState,
  layoutReducer as reducer,
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
});
