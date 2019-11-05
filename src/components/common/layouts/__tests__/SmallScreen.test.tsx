import SmallScreen from '~/components/common/layouts/SmallScreen';
import { withProvider } from '~/utils';

describe('SmallScreen', () => {
  const mockSignOut = jest.fn();
  const props = {
    children: 'children',
    isLoading: true,
    onSignOut: mockSignOut,
    user: null,
  };

  it('renders correctly if loading', () => {
    const params = {
      Component: SmallScreen,
      props,
    };
    const app = withProvider(params).find('SmallScreen');

    expect(app.length).toEqual(1);
    expect(app.find('header button').length).toEqual(1);
    // Should render Loading
    expect(app.find('main Loading').length).toEqual(1);
    // Should not render children
    expect(app.find('main').text()).not.toEqual('children');
  });

  it('renders correctly if authenticated', () => {
    const params = {
      Component: SmallScreen,
      props: {
        ...props,
        isLoading: false,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
    };

    const app = withProvider(params).find('SmallScreen');
    // Should not render Loading
    expect(app.find('main Loading').length).toEqual(0);
    // Should render children
    expect(app.find('main').text()).toEqual('children');
  });

  it('renders correctly if nav is opened', () => {
    const params = {
      Component: SmallScreen,
      props: {
        ...props,
        isLoading: false,
        isNavOpen: true,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
    };

    const app = withProvider(params).find('SmallScreen');
    // Should not render main
    expect(app.find('main').length).toEqual(0);
    // Should render DrawerNav
    expect(app.find('DrawerNav').length).toEqual(1);
  });
});
