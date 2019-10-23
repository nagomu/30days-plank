import App from '~/components/common/layouts/App';
import { withProvider } from '~/utils/testHelpers';

describe('App', () => {
  const mockSignOut = jest.fn();
  const props = {
    children: 'children',
    isLoading: true,
    onSignOut: mockSignOut,
    user: null,
  };

  it('renders correctly', () => {
    const params = {
      Component: App,
      props,
    };
    const app = withProvider(params).find('App');

    expect(app.length).toEqual(1);
    expect(app.find('div div Nav').length).toEqual(1);
    // Should render Loading
    expect(app.find('div div main Loading').length).toEqual(1);
    // Should not render children
    expect(app.find('div div main').text()).not.toEqual('children');
  });

  describe('if authenticated', () => {
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
    };

    it('renders correctly', () => {
      const app = withProvider(params).find('App');
      expect(app.length).toEqual(1);
      expect(app.find('div div Nav').length).toEqual(1);
      // Should not render Loading
      expect(app.find('div div main Loading').length).toEqual(0);
      // Should render children
      expect(app.find('div div main').text()).toEqual('children');
    });
  });
});
