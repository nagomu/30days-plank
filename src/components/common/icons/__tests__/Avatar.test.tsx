import Avatar from '~/components/common/icons/Avatar';
import { withProvider } from '~/utils/testHelpers';

describe('Avatar', () => {
  const props = {
    asButton: false,
    photoURL: undefined,
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
    expect(wrapper.find('Avatar button').length).toEqual(1);
  });

  it('renders correctly is photoURL exists', () => {
    const _props = {
      ...props,
      photoURL: 'xxx.png',
    };
    const wrapper = withProvider({ Component: Avatar, props: _props });
    expect(wrapper.find('Avatar img').length).toEqual(1);
    expect(wrapper.find('Avatar Icon[name="logo"]').length).toEqual(0);
  });
});
