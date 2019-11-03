import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import { timestampFromDate } from '~/services/firestore';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore, withProvider } from '~/utils/testHelpers';

describe('DashboardContainer', () => {
  const props = {
    user: { uid: 'xxx' },
  };

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
          sheduledDate: timestampFromDate(new Date()),
          workouts: mockWorkouts(),
        },
        isLoading: false,
      },
      workout: {
        isLoading: false,
      },
    };
    const wrapper = withProvider({
      Component: Dashboard,
      props,
      store: mockStore(store),
    }).find('Dashboard');

    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
