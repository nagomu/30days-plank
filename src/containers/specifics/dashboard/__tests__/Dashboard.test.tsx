import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import { timestampFromDate } from '~/utils/firebase';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore, withProvider } from '~/utils/testHelpers';

jest.mock('~/services/firebase/fetchUserFromFirestore');
jest.mock('~/services/firebase/fetchChallengeFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);

describe('DashboardContainer', () => {
  const props = {
    user: { uid: 'xxx' },
  };

  const store = {
    auth: {
      user: undefined,
      isLoading: undefined,
    },
    challenge: {
      challenge: undefined,
      isLoading: undefined,
    },
    workout: {
      isLoading: undefined,
    },
  };

  it('should render null if store is empty', () => {
    const wrapper = withProvider({
      Component: Dashboard,
      props,
      store: mockStore(store),
    }).find('Dashboard');
    expect(wrapper.html()).toEqual(null);
  });

  it('should render null if challenge is empty', () => {
    const _store = {
      ...store,
      auth: {
        user: { uid: 'xxx' },
        isLoading: false,
      },
    };
    const wrapper = withProvider({
      Component: Dashboard,
      props,
      store: mockStore(_store),
    }).find('Dashboard');

    expect(wrapper.html()).toEqual(null);
  });

  it('renders correctly if challenge is not empty', () => {
    const _store = {
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
      store: mockStore(_store),
    }).find('Dashboard');

    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });
});
