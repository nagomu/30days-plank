import Workout from '~/components/specifics/workout/Workout';
import { Status } from '~/store/workout';
import { timestamp, withProvider } from '~/utils';

describe('Workout', () => {
  const props = {
    isLoading: false,
    onReset: jest.fn(),
    onStart: jest.fn(),
    onTogglePause: jest.fn(),
    pathname: '/',
    progress: 20,
    status: Status.standby,
    workout: {
      id: '1',
      isCompleted: false,
      isRest: false,
      menu: 20,
      scheduledDate: timestamp(new Date()),
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
          status: Status.start,
        },
      };
      const wrapper = withProvider(params).find(Workout);
      const resetButton = wrapper.find('button').at(1);
      expect(resetButton.text()).toEqual('Reset');
    });
  });
});
