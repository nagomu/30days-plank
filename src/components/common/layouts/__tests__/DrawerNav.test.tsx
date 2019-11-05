import DrawerNav from '~/components/common/layouts/DrawerNav';
import { withProvider } from '~/utils';

describe('DrawerNav', () => {
  const mockSignOut = jest.fn();
  const props = {
    onSignOut: mockSignOut,
    user: null,
  };

  it('renders correctly', () => {
    const params = {
      Component: DrawerNav,
      props,
    };
    const nav = withProvider(params).find('DrawerNav');
    expect(nav.length).toEqual(1);
    expect(nav.find('button Avatar').length).toEqual(1);
    expect(nav.find('button Icon[name="arrow_forward"]').length).toEqual(1);
    // Should not render nav
    expect(nav.find('nav').length).toEqual(0);
  });

  describe('if authenticated', () => {
    const params = {
      Component: DrawerNav,
      props: {
        ...props,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
    };

    it('renders correctly', () => {
      const nav = withProvider(params).find('DrawerNav');

      // Should render nav
      expect(nav.find('nav').length).toEqual(1);
      expect(nav.find('nav NavLink').length).toEqual(2);
      expect(nav.find('nav button').length).toEqual(1);
    });

    it('it callable to onSignOut', () => {
      const button = withProvider(params).find('nav button');
      button.simulate('click');
      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
