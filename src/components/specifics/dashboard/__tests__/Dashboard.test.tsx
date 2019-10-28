import Dashboard from '~/components/specifics/dashboard/Dashboard';
import { Workout } from '~/store/workout';
import { timestampFromDate } from '~/utils/firebase';
import { withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const mockWorkuts = (): Workout[] => {
    const arr = Array.from(Array(30), (_v, k) => k + 1);
    return arr.map(i => ({
      id: `${i}`,
      isCompleted: true,
      isRest: i === 6 || i === 13 || i === 19 || i === 26,
      menu: 20,
      scheduledDate: timestampFromDate(new Date(2019, 9, i)),
      title: i === 6 || i === 13 || i === 19 || i === 26 ? 'REST' : `Day ${i}`,
    }));
  };

  const props = {
    challenge: {
      id: 'xxx',
      isActive: true,
      workouts: mockWorkuts(),
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
