import Challenge from '~/components/specifics/dashboard/Challenge';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const props = {
    workouts: mockWorkouts(),
  };

  const wrapper = withProvider({ Component: Challenge, props });

  it('renders correctly', () => {
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
