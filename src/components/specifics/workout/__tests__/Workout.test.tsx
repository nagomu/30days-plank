import Workout from '~/components/specifics/workout/Workout';
import { Timer } from '~/types';
import { timestamp } from '~/utils';
import { withProvider } from '~/utils/testHelpers';

describe('Workout', () => {
  const props = {
    isLoading: false,
    onReset: jest.fn(),
    onStart: jest.fn(),
    onTogglePause: jest.fn(),
    pathname: '/',
    progress: 20,
    status: Timer.standby,
    workout: {
      id: '1',
      isCompleted: false,
      isRest: false,
      menu: 20,
      date: timestamp(new Date()),
      title: 'Day 1',
    },
  };

  it('renders correctly', () => {
    const params = {
      Component: Workout,
      props,
    };
    const wrapper = withProvider(params).find(Workout);
    expect(wrapper.find('DrawerScreen').length).toEqual(1);
    expect(wrapper.find('DonutChart').length).toEqual(1);
    expect(wrapper.find('StartOrPauseButton').length).toEqual(1);
  });

  describe('if started', () => {
    it('renders correctly', () => {
      const params = {
        Component: Workout,
        props: {
          ...props,
          status: Timer.start,
        },
      };
      const wrapper = withProvider(params).find(Workout);
      const resetButton = wrapper.find('button').at(1);
      expect(resetButton.text()).toEqual('Reset');
    });
  });
});
