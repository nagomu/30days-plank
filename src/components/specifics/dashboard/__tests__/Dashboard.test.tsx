import Dashboard from '~/components/specifics/dashboard/Dashboard';
import { timestampFromDate } from '~/services/firestore';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore, withProvider } from '~/utils/testHelpers';

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
  const state = {
    auth: {
      user: { uid: 'xxx' },
      isLoading: false,
    },
    challenge: {
      challenge: undefined,
      isLoading: undefined,
    },
  };
  const store = mockStore(state);

  it('renders correctly', () => {
    const wrapper = withProvider({ Component: Dashboard, props, store });
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
  });

  describe('if loading', () => {
    it('renders correctly', () => {
      const _props = {
        ...props,
        isLoading: true,
      };
      const wrapper = withProvider({
        Component: Dashboard,
        props: _props,
        store,
      });
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
      const wrapper = withProvider({
        Component: Dashboard,
        props: _props,
        store,
      });
      expect(wrapper.find('NotStarted').length).toEqual(1);
    });
  });
});
