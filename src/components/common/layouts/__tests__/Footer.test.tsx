import { mount } from 'enzyme';
import * as React from 'react';

import Footer from '~/components/common/layouts/Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div a').length).toEqual(3);
  });
});
