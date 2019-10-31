import Nav from '~/components/common/layouts/Nav';
import { withProvider } from '~/utils/testHelpers';

describe('Nav', () => {
  const mockSignOut = jest.fn();
  const props = {
    onSignOut: mockSignOut,
    user: null,
  };

  it('renders correctly', () => {
    const params = {
      Component: Nav,
      props,
    };
    const nav = withProvider(params).find('Nav');
    expect(nav.length).toEqual(1);
    expect(nav.find('h1 Link[to="/"]').length).toEqual(1);
    expect(nav.find('h1 Icon[name="logo"]').length).toEqual(1);
    // Should not render nav
    expect(nav.find('nav').length).toEqual(0);
  });

  describe('if authenticated', () => {
    const params = {
      Component: Nav,
      props: {
        ...props,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
    };

    it('renders correctly', () => {
      const nav = withProvider(params).find('Nav');
      expect(nav.length).toEqual(1);
      expect(nav.find('h1 Link[to="/dashboard"]').length).toEqual(1);
      expect(nav.find('h1 Icon[name="logo"]').length).toEqual(1);
      // Should render nav
      expect(nav.find('nav').length).toEqual(1);
      expect(nav.find('nav NavLink').length).toEqual(2);
      expect(nav.find('nav button').length).toEqual(1);
    });

    it('it callable to onSignOut', () => {
      const button = withProvider(params).find('button');
      button.simulate('click');
      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
