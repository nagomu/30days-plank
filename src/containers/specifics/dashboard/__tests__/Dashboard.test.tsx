import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import { workoutsFactory } from '~/factories/workoutFactory';
import { mockStore, timestamp, withProvider } from '~/utils';

describe('DashboardContainer', () => {
  it('renders correctly if challenge is not empty', () => {
    const store = {
      auth: {
        user: { uid: 'xxx' },
        isLoading: false,
      },
      challenge: {
        challenge: {
          id: 'xxx',
          isActive: true,
          scheduledDate: timestamp(new Date()),
          workouts: workoutsFactory(),
        },
        isLoading: false,
      },
      workout: {
        isLoading: false,
      },
    };
    const wrapper = withProvider({
      Component: Dashboard,
      props: {},
      store: mockStore(store),
    }).find('Dashboard');

    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
