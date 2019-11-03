import Avatar from '~/components/common/icons/Avatar';
import { withProvider } from '~/utils';

describe('Avatar', () => {
  const props = {
    asButton: false,
    user: undefined,
  };

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: Avatar, props });

    expect(wrapper.find('Avatar').length).toEqual(1);
    expect(wrapper.find('Avatar button').length).toEqual(0);
    expect(wrapper.find('Avatar Icon[name="logo"]').length).toEqual(1);
    expect(wrapper.find('Avatar img').length).toEqual(0);
  });

  it('renders correctly is asButton is true', () => {
    const _props = {
      ...props,
      asButton: true,
    };
    const wrapper = withProvider({ Component: Avatar, props: _props });
    expect(wrapper.find('Avatar button[disabled]').length).toEqual(1);
  });

  it('renders correctly if user exists', () => {
    const _props = {
      ...props,
      user: {
        photoURL: 'xxx.png',
      },
    };
    const wrapper = withProvider({ Component: Avatar, props: _props });
    expect(wrapper.find('Avatar img').length).toEqual(1);
    expect(wrapper.find('Avatar button[disabled]').length).toEqual(0);
    expect(wrapper.find('Avatar Icon[name="logo"]').length).toEqual(0);
  });
});
