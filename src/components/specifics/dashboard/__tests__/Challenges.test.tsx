import Challenges from '~/components/specifics/dashboard/Challenges';
import { withProvider } from '~/utils/testHelpers';

describe('Challenges', () => {
  const wrapper = withProvider({ Component: Challenges });

  it('renders correctly', () => {
    expect(wrapper.find('Challenges').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
