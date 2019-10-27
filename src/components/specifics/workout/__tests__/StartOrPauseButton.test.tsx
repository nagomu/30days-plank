import { mount } from 'enzyme';
import * as React from 'react';

import StartOrPauseButton from '~/components/specifics/workout/StartOrPauseButton';
import { Status } from '~/store/workout';

describe('StartOrPauseButton', () => {
  const mockStart = jest.fn();
  const mockPause = jest.fn();

  const props = {
    onStart: mockStart,
    onTogglePause: mockPause,
    status: Status.standby,
  };

  it('renders correctly', () => {
    const wrapper = mount(<StartOrPauseButton {...props} />);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('Icon[name="play_arrow"]').length).toEqual(1);
  });

  it('it callable to onStart', () => {
    const button = mount(<StartOrPauseButton {...props} />).find('button');
    button.simulate('click');
    expect(mockStart).toHaveBeenCalled();
  });

  describe('if started', () => {
    const started = {
      ...props,
      status: Status.start,
    };

    it('renders correctly', () => {
      const wrapper = mount(<StartOrPauseButton {...started} />);
      expect(wrapper.find('button').length).toEqual(1);
      expect(wrapper.find('Icon[name="pause"]').length).toEqual(1);
    });

    it('it callable to onTogglePause', () => {
      const button = mount(<StartOrPauseButton {...started} />).find('button');
      button.simulate('click');
      expect(mockPause).toHaveBeenCalled();
    });
  });

  describe('if finished', () => {
    const finished = {
      ...props,
      status: Status.start,
    };

    it('renders correctly', () => {
      const wrapper = mount(<StartOrPauseButton {...finished} />);
      expect(wrapper.find('button[disabled]').length).toEqual(1);
    });
  });
});
