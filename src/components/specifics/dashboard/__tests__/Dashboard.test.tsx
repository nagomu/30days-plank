import Dashboard from '~/components/specifics/dashboard/Dashboard';
import { timestampFromDate } from '~/utils/firebase';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const props = {
    challenge: {
      id: 'xxx',
      isActive: true,
      workouts: mockWorkouts(),
      createdAt: timestampFromDate(new Date()),
    },
    isLoading: false,
    onAddChallenge: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: Dashboard, props });
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });

  describe('if loading', () => {
    it('renders correctly', () => {
      const _props = {
        ...props,
        isLoading: true,
      };
      const wrapper = withProvider({ Component: Dashboard, props: _props });
      expect(wrapper.find('Loading').length).toEqual(1);
    });
  });

  describe('if workouts are empty', () => {
    it('renders correctly', () => {
      const _props = {
        ...props,
        challenge: {
          ...props.challenge,
          workouts: [],
        },
      };
      const wrapper = withProvider({ Component: Dashboard, props: _props });
      expect(wrapper.find('NotStarted').length).toEqual(1);
    });
  });
});
