import StartButton from '~/components/specifics/dashboard/StartButton';
import { withProvider } from '~/utils';

describe('StartButton', () => {
  const props = { pathname: '/' };

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: StartButton, props });
    expect(wrapper.find('NavLink[to="/"]').length).toEqual(1);
    expect(wrapper.find('Icon[name="play_arrow"]').length).toEqual(1);
  });
});
