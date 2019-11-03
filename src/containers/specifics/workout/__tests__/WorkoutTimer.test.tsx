import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import timekeeper from 'timekeeper';

import WorkoutTimer, {
  Props,
} from '~/containers/specifics/workout/WorkoutTimer';
import { timestampFromDate } from '~/services/firestore';
import { Status } from '~/store/workout';

describe('WorkoutTimerContainer', () => {
  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  const props: Props = {
    isLoading: false,
    workout: {
      id: 'xxx',
      isCompleted: false,
      isRest: false,
      menu: 20,
      scheduledDate: timestampFromDate(mockToday),
      title: 'Day 1',
    },
    onUpdate: jest.fn(),
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

  timekeeper.reset();
});
