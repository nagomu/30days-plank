import { initialState, toggleLayout, toggleNav } from '~/store/layout';
import { mockStore } from '~/utils';

describe('layout: actions', () => {
  describe('toggleNav', () => {
    it('should create valid action', () => {
      const store = mockStore({ layout: initialState });

      store.dispatch(toggleNav(true));
      const open = [{ type: 'OPEN_NAV' }];
      expect(store.getActions()).toEqual(open);

      store.dispatch(toggleNav(false));
      const close = [{ type: 'OPEN_NAV' }, { type: 'CLOSE_NAV' }];
      expect(store.getActions()).toEqual(close);
    });
  });

  describe('toggleLayout', () => {
    it('should create valid action', () => {
      const store = mockStore({ layout: initialState });

      store.dispatch(toggleLayout(true));
      const smallScreen = [{ type: 'CHANGE_TO_DRAWER_NAV' }];
      expect(store.getActions()).toEqual(smallScreen);

      store.dispatch(toggleLayout(false));
      const notSmallScreen = [
        { type: 'CHANGE_TO_DRAWER_NAV' },
        { type: 'CHANGE_TO_VERTICAL_NAV' },
      ];
      expect(store.getActions()).toEqual(notSmallScreen);
    });
  });
});
