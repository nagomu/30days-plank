import Workout from '~/containers/specifics/workout/Workout';
import { mockStore, withProvider } from '~/utils';

describe('WorkoutContainer', () => {
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

  it('renders correctly', () => {
    const wrapper = withProvider({
      Component: Workout,
      props,
      store: mockStore(store),
    }).find('Workout');
    expect(wrapper.find('WorkoutTimer').prop('isLoading')).toEqual(true);
    expect(wrapper.find('WorkoutTimer').prop('workout')).toEqual(undefined);
  });
});
