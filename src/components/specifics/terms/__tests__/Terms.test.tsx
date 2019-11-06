import { mount } from 'enzyme';
import * as React from 'react';

import Terms from '~/components/specifics/terms/Terms';

describe('Terms', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Terms />);
    expect(wrapper.find('section').length).toEqual(1);
  });
});
