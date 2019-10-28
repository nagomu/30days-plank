import Challenge from '~/components/specifics/dashboard/Challenge';
import { withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const wrapper = withProvider({ Component: Challenge });

  it('renders correctly', () => {
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
