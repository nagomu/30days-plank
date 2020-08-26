import App from '~/components/common/layouts/App';
import { mockStore, withProvider } from '~/utils/testHelpers';

describe('App', () => {
  const mockSignOut = jest.fn();
  const props = {
    children: 'children',
    isLoading: true,
    onSignOut: mockSignOut,
    user: null,
  };

  const state = {
    layout: {
      isNavOpen: false,
    },
  };

  const store = mockStore(state);

  it('renders correctly if loading', () => {
    const params = {
      Component: App,
      props,
      store,
    };
    const app = withProvider(params).find('App');

    expect(app.length).toEqual(1);
    expect(app.find('header button').length).toEqual(1);
    // Should render Loading
    expect(app.find('main Loading').length).toEqual(1);
    // Should not render children
    expect(app.find('main').text()).not.toEqual('children');
  });

  it('renders correctly if authenticated', () => {
    const params = {
      Component: App,
      props: {
        ...props,
        isLoading: false,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
      store,
    };

    const app = withProvider(params).find('App');
    // Should not render Loading
    expect(app.find('main Loading').length).toEqual(0);
    // Should render children
    expect(app.find('main').text()).toEqual('children');
  });

  it('renders correctly if nav is opened', () => {
    const navOpenState = {
      layout: {
        isNavOpen: true,
      },
    };

    const navOpen = mockStore(navOpenState);

    const params = {
      Component: App,
      props: {
        ...props,
        isLoading: false,
        user: {
          uid: 'xxx',
          name: 'User',
        },
      },
      store: navOpen,
    };

    const app = withProvider(params).find('App');
    // Should not render main
    expect(app.find('main').length).toEqual(0);
    // Should render DrawerNav
    expect(app.find('DrawerNav').length).toEqual(1);
  });
});
