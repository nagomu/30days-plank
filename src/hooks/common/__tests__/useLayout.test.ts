import { useLayout } from '~/hooks/common/useLayout';
import { initialState } from '~/store/layout';
import { mockStore, withHook } from '~/utils/testHelpers';

describe('useLayout', () => {
  it('returns correct actions if closed', () => {
    const store = mockStore(initialState);
    const hook = withHook(useLayout, store);

    hook.onToggleDrawer();
    hook.onToggleNav();

    // TODO: Add more better test cases
    const expected = [{ type: 'OPEN_DRAWER' }, { type: 'OPEN_NAV' }];
    expect(store.getActions()).toEqual(expected);
  });
});
