import { mount } from 'enzyme';
import * as React from 'react';

import DonutChart from '~/components/specifics/workout/DonutChart';
import { Timer } from '~/types';

describe('DonutChart', () => {
  const props = {
    progress: 20,
    seconds: 20,
    status: Timer.standby,
  };

  it('renders correctly', () => {
    const wrapper = mount(<DonutChart {...props} />);

    expect(wrapper.find('figure').length).toEqual(1);
    expect(wrapper.find('figure svg').length).toEqual(1);
    expect(wrapper.find('figure svg circle').length).toEqual(1);
    expect(wrapper.find('figure figcaption span').length).toEqual(2);

    const countdown = wrapper.find('span').at(0);
    expect(countdown.text()).toEqual('20');
  });

  describe('if started', () => {
    it('renders correctly', () => {
      const started = {
        ...props,
        status: Timer.start,
      };

      const wrapper = mount(<DonutChart {...started} />);

      expect(wrapper.find('figure svg circle').length).toEqual(2);

      const countdown = wrapper.find('span').at(0);
      expect(countdown.text()).toEqual('20');
      const seconds = wrapper.find('span').at(1);
      expect(seconds.text()).toEqual('20');
    });
  });
});
