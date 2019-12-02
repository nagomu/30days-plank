import { initialState, toggleNav } from '~/store/layout';
import { mockStore } from '~/utils/testHelpers';

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
});
