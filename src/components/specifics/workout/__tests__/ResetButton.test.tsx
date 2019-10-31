import { mount } from 'enzyme';
import * as React from 'react';

import ResetButton from '~/components/specifics/workout/ResetButton';

describe('ResetButton', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = mount(<ResetButton {...props} />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
