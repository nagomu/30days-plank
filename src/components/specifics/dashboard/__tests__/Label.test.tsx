import { mount } from 'enzyme';
import * as React from 'react';

import Label from '~/components/specifics/dashboard/Label';

describe('Label', () => {
  const props = {
    day: '1',
    isCompleted: true,
    isRest: false,
    menu: 20,
    month: 'Oct',
    title: 'Day 1',
  };

  it('renders correctly', () => {
    const wrapper = mount(<Label {...props} />);
    expect(wrapper.find('span Icon[name="done"]').length).toEqual(1);
    expect(wrapper.find('span span').length).toEqual(3);

    const day = wrapper.find('span span').at(0);
    expect(day.text()).toEqual('1');

    const month = wrapper.find('span span').at(1);
    expect(month.text()).toEqual('Oct');

    const title = wrapper.find('span span').at(2);
    expect(title.text()).toEqual('Day 1');
  });

  describe('if rest', () => {
    it('renders correctly', () => {
      const _props = {
        ...props,
        isRest: true,
      };
      const wrapper = mount(<Label {..._props} />);
      const title = wrapper.find('span span').at(2);
      expect(title.text()).toEqual('Rest');
    });
  });

  describe('if not completed', () => {
    it('renders correctly', () => {
      const _props = {
        ...props,
        isCompleted: false,
      };
      const wrapper = mount(<Label {..._props} />);
      expect(wrapper.find('span Icon[name="done"]').length).toEqual(0);
    });
  });
});
