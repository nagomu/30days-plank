import timekeeper from 'timekeeper';

import Dashboard from '~/components/specifics/dashboard/Dashboard';
import { workoutFactory } from '~/factories/workoutFactory';
import { mockStore, timestamp, withProvider } from '~/utils';

const mockIsExpired = jest.fn();

/* eslint-disable */
jest.mock(
  '~/hooks/specifics/dashboard/useOnArchive',
  jest.fn().mockReturnValue({
    useOnArchive: () => ({
      isExpired: mockIsExpired(),
      onArchive: () => undefined,
    }),
  }),
);
/* eslint-enable */

describe('Dashboard', () => {
  const today = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(today);

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
    mockIsExpired.mockImplementation(() => false);

    const wrapper = withProvider({ Component: Dashboard, props, store });
    expect(wrapper.find('Workouts').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
    expect(wrapper.html()).not.toContain('Archive now');
  });

  it('renders correctly if loading', () => {
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

  it('renders correctly if workouts are empty', () => {
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

  it('renders archive button if expired', () => {
    mockIsExpired.mockImplementation(() => true);

    const wrapper = withProvider({ Component: Dashboard, props, store });
    expect(wrapper.html()).toContain('Archive now');
    expect(wrapper.find('Workouts').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);
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

  timekeeper.reset();
});
