import timekeeper from 'timekeeper';

import Dashboard from '~/components/specifics/dashboard/Dashboard';
import { workoutFactory } from '~/factories/workoutFactory';
import { mockStore, timestamp, withProvider } from '~/utils';

describe('Dashboard', () => {
  const today = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));

  const props = {
    challenge: {
      id: 'xxx',
      isActive: true,
      workouts: workoutFactory(today),
      createdAt: timestamp(new Date()),
    },
    isLoading: false,
    onAddChallenge: jest.fn(),
  };
  const state = {
    auth: {
      user: {
        uid: 'xxx',
      },
      isLoading: false,
    },
    challenge: {
      challenge: {
        id: 'xxx',
        isActive: true,
        workouts: workoutFactory(today),
      },
      isLoading: false,
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

  it('renders archive button if expired', () => {
    const mockToday = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const wrapper = withProvider({ Component: Dashboard, props, store });

    expect(wrapper.html()).toContain('Archive now');
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);

    timekeeper.reset();
  });

  it('renders start button if today', () => {
    const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const wrapper = withProvider({ Component: Dashboard, props, store });
    const startButton = wrapper.find(
      'StartButton[pathname="/challenges/xxx/workouts/1"]',
    );
    expect(startButton.length).toEqual(1);

    timekeeper.reset();
  });
});
