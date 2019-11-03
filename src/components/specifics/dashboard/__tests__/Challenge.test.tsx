import timekeeper from 'timekeeper';

import Challenge from '~/components/specifics/dashboard/Challenge';
import { workoutsFactory } from '~/factories/workoutFactory';
import { timestampFromDate } from '~/services/firestore';
import { mockStore, withProvider } from '~/utils/testHelpers';

describe('Challenge', () => {
  const props = {
    challengeId: 'xxx',
    workouts: workoutsFactory(),
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
        workouts: workoutsFactory(),
        createdAt: timestampFromDate(new Date()),
      },
      isLoading: false,
    },
  };

  const store = mockStore(state);

  it('renders correctly', () => {
    const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const wrapper = withProvider({ Component: Challenge, props, store });

    expect(wrapper.html()).not.toContain('Archive now');
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);

    timekeeper.reset();
  });

  it('passes isToday to children correctly', () => {
    const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => mockToday.valueOf());

    const wrapper = withProvider({ Component: Challenge, props, store });
    const workouts = wrapper.find('Workout');
    expect(workouts.at(0).prop('isToday')).toEqual(true);
    expect(wrapper.find('Workout[isToday=true]').length).toEqual(1);

    timekeeper.reset();
  });

  it('renders archive button if expired', () => {
    const mockToday = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const wrapper = withProvider({ Component: Challenge, props, store });

    expect(wrapper.html()).toContain('Archive now');
    expect(wrapper.find('Challenge').length).toEqual(1);
    expect(wrapper.find('Workout').length).toEqual(30);

    timekeeper.reset();
  });

  it('renders start button if today', () => {
    const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const _props = {
      ...props,
      workouts: props.workouts.map(workout => ({
        ...workout,
        isCompleted: false,
      })),
    };

    const wrapper = withProvider({
      Component: Challenge,
      props: _props,
      store,
    });
    const startButton = wrapper.find(
      'StartButton[pathname="/challenges/xxx/workouts/1"]',
    );
    expect(startButton.length).toEqual(1);

    timekeeper.reset();
  });
});
