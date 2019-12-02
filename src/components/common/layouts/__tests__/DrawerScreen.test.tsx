import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import { withProvider } from '~/utils/testHelpers';

describe('DrawerScreen', () => {
  const props = {
    children: 'children',
    icon: 'icon',
    isLoading: false,
    pathname: '/',
    title: 'title',
  };

  it('renders correctly', () => {
    const params = { Component: DrawerScreen, props };
    const wrapper = withProvider(params).find('DrawerScreen');

    const screen = wrapper.find('div').at(0);
    expect(screen.text()).toContain('children');

    const link = wrapper.find('NavLink a[href="/"]');
    expect(link.text()).toEqual('title');

    const arrow = wrapper.find('NavLink Icon[name="arrow_back"]');
    expect(arrow.length).toEqual(1);

    const icon = wrapper.find('div div div');
    expect(icon.text()).toEqual('icon');
  });

  describe('isLoading=true', () => {
    it('renders correctly', () => {
      const isLoadingParams = {
        Component: DrawerScreen,
        props: {
          ...props,
          isLoading: true,
        },
      };
      const wrapper = withProvider(isLoadingParams).find('DrawerScreen');
      const screen = wrapper.find('div').at(0);
      expect(screen.text()).not.toContain('children');
      expect(wrapper.find('div div Loading').length).toEqual(1);
    });
  });
});
