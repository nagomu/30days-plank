import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import timekeeper from 'timekeeper';

import WorkoutTimer, {
  Props,
} from '~/containers/specifics/workout/WorkoutTimer';
import { timestampFromDate } from '~/services/firestore';
import { Status } from '~/store/workout';

jest.mock('~/utils/datetime', () => ({
  isToday: jest.fn().mockReturnValue(true),
}));

describe('WorkoutTimerContainer', () => {
  jest.useFakeTimers();

  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  const mockOnUpdate = jest.fn();
  const props: Props = {
    isLoading: false,
    workout: {
      id: 'xxx',
      isCompleted: false,
      isRest: false,
      menu: 2,
      scheduledDate: timestampFromDate(mockToday),
      title: 'Day 1',
    },
    onUpdate: mockOnUpdate,
  };

  const createWrapper = (props: Props): ReactWrapper =>
    mount(
      <MemoryRouter>
        <WorkoutTimer {...props} />
      </MemoryRouter>,
    );

  it('renders correctly', () => {
    const wrapper = createWrapper(props);
    const workout = wrapper.find('Workout');

    expect(workout.length).toEqual(1);
    expect(workout.prop('isLoading')).toEqual(false);
    expect(workout.prop('workout')).toEqual(props.workout);
  });

  describe('handleStart', () => {
    it('changes state correctly', () => {
      const wrapper = createWrapper(props).find('WorkoutTimer');
      (wrapper.instance() as WorkoutTimer).handleStart();
      wrapper.update();

      const state = wrapper.state();
      expect(state.status).toEqual(Status.start);
      expect(state.timer).not.toEqual(undefined);

      jest.runAllTimers();

      const expected = {
        progress: 0,
        status: Status.finish,
        timer: undefined,
        isCompleted: true,
      };
      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe('handleReset', () => {
    it('changes state correctly', () => {
      const wrapper = createWrapper(props).find('WorkoutTimer');
      wrapper.setState({
        status: Status.start,
        timer: 1,
      });
      wrapper.update();

      (wrapper.instance() as WorkoutTimer).handleReset();
      wrapper.update();

      const state = wrapper.state();
      expect(state.status).toEqual(Status.standby);
      expect(state.timer).toEqual(undefined);
    });
  });

  describe('handleTogglePause', () => {
    it('changes state correctly', () => {
      const wrapper = createWrapper(props).find('WorkoutTimer');
      wrapper.setState({
        status: Status.start,
        timer: 1,
      });
      wrapper.update();

      (wrapper.instance() as WorkoutTimer).handleTogglePause();
      wrapper.update();

      expect(wrapper.state().status).toEqual(Status.pause);

      (wrapper.instance() as WorkoutTimer).handleTogglePause();
      wrapper.update();

      expect(wrapper.state().status).toEqual(Status.restart);
    });
  });

  describe('componentDidUpdate', () => {
    it('clears interval', () => {
      const prevProps = {
        ...props,
        workout: undefined,
      };
      const wrapper = createWrapper(props).find('WorkoutTimer');
      (wrapper.instance() as WorkoutTimer).componentDidUpdate(prevProps);
      wrapper.update();

      expect(wrapper.state().progress).toEqual(2);
    });
  });

  describe('componentWillUnmount', () => {
    it('clears interval', () => {
      const wrapper = createWrapper(props).find('WorkoutTimer');
      wrapper.setState({ timer: 1 });
      wrapper.update();
      (wrapper.instance() as WorkoutTimer).componentWillUnmount();
      wrapper.update();

      expect(clearInterval).toHaveBeenCalledTimes(3);
    });

    it('calls onUpdate', () => {
      const wrapper = createWrapper(props).find('WorkoutTimer');
      wrapper.setState({ isCompleted: true });
      wrapper.update();
      (wrapper.instance() as WorkoutTimer).componentWillUnmount();
      wrapper.update();

      expect(mockOnUpdate).toBeCalled();
    });
  });

  timekeeper.reset();
});
