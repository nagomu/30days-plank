import timekeeper from 'timekeeper';

import Challenge from '~/components/common/challenges/Challenge';
import { workoutFactory } from '~/factories/workoutFactory';
import { mockStore, withProvider } from '~/utils';

describe('Challenge', () => {
  const workouts = workoutFactory(new Date(Date.UTC(2019, 9, 1, 0, 0, 0)));
  const props = {
    challengeId: 'xxx',
    todaysWorkout: workouts[0],
    workouts,
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
        workouts,
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

    const wrapper = withProvider({ Component: Challenge, props, store });
    const workouts = wrapper.find('Workout');

    expect(workouts.at(0).prop('isToday')).toEqual(true);
    expect(wrapper.find('Workout[isToday=true]').length).toEqual(1);

    timekeeper.reset();
  });
});