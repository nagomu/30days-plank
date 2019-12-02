import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import { workoutFactory } from '~/factories/workoutFactory';
import { timestamp } from '~/utils';
import { mockStore, withProvider } from '~/utils/testHelpers';

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
          date: timestamp(new Date()),
          workouts: workoutFactory(),
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

    expect(wrapper.find('Workouts').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
