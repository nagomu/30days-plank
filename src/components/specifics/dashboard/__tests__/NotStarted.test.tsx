import { mount } from 'enzyme';
import * as React from 'react';

import NotStarted from '~/components/specifics/dashboard/NotStarted';

describe('NotStarted', () => {
  const mockClick = jest.fn();
  const wrapper = mount(<NotStarted onClick={mockClick} />);

  it('renders correctly', () => {
    expect(wrapper.find('div section h2').length).toEqual(1);
    expect(wrapper.find('div section button').length).toEqual(1);
  });

  it('it callable to onClick', () => {
    const button = wrapper.find('div section button');
    button.simulate('click');
    expect(mockClick).toHaveBeenCalled();
  });
});
